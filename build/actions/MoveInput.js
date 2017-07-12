"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setMoveFrom(cell, piece) {
    return { type: "set_move_from", cell, piece };
}
exports.setMoveFrom = setMoveFrom;
function setMoveFromHand(piece) {
    return { type: "set_move_from_hand", piece };
}
exports.setMoveFromHand = setMoveFromHand;
function setMoveTo(cell) {
    return { type: "set_move_to", cell };
}
exports.setMoveTo = setMoveTo;
function setPromote(promote) {
    return { type: "set_promote", promote };
}
exports.setPromote = setPromote;
function doMove(moveInput, position) {
    return { type: "do_move", moveInput, position };
}
exports.doMove = doMove;
//# sourceMappingURL=MoveInput.js.map