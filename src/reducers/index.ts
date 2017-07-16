import { combineReducers } from "redux"
import * as _ from "lodash"
import { Position, Piece, emptyCell } from "../lib/Kifu"
import { Action } from "../actions"
import { MoveInput, emptyMoveInput } from "../components/Kento"
import { State } from "../container/KentoApp"
import { AiInfo, emptyAiInfo } from "../lib/Ai"
import * as ShogiRule from "../lib/ShogiRule"

function game(state: Position[], theGame: Position[], action: Action): Position[] {
    switch (action.type) {
        case "set_game":
            return action.game
        case "do_move":
            return doMove(state, action.position, action.moveInput )
        case "return_the_game":
            return theGame
        default:
            return state
    }
}

function theGame(state: Position[], action: Action): Position[] {
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

function turn(state: number = 0, maxTurn: number, branchFrom: number, action: Action): number {
    switch (action.type) {
        case "set_turn":
            const nextTurn = Math.max(Math.min(action.turn, maxTurn), 0)
            history.replaceState(null, "", `#${nextTurn}`)
            return nextTurn
        case "do_move":
            return state + 1
        case "return_the_game":
            return branchFrom
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
        case "clear_move_input":
        case "set_turn":
        case "return_the_game":
        case "do_move":
            return emptyMoveInput
        default:
            return state
    }
}

function aiInfo(state: AiInfo = emptyAiInfo, currentTurn: number, action: Action) {
    switch (action.type) {
        case "do_move":
            return emptyAiInfo
        case "return_the_game":
            return emptyAiInfo
        case "update_ai_info":
            return action.info
        case "set_turn":
            return (action.turn != currentTurn) ? emptyAiInfo : state
        default:
            return state
    }
}

function positionChanged(state: boolean = false, currentTurn: number, action: Action) {
    switch (action.type) {
        case "do_move":
            return true
        case "return_the_game":
            return true
        case "set_turn":
            return action.turn != currentTurn
        default:
            return false
    }
}

export function reducers(state: State, action: Action) {
    const latestPosition = _.last(state.game)
    const maxTurn = latestPosition ? latestPosition.turn : 0
    return {
        game: game(state.game, state.theGame, action),
        theGame: theGame(state.theGame, action),
        turn: turn(state.turn, maxTurn, state.branchFrom, action),
        turnsRead: turnsRead(state.turnsRead, action),
        moveInput: moveInput(state.moveInput, action),
        branchFrom: branchFrom(state.branchFrom, action),
        positionChanged: positionChanged(state.positionChanged, state.turn, action),
        aiInfo: aiInfo(state.aiInfo, state.turn, action),
    }
}

function doMove(game: Position[], position: Position, moveInput: MoveInput): Position[] {
    const newGame = _.cloneDeep(game.slice(0, position.turn + 1))
    // TODO: 例外
    newGame.push(position.move({
        from: moveInput.from || null,
        to: moveInput.to || emptyCell,
        piece: moveInput.piece || null,
        promote: !!moveInput.promote
    }))
    return newGame
}
