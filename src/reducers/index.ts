import { combineReducers } from "redux"
import { Game, emptyGame, Position } from "../lib/game"
import { Action } from "../actions"
import { MoveInput, emptyMoveInput } from "../components/Kento"
import { State } from "../container/KentoApp"
import { AiInfo, emptyAiInfo } from "../lib/Ai"
import * as ShogiRule from "../lib/ShogiRule"

function game(state: Game = emptyGame, action: Action): Game {
    switch (action.type) {
        case "set_game":
            return action.game
        case "do_move":
            return doMove(state, action.position, action.moveInput )
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
        case "do_move":
            if (state == -1) {
                return action.position.turn
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
        case "do_move":
            return state + 1
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
        case "set_move_from":
            return {
                ...emptyMoveInput,
                from: action.cell,
                piece: action.piece
            }
        case "set_move_from_hand":
            return {
                ...emptyMoveInput,
                fromHand: true,
                piece: action.piece
            }
        case "set_move_to":
            return {
                ...state,
                to: action.cell
            }
        case "set_promote":
            return {
                ...state,
                promote: action.promote
            }
        case "set_turn":
        case "return_the_game":
        case "do_move":
            return emptyMoveInput
        default:
            return state
    }
}

function aiInfo(state: AiInfo = emptyAiInfo, action: Action) {
    switch (action.type) {
        case "do_move":
            return emptyAiInfo
        case "return_the_game":
            return emptyAiInfo
        case "update_ai_info":
            return action.info
        case "set_turn":
            return (action.turn != action.currentTurn) ? emptyAiInfo : state
        default:
            return state
    }
}

function positionChanged(state: boolean = false, action: Action) {
    switch (action.type) {
        case "do_move":
            return true
        case "return_the_game":
            return true
        case "set_turn":
            return action.turn != action.currentTurn
        default:
            return false
    }
}

// TODO: React の型バグ
export const reducers = combineReducers<State>({ game, turn, turnsRead, moveInput,
    theGame, branchFrom, aiInfo, positionChanged } as any)


function doMove(game: Game, position: Position, moveInput: MoveInput): Game {
    // TODO: 実装
    // if (isCurrentGameMove(game, moveInput)) {
    //     return game
    // }
    const { kifu } = game
    const newGame = game.branch(position.turn)
    newGame.appendMove({
        color: position.nextColor == "b" ? 0 : 1,
        from: moveInput.from,
        to: moveInput.to,
        piece: moveInput.piece,
        promote: moveInput.promote
    })
    return newGame
}

interface Cell {
    x: number
    y: number
}
