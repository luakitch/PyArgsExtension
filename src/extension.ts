import * as vscode from "vscode";

/** Set in launch.json to show the argument prompt when starting the debugger (e.g. F5). */
export const LAUNCH_PROMPT_FLAG = "pyargsPrompt";

const STORAGE_PREFIX = "pyargs.lastArgs.";

/** Split a line into argv-ish tokens; supports "double quotes" and 'single quotes'. */
export function parseArgString(input: string): string[] {
  const s = input.trim();
  if (!s) {
    return [];
  }
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    while (i < s.length && /\s/.test(s[i])) {
      i++;
    }
    if (i >= s.length) {
      break;
    }
    const q = s[i];
    if (q === '"' || q === "'") {
      i++;
      let buf = "";
      while (i < s.length && s[i] !== q) {
        if (s[i] === "\\" && i + 1 < s.length) {
          i++;
        }
        buf += s[i];
        i++;
      }
      if (i < s.length && s[i] === q) {
        i++;
      }
      out.push(buf);
      continue;
    }
    let buf = "";
    while (i < s.length && !/\s/.test(s[i])) {
      buf += s[i];
      i++;
    }
    out.push(buf);
  }
  return out;
}

function storageKeyForFile(fsPath: string): string {
  return STORAGE_PREFIX + fsPath.replace(/\\/g, "/");
}

async function promptArgsRaw(
  workspaceState: vscode.Memento,
  programPath: string
): Promise<string | undefined> {
  const key = storageKeyForFile(programPath);
  const previous = workspaceState.get<string>(key) ?? "";

  const raw = await vscode.window.showInputBox({
    title: "Arguments for script",
    prompt: "Command-line arguments (saved for this file in the workspace). Example: --verbose input.txt",
    value: previous,
    ignoreFocusOut: true,
    placeHolder: "Leave empty to pass no arguments",
  });
  if (raw === undefined) {
    return undefined;
  }
  await workspaceState.update(key, raw);
  return raw;
}

function registerDebugArgPrompt(context: vscode.ExtensionContext): void {
  const provider: vscode.DebugConfigurationProvider = {
    async resolveDebugConfigurationWithSubstitutedVariables(
      _folder,
      config,
      _token
    ): Promise<vscode.DebugConfiguration | null | undefined> {
      if (!config[LAUNCH_PROMPT_FLAG]) {
        return config;
      }
      const program = typeof config.program === "string" ? config.program : undefined;
      if (!program) {
        const next = { ...config };
        delete next[LAUNCH_PROMPT_FLAG];
        return next;
      }

      const raw = await promptArgsRaw(context.workspaceState, program);
      if (raw === undefined) {
        return null;
      }

      const next: vscode.DebugConfiguration = { ...config };
      delete next[LAUNCH_PROMPT_FLAG];
      next.args = parseArgString(raw);
      return next;
    },
  };

  const trigger = vscode.DebugConfigurationProviderTriggerKind.Dynamic;
  context.subscriptions.push(
    vscode.debug.registerDebugConfigurationProvider("python", provider, trigger)
  );
  context.subscriptions.push(
    vscode.debug.registerDebugConfigurationProvider("debugpy", provider, trigger)
  );
}

export function activate(context: vscode.ExtensionContext): void {
  registerDebugArgPrompt(context);

  const disposable = vscode.commands.registerCommand("pyargs.runWithArgs", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId !== "python") {
      vscode.window.showWarningMessage("Open a Python file in the editor first.");
      return;
    }
    const doc = editor.document;
    if (doc.isUntitled) {
      vscode.window.showWarningMessage("Save the Python file before running with arguments.");
      return;
    }
    const filePath = doc.uri.fsPath;

    const raw = await promptArgsRaw(context.workspaceState, filePath);
    if (raw === undefined) {
      return;
    }
    const args = parseArgString(raw);

    const folder = vscode.workspace.getWorkspaceFolder(doc.uri);
    const cfg: vscode.DebugConfiguration = {
      type: "python",
      request: "launch",
      name: "Python: current file (with args)",
      program: filePath,
      args,
      console: "integratedTerminal",
      justMyCode: true,
    };

    const started = await vscode.debug.startDebugging(folder, cfg, { noDebug: true });
    if (!started) {
      vscode.window.showErrorMessage(
        "Could not start Python. Ensure the Python extension is installed and a Python interpreter is selected."
      );
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate(): void {}
