"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const _ = require("lodash");
const App_1 = require("./App");
const Kifu_1 = require("./lib/Kifu");
const { BrowserWindow, clipboard } = electron_1.remote;
const kifu = clipboard.readText();
const game = Kifu_1.parseText(kifu);
const latestPosition = _.last(game);
App_1.startGame(game, latestPosition ? latestPosition.turn : 0);
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
//# sourceMappingURL=mainWindow.js.map