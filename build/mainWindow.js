"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const App_1 = require("./App");
const game_1 = require("./lib/game");
const axios_1 = require("axios");
const { BrowserWindow, clipboard } = electron_1.remote;
const url = clipboard.readText();
App_1.registerGame(genSubscribeKifu(url), 0);
function genSubscribeKifu(url) {
    return callback => {
        const fetchGame = () => axios_1.default.get(url).then(res => callback(game_1.default.parseText(res.data)));
        fetchGame();
        setInterval(fetchGame, 1 * 60 * 1000);
    };
}
//# sourceMappingURL=mainWindow.js.map