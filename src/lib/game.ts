import JKFPlayer = require("json-kifu-format")
import { JsonKifuFormat } from "../types"
import * as _ from "lodash"

const pieceKindMap: { [id: string]: Piece } = {
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
}

const revPieceKindMap: { [id: string]: Piece } = {
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
}

export type Hand = {
    K: number,
    R: number,
    B: number,
    G: number,
    S: number,
    N: number,
    L: number,
    P: number
}

export class Position {
    constructor(
        readonly cells: Array<Piece | null>,
        readonly black_hand: Hand,
        readonly white_hand: Hand,
        readonly movedCell: number,
        readonly nextColor: string
    ) {}

    getPiece(cell: { x: number, y: number }): string | null {
        return this.cells[(cell.y - 1) * 9 + 9 - cell.x]
    }
}

export class Game {
    player: JKFPlayer
    positions: Position[]
    _jpKifu: string[]
    constructor(player: JKFPlayer) {
        this.player = player
        this.positions = Array.from(Array(this.maxTurn + 1).keys())
            .map(turn => this.calculatePosition(turn))
    }

    static parseText(text): Game {
        return new Game(JKFPlayer.parse(text))
    }

    static fromKifu(kifu: JsonKifuFormat.JSONKifuFormat): Game {
        return new Game(new JKFPlayer(kifu))
    }

    get maxTurn(): number {
        return this.player.getMaxTesuu()
    }

    get jpKifu(): string[] {
        if (this._jpKifu) return this._jpKifu
        return this._jpKifu = this.player.getReadableKifuState().map(move => (move.kifu))
    }

    get kifu(): JsonKifuFormat.JSONKifuFormat {
        return this.player.kifu
    }

    getPosition(turn: number): Position {
        return this.positions[turn]
    }

    getSfen(turn: number): string {
        return this.player.kifu.moves.slice(1, turn + 1).map(toSfenString).join(" ")
    }

    getTime(turn: number) {
        const move = this.player.kifu.moves[turn]
        if (move && move.time) return move.time
        return { now: { m: 0, s: 0 }, total: { h: 0, m: 0, s: 0 } }
    }

    getComments(turn: number) {
        return this.player.getComments(turn)
    }

    getHeader() {
        return this.player.kifu.header
    }

    branch(turn: number): Game {
        let branch = _.cloneDeep({ ...this.kifu, moves: this.kifu.moves.slice(0, turn + 1) })
        return Game.fromKifu(branch)
    }

    appendMove(move: JsonKifuFormat.MoveMoveFormat) {
        move.piece = revPieceKindMap[move.piece.toUpperCase()]
        if (!this.player.inputMove(move)) {
            throw "cannot move"
        }
        this.positions = Array.from(Array(this.maxTurn + 1).keys())
            .map(turn => this.calculatePosition(turn))
    }

    private calculatePosition(turn: number): Position {
        this.player.goto(turn)
        const state = this.player.getState()
        const move = this.player.getMove()
        const movedCell = (move && move.to) ? 9 * (move.to.y - 1) + 9 - move.to.x : -1
        let cells: Array<Piece | null> = []
        for (let r = 0; r < 9; r++) for (let f = 0; f < 9; f++) {
            let { color, kind } = state.board[8 - f][r]
            if (color !== null && color !== undefined && kind) {
                cells.push(boardCellToPiece({ color, kind }))
            } else cells.push(null)
        }
        let black_hand = zeroHand(), white_hand = zeroHand()
        for (let kind in state.hands[0]) {
            black_hand[pieceKindMap[kind]] = state.hands[0][kind]
        }
        for (let kind in state.hands[1]) {
            white_hand[pieceKindMap[kind]] = state.hands[1][kind]
        }
        const nextColor = state.color == 0 ? "b" : "w"
        return new Position(cells, black_hand, white_hand, movedCell, nextColor)
    }
}

export const emptyGame = Game.parseText("")

// type Piece = "K" | "R" | "B" | "G" | "S" | "N" | "L" | "P" |
//              "+R" | "+B" | "+S" | "+N" | "+L" | "+P" |
//              "k" | "r" | "b" | "g" | "s" | "n" | "l" | "p" |
//              "+r" | "+b" | "+s" | "+n" | "+l" | "+p"
export type Piece = string

function boardCellToPiece(b: { color: boolean, kind: string }): Piece {
    let piece = pieceKindMap[b.kind]
    if (b.color) piece = piece.toLowerCase()
    return piece
}

function zeroHand(): Hand {
    return {
        K: 0,
        R: 0,
        B: 0,
        G: 0,
        S: 0,
        N: 0,
        L: 0,
        P: 0
    }
}


function toSfenString(move: JKFPlayer.MoveFormat): string {
    if (!move.move) return ""
    let fromTxt = "", toTxt = ""
    if (move.move.from) {
        // 移動
        fromTxt = placeToSfen(move.move.from)
    } else {
        // 打ち
        fromTxt = pieceKindMap[move.move.piece] + "*"
    }
    if (move.move && move.move.to) {
        toTxt = placeToSfen(move.move.to)
        if (move.move && move.move.promote) toTxt += "+"
    }

    return fromTxt + toTxt
}

function placeToSfen(place: JKFPlayer.PlaceFormat): string {
    return place.x.toString() + String.fromCharCode(96 + place.y)
}

export default Game
