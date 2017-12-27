import { BrowserWindow } from "electron"

export function initializeAutoUpdater(sendStatusToWindow: Function) {
    const { autoUpdater } = require("electron-updater")
    autoUpdater.on("checking-for-update", () => {
        sendStatusToWindow("Checking for update...")
    })
    autoUpdater.on("update-available", (info: any) => {
        sendStatusToWindow("Update available.")
    })
    autoUpdater.on("update-not-available", (info: any) => {
        sendStatusToWindow("Update not available.")
    })
    autoUpdater.on("error", (err: any) => {
        sendStatusToWindow("Error in auto-updater. " + err)
    })
    autoUpdater.on("download-progress", (progressObj: any) => {
        let log_message = "Download speed: " + progressObj.bytesPerSecond
        log_message = log_message + " - Downloaded " + progressObj.percent + "%"
        log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")"
        sendStatusToWindow(log_message)
    })
    autoUpdater.on("update-downloaded", (info: any) => {
        sendStatusToWindow("Update downloaded")
        autoUpdater.quitAndInstall()
    })
    return autoUpdater
}