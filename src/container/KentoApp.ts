import * as _ from "lodash"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Kento, MoveInput, GameControl } from "components/Kento"
import { AppProps } from "App"
import * as actions from "actions"
import { Position, Cell } from "lib/Kifu"
import { AiInfo } from "lib/Ai"

export interface State {
    game: Position[]
    theGame: Position[]
    turn: number
    moveInput: MoveInput
    branchFrom: number
    positionChanged: boolean
    aiInfo: AiInfo
    reversed: boolean
}

function mapStateToProps(state: State, ownProps: any) {
    return {
        position: state.game[state.turn],
        moveInput: state.moveInput,
        theGame: state.theGame,
        branched: state.branchFrom !== -1,
        positionChanged: state.positionChanged,
        aiInfo: state.aiInfo,
        ai: ownProps.ai,
        reversed: state.reversed
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
            clearMoveInput() {
                dispatch(actions.clearMoveInput())
            },
            setPromote(promote: boolean) {
                dispatch(actions.setPromote(promote))
            },
            returnTheGame() {
                dispatch(actions.returnTheGame())
            },
            doMove(moveInput: MoveInput, position: Position) {
                dispatch(actions.doMove(moveInput, position))
            },
            reverseBoard() {
                dispatch(actions.reverseBoard())
            }
        }
    }
}

const KentoApp = connect<any, any, any, State>(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
