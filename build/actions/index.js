"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setGame(game) {
    return { type: "set_game", game };
}
exports.setGame = setGame;
function setTurn(turn, currentTurn) {
    return { type: "set_turn", turn, currentTurn };
}
exports.setTurn = setTurn;
function clickCell(cell, position, moveInput, turn) {
    return { type: "click_cell", cell, position, moveInput, turn };
}
exports.clickCell = clickCell;
function clickHand(piece, position, moveInput, turn) {
    return { type: "click_hand", piece, position, moveInput, turn };
}
exports.clickHand = clickHand;
function returnTheGame(theGame, branchFrom) {
    return { type: "return_the_game", theGame, branchFrom };
}
exports.returnTheGame = returnTheGame;
function selectPromote(promote, position, moveInput, turn) {
    return { type: "select_promote", promote, position, moveInput, turn };
}
exports.selectPromote = selectPromote;
//# sourceMappingURL=index.js.map