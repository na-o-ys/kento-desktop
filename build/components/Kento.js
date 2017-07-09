"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Board_1 = require("./Board");
exports.Kento = ({ game, turn, control, moveInput, theGame, branchFrom }) => {
    console.log(moveInput);
    console.log(game);
    console.log(branchFrom);
    const position = game.getPosition(turn);
    const comments = game.getComments(turn);
    const onClickCell = (x, y) => {
        control.clickCell({ x, y }, position, moveInput, turn);
    };
    const onClickHand = (piece) => {
        control.clickHand(piece, position, moveInput, turn);
    };
    const returnTheGame = () => {
        control.returnTheGame(theGame, branchFrom);
    };
    return (React.createElement("div", { className: "main", style: mainStyle },
        React.createElement(react_modal_1.default, { isOpen: moveInput.state == "selectingPromote", contentLabel: "promote", style: promoteModalStyle },
            React.createElement("button", { onClick: () => control.selectPromote(true, position, moveInput, turn) }, "\u6210"),
            React.createElement("button", { onClick: () => control.selectPromote(false, position, moveInput, turn) }, "\u4E0D\u6210")),
        React.createElement(Board_1.default, { position: position, verticalHand: false, style: boardStyle, onClickBoard: onClickCell, onClickHand: onClickHand }),
        React.createElement(Control, { style: controlStyle, turn: turn, game: game, showReturnTheGame: branchFrom != -1, returnTheGame: returnTheGame, control: control })));
};
const promoteModalStyle = {
    content: {
        width: 100,
        height: 80,
        margin: "auto"
    }
};
const moveControlStyle = {
    float: "left",
    width: 30,
    textAlign: "center"
};
const returnTheGameStyle = {
    float: "right",
    width: 100,
    textAlign: "center"
};
const Control = ({ control, turn, game, showReturnTheGame, returnTheGame, style = {} }) => (React.createElement("div", { style: style },
    React.createElement("div", { style: moveControlStyle, onClick: () => control.setTurn(Math.max(turn - 1, 0)) }, "<"),
    React.createElement("div", { style: moveControlStyle, onClick: () => control.setTurn(Math.min(turn + 1, game.maxTurn)) }, ">"),
    showReturnTheGame ?
        React.createElement("div", { style: returnTheGameStyle, onClick: () => returnTheGame() }, "\u68CB\u8B5C\u306B\u623B\u308B") :
        null));
const boardScale = 1.0;
const baseMargin = 10;
const boardWidth = 500 * boardScale + baseMargin * 2;
const mainStyle = {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: boardWidth,
};
const boardStyle = {
    margin: baseMargin,
    "-webkit-app-region": "no-drag"
};
const controlStyle = {
    margin: baseMargin,
    height: 30,
    "-webkit-app-region": "no-drag"
};
exports.emptyMoveInput = {
    state: "selectingMoveFrom"
};
//# sourceMappingURL=Kento.js.map