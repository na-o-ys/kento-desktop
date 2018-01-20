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
import { MenuAction } from "runElectron"
import { Store } from "redux"
import { Position } from "lib/Kifu/Position"
import { Config } from "config"
import { State } from "container/KentoApp"
import { setGameAndTurn } from "actions"

const { BrowserWindow, clipboard, dialog } = remote

async function start() {
    const config = await initializeConfig()
    const game = config.debug.useSampleKifu ?
        sample :
        parseClipboard()

    const latestPosition = _.last(game)
    const store = render(game, latestPosition ? latestPosition.turn : 0, config)
    initializeIpc(config, store)
}

function initializeIpc(config: Config, store: Store<State>) {
    ipcRenderer.on("message", (event: any, text: string) => {
        const container = document.getElementById("messages")
        const message = document.createElement("div")
        message.innerHTML = text
        if (container) container.appendChild(message)
    })

    ipcRenderer.on("menu_action", (event: any, text: MenuAction) => {
        switch (text) {
            case "start_new_game":
                log.info("start new game")
                break
            case "start_clipboard_game":
                try {
                    const game = parseClipboard()
                    store.dispatch(setGameAndTurn(game, game.length - 1))
                } catch (e) {
                    log.info(e)
                    dialog.showErrorBox("Failed to load clipboard", e)
                }
        }
    })
}

function parseClipboard(): Position[] {
    const text = clipboard.readText()
    // URL
    if (text.match("^\s*https?:\/\/.*")) {
        // TODO: parseUrl
    }
    return parseText(text)
}

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

start()
