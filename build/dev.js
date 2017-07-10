"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docReady = require("doc-ready");
const axios_1 = require("axios");
const App_1 = require("./App");
const game_1 = require("./lib/game");
// injectHeaders()
docReady(() => {
    const kifuElem = document.getElementById('kifu');
    if ('kifu' in kifuElem.dataset) {
        const game = game_1.default.parseText(kifuElem.dataset['kifu']);
        App_1.startGame(game, getTurn());
    }
    if ('url' in kifuElem.dataset) {
        App_1.registerGame(genSubscribeKifu(kifuElem.dataset['url']), getTurn());
    }
    // const url = "https://jsaserver.herokuapp.com/games/6381.kif"
    // registerGame(genSubscribeKifu(url), 0)
});
function getTurn() {
    if (location.hash)
        return parseInt(location.hash.substr(1));
    else
        return 0;
}
function genSubscribeKifu(url) {
    return callback => {
        const fetchGame = () => axios_1.default.get(url).then(res => callback(game_1.default.parseText(res.data)));
        fetchGame();
        setInterval(fetchGame, 1 * 60 * 1000);
    };
}
function injectHeaders() {
    let iconLink = document.createElement("link");
    iconLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    iconLink.rel = "stylesheet";
    document.head.appendChild(iconLink);
    let flexboxLink = document.createElement("link");
    flexboxLink.href = "//cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css";
    flexboxLink.rel = "stylesheet";
    document.head.appendChild(flexboxLink);
}
//# sourceMappingURL=dev.js.map