import { remote } from "electron"
import * as path from "path"
import { startGame, registerGame } from "./App"
import Game from "./lib/game"
import axios from "axios"

const { BrowserWindow, clipboard } = remote

const url = clipboard.readText()

registerGame(genSubscribeKifu(url), 0)

function genSubscribeKifu(url) {
    return callback => {
        const fetchGame = () =>
            axios.get(url).then(res => callback(Game.parseText(res.data)))
        fetchGame()
        setInterval(fetchGame, 1 * 60 * 1000)
    }
}
