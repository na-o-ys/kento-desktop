import * as React from "react"
import Board from "./Board"
import Comment from "./Comment"
import { GameControl } from "../types"
import { Game } from "../lib/game"

export const Kento = ({ game, turn, control }: { game: Game, turn: number, control: GameControl }) => {
    const position = game.getPosition(turn)
    const comments = game.getComments(turn)
    // const onClickBoard = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (e.clientX - e.currentTarget.offsetLeft < e.currentTarget.offsetWidth / 2) {
    //         control.setTurn(Math.max(turn - 1, 0))
    //     } else {
    //         control.setTurn(Math.min(turn + 1, game.maxTurn))
    //     }
    // }
    return (
        <div className="main" style={mainStyle}>
            <Board position={position} verticalHand={false} style={boardStyle}
                onClickBoard={onClickBoard} onClickHand={onClickHand} />
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

function onClickBoard(x: number, y: number) {
    console.log([x, y])
}

function onClickHand(piece) {
    console.log(piece)
}
