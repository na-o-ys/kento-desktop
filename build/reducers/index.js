"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Kifu_1 = require("../lib/Kifu");
const Kento_1 = require("../components/Kento");
const Ai_1 = require("../lib/Ai");
function game(state, theGame, action) {
    switch (action.type) {
        case "set_game":
            return action.game;
        case "do_move":
            return doMove(state, action.position, action.moveInput);
        case "return_the_game":
            return theGame;
        default:
            return state;
    }
}
function theGame(state, action) {
    return state;
}
function branchFrom(state = -1, action) {
    switch (action.type) {
        case "do_move":
            if (state == -1) {
                return action.position.turn;
            }
            return state;
        case "return_the_game":
            return -1;
        default:
            return state;
    }
}
function turn(state = 0, maxTurn, branchFrom, action) {
    switch (action.type) {
        case "set_turn":
            const nextTurn = Math.max(Math.min(action.turn, maxTurn), 0);
            history.replaceState(null, "", `#${nextTurn}`);
            return nextTurn;
        case "do_move":
            return state + 1;
        case "return_the_game":
            return branchFrom;
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
function moveInput(state = Kento_1.emptyMoveInput, action) {
    switch (action.type) {
        case "set_move_from":
            return Object.assign({}, Kento_1.emptyMoveInput, { from: action.cell, piece: action.piece });
        case "set_move_from_hand":
            return Object.assign({}, Kento_1.emptyMoveInput, { fromHand: true, piece: action.piece });
        case "set_move_to":
            return Object.assign({}, state, { to: action.cell });
        case "set_promote":
            return Object.assign({}, state, { promote: action.promote });
        case "set_turn":
        case "return_the_game":
        case "do_move":
            return Kento_1.emptyMoveInput;
        default:
            return state;
    }
}
function aiInfo(state = Ai_1.emptyAiInfo, currentTurn, action) {
    switch (action.type) {
        case "do_move":
            return Ai_1.emptyAiInfo;
        case "return_the_game":
            return Ai_1.emptyAiInfo;
        case "update_ai_info":
            return action.info;
        case "set_turn":
            return (action.turn != currentTurn) ? Ai_1.emptyAiInfo : state;
        default:
            return state;
    }
}
function positionChanged(state = false, currentTurn, action) {
    switch (action.type) {
        case "do_move":
            return true;
        case "return_the_game":
            return true;
        case "set_turn":
            return action.turn != currentTurn;
        default:
            return false;
    }
}
function reducers(state, action) {
    const latestPosition = _.last(state.game);
    const maxTurn = latestPosition ? latestPosition.turn : 0;
    return {
        game: game(state.game, state.theGame, action),
        theGame: theGame(state.theGame, action),
        turn: turn(state.turn, maxTurn, state.branchFrom, action),
        turnsRead: turnsRead(state.turnsRead, action),
        moveInput: moveInput(state.moveInput, action),
        branchFrom: branchFrom(state.branchFrom, action),
        positionChanged: positionChanged(state.positionChanged, state.turn, action),
        aiInfo: aiInfo(state.aiInfo, state.turn, action),
    };
}
exports.reducers = reducers;
function doMove(game, position, moveInput) {
    const newGame = _.cloneDeep(game.slice(0, position.turn + 1));
    // TODO: 例外
    newGame.push(position.move({
        from: moveInput.from || null,
        to: moveInput.to || Kifu_1.emptyCell,
        piece: moveInput.piece || null,
        promote: !!moveInput.promote
    }));
    return newGame;
}
//# sourceMappingURL=index.js.map