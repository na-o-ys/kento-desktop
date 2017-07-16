import * as _ from "lodash"
import * as ShogiRule from "./ShogiRule"

export type Color = "b" | "w"

export type Piece = "K" | "R" | "B" | "G" | "S" | "N" | "L" | "P" |
    "+R" | "+B" | "+S" | "+N" | "+L" | "+P" |
    "k" | "r" | "b" | "g" | "s" | "n" | "l" | "p" |
    "+r" | "+b" | "+s" | "+n" | "+l" | "+p"

export interface Cell {
    x: number
    y: number
}

export interface Move {
    from?: Cell
    to: Cell
    piece?: Piece
    promote: boolean
}

export class Position {
    constructor(
        readonly lastMove: Move,
        readonly cells: Array<Piece | null>,
        readonly blackHand: Hand,
        readonly whiteHand: Hand,
        readonly nextColor: Color,
        readonly turn: number,
        readonly sfen: string
    ) {}

    getPiece(cell: Cell): Piece | null {
        return this.cells[(cell.y - 1) * 9 + 9 - cell.x]
    }

    move(move: Move): Position {
        let cells = _.cloneDeep(this.cells)
        let blackHand = _.cloneDeep(this.blackHand)
        let whiteHand = _.cloneDeep(this.whiteHand)
        if (move.from) {
            cells[(move.from.y - 1) * 9 + 9 - move.from.x] = null
        } else {
            if (this.nextColor == "b") {
                blackHand[move.piece.toUpperCase()] -= 1
            } else {
                whiteHand[move.piece.toUpperCase()] -= 1
            }
        }

        const moveToPiece = this.getPiece(move.to)
        if (moveToPiece) {
            if (this.nextColor == "b") {
                blackHand[moveToPiece.toUpperCase()] += 1
            } else {
                whiteHand[moveToPiece.toUpperCase()] += 1
            }
        }
        const piece = move.from ? this.getPiece(move.from) : move.piece
        cells[(move.to.y - 1) * 9 + 9 - move.to.x] = piece

        return new Position(
            move,
            cells,
            blackHand,
            whiteHand,
            this.nextColor == "b" ? "w" : "b",
            this.turn + 1,
            "TODO"
        )
    }

    generateMoveJp(move: Move): string {
        let moveTo = `${move.to.x}${move.to.y}`
        if (_.isEqual(this.lastMove.to, move.to)) {
            moveTo = "同"
        }

        const piece = move.from ? this.getPiece(move.from) : move.piece
        const jpPiece = pieceToJp[piece.toLowerCase()]

        let promote = ""
        if (move.from && ShogiRule.canPromote(move.from, move.to, this)) {
            promote = move.promote ? "成" : "不成"
        }

        let moveFrom = move.from ? `(${move.from.x}${move.from.y})` : "打"
        return moveTo + jpPiece + promote + moveFrom
    }
}

// 大文字
export interface Hand {
    [key: string]: number
}

export const emptyCell: Cell = {
    x: 0,
    y: 0
}

export const emptyMove: Move = {
    from: emptyCell,
    to: emptyCell,
    promote: false
}

const pieceList = ["p", "l", "n", "s", "g", "b", "r", "k",
    "+p", "+l", "+n", "+s", "+b", "+r"]
const jpList = ["歩", "香", "桂", "銀", "金", "角", "飛", "玉",
    "と", "成香", "成桂", "成銀", "馬", "龍"]
const pieceToJp = _.zipObject(pieceList, jpList)
const jpToPiece = _.zipObject(jpList, pieceList)
