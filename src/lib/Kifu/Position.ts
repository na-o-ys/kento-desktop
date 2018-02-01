import * as _ from "lodash"
import * as ShogiRule from "lib/ShogiRule"

export type Color = "b" | "w"

export type Piece = string

export interface Cell {
    x: number
    y: number
}

export interface Move {
    from: Cell | null
    to: Cell
    piece: Piece | null
    promote: boolean
}

export class Position {
    constructor(
        readonly lastMove: Move,
        readonly cells: Array<Piece | null>,
        readonly blackHand: Hand,
        readonly whiteHand: Hand,
        readonly nextColor: Color,
        readonly turn: number
    ) {}

    getPiece(cell: Cell): Piece | null {
        return this.cells[(cell.y - 1) * 9 + 9 - cell.x]
    }

    getSfen(): string {
        const lines: string[] = []
        for (const y of _.range(9)) {
            let spaces = 0
            let line = ""
            const applySpaces = () => {
                if (spaces > 0) {
                    line += spaces.toString()
                    spaces = 0
                }
            }
            for (const x of _.range(9)) {
                const piece = this.cells[y * 9 + x]
                if (piece) {
                    applySpaces()
                    line += piece
                } else {
                    spaces += 1
                }
            }
            applySpaces()
            lines.push(line)
        }
        const board = lines.join("/")

        let hand = ["P", "L", "N", "S", "G", "B", "R"]
            .map(kind => {
                let txt = ""
                const bCount = this.blackHand[kind]
                if (bCount > 0) {
                    txt += bCount > 1 ? bCount.toString() : ""
                    txt += kind.toUpperCase()
                }
                const wCount = this.whiteHand[kind]
                if (wCount > 0) {
                    txt += wCount > 1 ? wCount.toString() : ""
                    txt += kind.toLowerCase()
                }
                return txt
            })
            .join("")
        if (hand === "") hand = "-"

        return `sfen ${board} ${this.nextColor} ${hand} 1`
    }

    move(move: Move): Position {
        const cells = _.cloneDeep(this.cells)
        const blackHand = _.cloneDeep(this.blackHand)
        const whiteHand = _.cloneDeep(this.whiteHand)
        if (move.from) {
            cells[(move.from.y - 1) * 9 + 9 - move.from.x] = null
        }
        if (!move.from && move.piece) {
            if (this.nextColor === "b") {
                blackHand[move.piece.toUpperCase()] -= 1
            } else {
                whiteHand[move.piece.toUpperCase()] -= 1
            }
        }

        const moveToPiece = this.getPiece(move.to)
        if (moveToPiece) {
            const p = moveToPiece.toUpperCase().replace("+", "")
            if (this.nextColor === "b") {
                blackHand[p] += 1
            } else {
                whiteHand[p] += 1
            }
        }
        let piece = move.from ? this.getPiece(move.from) : move.piece as Piece
        if (move.promote) piece = "+" + piece as Piece
        cells[(move.to.y - 1) * 9 + 9 - move.to.x] = piece

        return new Position(
            move,
            cells,
            blackHand,
            whiteHand,
            this.nextColor === "b" ? "w" : "b",
            this.turn + 1
        )
    }

    getMoveJp(move: Move): string {
        let moveTo = `${move.to.x}${move.to.y}`
        if (_.isEqual(this.lastMove.to, move.to)) {
            moveTo = "同"
        }

        const piece = move.from ? this.getPiece(move.from) : move.piece as Piece
        if (piece == null) {
            throw new Error("move-from cell cannot be null")
        }
        const jpPiece = pieceToJp[piece.toLowerCase()]

        let promote = ""
        if (move.from && ShogiRule.canPromote(move.from, move.to, this)) {
            promote = move.promote ? "成" : "不成"
        }

        const moveFrom = move.from ? `(${move.from.x}${move.from.y})` : "打"
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
    piece: null,
    promote: false
}

const pieceList = ["p", "l", "n", "s", "g", "b", "r", "k",
    "+p", "+l", "+n", "+s", "+b", "+r"]
const jpList = ["歩", "香", "桂", "銀", "金", "角", "飛", "玉",
    "と", "成香", "成桂", "成銀", "馬", "龍"]
const pieceToJp: { [key: string]: string } = _.zipObject(pieceList, jpList)

const Zero = {
    blackHand: {
        B: 0, G: 0, K: 0, L: 0, N: 0, P: 0, R: 0, S: 0
    },
    whiteHand: {
        B: 0, G: 0, K: 0, L: 0, N: 0, P: 0, R: 0, S: 0
    },
    cells: [
        "l", "n", "s", "g", "k", "g", "s", "n", "l",
        null, "r", null, null, null, null, null, "b", null,
        "p", "p", "p", "p", "p", "p", "p", "p", "p",
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null, null,
        "P", "P", "P", "P", "P", "P", "P", "P", "P",
        null, "B", null, null, null, null, null, "R", null,
        "L", "N", "S", "G", "K", "G", "S", "N", "L"
    ],
    lastMove: {
        from: { x: 0, y: 0 },
        piece: null,
        promote: false,
        to: { x: 0, y: 0 }
    },
    nextColor: "b" as Color,
    turn: 0,
}

export const InitialPosition = new Position(
    Zero.lastMove,
    Zero.cells,
    Zero.blackHand,
    Zero.whiteHand,
    Zero.nextColor,
    Zero.turn
)
