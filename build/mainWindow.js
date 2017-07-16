"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const App_1 = require("./App");
const game_1 = require("./lib/game");
const { BrowserWindow, clipboard } = electron_1.remote;
const kifu = clipboard.readText();
const game = game_1.default.parseText(kifu);
App_1.startGame(game, game.maxTurn);
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