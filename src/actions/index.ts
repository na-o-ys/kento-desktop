import { Game, Position } from "../lib/game"
import { MoveInput } from "../container/KentoApp"

export type Action = SetGameAction | SetTurnAction | ClickCellAction | ClickHandAction

type SetGameAction = { type: "set_game", game: Game }
export function setGame(game: Game): Action {
    return { type: "set_game", game }
}

type SetTurnAction = { type: "set_turn", turn: number }
export function setTurn(turn: number): Action {
    return { type: "set_turn", turn }
}

interface cell {
    x: number,
    y: number
}
type ClickCellAction = { type: "click_cell", cell: cell, position: Position, moveInput: MoveInput }
export function clickCell(cell: cell, position: Position, moveInput: MoveInput) {
    return { type: "click_cell", cell, position, moveInput }
}

type ClickHandAction = { type: "click_hand", piece: string, moveInput: MoveInput }
export function clickHand(piece: string, moveInput: MoveInput) {
    return { type: "click_hand", piece, moveInput }
}
