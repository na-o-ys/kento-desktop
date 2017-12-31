import * as Electron from "electron"
import * as log from "electron-log"

export function initializeMenu(): void {
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
                    label: "Open From Clipboard"
                }
            ]
        }
    ])
    Electron.Menu.setApplicationMenu(menu)
}