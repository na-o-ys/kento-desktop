// tslint:disable-next-line
require("module").globalPaths.push(__dirname)
import * as path from "path"
import { remote, ipcRenderer } from "electron"
import axios from "axios"
import * as _ from "lodash"
import { render } from "App"
import { parseText } from "lib/Kifu"
import { initializeConfig } from "config"
import { sample } from "lib/Kifu/sample"
import * as log from "electron-log"

async function start() {
    const { BrowserWindow, clipboard } = remote
    const config = await initializeConfig()

    const game = config.debug.useSampleKifu ?
        sample :
        parseText(clipboard.readText())

    const latestPosition = _.last(game)
    render(game, latestPosition ? latestPosition.turn : 0, config)
}

start()

ipcRenderer.on("message", (event: any, text: string) => {
    const container = document.getElementById("messages")
    const message = document.createElement("div")
    message.innerHTML = text
    if (container) container.appendChild(message)
})

// const url = clipboard.readText()

// registerGame(genSubscribeKifu(url), 0)

// function genSubscribeKifu(url) {
//     return callback => {
//         const fetchGame = () =>
//             axios.get(url).then(res => callback(Game.parseText(res.data)))
//         fetchGame()
//         setInterval(fetchGame, 1 * 60 * 1000)
//     }
// }
