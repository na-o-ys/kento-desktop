import { combineReducers } from "redux"
import * as _ from "lodash"
import { Position, Piece, emptyCell } from "lib/Kifu"
import { Action } from "actions"
import { MoveInput, EmptyMoveInput } from "components/Kento"
import { State } from "container/KentoApp"
import { AiInfo, EmptyAiInfo } from "lib/Ai"
import * as ShogiRule from "lib/ShogiRule"

function gameReducer(state: Position[], theGame: Position[], action: Action): Position[] {
    switch (action.type) {
        case "set_game":
            return action.game
        case "set_game_and_turn":
            return action.game
        case "do_move":
            return doMove(state, action.position, action.moveInput )
        case "return_the_game":
            return theGame
        default:
            return state
    }
}

function theGameReducer(state: Position[], action: Action): Position[] {
    return state
}

function branchFromReducer(state: number = -1, action: Action): number {
    switch (action.type) {
        case "do_move":
            if (state === -1) {
                return action.position.turn
            }
            return state
        case "return_the_game":
            return -1
        default:
            return state
    }
}

function turnReducer(state: number = 0, maxTurn: number, branchFrom: number, action: Action): number {
    switch (action.type) {
        case "set_turn":
            const nextTurn = Math.max(Math.min(action.turn, maxTurn), 0)
            history.replaceState(null, "", `#${nextTurn}`)
            return nextTurn
        case "set_game_and_turn":
            return action.turn
        case "do_move":
            return state + 1
        case "return_the_game":
            return branchFrom
        default:
            return state
    }
}

function moveInputReducer(state: MoveInput = EmptyMoveInput, action: Action): MoveInput {
    switch (action.type) {
        case "set_move_from":
            return {
                ...EmptyMoveInput,
                from: action.cell,
                piece: action.piece
            }
        case "set_move_from_hand":
            return {
                ...EmptyMoveInput,
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
            return EmptyMoveInput
        default:
            return state
    }
}

function aiInfoReducer(state: AiInfo = EmptyAiInfo, currentTurn: number, action: Action) {
    switch (action.type) {
        case "do_move":
            return EmptyAiInfo
        case "return_the_game":
            return EmptyAiInfo
        case "update_ai_info":
            return action.info
        case "set_turn":
            return (action.turn !== currentTurn) ? EmptyAiInfo : state
        default:
            return state
    }
}

function positionChangedReducer(state: boolean = false, currentTurn: number, action: Action) {
    switch (action.type) {
        case "do_move":
            return true
        case "return_the_game":
            return true
        case "set_turn":
            return action.turn !== currentTurn
        default:
            return false
    }
}

export function reducers(state: State, action: Action): State {
    let game = state.game
    if (action.type === "set_game" || action.type === "set_game_and_turn") {
        game = action.game
    }
    const latestPosition = _.last(game)
    const maxTurn = latestPosition ? latestPosition.turn : 0
    return {
        game: gameReducer(state.game, state.theGame, action),
        theGame: theGameReducer(state.theGame, action),
        turn: turnReducer(state.turn, maxTurn, state.branchFrom, action),
        moveInput: moveInputReducer(state.moveInput, action),
        branchFrom: branchFromReducer(state.branchFrom, action),
        positionChanged: positionChangedReducer(state.positionChanged, state.turn, action),
        aiInfo: aiInfoReducer(state.aiInfo, state.turn, action),
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
