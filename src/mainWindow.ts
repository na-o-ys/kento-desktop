import * as path from "path"
import { remote } from "electron"
import axios from "axios"
import * as _ from "lodash"
import { startGame, registerGame } from "./App"
import { parseText } from "./lib/Kifu"
import { initializeConfig } from "./config"
import { sample } from "./lib/Kifu/sample"

async function start() {
    const { BrowserWindow, clipboard } = remote
    const config = await initializeConfig()

    const game = config.debug.useSampleKifu ?
        sample :
        parseText(clipboard.readText())

    const latestPosition = _.last(game)
    startGame(game, latestPosition ? latestPosition.turn : 0, config)
}

start()

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
