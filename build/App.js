"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const KentoApp_1 = require("./container/KentoApp");
const reducers_1 = require("./reducers");
const actions_1 = require("./actions");
const App = ({ store }) => (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(KentoApp_1.default, null)));
function startGame(game, turn) {
    return initializeRender(game, turn);
}
exports.startGame = startGame;
function registerGame(subscribe, turn) {
    let store;
    subscribe(game => {
        if (!store) {
            store = initializeRender(game, turn);
        }
        else {
            store.dispatch(actions_1.setGame(game));
        }
    });
}
exports.registerGame = registerGame;
function initializeRender(game, turn) {
    let store = redux_1.createStore(reducers_1.reducers, {
        game,
        turn,
        turnsRead: game.maxTurn,
        moveInput: { state: 'selectingMoveFrom' },
        theGame: game,
        branchFrom: -1
    });
    ReactDOM.render(React.createElement(App, { store: store }), document.getElementById("main-board"));
    return store;
}
//# sourceMappingURL=App.js.map