import * as Electron from "electron"
import { BrowserWindow } from "electron"
import * as path from "path"
import * as url from "url"

let windows: { main?: Electron.BrowserWindow } = {}
function initWindows() {
    const window = new BrowserWindow({ width: 730, height: 575, frame: false })
    window.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
    }))
    window.on("closed", function () {
        windows.main = undefined
    })
    window.webContents.openDevTools()
    windows.main = window
}

const app = Electron.app

app.on("ready", initWindows)

app.on('activate', function () {
    if (!windows.main) {
        initWindows()
    }
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
