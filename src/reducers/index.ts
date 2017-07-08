import { combineReducers } from "redux"
import { Game, emptyGame, Position } from "../lib/game"
import { Action } from "../actions"
import { MoveInput } from "../components/Kento"
import { State, emptyMoveInput } from "../container/KentoApp"

function game(state: Game = emptyGame, action: Action): Game {
    switch (action.type) {
        case "set_game":
            return action.game
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell)) {
                return doMove(state, action.moveInput, action.cell)
            }
            return state
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

function moveInput(state: MoveInput = emptyMoveInput, action: Action): MoveInput {
    switch (action.type) {
        case "click_cell":
            if (matchDoMoveCondition(state, action.cell)) return emptyMoveInput
            switch (state.state) {
                case "selectingMoveFrom":
                    if (isValidMoveFrom(action.cell, action.position)) {
                        return { ...state, state: "selectingMoveTo", moveFrom: action.cell }
                    }
                    return emptyMoveInput
                case "selectingMoveTo":
                    if (isValidMove(state, action.cell)) {
                        return { ...state, state: "selectingPromote", moveTo: action.cell }
                    }
                    return state
                default:
                    return state
            }
        case "click_hand":
            if (isValidMoveFromHand(action.piece, action.position)) {
                return {
                    ...emptyMoveInput,
                    state: "selectingMoveTo",
                    fromHand: true,
                    piece: action.piece
                }
            }
            return emptyMoveInput
        default:
            return state
    }
}

// TODO: React の型バグ
export const reducers = combineReducers<State>({ game, turn, turnsRead, moveInput } as any)


// TODO: 実装
function isValidMoveFrom(cell: { x: number, y: number }, position: Position): boolean {
    return true
}

// TODO: 実装
function isValidMoveFromHand(piece: string, position: Position): boolean {
    return true
}

function matchDoMoveCondition(moveInput: MoveInput, clickedCell: { x: number, y: number }): boolean {
    if (moveInput.state != "selectingMoveTo") return false
    return !canPromote(moveInput, clickedCell) && isValidMove(moveInput, clickedCell)
}

// TODO: 実装
function canPromote(moveInput: MoveInput, clickedCell: { x: number, y: number }): boolean {
    return false
}

// TODO: 実装
function isValidMove(moveInput: MoveInput, clickedCell: { x: number, y: number }): boolean {
    return true
}

// TODO: 実装
function doMove(game: Game, moveInput: MoveInput, clickedCell: { x: number, y: number }): Game {
    console.log("doMove")
    console.log(clickedCell)
    return game
}