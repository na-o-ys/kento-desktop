import { BrowserWindow } from "electron"
import { autoUpdater } from "electron-updater"

export function initializeAutoUpdater(sendStatus: (text: string) => void) {
    // 自動ダウンロードにはコード署名が必要
    autoUpdater.autoDownload = false
    autoUpdater.on("checking-for-update", () => {
        sendStatus("Checking for update...")
    })
    autoUpdater.on("update-available", (info: any) => {
        sendStatus("Update available.")
    })
    autoUpdater.on("update-not-available", (info: any) => {
        sendStatus("Update not available.")
    })
    autoUpdater.on("error", (err: any) => {
        sendStatus("Error in auto-updater. " + err)
    })
    return autoUpdater
}
