import JKFPlayer = require("json-kifu-format")
import { Position, emptyMove, Move, Piece, Hand, Cell } from "lib/Kifu/Position"

export function parseText(text: string): Position[] {
    const player = JKFPlayer.parse(text)
    const maxTurn = player.getMaxTesuu()
    return Array.from(Array(maxTurn + 1).keys())
        .map(turn => calculatePosition(turn, player))
}

function calculatePosition(turn: number, player: JKFPlayer): Position {
    player.goto(turn)
    const state = player.getState()
    const move = player.getMove()
    const lastMove: Move = move ? {
        from: move.from as Cell,
        to: move.to as Cell,
        piece: move.piece,
        promote: !!move.promote
    } : emptyMove
    const movedCell = (move && move.to) ? 9 * (move.to.y - 1) + 9 - move.to.x : -1
    let cells: Array<Piece | null> = []
    for (let r = 0; r < 9; r++) for (let f = 0; f < 9; f++) {
        let { color, kind } = state.board[8 - f][r]
        if (color !== null && color !== undefined && kind) {
            cells.push(boardCellToPiece({ color, kind }) as Piece)
        } else cells.push(null)
    }
    let blackHand = zeroHand(), whiteHand = zeroHand()
    for (let kind in state.hands[0]) {
        blackHand[pieceKindMap[kind]] = state.hands[0][kind]
    }
    for (let kind in state.hands[1]) {
        whiteHand[pieceKindMap[kind]] = state.hands[1][kind]
    }
    const nextColor = state.color == 0 ? "b" : "w"
    return new Position(lastMove, cells, blackHand, whiteHand, nextColor, turn)
}

function boardCellToPiece(b: { color: number, kind: string }): Piece {
    let piece = pieceKindMap[b.kind]
    if (b.color == 1) piece = piece.toLowerCase() as Piece
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
