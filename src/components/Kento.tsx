import * as React from "react"
import Board from "./Board"
import Comment from "./Comment"
import { GameControl } from "../types"
import { Game } from "../lib/game"

export const Kento = ({ game, turn, control }: { game: Game, turn: number, control: GameControl }) => {
    const position = game.getPosition(turn)
    const comments = game.getComments(turn)
    const onClickBoard = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.clientX - e.currentTarget.offsetLeft < e.currentTarget.offsetWidth / 2) {
            control.setTurn(turn - 1)
        } else {
            control.setTurn(turn + 1)
        }
    }
    return (
        <div>
            <div className="row">
                <Board position={position} verticalHand={false} />
            </div>
            <div className="row">
                <Comment comments={comments} />
            </div>
        </div>
    )
}
