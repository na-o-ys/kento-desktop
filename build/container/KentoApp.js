"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Kento_1 = require("../components/Kento");
const actions_1 = require("../actions");
function mapStateToProps(state) {
    return {
        game: state.game,
        turn: state.turn
    };
}
function mapDispatchToProps(dispatch) {
    return {
        control: {
            setTurn(turn) { dispatch(actions_1.setTurn(turn)); }
        }
    };
}
const KentoApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Kento_1.Kento);
exports.default = KentoApp;
//# sourceMappingURL=KentoApp.js.map