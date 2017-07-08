import { combineReducers } from "redux"
import { Game, emptyGame, Position } from "../lib/game"
import { Action } from "../actions"
import { MoveInput } from "../components/Kento"
import { State, emptyMoveInput } from "../container/KentoApp"
import * as ShogiRule from "../lib/ShogiRule"

function game(state: Game = emptyGame, action: Action): Game {
    switch (action.type) {
        case "set_game":
            return action.game
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return doMove(state, action.position, { ...action.moveInput, moveTo: action.cell }, action.turn)
            }
            return state
        case "return_the_game":
            return action.theGame
        default:
            return state
    }
}

function theGame(state: Game = emptyGame, action: Action): Game {
    return state
}

function branchFrom(state: number = -1, action: Action): number {
    switch (action.type) {
        case "click_cell":
            if (state == -1 && matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return action.turn
            }
            return state
        case "return_the_game":
            return -1
        default:
            return state
    }
}

function turn(state: number = 0, action: Action): number {
    switch (action.type) {
        case "set_turn":
            history.replaceState(null, "", `#${action.turn}`)
            return action.turn
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return state + 1
            }
            return state
        case "return_the_game":
            return action.branchFrom
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
            if (matchDoMoveCondition(state, action.cell, action.position)) return emptyMoveInput
            switch (state.state) {
                case "selectingMoveFrom":
                    const piece = action.position.getPiece(action.cell)
                    if (isValidMoveFrom(action.cell, action.position)) {
                        return {
                            ...state,
                            state: "selectingMoveTo",
                            moveFrom: action.cell,
                            piece
                        }
                    }
                    return emptyMoveInput
                case "selectingMoveTo":
                    if (isValidMove(state, action.cell, action.position)) {
                        return { ...state, state: "selectingPromote", moveTo: action.cell }
                    }
                    return emptyMoveInput
                default:
                    return emptyMoveInput
            }
        case "click_hand":
            if (isValidMoveFromColor(action.piece, action.position)) {
                return {
                    ...emptyMoveInput,
                    state: "selectingMoveTo",
                    fromHand: true,
                    piece: action.piece
                }
            }
            return emptyMoveInput
        case "set_turn":
        case "return_the_game":
            return emptyMoveInput
        default:
            return state
    }
}

// TODO: React の型バグ
export const reducers = combineReducers<State>({ game, turn, turnsRead, moveInput, theGame, branchFrom } as any)

function isValidMoveFrom(cell: Cell, position: Position): boolean {
    const piece = position.getPiece(cell)
    return isValidMoveFromColor(position.getPiece(cell), position)
}

function isValidMoveFromColor(piece: string, position: Position): boolean {
    if (!piece) return false
    return (position.nextColor == "b" && piece == piece.toUpperCase()) ||
        (position.nextColor == "w" && piece == piece.toLowerCase())
}

function matchDoMoveCondition(moveInput: MoveInput, clickedCell: Cell, position: Position): boolean {
    if (moveInput.state != "selectingMoveTo") return false
    return !canPromote(moveInput, clickedCell, position.nextColor) && isValidMove(moveInput, clickedCell, position)
}

function canPromote(moveInput: MoveInput, clickedCell: Cell, color: string): boolean {
    const { piece } = moveInput
    const canPromotePiece = ["l", "n", "s", "b", "r", "p"]
        .includes(moveInput.piece.toLowerCase())
    if (!canPromotePiece) return false
    return (color == "b" && clickedCell.y <= 3) || (color == "w" && clickedCell.y >= 7)
}

function isValidMove(moveInput: MoveInput, clickedCell: Cell, position: Position): boolean {
    if (moveInput.fromHand) {
        return ShogiRule.getMovablesFromHand(moveInput.piece, position)
            .includes(clickedCell)
    } else {
        return ShogiRule.getMovablesFromCell(moveInput.moveFrom, position)
            .includes(clickedCell)
    }
}

function doMove(game: Game, position: Position, moveInput: MoveInput, turn: number): Game {
    // TODO: 実装
    // if (isCurrentGameMove(game, moveInput)) {
    //     return game
    // }
    const { kifu } = game
    const newGame = game.branch(turn)
    newGame.appendMove({
        color: position.nextColor == "b" ? 0 : 1,
        from: moveInput.moveFrom,
        to: moveInput.moveTo,
        piece: moveInput.piece,
        promote: moveInput.promote
    })
    console.log("doMove")
    return newGame
}

interface Cell {
    x: number
    y: number
}