import { connect } from "react-redux"
import { Kento, MoveInput, GameControl } from "../components/Kento"
import * as actions from "../actions"
import { Dispatch } from "redux"
import { Position, Cell } from "../lib/Kifu"
import { AiInfo } from "../lib/Ai"
import * as _ from "lodash"

export interface State {
    game: Position[]
    turn: number
    turnsRead: number
    moveInput: MoveInput
    theGame: Position[]
    branchFrom: number
    positionChanged: boolean
    aiInfo: AiInfo
}

function mapStateToProps(state: State, ownProps) {
    return {
        position: state.game[state.turn],
        moveInput: state.moveInput,
        theGame: state.theGame,
        branchFrom: state.branchFrom,
        positionChanged: state.positionChanged,
        aiInfo: state.aiInfo,
        ai: ownProps.ai
    }
}

function mapDispatchToProps(dispatch: Dispatch<0>): { control: GameControl } {
    return {
        control: {
            setTurn(turn) {
                dispatch(actions.setTurn(turn))
            },
            setMoveFrom(cell: Cell, piece: string) {
                dispatch(actions.setMoveFrom(cell, piece))
            },
            setMoveFromHand(piece: string) {
                dispatch(actions.setMoveFromHand(piece))
            },
            setMoveTo(cell: Cell) {
                dispatch(actions.setMoveTo(cell))
            },
            setPromote(promote: boolean) {
                dispatch(actions.setPromote(promote))
            },
            returnTheGame() {
                dispatch(actions.returnTheGame())
            },
            doMove(moveInput: MoveInput, position: Position) {
                dispatch(actions.doMove(moveInput, position))
            }
        }
    }
}

const KentoApp = connect(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
