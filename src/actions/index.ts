import { Game, Position } from "../lib/game"
import { MoveInput } from "../components/Kento"
import * as AiAction from "./ai"
import { MoveInputActionType } from "./MoveInput"
export * from "./MoveInput"

export type Action = SetGameAction | SetTurnAction | ReturnTheGame |
    AiAction.UpdateInfoAction | MoveInputActionType

type SetGameAction = { type: "set_game", game: Game }
export function setGame(game: Game): Action {
    return { type: "set_game", game }
}

type SetTurnAction = { type: "set_turn", turn: number, currentTurn: number }
export function setTurn(turn: number, currentTurn): Action {
    return { type: "set_turn", turn, currentTurn }
}

type ReturnTheGame = { type: "return_the_game", theGame: Game, branchFrom: number }
export function returnTheGame(theGame: Game, branchFrom: number) {
    return { type: "return_the_game", theGame, branchFrom }
}
