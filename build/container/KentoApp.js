"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const Kento_1 = require("../components/Kento");
const actions = require("../actions");
exports.emptyMoveInput = {
    state: "selectingMoveFrom"
};
function mapStateToProps(state, ownProps) {
    return {
        game: state.game,
        turn: state.turn,
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
            setTurn(turn, currentTurn) { dispatch(actions.setTurn(turn, currentTurn)); },
            clickCell(cell, position, moveInput, turn) {
                dispatch(actions.clickCell(cell, position, moveInput, turn));
            },
            clickHand(piece, position, moveInput, turn) {
                dispatch(actions.clickHand(piece, position, moveInput, turn));
            },
            returnTheGame(theGame, branchFrom) {
                dispatch(actions.returnTheGame(theGame, branchFrom));
            },
            selectPromote(promote, position, moveInput, turn) {
                dispatch(actions.selectPromote(promote, position, moveInput, turn));
            }
        }
    };
}
const KentoApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Kento_1.Kento);
exports.default = KentoApp;
//# sourceMappingURL=KentoApp.js.map