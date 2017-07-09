"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
// TODO: 王手考慮
function getMovablesFromCell(cell, position) {
    const piece = position.getPiece(cell);
    if (!piece)
        throw "pieceがnull";
    const color = (piece == piece.toLowerCase()) ? "w" : "b";
    switch (piece.toLowerCase()) {
        case "l":
            return getMovablesL(cell, position, color);
        case "n":
            return getMovablesN(cell, position, color);
        case "s":
            return getMovablesS(cell, position, color);
        case "g":
            return getMovablesG(cell, position, color);
        case "k":
            return getMovablesK(cell, position, color);
        case "b":
            return getMovablesB(cell, position, color);
        case "r":
            return getMovablesR(cell, position, color);
        case "p":
            return getMovablesP(cell, position, color);
        case "+l":
        case "+n":
        case "+s":
        case "+p":
            return getMovablesG(cell, position, color);
        case "+b":
            return getMovablesBp(cell, position, color);
        case "+r":
            return getMovablesRp(cell, position, color);
    }
    return new Movables([]);
}
exports.getMovablesFromCell = getMovablesFromCell;
// TODO: 二歩の解消
function getMovablesFromHand(piece, position) {
    switch (piece.toLowerCase()) {
        case "n":
            return new Movables(getCanPutHandCells(2, position));
        case "l":
        case "p":
            return new Movables(getCanPutHandCells(1, position));
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
            return new Movables(getCanPutHandCells(0, position));
    }
    return new Movables([]);
}
exports.getMovablesFromHand = getMovablesFromHand;
function getMovablesL(cell, position, color) {
    const movables = getStraightMovables(cell, position, color, { x: 0, y: dir(color) });
    return new Movables(movables);
}
function getMovablesN(cell, position, color) {
    const cells = [
        { x: cell.x - 1, y: cell.y + dir(color) * 2 },
        { x: cell.x + 1, y: cell.y + dir(color) * 2 }
    ]
        .filter(c => canMove(c, position, color));
    return new Movables(cells);
}
function getMovablesP(cell, position, color) {
    const cells = [{ x: cell.x, y: cell.y + dir(color) }]
        .filter(c => canMove(c, position, color));
    return new Movables(cells);
}
function getMovablesG(cell, position, color) {
    const cells = [
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y },
        { x: cell.x, y: cell.y - dir(color) },
        { x: cell.x - 1, y: cell.y + dir(color) },
        { x: cell.x + 1, y: cell.y + dir(color) },
        { x: cell.x, y: cell.y + dir(color) }
    ]
        .filter(c => canMove(c, position, color));
    return new Movables(cells);
}
function getMovablesS(cell, position, color) {
    const cells = [
        { x: cell.x - 1, y: cell.y + dir(color) },
        { x: cell.x + 1, y: cell.y + dir(color) },
        { x: cell.x, y: cell.y + dir(color) },
        { x: cell.x - 1, y: cell.y - dir(color) },
        { x: cell.x + 1, y: cell.y - dir(color) }
    ]
        .filter(c => canMove(c, position, color));
    return new Movables(cells);
}
function getMovablesK(cell, position, color) {
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
        .filter(c => canMove(c, position, color));
    return new Movables(cells);
}
function getMovablesB(cell, position, color) {
    const dirs = [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }];
    return new Movables(_.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir))));
}
function getMovablesR(cell, position, color) {
    const dirs = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
    return new Movables(_.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir))));
}
function getMovablesBp(cell, position, color) {
    const dirs = [{ x: -1, y: -1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: 1, y: 1 }];
    let movables = _.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir)));
    movables = movables.concat([
        { x: cell.x, y: cell.y + 1 },
        { x: cell.x, y: cell.y - 1 },
        { x: cell.x - 1, y: cell.y },
        { x: cell.x + 1, y: cell.y }
    ]
        .filter(c => canMove(c, position, color)));
    return new Movables(movables);
}
function getMovablesRp(cell, position, color) {
    const dirs = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
    let movables = _.flatten(dirs.map(dir => getStraightMovables(cell, position, color, dir)));
    movables = movables.concat([
        { x: cell.x + 1, y: cell.y + 1 },
        { x: cell.x + 1, y: cell.y - 1 },
        { x: cell.x - 1, y: cell.y + 1 },
        { x: cell.x - 1, y: cell.y - 1 }
    ]
        .filter(c => canMove(c, position, color)));
    return new Movables(movables);
}
function getCanPutHandCells(rankBound, position) {
    const yLow = position.nextColor == "b" ? 1 + rankBound : 1;
    const yHigh = position.nextColor == "b" ? 9 : 9 - rankBound;
    let movables = [];
    for (let x = 1; x <= 9; x++) {
        for (let y = yLow; y <= yHigh; y++) {
            if (position.getPiece({ x, y }) == null) {
                movables.push({ x, y });
            }
        }
    }
    return movables;
}
function getStraightMovables(cell, position, color, dir) {
    let movables = [];
    let i = 1;
    while (true) {
        const nCell = { x: cell.x + dir.x * i, y: cell.y + dir.y * i };
        if (!validBoundCell(nCell) || isSelfPiece(nCell, position, color)) {
            break;
        }
        movables.push(nCell);
        if (isSelfPiece(nCell, position, (color == "b") ? "w" : "b")) {
            break;
        }
        i += 1;
    }
    return movables;
}
function isSelfPiece(cell, position, color) {
    const piece = position.getPiece(cell);
    return piece && (piece.toLowerCase() == piece) == (color == "w");
}
function dir(color) {
    return color == "b" ? -1 : 1;
}
function validBoundCell(cell) {
    return cell.x >= 1 && cell.x <= 9 && cell.y >= 1 && cell.y <= 9;
}
function canMove(cell, position, color) {
    return cell.x >= 1 && cell.x <= 9 && cell.y >= 1 && cell.y <= 9 &&
        !isSelfPiece(cell, position, color);
}
class Movables {
    constructor(movables) {
        this.movables = movables.map(cell => this.encode(cell));
    }
    push(cell) {
        this.movables.push(this.encode(cell));
    }
    includes(cell) {
        return this.movables.includes(this.encode(cell));
    }
    encode(cell) {
        return (cell.y - 1) * 9 + 9 - cell.x;
    }
}
exports.Movables = Movables;
//# sourceMappingURL=ShogiRule.js.map