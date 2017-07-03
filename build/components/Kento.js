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
            control.setTurn(Math.max(turn - 1, 0));
        }
        else {
            control.setTurn(Math.min(turn + 1, game.maxTurn));
        }
    };
    return (React.createElement("div", { style: { height: "100vh" } },
        React.createElement("div", { className: "row", style: boardRowStyle, onClick: onClickBoard },
            React.createElement(Board_1.default, { position: position, verticalHand: false, style: boardStyle })),
        React.createElement("div", { className: "row", style: descriptionRowStyle },
            React.createElement(Comment_1.default, { comments: comments, style: commentStyle }))));
};
const boardScale = 1.0;
const baseMargin = 10;
const boardHeight = 454 * boardScale + baseMargin * 2;
const boardRowStyle = {
    margin: 0,
    height: boardHeight
};
const descriptionRowStyle = {
    margin: 0,
    height: `calc(100vh - ${boardHeight}px)`,
    width: "100%"
};
const boardStyle = {
    marginTop: baseMargin,
    marginBottom: baseMargin,
    marginLeft: "auto",
    marginRight: "auto"
};
const commentStyle = {
    margin: `${baseMargin}px 20px`,
    width: `calc(100vw - 40px)`,
    height: `calc(100vh - ${boardHeight}px - ${baseMargin * 2}px)`
};
//# sourceMappingURL=Kento.js.map