const vscode = require('vscode');
const path = require('path');
const { spawn } = require('child_process');

function activate(context) {
    let disposable = vscode.commands.registerCommand('algo.runFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'algo') {
            vscode.window.showInformationMessage('The active file is not a Algo file.');
            return;
        }

        const filePath = document.fileName;
        const extensionPath = context.extensionPath;
        const shellPath = path.join(extensionPath, 'runtime', 'shell.py');

        const terminal = vscode.window.createTerminal(`Algo Runner`);
        terminal.show();
        terminal.sendText(`python3 "${shellPath}" "${filePath}"`);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
