import { connect } from "react-redux"
import { Kento, MoveInput } from "../components/Kento"
import * as actions from "../actions"
import { Dispatch } from "redux"
import { Game, Position } from "../lib/game"

export const emptyMoveInput: MoveInput = {
    state: "selectingMoveFrom"
}

export type State = {
    game: Game,
    turn: number,
    turnsRead: number,
    moveInput: MoveInput
}

function mapStateToProps(state: State) {
    return {
        game: state.game,
        turn: state.turn,
        moveInput: state.moveInput
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        control: {
            setTurn(turn) { dispatch(actions.setTurn(turn)) },
            clickCell(cell, position: Position, moveInput: MoveInput) { dispatch(actions.clickCell(cell, position, moveInput)) },
            clickHand(piece, position: Position, moveInput) { dispatch(actions.clickHand(piece, position, moveInput)) }
        }
    }
}

const KentoApp = connect(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
