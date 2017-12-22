import * as React from "react"
import * as Modal from "react-modal"
import Board from "./Board"
import { Position, Cell } from "../lib/Kifu"
import { AiResult } from "./Ai"
import { AiInfo, Ai } from "../lib/Ai"
import * as ShogiRule from "../lib/ShogiRule"

export interface GameControl {
    setTurn(turn: number): void
    setMoveFrom(cell: Cell, piece: string): void
    setMoveFromHand(piece: string): void
    setMoveTo(cell: Cell): void
    clearMoveInput(): void
    setPromote(promote: boolean): void
    returnTheGame(): void
    doMove(moveInput: MoveInput, position: Position): void
}

interface KentoProps {
    position: Position
    moveInput: MoveInput
    branchFrom: number
    control: GameControl
    aiInfo: AiInfo
    positionChanged: boolean
    ai: Ai
}

export class Kento extends React.Component<KentoProps> {
    componentWillReceiveProps(nextProps: KentoProps) {
        if (isReady(nextProps.moveInput, nextProps.position)) {
            nextProps.control.doMove(nextProps.moveInput, nextProps.position)
            return null
        }
    }
    render() {
        const {
            position,
            control,
            moveInput,
            branchFrom,
            aiInfo,
            positionChanged,
            ai
        } = this.props
        console.log(position)
        console.log(moveInput)
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
                    if (ShogiRule.canMoveWithoutChecked(position, {
                        from: moveInput.from || null,
                        to: { x, y },
                        piece: moveInput.piece || null,
                        promote: !!moveInput.promote
                    })) {
                        control.setMoveTo({ x, y })
                        return
                    }
                }
                control.clearMoveInput()
            }
        }
        const onClickHand = (piece: string) => {
            if ((piece.toUpperCase() == piece) == (position.nextColor == "b")) {
                control.setMoveFromHand(piece)
            }
        }
        if (positionChanged) {
            ai.start(position)
        }
        const askPromote = !!moveInput.to &&
            moveInput.promote == null &&
            !!moveInput.from && ShogiRule.canPromote(moveInput.from, moveInput.to, position)

        return (
            <div className="main" style={mainStyle}>
                <Modal isOpen={askPromote} contentLabel="promote" style={promoteModalStyle}>
                    <button onClick={() => control.setPromote(true)}>成</button>
                    <button onClick={() => control.setPromote(false)}>不成</button>
                </Modal>
                <div style={{float: "left"}}>
                    <Board position={position} verticalHand={false} style={boardStyle}
                        onClickBoard={onClickCell} onClickHand={onClickHand}
                        highlightCell={moveInput.from}
                        highlightHand={moveInput.fromHand ? moveInput.piece : undefined}/>
                    <Control style={controlStyle} turn={position.turn}
                        showReturnTheGame={branchFrom != -1} returnTheGame={control.returnTheGame}
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
    style: any,
    showReturnTheGame: boolean,
    returnTheGame: Function
}
const Control = ({ control, turn, showReturnTheGame, returnTheGame, style = {} }: ControlProps) => (
    <div style={style}>
        <div style={moveControlStyle} onClick={() => control.setTurn(turn - 1)}>&lt;</div>
        <div style={moveControlStyle} onClick={() => control.setTurn(turn + 1)}>&gt;</div>
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

export const emptyMoveInput: MoveInput = { promote: undefined }
