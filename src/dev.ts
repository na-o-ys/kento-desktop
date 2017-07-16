import docReady = require("doc-ready")
import axios from "axios"
import { startGame, registerGame } from "./App"
import Game from "./lib/game"

// injectHeaders()

docReady(() => {
    const kifuElem = document.getElementById('kifu')
    if ('kifu' in kifuElem.dataset) {
        const game = Game.parseText(kifuElem.dataset['kifu'])
        startGame(game, getTurn(), false)
    }
    if ('url' in kifuElem.dataset) {
        registerGame(genSubscribeKifu(kifuElem.dataset['url']), getTurn(), false)
    }
    // const url = "https://jsaserver.herokuapp.com/games/6381.kif"
    // registerGame(genSubscribeKifu(url), 0)
})

function getTurn() {
    if (location.hash) return parseInt(location.hash.substr(1))
    else return 0
}

function genSubscribeKifu(url) {
    return callback => {
        const fetchGame = () =>
            axios.get(url).then(res => callback(Game.parseText(res.data)))
        fetchGame()
        setInterval(fetchGame, 1 * 60 * 1000)
    }
}

function injectHeaders() {
    let iconLink = document.createElement("link")
    iconLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons"
    iconLink.rel = "stylesheet"
    document.head.appendChild(iconLink)

    let flexboxLink = document.createElement("link")
    flexboxLink.href = "//cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css"
    flexboxLink.rel = "stylesheet"
    document.head.appendChild(flexboxLink)
}
