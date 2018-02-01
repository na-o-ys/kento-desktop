import * as Electron from "electron"
import * as path from "path"
import * as url from "url"

export interface Windows {
    main?: Electron.BrowserWindow
}

export function initializeWindows(): Windows {
    const main = new Electron.BrowserWindow({ width: 730, height: 575, frame: false })
    main.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
    }))
    return { main }
}
