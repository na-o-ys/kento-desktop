"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./MoveInput"));
function setGame(game) {
    return { type: "set_game", game };
}
exports.setGame = setGame;
function setTurn(turn) {
    return { type: "set_turn", turn };
}
exports.setTurn = setTurn;
function returnTheGame() {
    return { type: "return_the_game" };
}
exports.returnTheGame = returnTheGame;
//# sourceMappingURL=index.js.map