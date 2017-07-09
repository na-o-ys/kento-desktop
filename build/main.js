"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let windows = {};
function initWindows() {
    const window = new electron_1.BrowserWindow({ width: 580, height: 555, frame: false });
    window.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true
    }));
    window.on("closed", function () {
        windows = null;
    });
    windows.main = window;
}
const app = Electron.app;
app.on("ready", initWindows);
app.on('activate', function () {
    if (windows.main === null) {
        initWindows();
    }
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
//# sourceMappingURL=main.js.map