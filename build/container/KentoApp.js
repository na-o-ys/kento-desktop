"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Kento_1 = require("../components/Kento");
const actions = require("../actions");
function mapStateToProps(state, ownProps) {
    return {
        position: state.game.getPosition(state.turn),
        moveInput: state.moveInput,
        theGame: state.theGame,
        branchFrom: state.branchFrom,
        positionChanged: state.positionChanged,
        aiInfo: state.aiInfo,
        ai: ownProps.ai
    };
}
function mapDispatchToProps(dispatch) {
    return {
        control: {
            setTurn(turn) {
                dispatch(actions.setTurn(turn));
            },
            setMoveFrom(cell, piece) {
                dispatch(actions.setMoveFrom(cell, piece));
            },
            setMoveFromHand(piece) {
                dispatch(actions.setMoveFromHand(piece));
            },
            setMoveTo(cell) {
                dispatch(actions.setMoveTo(cell));
            },
            setPromote(promote) {
                dispatch(actions.setPromote(promote));
            },
            returnTheGame() {
                dispatch(actions.returnTheGame());
            },
            doMove(moveInput, position) {
                dispatch(actions.doMove(moveInput, position));
            }
        }
    };
}
const KentoApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Kento_1.Kento);
exports.default = KentoApp;
//# sourceMappingURL=KentoApp.js.map