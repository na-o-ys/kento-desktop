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
            control.setTurn(Math.max(turn - 1, 0))
        } else {
            control.setTurn(Math.min(turn + 1, game.maxTurn))
        }
    }
    return (
        <div style={{ height: "100vh" }}>
            <div className="row" style={boardRowStyle} onClick={onClickBoard}>
                <Board position={position} verticalHand={false} style={boardStyle} />
            </div>
            <div className="row" style={descriptionRowStyle}>
                <Comment comments={comments} style={commentStyle} />
            </div>
        </div>
    )
}

const boardScale = 1.0
const baseMargin = 10
const boardHeight = 454 * boardScale + baseMargin * 2

const boardRowStyle = {
    margin: 0,
    height: boardHeight
}

const descriptionRowStyle = {
    margin: 0,
    height: `calc(100vh - ${boardHeight}px)`,
    width: "100%"
}

const boardStyle = {
    marginTop: baseMargin,
    marginBottom: baseMargin,
    marginLeft: "auto",
    marginRight: "auto"
}

const commentStyle = {
    margin: `${baseMargin}px 20px`,
    width: `calc(100vw - 40px)`,
    height: `calc(100vh - ${boardHeight}px - ${baseMargin * 2}px)`
}
