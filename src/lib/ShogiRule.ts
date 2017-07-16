import { Position, Cell } from "./Kifu"
import * as _ from "lodash"

// TODO: 王手考慮
export function getMovablesFromCell(cell: Cell, position: Position): Movables {
    const piece = position.getPiece(cell)
    if (!piece) throw "pieceがnull"
    const color = (piece == piece.toLowerCase()) ? "w" : "b"
    switch (piece.toLowerCase()) {
        case "l":
            return getMovablesL(cell, position, color)
        case "n":
            return getMovablesN(cell, position, color)
        case "s":
            return getMovablesS(cell, position, color)
        case "g":
            return getMovablesG(cell, position, color)
        case "k":
            return getMovablesK(cell, position, color)
        case "b":
            return getMovablesB(cell, position, color)
        case "r":
            return getMovablesR(cell, position, color)
        case "p":
            return getMovablesP(cell, position, color)
        case "+l":
        case "+n":
        case "+s":
        case "+p":
            return getMovablesG(cell, position, color)
        case "+b":
            return getMovablesBp(cell, position, color)
        case "+r":
            return getMovablesRp(cell, position, color)
    }
    return new Movables([])
}

export function getMovablesFromHand(piece: string, position: Position): Movables {
    switch (piece.toLowerCase()) {
        case "n":
            return new Movables(getCanPutHandCells(2, position))
        case "l":
            return new Movables(getCanPutHandCells(1, position))
        case "p":
            return new Movables(getCanPutHandPawn(position))
        case "s":
        case "g":
        case "k":
        case "b":
        case "r":
        case "+l":
        case "+n":
        case "+s":
        case "+p":
        case "+b":
        case "+r":
            return new Movables(getCanPutHandCells(0, position))
    }
    return new Movables([])
}

export function canPromote(from: Cell, to: Cell, position: Position): boolean {
    const piece = position.getPiece(from)
    if (!piece) return false
    const canPromotePiece = ["l", "n", "s", "b", "r", "p"]
        .includes(piece.toLowerCase())
    if (!canPromotePiece) return false
    const isPromoteArea = (y: number) => ((position.nextColor == "b" && y <= 3) || (position.nextColor == "w" && y >= 7))
    return isPromoteArea(from.y) || isPromoteArea(to.y)
}

function getMovablesL(cell: Cell, position: Position, color: string): Movables {
    const movables = getStraightMovables(cell, position, color, { x: 0, y: dir(color) })
    return new Movables(movables)
}

function getMovablesN(cell: Cell, position: Position, color: string): Movables {
    const cells = [
        { x: cell.x - 1, y: cell.y + dir(color) * 2 },
        { x: cell.x + 1, y: cell.y + dir(color) * 2}
    ]
        .filter(c => canMove(c, position, color))
    return new Movables(cells)
}

function getMovablesP(cell: Cell, position: Position, color: string): Movables {
    const cells = [{ x: cell.x, y: cell.y + dir(color)}]
        .filter(c => canMove(c, position, color))
    return new Movables(cells)
}

function getMovablesG(cell: Cell, position: Position, color: string): Movables {
    const cells = [
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        { x: cell.x, y: cell.y - dir(color) },
        { x: cell.x - 1, y: cell.y + dir(color) },
        { x: cell.x + 1, y: cell.y + dir(color) },
        { x: cell.x, y: cell.y + dir(color) }
    ]
        .filter(c => canMove(c, position, color))
    return new Movables(cells)
}

function getMovablesS(cell: Cell, position: Position, color: string): Movables {
    const cells = [
        { x: cell.x - 1, y: cell.y + dir(color) },
        { x: cell.x + 1, y: cell.y + dir(color) },
        { x: cell.x, y: cell.y + dir(color) },
        { x: cell.x - 1, y: cell.y - dir(color) },
        { x: cell.x + 1, y: cell.y - dir(color) }
    ]
        .filter(c => canMove(c, position, color))
    return new Movables(cells)
}

function getMovablesK(cell: Cell, position: Position, color: string): Movables {
    const cells = [
        { x: cell.x - 1, y: cell.y - 1 },
        { x: cell.x, y: cell.y - 1 },
        { x: cell.x + 1, y: cell.y - 1 },
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        { x: cell.x - 1, y: cell.y + 1 },
        { x: cell.x, y: cell.y + 1 },
        { x: cell.x + 1, y: cell.y + 1 }
    ]
        .filter(c => canMove(c, position, color))
    return new Movables(cells)
}

function getMovablesB(cell: Cell, position: Position, color: string): Movables {
    const dirs = [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }]
    return new Movables(_.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir))))
}

function getMovablesR(cell: Cell, position: Position, color: string): Movables {
    const dirs = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
    return new Movables(_.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir))))
}

function getMovablesBp(cell: Cell, position: Position, color: string): Movables {
    const dirs = [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }]
    let movables = _.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir)))
    movables = movables.concat(
        [
            { x: cell.x, y: cell.y + 1 },
            { x: cell.x, y: cell.y - 1 },
            { x: cell.x - 1, y: cell.y },
            { x: cell.x + 1, y: cell.y }
        ]
            .filter(c => canMove(c, position, color))
    )
    return new Movables(movables)
}

function getMovablesRp(cell: Cell, position: Position, color: string): Movables {
    const dirs = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
    let movables = _.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir)))
    movables = movables.concat(
        [
            { x: cell.x + 1, y: cell.y + 1},
            { x: cell.x + 1, y: cell.y - 1 },
            { x: cell.x - 1, y: cell.y + 1 },
            { x: cell.x - 1, y: cell.y - 1 }
        ]
            .filter(c => canMove(c, position, color))
    )
    return new Movables(movables)
}

function getCanPutHandCells(rankBound: number, position: Position): Cell[] {
    const yLow = position.nextColor == "b" ? 1 + rankBound : 1
    const yHigh = position.nextColor == "b" ? 9 : 9 - rankBound
    let movables: Cell[] = []
    for (let x = 1; x <= 9; x++) {
        for (let y = yLow; y <= yHigh; y++) {
            if (position.getPiece({ x, y }) == null) {
                movables.push({ x, y })
            }
        }
    }
    return movables
}

function getCanPutHandPawn(position: Position): Cell[] {
    const yLow = position.nextColor == "b" ? 2 : 1
    const yHigh = position.nextColor == "b" ? 9 : 8
    const selfPawn = position.nextColor == "b" ? "P" : "p"
    let cells: Cell[] = []
    for (const x of _.range(1, 9)) {
        const fileCells: Cell[] = []
        let cantPut = false
        for (const y of _.range(yLow, yHigh + 1)) {
            const piece = position.getPiece({ x, y })
            if (piece == selfPawn) cantPut = true
            if (piece == null) {
                fileCells.push({ x, y })
            }
        }
        if (!cantPut) cells = cells.concat(fileCells)
    }
    return cells
}

function getStraightMovables(cell: Cell, position: Position, color: string, dir: Cell): Cell[] {
    let movables: Cell[] = []
    let i = 1
    while (true) {
        const nCell = { x: cell.x + dir.x * i, y: cell.y + dir.y * i }
        if (!validBoundCell(nCell) || isSelfPiece(nCell, position, color)) {
            break
        }
        movables.push(nCell)
        if (isSelfPiece(nCell, position, (color == "b") ? "w" : "b")) {
            break
        }
        i += 1
    }
    return movables
}

function isSelfPiece(cell: Cell, position: Position, color: string): boolean {
    const piece = position.getPiece(cell)
    return !!piece && (piece.toLowerCase() == piece) == (color == "w")
}

function dir(color: string): number {
    return color == "b" ? -1 : 1
}

function validBoundCell(cell: Cell) {
    return cell.x >= 1 && cell.x <= 9 && cell.y >= 1 && cell.y <= 9
}

function canMove(cell: Cell, position: Position, color: string): boolean {
    return cell.x >= 1 && cell.x <= 9 && cell.y >= 1 && cell.y <= 9 &&
        !isSelfPiece(cell, position, color)
}

export class Movables {
    movables: number[]
    constructor(movables: Cell[]) {
        this.movables = movables.map(cell => this.encode(cell))
    }

    push(cell: Cell) {
        this.movables.push(this.encode(cell))
    }

    includes(cell: Cell): boolean {
        return this.movables.includes(this.encode(cell))
    }

    private encode(cell: Cell): number {
        return (cell.y - 1) * 9 + 9 - cell.x
    }
}
