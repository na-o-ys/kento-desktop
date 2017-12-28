import { Position } from "lib/Kifu"
import { MoveInput } from "components/Kento"
import * as AiAction from "actions/ai"
import { MoveInputActionType } from "actions/MoveInput"
export * from "actions/MoveInput"

export type Action = SetGameAction | SetTurnAction | ReturnTheGame |
    AiAction.UpdateInfoAction | MoveInputActionType

interface SetGameAction { type: "set_game", game: Position[] }
export function setGame(game: Position[]): Action {
    return { type: "set_game", game }
}

interface SetTurnAction { type: "set_turn", turn: number }
export function setTurn(turn: number): Action {
    return { type: "set_turn", turn }
}

interface ReturnTheGame { type: "return_the_game" }
export function returnTheGame() {
    return { type: "return_the_game" }
}
