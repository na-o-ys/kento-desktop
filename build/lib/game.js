"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JKFPlayer = require("json-kifu-format");
const _ = require("lodash");
const Kifu = require("./Kifu");
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
const revPieceKindMap = {
    "K": "OU",
    "R": "HI",
    "B": "KA",
    "G": "KI",
    "S": "GI",
    "N": "KE",
    "L": "KY",
    "P": "FU",
    "+R": "RY",
    "+B": "UM",
    "+S": "NG",
    "+N": "NK",
    "+L": "NY",
    "+P": "TO"
};
class Game {
    constructor(player) {
        this.player = player;
        this.positions = Array.from(Array(this.maxTurn + 1).keys())
            .map(turn => this.calculatePosition(turn));
    }
    static parseText(text) {
        return new Game(JKFPlayer.parse(text));
    }
    static fromKifu(kifu) {
        return new Game(new JKFPlayer(kifu));
    }
    get maxTurn() {
        return this.player.getMaxTesuu();
    }
    get jpKifu() {
        if (this._jpKifu)
            return this._jpKifu;
        return this._jpKifu = this.player.getReadableKifuState().map(move => move.kifu.replace("☖", "△").replace("☗", "▲"));
    }
    get kifu() {
        return this.player.kifu;
    }
    getPosition(turn) {
        return this.positions[turn];
    }
    getSfen(turn) {
        return this.player.kifu.moves.slice(1, turn + 1).map(toSfenString).join(" ");
    }
    getTime(turn) {
        const move = this.player.kifu.moves[turn];
        if (move && move.time)
            return move.time;
        return { now: { m: 0, s: 0 }, total: { h: 0, m: 0, s: 0 } };
    }
    getComments(turn) {
        return this.player.getComments(turn);
    }
    getHeader() {
        return this.player.kifu.header;
    }
    branch(turn) {
        let branch = _.cloneDeep(Object.assign({}, this.kifu, { moves: this.kifu.moves.slice(0, turn + 1) }));
        return Game.fromKifu(branch);
    }
    appendMove(move) {
        move.piece = revPieceKindMap[move.piece.toUpperCase()];
        if (!this.player.inputMove(move)) {
            throw "cannot move";
        }
        this.positions.push(this.calculatePosition(this.maxTurn));
    }
    calculatePosition(turn) {
        this.player.goto(turn);
        const state = this.player.getState();
        const move = this.player.getMove();
        const lastMove = move ? {
            from: move.from,
            to: move.to,
            piece: move.piece,
            promote: !!move.promote
        } : Kifu.emptyMove;
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
        const sfen = this.getSfen(turn);
        return new Kifu.Position(lastMove, cells, blackHand, whiteHand, nextColor, turn, sfen);
    }
}
exports.Game = Game;
exports.emptyGame = Game.parseText("");
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
function toSfenString(move) {
    if (!move.move)
        return "";
    let fromTxt = "", toTxt = "";
    if (move.move.from) {
        // 移動
        fromTxt = placeToSfen(move.move.from);
    }
    else {
        // 打ち
        fromTxt = pieceKindMap[move.move.piece] + "*";
    }
    if (move.move && move.move.to) {
        toTxt = placeToSfen(move.move.to);
        if (move.move && move.move.promote)
            toTxt += "+";
    }
    return fromTxt + toTxt;
}
function placeToSfen(place) {
    return place.x.toString() + String.fromCharCode(96 + place.y);
}
exports.default = Game;
//# sourceMappingURL=game.js.map