import * as React from "react"
import Modal from "react-modal"
import Board from "./Board"
import { Game, Position, Cell } from "../lib/game"
import { AiResult } from "./Ai"
import { AiInfo, Ai } from "../lib/Ai"
import * as ShogiRule from "../lib/ShogiRule"

export interface GameControl {
    setTurn(turn: number, currentTurn: number): void
    setMoveFrom(cell: Cell, piece: string): void
    setMoveFromHand(piece: string)
    setMoveTo(cell: Cell): void
    setPromote(promote: boolean): void
    returnTheGame(theGame: any, branchFrom: number): void
    doMove(moveInput: MoveInput, position: Position): void
}

interface KentoProps {
    game: Game
    turn: number
    moveInput: MoveInput
    theGame: Game
    branchFrom: number
    control: GameControl
    aiInfo: AiInfo
    positionChanged: boolean
    ai: Ai
}

export class Kento extends React.Component<KentoProps> {
    componentWillReceiveProps(nextProps) {
        const position = nextProps.game.getPosition(nextProps.turn)
        if (isReady(nextProps.moveInput, position)) {
            nextProps.control.doMove(nextProps.moveInput, position)
            return null
        }
    }
    render() {
        const {
            game,
            turn,
            control,
            moveInput,
            theGame,
            branchFrom,
            aiInfo,
            positionChanged,
            ai
        } = this.props
        // console.log(moveInput)
        // console.log(game)
        // console.log(branchFrom)
        // console.log(positionChanged)
        const position = game.getPosition(turn)
        const onClickCell = (x: number, y: number) => {
            const piece = position.getPiece({ x, y })
            // 自駒
            if (piece && (piece.toUpperCase() == piece) == (position.nextColor == "b")) {
                control.setMoveFrom({ x, y }, piece)
                return
            }
            // 相手駒 or 空白
            if (moveInput.piece) {
                const movables = moveInput.from ?
                    ShogiRule.getMovablesFromCell(moveInput.from, position) :
                    ShogiRule.getMovablesFromHand(moveInput.piece, position)
                if (movables.includes({ x, y })) {
                    control.setMoveTo({ x, y })
                }
            }
        }
        const onClickHand = (piece: string) => {
            if ((piece.toUpperCase() == piece) == (position.nextColor == "b")) {
                control.setMoveFromHand(piece)
            }
        }
        const returnTheGame = () => {
            control.returnTheGame(theGame, branchFrom)
        }
        if (positionChanged) {
            ai.start(game, turn)
        }
        const askPromote = moveInput.to &&
            moveInput.promote == null &&
            ShogiRule.canPromote(moveInput.from, moveInput.to, position)

        return (
            <div className="main" style={mainStyle}>
                <Modal isOpen={askPromote} contentLabel="promote" style={promoteModalStyle}>
                    <button onClick={() => control.setPromote(true)}>成</button>
                    <button onClick={() => control.setPromote(false)}>不成</button>
                </Modal>
                <div style={{float: "left"}}>
                    <Board position={position} verticalHand={false} style={boardStyle}
                        onClickBoard={onClickCell} onClickHand={onClickHand} />
                    <Control style={controlStyle} turn={turn} game={game}
                        showReturnTheGame={branchFrom != -1} returnTheGame={returnTheGame}
                        control={control}/>
                </div>
                <div style={{float: "left"}}>
                    <AiResult aiInfo={aiInfo} style={{width: aiWidth}}/>
                </div>
            </div>
        )
    }
}

function isReady(moveInput: MoveInput, position: Position) {
    const { from, to, fromHand, promote } = moveInput
    return to &&
        (
            fromHand ||
            promote != null ||
            from && !ShogiRule.canPromote(from, to, position)
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
        <div style={moveControlStyle} onClick={() => control.setTurn(Math.max(turn - 1, 0), turn)}>&lt;</div>
        <div style={moveControlStyle} onClick={() => control.setTurn(Math.min(turn + 1, game.maxTurn), turn)}>&gt;</div>
        { showReturnTheGame ?
            <div style={returnTheGameStyle} onClick={() => returnTheGame()}>棋譜に戻る</div> :
            null
        }
    </div>
)

const boardScale = 1.0
const baseMargin = 10
const boardWidth = 500 * boardScale + baseMargin * 2
const aiWidth = 140

const mainStyle = {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: boardWidth + aiWidth + baseMargin,
    height: 514
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
    from?: Cell
    to?: Cell
    fromHand?: boolean
    piece?: string
    promote?: boolean
}

export const emptyMoveInput: MoveInput = { promote: null }
