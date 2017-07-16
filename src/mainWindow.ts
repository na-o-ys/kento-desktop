import { remote } from "electron"
import * as path from "path"
import * as _ from "lodash"
import { startGame, registerGame } from "./App"
import { parseText } from "./lib/Kifu"
import axios from "axios"

const { BrowserWindow, clipboard } = remote

const kifu = clipboard.readText()
const game = parseText(kifu)
startGame(game, _.last(game).turn)

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
