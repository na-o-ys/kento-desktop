import { combineReducers } from "redux"
import { Game, emptyGame, Position } from "../lib/game"
import { Action } from "../actions"
import { State, MoveInput } from "../container/KentoApp"

function game(state: Game = emptyGame, action: Action): Game {
    switch (action.type) {
        case "set_game":
            return action.game
        case "click_cell":
            switch (action.moveInput.state) {
                case "selectingMoveTo":

                case "selectingPromote":
            }
        default:
            return state
    }
}

function turn(state: number = 0, action: Action): number {
    switch (action.type) {
        case "set_turn":
            history.replaceState(null, "", `#${action.turn}`)
            return action.turn
        default:
            return state
    }
}

function turnsRead(state: number = 0, action: Action): number {
    switch (action.type) {
        case "set_turn":
            return Math.max(state, action.turn)
        default:
            return state
    }
}

function moveInput(state: MoveInput, action: Action): MoveInput {
    switch (action.type) {
        case "click_cell":
            return processClickCell(state, action.cell, action.position)
        case "click_hand":
            return processClickHand(state, action.piece)
        default:
            return state
    }
}

function processClickCell(moveInput: MoveInput, cell: { x: number, y: number }, position: Position): MoveInput {
    switch (moveInput.state) {
        case "selectingMoveFrom":
            const piece = position.cells[(cell.y - 1) * 9 + 9 - cell.x]
            console.log(piece)
            // game.position
    }
}

function processClickHand(moveInput: MoveInput, piece: string): MoveInput {

}

// TODO: React の型バグ
export const reducers = combineReducers<State>({ game, turn, turnsRead } as any)
