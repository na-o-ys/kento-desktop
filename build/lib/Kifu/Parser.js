"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JKFPlayer = require("json-kifu-format");
const Position_1 = require("./Position");
function parseText(text) {
    const player = JKFPlayer.parse(text);
    const maxTurn = this.player.getMaxTesuu();
    return Array.from(Array(this.maxTurn + 1).keys())
        .map(turn => calculatePosition(turn, player));
}
exports.parseText = parseText;
function calculatePosition(turn, player) {
    player.goto(turn);
    const state = player.getState();
    const move = player.getMove();
    const lastMove = move ? {
        from: move.from,
        to: move.to,
        piece: move.piece,
        promote: !!move.promote
    } : Position_1.emptyMove;
    const movedCell = (move && move.to) ? 9 * (move.to.y - 1) + 9 - move.to.x : -1;
    let cells = [];
    for (let r = 0; r < 9; r++)
        for (let f = 0; f < 9; f++) {
            let { color, kind } = state.board[8 - f][r];
            if (color !== null && color !== undefined && kind) {
                cells.push(boardCellToPiece({ color, kind }));
            }
            else
                cells.push(null);
        }
    let blackHand = zeroHand(), whiteHand = zeroHand();
    for (let kind in state.hands[0]) {
        blackHand[pieceKindMap[kind]] = state.hands[0][kind];
    }
    for (let kind in state.hands[1]) {
        whiteHand[pieceKindMap[kind]] = state.hands[1][kind];
    }
    const nextColor = state.color == 0 ? "b" : "w";
    return new Position_1.Position(lastMove, cells, blackHand, whiteHand, nextColor, turn);
}
function boardCellToPiece(b) {
    let piece = pieceKindMap[b.kind];
    if (b.color)
        piece = piece.toLowerCase();
    return piece;
}
function zeroHand() {
    return {
        K: 0,
        R: 0,
        B: 0,
        G: 0,
        S: 0,
        N: 0,
        L: 0,
        P: 0
    };
}
const pieceKindMap = {
    "OU": "K",
    "HI": "R",
    "KA": "B",
    "KI": "G",
    "GI": "S",
    "KE": "N",
    "KY": "L",
    "FU": "P",
    "RY": "+R",
    "UM": "+B",
    "NG": "+S",
    "NK": "+N",
    "NY": "+L",
    "TO": "+P"
};
//# sourceMappingURL=Parser.js.map