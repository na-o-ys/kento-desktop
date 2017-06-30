"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Cell_1 = require("./Cell");
exports.VHand = ({ hands, color, style = {}, scale = 1 }) => {
    const pieces = pieceDisplayOrder[color]
        .filter(piece => hands[piece] > 0)
        .map(piece => ({
        piece: color == "black" ? piece : piece.toLowerCase(),
        count: hands[piece]
    }));
    return (React.createElement("div", { style: Object.assign({}, getHandStyle(scale), style) }, pieces.map(hand => (React.createElement(Cell_1.default, { key: hand.piece, piece: hand.piece, count: hand.count, scale: scale, style: getCellStyle(color) })))));
};
exports.default = exports.VHand;
const getHandStyle = (scale) => ({
    width: scale * 390,
    height: scale * 48,
    background: "url('img/ban_dark.png')",
    paddingLeft: scale * 10,
    paddingRight: scale * 10
});
const getCellStyle = (color) => ({
    float: color == "black" ? "left" : "right"
});
const pieceDisplayOrder = {
    black: ['R', 'B', 'G', 'S', 'N', 'L', 'P'],
    white: ['P', 'L', 'N', 'S', 'G', 'B', 'R'],
};
//# sourceMappingURL=VHand.js.map