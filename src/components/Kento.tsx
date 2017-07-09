import * as React from "react"
import Modal from "react-modal"
import Board from "./Board"
import { GameControl } from "../types"
import { Game } from "../lib/game"
import { Ai } from "./Ai"
import { AiInfo } from "../lib/Ai"

interface KentoProps {
    game: Game
    turn: number
    moveInput: MoveInput
    theGame: Game
    branchFrom: number
    control: GameControl
    aiInfo: AiInfo
}
export const Kento = ({ game, turn, control, moveInput, theGame, branchFrom, aiInfo }: KentoProps) => {
    console.log(moveInput)
    console.log(game)
    console.log(branchFrom)
    const position = game.getPosition(turn)
    const comments = game.getComments(turn)
    const onClickCell = (x: number, y: number) => {
        control.clickCell({ x, y }, position, moveInput, turn)
    }
    const onClickHand = (piece: string) => {
        control.clickHand(piece, position, moveInput, turn)
    }
    const returnTheGame = () => {
        control.returnTheGame(theGame, branchFrom)
    }

    return (
        <div className="main" style={mainStyle}>
            <Modal isOpen={moveInput.state == "selectingPromote"} contentLabel="promote" style={promoteModalStyle}>
                <button onClick={() => control.selectPromote(true, position, moveInput, turn)}>成</button>
                <button onClick={() => control.selectPromote(false, position, moveInput, turn)}>不成</button>
            </Modal>
            <Board position={position} verticalHand={false} style={boardStyle}
                onClickBoard={onClickCell} onClickHand={onClickHand} />
            <Control style={controlStyle} turn={turn} game={game}
                showReturnTheGame={branchFrom != -1} returnTheGame={returnTheGame}
                control={control}/>
            <Ai aiInfo={aiInfo} />
        </div>
    )
}

const promoteModalStyle = {
    content: {
        width: 100,
        height: 80,
        margin: "auto"
    }
}

const moveControlStyle = {
    float: "left",
    width: 30,
    textAlign: "center"
}
const returnTheGameStyle = {
    float: "right",
    width: 100,
    textAlign: "center"
}
type ControlProps = {
    control: GameControl,
    turn: number,
    game: Game,
    style: any,
    showReturnTheGame: boolean,
    returnTheGame: Function   
}
const Control = ({ control, turn, game, showReturnTheGame, returnTheGame, style = {} }: ControlProps) => (
    <div style={style}>
        <div style={moveControlStyle} onClick={() => control.setTurn(Math.max(turn - 1, 0))}>&lt;</div>
        <div style={moveControlStyle} onClick={() => control.setTurn(Math.min(turn + 1, game.maxTurn))}>&gt;</div>
        { showReturnTheGame ?
            <div style={returnTheGameStyle} onClick={() => returnTheGame()}>棋譜に戻る</div> :
            null
        }
    </div>
)

const boardScale = 1.0
const baseMargin = 10
const boardWidth = 500 * boardScale + baseMargin * 2

const mainStyle = {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: boardWidth, // + aiWidth
}

const boardStyle = {
    margin: baseMargin,
    "-webkit-app-region": "no-drag"
}

const controlStyle = {
    margin: baseMargin,
    height: 30,
    "-webkit-app-region": "no-drag"
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