# Python Run With Args

Run the **current Python file** with custom command-line arguments. A prompt appears so you can type or edit args; the last value you used is **remembered per file** in the workspace.

## How to run

- **Editor toolbar**: When a `.py` file is active, use the **Run Python File with Arguments** play-style button in the editor title bar (next to other run actions).
- **Command Palette**: `Python Args: Run Python File with Arguments`.
- **Keyboard**: `Ctrl+Shift+F5` (Windows/Linux) or `Cmd+Shift+F5` (macOS) while focus is in a Python editor.

Arguments are parsed with simple shell-like rules: spaces separate tokens; use `"double quotes"` or `'single quotes'` for values that contain spaces.

## Requirements

- [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) (`ms-python.python`) must be installed.
- The file must be **saved** (not an untitled buffer).
- A Python interpreter should be selected in the workspace (same as for normal Python runs).

The extension starts a **Run Without Debugging** session (`noDebug: true`) so behavior matches a normal script run in the integrated terminal.

## Publishing (maintainers)

1. Create a [Personal Access Token](https://learn.microsoft.com/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate) in Azure DevOps with **Marketplace (manage)** scope.
2. Install dependencies and compile: `npm install` then `npm run compile`.
3. Package: `npx @vscode/vsce package`
4. Publish: `npx @vscode/vsce publish -p <YOUR_PAT>`

Or upload the generated `.vsix` from the [publisher management](https://marketplace.visualstudio.com/manage) page.

Publisher ID in `package.json` is `kitchelsoftware`.
