import { Game, Position } from "../lib/game"
import { MoveInput } from "../components/Kento"

export type Action = SetGameAction | SetTurnAction | ClickCellAction | ClickHandAction | ReturnTheGame

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
type ClickCellAction = { type: "click_cell", cell: cell, position: Position, moveInput: MoveInput, turn: number }
export function clickCell(cell: cell, position: Position, moveInput: MoveInput, turn: number) {
    return { type: "click_cell", cell, position, moveInput, turn }
}

type ClickHandAction = { type: "click_hand", piece: string, position: Position, moveInput: MoveInput, turn: number }
export function clickHand(piece: string, position: Position, moveInput: MoveInput, turn: number) {
    return { type: "click_hand", piece, position, moveInput, turn }
}

type ReturnTheGame = { type: "return_the_game", theGame: Game, branchFrom: number }
export function returnTheGame(theGame: Game, branchFrom: number) {
    return { type: "return_the_game", theGame, branchFrom }
}