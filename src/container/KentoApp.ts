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
    moveInput: MoveInput,
    theGame: Game,
    isBranch: boolean
}

function mapStateToProps(state: State) {
    return {
        game: state.game,
        turn: state.turn,
        moveInput: state.moveInput,
        theGame: state.theGame
    }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
    return {
        control: {
            setTurn(turn) { dispatch(actions.setTurn(turn)) },
            clickCell(cell, position: Position, moveInput: MoveInput, turn: number) {
                dispatch(actions.clickCell(cell, position, moveInput, turn))
            },
            clickHand(piece, position: Position, moveInput, turn: number) {
                dispatch(actions.clickHand(piece, position, moveInput, turn))
            },
            returnTheGame(theGame: Game) {
                dispatch(actions.returnTheGame(theGame))
            }
        }
    }
}

const KentoApp = connect(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
