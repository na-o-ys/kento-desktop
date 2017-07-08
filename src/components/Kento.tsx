import * as React from "react"
import Board from "./Board"
import Comment from "./Comment"
import { GameControl } from "../types"
import { Game } from "../lib/game"

export const Kento = ({ game, turn, control, moveInput }: { game: Game, turn: number, moveInput: MoveInput, control: GameControl }) => {
    console.log(moveInput)
    const position = game.getPosition(turn)
    const comments = game.getComments(turn)
    const onClickCell = (x: number, y: number) => {
        control.clickCell({ x, y }, position, moveInput)
    }
    const onClickHand = (piece: string) => {
        control.clickHand(piece, position, moveInput)
    }

    return (
        <div className="main" style={mainStyle}>
            <p onClick={() => control.setTurn(Math.max(turn - 1, 0))}>＜</p>
            <p onClick={() => control.setTurn(Math.min(turn + 1, game.maxTurn))}>＞</p>
            <Board position={position} verticalHand={false} style={boardStyle}
                onClickBoard={onClickCell} onClickHand={onClickHand} />
        </div>
    )
}

const boardScale = 1.0
const baseMargin = 10
const boardWidth = 500 * boardScale + baseMargin * 2

const mainStyle = {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: boardWidth // + aiWidth
}

const boardStyle = {
    margin: baseMargin
}

export interface MoveInput {
    state: "selectingMoveFrom" | "selectingMoveTo" | "selectingPromote",
    moveFrom?: {
        x: number,
        y: number
    },
    fromHand?: boolean,
    piece?: string,
    moveTo?: {
        x: number,
        y: number
    },
    promote?: boolean
}

export const emptyMoveInput: MoveInput = {
    state: "selectingMoveFrom"
}