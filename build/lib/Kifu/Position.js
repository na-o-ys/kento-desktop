"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const ShogiRule = require("../ShogiRule");
class Position {
    constructor(lastMove, cells, blackHand, whiteHand, nextColor, turn) {
        this.lastMove = lastMove;
        this.cells = cells;
        this.blackHand = blackHand;
        this.whiteHand = whiteHand;
        this.nextColor = nextColor;
        this.turn = turn;
    }
    getPiece(cell) {
        return this.cells[(cell.y - 1) * 9 + 9 - cell.x];
    }
    getSfen() {
        let lines = [];
        for (const y of _.range(9)) {
            let spaces = 0;
            let line = "";
            const applySpaces = () => {
                if (spaces > 0) {
                    line += spaces.toString();
                    spaces = 0;
                }
            };
            for (const x of _.range(9)) {
                const piece = this.cells[y * 9 + x];
                if (piece) {
                    applySpaces();
                    line += piece;
                }
                else {
                    spaces += 1;
                }
            }
            applySpaces();
            lines.push(line);
        }
        const board = lines.join("/");
        let hand = ["P", "L", "N", "S", "G", "B", "R"]
            .map(kind => {
            let txt = "";
            const bCount = this.blackHand[kind];
            if (bCount > 0) {
                txt += bCount > 1 ? bCount.toString() : "";
                txt += kind.toUpperCase();
            }
            const wCount = this.whiteHand[kind];
            if (wCount > 0) {
                txt += wCount > 1 ? wCount.toString() : "";
                txt += kind.toLowerCase();
            }
            return txt;
        })
            .join("");
        if (hand == "")
            hand = "-";
        return `sfen ${board} ${this.nextColor} ${hand} 1`;
        // let fromTxt = ""
        // if (this.lastMove.from) {
        //     const { x, y } = this.lastMove.from
        //     fromTxt = `${x}${String.fromCharCode(96 + y)}`
        // } else {
        //     fromTxt = this.lastMove.piece.toUpperCase() + "*"
        // }
        // const { x, y } = this.lastMove.to
        // let toTxt = `${x}${String.fromCharCode(96 + y)}`
        // if (this.lastMove.promote) toTxt += "+"
        // return fromTxt + toTxt
    }
    move(move) {
        let cells = _.cloneDeep(this.cells);
        let blackHand = _.cloneDeep(this.blackHand);
        let whiteHand = _.cloneDeep(this.whiteHand);
        if (move.from) {
            cells[(move.from.y - 1) * 9 + 9 - move.from.x] = null;
        }
        else {
            if (this.nextColor == "b") {
                blackHand[move.piece.toUpperCase()] -= 1;
            }
            else {
                whiteHand[move.piece.toUpperCase()] -= 1;
            }
        }
        const moveToPiece = this.getPiece(move.to);
        if (moveToPiece) {
            if (this.nextColor == "b") {
                blackHand[moveToPiece.toUpperCase()] += 1;
            }
            else {
                whiteHand[moveToPiece.toUpperCase()] += 1;
            }
        }
        const piece = move.from ? this.getPiece(move.from) : move.piece;
        cells[(move.to.y - 1) * 9 + 9 - move.to.x] = piece;
        return new Position(move, cells, blackHand, whiteHand, this.nextColor == "b" ? "w" : "b", this.turn + 1);
    }
    generateMoveJp(move) {
        let moveTo = `${move.to.x}${move.to.y}`;
        if (_.isEqual(this.lastMove.to, move.to)) {
            moveTo = "同";
        }
        const piece = move.from ? this.getPiece(move.from) : move.piece;
        const jpPiece = pieceToJp[piece.toLowerCase()];
        let promote = "";
        if (move.from && ShogiRule.canPromote(move.from, move.to, this)) {
            promote = move.promote ? "成" : "不成";
        }
        let moveFrom = move.from ? `(${move.from.x}${move.from.y})` : "打";
        return moveTo + jpPiece + promote + moveFrom;
    }
}
exports.Position = Position;
exports.emptyCell = {
    x: 0,
    y: 0
};
exports.emptyMove = {
    from: exports.emptyCell,
    to: exports.emptyCell,
    promote: false
};
const pieceList = ["p", "l", "n", "s", "g", "b", "r", "k",
    "+p", "+l", "+n", "+s", "+b", "+r"];
const jpList = ["歩", "香", "桂", "銀", "金", "角", "飛", "玉",
    "と", "成香", "成桂", "成銀", "馬", "龍"];
const pieceToJp = _.zipObject(pieceList, jpList);
const jpToPiece = _.zipObject(jpList, pieceList);
//# sourceMappingURL=Position.js.map