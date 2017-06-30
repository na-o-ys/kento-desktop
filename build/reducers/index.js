"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const actions_1 = require("../actions");
const game_1 = require("../lib/game");
function game(state = game_1.emptyGame, action) {
    switch (action.type) {
        case actions_1.SET_GAME:
            return action.game;
        default:
            return state;
    }
}
function turn(state = 0, action) {
    switch (action.type) {
        case actions_1.SET_TURN:
            history.replaceState(null, "", `#${action.turn}`);
            return action.turn;
        default:
            return state;
    }
}
function turnsRead(state = 0, action) {
    switch (action.type) {
        case actions_1.SET_TURN:
            return Math.max(state, action.turn);
        default:
            return state;
    }
}
// TODO: React の型バグ
exports.reducers = redux_1.combineReducers({ game, turn, turnsRead });
//# sourceMappingURL=index.js.map