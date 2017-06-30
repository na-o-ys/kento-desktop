"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_GAME = 'set_game';
function setGame(game) {
    return { type: exports.SET_GAME, game };
}
exports.setGame = setGame;
exports.SET_TURN = 'set_turn';
function setTurn(turn) {
    return { type: exports.SET_TURN, turn };
}
exports.setTurn = setTurn;
//# sourceMappingURL=index.js.map