// tslint:disable-next-line
require("module").globalPaths.push(__dirname)
import * as Electron from "electron"
import * as log from "electron-log"
import * as path from "path"
import * as url from "url"
import { initializeAutoUpdater } from "autoUpdate"
import { initializeMenu, MenuActions } from "menu"
import { initializeWindows, Windows } from "windows"

log.transports.console.level = "info"
log.transports.file.level = "info"

let windows: Windows

export type MenuAction = "start_new_game" | "start_clipboard_game" | "export_kifu"

function start() {
    initializeAutoUpdater(sendStatusToWindow)
        .checkForUpdatesAndNotify()
    initializeMenu(actions)
    windows = initializeWindows()
}

function sendActionToWindow(action: MenuAction) {
    if (!windows.main) return
    windows.main.webContents.send("menu_action", action)
}

const actions = {
    startNewGame() {
        sendActionToWindow("start_new_game")
    },
    startClipboardGame() {
        sendActionToWindow("start_clipboard_game")
    },
    exportKif() {
        sendActionToWindow("export_kifu")
    }
}

function sendStatusToWindow(text: string) {
    if (!windows.main) return
    windows.main.webContents.send("message", text)
}

const { app } = Electron
app.on("ready", start)
app.on("activate", () => {
    if (!windows.main) {
        start()
    }
})
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
