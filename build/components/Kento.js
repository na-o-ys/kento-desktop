"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Board_1 = require("./Board");
const Comment_1 = require("./Comment");
exports.Kento = ({ game, turn, control }) => {
    const position = game.getPosition(turn);
    const comments = game.getComments(turn);
    const onClickBoard = (e) => {
        if (e.clientX - e.currentTarget.offsetLeft < e.currentTarget.offsetWidth / 2) {
            control.setTurn(turn - 1);
        }
        else {
            control.setTurn(turn + 1);
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "row" },
            React.createElement(Board_1.default, { position: position, verticalHand: false })),
        React.createElement("div", { className: "row" },
            React.createElement(Comment_1.default, { comments: comments }))));
};
//# sourceMappingURL=Kento.js.map