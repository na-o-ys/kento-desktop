import * as Electron from "electron"
import { BrowserWindow } from "electron"
import * as log from "electron-log"
import * as path from "path"
import * as url from "url"
import { initializeAutoUpdater } from "./autoUpdate"

log.transports.console.level = "info"
log.transports.file.level = "info"

const windows: { main?: Electron.BrowserWindow } = {}
function initWindows() {
    const window = new BrowserWindow({ width: 730, height: 575, frame: false })
    window.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
    }))
    window.on("closed", () => {
        windows.main = undefined
    })
    // window.webContents.openDevTools()
    windows.main = window

    initializeAutoUpdater(sendStatusToWindow)
        .checkForUpdatesAndNotify()
}

function sendStatusToWindow(text: string) {
    if (!windows.main) return
    windows.main.webContents.send("message", text)
}

const app = Electron.app

app.on("ready", initWindows)

app.on("activate", () => {
    if (!windows.main) {
        initWindows()
    }
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
