import { Position, Cell } from "../lib/game"
import { MoveInput } from "../components/Kento"

export type MoveInputActionType = SetMoveFromAction | SetMoveToAction |
    SetPromoteAction | SetMoveFromHandAction | DoMoveAction

interface SetMoveFromAction {
    type: "set_move_from"
    cell: Cell
    piece: string
}
export function setMoveFrom(cell: Cell, piece: string): SetMoveFromAction {
    return { type: "set_move_from", cell, piece }
}

interface SetMoveFromHandAction {
    type: "set_move_from_hand"
    piece: string
}
export function setMoveFromHand(piece: string): SetMoveFromHandAction {
    return { type: "set_move_from_hand", piece }
}

interface SetMoveToAction {
    type: "set_move_to"
    cell: Cell
}
export function setMoveTo(cell: Cell): SetMoveToAction {
    return { type: "set_move_to", cell }
}

interface SetPromoteAction {
    type: "set_promote"
    promote: boolean
}
export function setPromote(promote: boolean): SetPromoteAction {
    return { type: "set_promote", promote }
}

interface DoMoveAction {
    type: "do_move"
    moveInput: MoveInput
    position: Position
}
export function doMove(moveInput: MoveInput, position: Position): DoMoveAction {
    return { type: "do_move", moveInput, position }
}
