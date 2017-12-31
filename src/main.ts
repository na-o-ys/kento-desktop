// tslint:disable-next-line
require("module").globalPaths.push(__dirname)
import * as Electron from "electron"
import * as log from "electron-log"
import * as path from "path"
import * as url from "url"
import { initializeAutoUpdater } from "autoUpdate"
import { initializeMenu } from "menu"
import { Windows, initializeWindows } from "windows"

log.transports.console.level = "info"
log.transports.file.level = "info"

let windows: Windows

function start() {
    function sendStatusToWindow(text: string) {
        if (!windows.main) return
        windows.main.webContents.send("message", text)
    }
    initializeAutoUpdater(sendStatusToWindow)
        .checkForUpdatesAndNotify()
    initializeMenu()
    initializeWindows()
}

const app = Electron.app
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
