import { Game } from "../lib/game"
import { Position } from "../lib/Kifu"
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

type SetTurnAction = { type: "set_turn", turn: number }
export function setTurn(turn: number): Action {
    return { type: "set_turn", turn }
}

type ReturnTheGame = { type: "return_the_game" }
export function returnTheGame() {
    return { type: "return_the_game" }
}
