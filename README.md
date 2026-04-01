# Python Run With Args

**Stop editing `launch.json` every time you need different flags.** Python Run With Args is a lightweight **Visual Studio Code** and **Cursor** extension that asks for **command-line arguments** when you run your **Python script**—then remembers them per file in your workspace.

[Install from Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=kitchelsoftware.python-run-with-args) · [Open VSX Registry](https://open-vsx.org/extension/kitchelsoftware/python-run-with-args) · [Source on GitHub](https://github.com/luakitch/PyArgsExtension)

---

## Why use this extension?

- **Fast CLI workflows** — Pass `--verbose`, config paths, input files, or `argparse` flags without touching the terminal history each time.
- **Remembered per script** — The last argument string you used for each `.py` file is saved in the workspace, so repeat runs are one click away.
- **Fits your editor** — Works from the **Run** menu on Python files, the Command Palette, and a keyboard shortcut—aligned with how you already run code in **VS Code** or **Cursor**.

## Features at a glance

| Capability | What it means for you |
|------------|------------------------|
| Argument prompt | Type or paste args in a simple prompt before the script runs. |
| Per-file memory | Each Python file keeps its own last-used arguments in this workspace—no global clutter. |
| Run menu integration | Appears alongside other **Run Python** actions in the editor toolbar. |
| Quote-friendly parsing | Use `"double quotes"` or `'single quotes'` for paths and values that contain spaces. |
| Optional debugger hook | If your project uses **F5** / `launch.json`, you can enable a config that prompts for args before debugging—see below. |

## Get started (first-time setup)

1. Install the [Microsoft Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) if you have not already.
2. Open your project folder and choose a Python interpreter (**Python: Select Interpreter** in the Command Palette).
3. Install **Python Run With Args** from the Marketplace or Open VSX (links at the top of this page).

## How to run a script with arguments

1. Open the **`.py`** file you want to run.
2. **Save the file** (the extension does not run unsaved “Untitled” buffers).
3. Start a run in any of these ways:

| Method | What to do |
|--------|------------|
| **Run** dropdown | Click the **▼** on the editor’s **Run / Play** control and choose **Run Python File with Arguments** (under **Python Args**). |
| **Command Palette** | `Python Args: Run Python File with Arguments` |
| **Keyboard** | `Ctrl+Shift+F5` (Windows / Linux) or `Cmd+Shift+F5` (macOS) with focus in the Python editor |

4. Enter your arguments (example: `--config app.json ./data`) and confirm. The script runs in the **integrated terminal** like a normal Python run.

## Typing arguments (quotes and spaces)

- Separate words with spaces: `hello world` → two arguments.
- For a single value with spaces, use quotes: `"My Documents\report.csv"` or `'C:\path with spaces\file.py'`.

## Using F5 / launch configurations (optional)

If you debug with **F5**, your repo can include a launch configuration that shows the same argument prompt before starting the debugger. Open the sample `launch.json` patterns in the [GitHub repository](https://github.com/luakitch/PyArgsExtension) under `.vscode/` if you want that workflow in your own projects.

## Requirements

- **Visual Studio Code** 1.85+ or **Cursor** (with extension support).
- Microsoft’s **Python** extension (`ms-python.python`) installed and enabled.
- A **saved** Python file and a **selected interpreter** in the workspace.

## Frequently asked questions

**Does this replace the built-in Run Python button?**  
No. It adds a dedicated action—use the **Run** dropdown or the commands above so you always get an argument prompt when you want one.

**Will my arguments work with `argparse` / `sys.argv`?**  
Yes. Arguments are passed the same way as on the command line after the script name.

**Where are arguments stored?**  
In workspace state, keyed by file path—suitable for local development; not committed to Git unless your tooling exports workspace storage.

## License

This project is released under the [MIT License](LICENSE).

## Support

- **Issues & feature requests:** [GitHub Issues](https://github.com/luakitch/PyArgsExtension/issues)  
- **Publisher:** Kitchel Software (`kitchelsoftware` on the Marketplace and Open VSX)
