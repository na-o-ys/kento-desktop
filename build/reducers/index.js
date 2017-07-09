"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const game_1 = require("../lib/game");
const KentoApp_1 = require("../container/KentoApp");
const Ai_1 = require("../lib/Ai");
const ShogiRule = require("../lib/ShogiRule");
function game(state = game_1.emptyGame, action) {
    switch (action.type) {
        case "set_game":
            return action.game;
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return doMove(state, action.position, Object.assign({}, action.moveInput, { moveTo: action.cell }), action.turn);
            }
            return state;
        case "select_promote":
            return doMove(state, action.position, Object.assign({}, action.moveInput, { promote: action.promote }), action.turn);
        case "return_the_game":
            return action.theGame;
        default:
            return state;
    }
}
function theGame(state = game_1.emptyGame, action) {
    return state;
}
function branchFrom(state = -1, action) {
    switch (action.type) {
        case "click_cell":
            if (state == -1 && matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return action.turn;
            }
            return state;
        case "select_promote":
            if (state == -1)
                return action.turn;
            return state;
        case "return_the_game":
            return -1;
        default:
            return state;
    }
}
function turn(state = 0, action) {
    switch (action.type) {
        case "set_turn":
            history.replaceState(null, "", `#${action.turn}`);
            return action.turn;
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return state + 1;
            }
            return state;
        case "select_promote":
            return state + 1;
        case "return_the_game":
            return action.branchFrom;
        default:
            return state;
    }
}
function turnsRead(state = 0, action) {
    switch (action.type) {
        case "set_turn":
            return Math.max(state, action.turn);
        default:
            return state;
    }
}
function moveInput(state = KentoApp_1.emptyMoveInput, action) {
    switch (action.type) {
        case "click_cell":
            if (matchDoMoveCondition(state, action.cell, action.position))
                return KentoApp_1.emptyMoveInput;
            switch (state.state) {
                case "selectingMoveFrom":
                    const piece = action.position.getPiece(action.cell);
                    if (isValidMoveFrom(action.cell, action.position)) {
                        return Object.assign({}, state, { state: "selectingMoveTo", moveFrom: action.cell, piece });
                    }
                    return KentoApp_1.emptyMoveInput;
                case "selectingMoveTo":
                    if (isValidMove(state, action.cell, action.position)) {
                        return Object.assign({}, state, { state: "selectingPromote", moveTo: action.cell });
                    }
                    return KentoApp_1.emptyMoveInput;
                default:
                    return KentoApp_1.emptyMoveInput;
            }
        case "click_hand":
            if (isValidMoveFromColor(action.piece, action.position)) {
                return Object.assign({}, KentoApp_1.emptyMoveInput, { state: "selectingMoveTo", fromHand: true, piece: action.piece });
            }
            return KentoApp_1.emptyMoveInput;
        case "set_turn":
        case "return_the_game":
        case "select_promote":
            return KentoApp_1.emptyMoveInput;
        default:
            return state;
    }
}
function aiInfo(state = Ai_1.emptyAiInfo, action) {
    switch (action.type) {
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return Ai_1.emptyAiInfo;
            }
            return state;
        case "select_promote":
            return Ai_1.emptyAiInfo;
        case "return_the_game":
            return Ai_1.emptyAiInfo;
        case "update_ai_info":
            return action.info;
        case "set_turn":
            return (action.turn != action.currentTurn) ? Ai_1.emptyAiInfo : state;
        default:
            return state;
    }
}
function positionChanged(state = false, action) {
    switch (action.type) {
        case "click_cell":
            if (matchDoMoveCondition(action.moveInput, action.cell, action.position)) {
                return true;
            }
            return false;
        case "select_promote":
            return true;
        case "return_the_game":
            return true;
        case "set_turn":
            return action.turn != action.currentTurn;
        default:
            return false;
    }
}
// TODO: React の型バグ
exports.reducers = redux_1.combineReducers({ game, turn, turnsRead, moveInput,
    theGame, branchFrom, aiInfo, positionChanged });
function isValidMoveFrom(cell, position) {
    const piece = position.getPiece(cell);
    return isValidMoveFromColor(position.getPiece(cell), position);
}
function isValidMoveFromColor(piece, position) {
    if (!piece)
        return false;
    return (position.nextColor == "b" && piece == piece.toUpperCase()) ||
        (position.nextColor == "w" && piece == piece.toLowerCase());
}
function matchDoMoveCondition(moveInput, clickedCell, position) {
    if (moveInput.state != "selectingMoveTo")
        return false;
    return !canPromote(moveInput, clickedCell, position.nextColor) &&
        isValidMove(moveInput, clickedCell, position);
}
function canPromote(moveInput, clickedCell, color) {
    const { piece } = moveInput;
    const canPromotePiece = ["l", "n", "s", "b", "r", "p"]
        .includes(moveInput.piece.toLowerCase());
    if (moveInput.fromHand || !canPromotePiece)
        return false;
    const isPromoteArea = (y) => ((color == "b" && y <= 3) || (color == "w" && y >= 7));
    return isPromoteArea(moveInput.moveFrom.y) || isPromoteArea(clickedCell.y);
}
function isValidMove(moveInput, clickedCell, position) {
    if (moveInput.fromHand) {
        return ShogiRule.getMovablesFromHand(moveInput.piece, position)
            .includes(clickedCell);
    }
    else {
        return ShogiRule.getMovablesFromCell(moveInput.moveFrom, position)
            .includes(clickedCell);
    }
}
function doMove(game, position, moveInput, turn) {
    // TODO: 実装
    // if (isCurrentGameMove(game, moveInput)) {
    //     return game
    // }
    const { kifu } = game;
    const newGame = game.branch(turn);
    newGame.appendMove({
        color: position.nextColor == "b" ? 0 : 1,
        from: moveInput.moveFrom,
        to: moveInput.moveTo,
        piece: moveInput.piece,
        promote: moveInput.promote
    });
    return newGame;
}
//# sourceMappingURL=index.js.map