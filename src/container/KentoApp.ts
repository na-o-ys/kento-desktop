import { connect } from "react-redux"
import { Kento } from "../components/Kento"
import { setTurn } from "../actions"
import { Dispatch } from "redux"
import { Game } from "../lib/game"

interface SelectingMoveFrom {
    state: 'selectingMoveFrom'
}

interface SelectingMoveTo {
    state: 'selectingMoveTo',
    moveFrom: {
        x: number,
        y: number
    } | 'hand',
    piece: string
}

interface SelectingPromote {
    state: 'selectingPromote',
    moveFrom: {
        x: number,
        y: number
    } | 'hand',
    piece: string,
    moveTo: {
        x: number,
        y: number
    },
    promote: boolean
}

export interface MoveInputt {
    state: "selectingMoveFrom" | "selectingMoveTo" | "selectingPromote",
    moveFrom: {
        x: number,
        y: number
    } | 'hand',
    piece: string,
    moveTo: {
        x: number,
        y: number
    },
    promote: boolean
}

export type MoveInput = SelectingMoveFrom | SelectingMoveTo | SelectingPromote

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
            setTurn(turn) { dispatch(setTurn(turn)) }
        }
    }
}

const KentoApp = connect(mapStateToProps, mapDispatchToProps)(Kento)

export default KentoApp
