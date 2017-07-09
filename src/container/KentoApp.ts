import { connect } from "react-redux"
import { Kento, MoveInput } from "../components/Kento"
import * as actions from "../actions"
import { Dispatch } from "redux"
import { Game, Position } from "../lib/game"
import { AiInfo } from "../lib/Ai"

export const emptyMoveInput: MoveInput = {
    state: "selectingMoveFrom"
}

export type State = {
    game: Game,
    turn: number,
    turnsRead: number,
    moveInput: MoveInput,
    theGame: Game,
    branchFrom: number,
    aiInfo: AiInfo
}

function mapStateToProps(state: State) {
    return {
        game: state.game,
        turn: state.turn,
        moveInput: state.moveInput,
        theGame: state.theGame,
        branchFrom: state.branchFrom,
        aiInfo: state.aiInfo
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        control: {
            setTurn(turn) { dispatch(actions.setTurn(turn)) },
            clickCell(cell, position: Position, moveInput: MoveInput, turn: number) {
                dispatch(actions.clickCell(cell, position, moveInput, turn))
            },
            clickHand(piece, position: Position, moveInput: MoveInput, turn: number) {
                dispatch(actions.clickHand(piece, position, moveInput, turn))
            },
            returnTheGame(theGame: Game, branchFrom: number) {
                dispatch(actions.returnTheGame(theGame, branchFrom))
            },
            selectPromote(promote: boolean, position: Position, moveInput: MoveInput, turn: number) {
                dispatch(actions.selectPromote(promote, position, moveInput, turn))
            }
        }
    }
}

const KentoApp = connect(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
