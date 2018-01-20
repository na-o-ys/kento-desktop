import * as Electron from "electron"
import * as log from "electron-log"

export interface MenuActions {
    startNewGame(): void
    startClipboardGame(): void
}

export function initializeMenu(actions: MenuActions): void {
    const menu = Electron.Menu.buildFromTemplate([
        {
            label: "Kento",
            submenu: [
                {
                    role: "quit"
                }
            ]
        },
        {
            label: "File",
            submenu: [
                {
                    label: "New"
                },
                {
                    type: "separator"
                },
                {
                    label: "Open URL"
                },
                {
                    label: "Open Kifu"
                },
                {
                    label: "Open From Clipboard",
                    click: actions.startClipboardGame
                }
            ]
        }
    ])
    Electron.Menu.setApplicationMenu(menu)
}