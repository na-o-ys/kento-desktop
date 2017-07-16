"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const KentoApp_1 = require("./container/KentoApp");
const reducers_1 = require("./reducers");
const actions_1 = require("./actions");
const Ai_1 = require("./lib/Ai");
const Kento_1 = require("./components/Kento");
const App = ({ store, ai }) => (React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(KentoApp_1.default, { ai: ai })));
function startGame(game, turn, useAi = true) {
    return initializeRender(game, turn, useAi);
}
exports.startGame = startGame;
function registerGame(subscribe, turn, useAi = true) {
    let store;
    subscribe(game => {
        if (!store) {
            store = initializeRender(game, turn, useAi);
        }
        else {
            store.dispatch(actions_1.setGame(game));
        }
    });
}
exports.registerGame = registerGame;
function initializeRender(game, turn, useAi = true) {
    let store = redux_1.createStore(reducers_1.reducers, // Redux の型バグ
    {
        game,
        turn,
        turnsRead: game.maxTurn,
        moveInput: Kento_1.emptyMoveInput,
        theGame: game,
        branchFrom: -1,
        aiInfo: Ai_1.emptyAiInfo,
        positionChanged: true
    });
    const ai = useAi ? new Ai_1.Ai(store) : Ai_1.emptyAi;
    ReactDOM.render(React.createElement(App, { store: store, ai: ai }), document.getElementById("main-board"));
    return store;
}
//# sourceMappingURL=App.js.map