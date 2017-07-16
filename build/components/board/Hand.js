"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Cell_1 = require("./Cell");
exports.Hand = ({ hands, color, style = {}, scale = 1, onClick = () => { }, highlight }) => {
    const pieces = pieceDisplayOrder[color]
        .filter(piece => hands[piece] > 0)
        .map(piece => ({
        piece: color == "black" ? piece : piece.toLowerCase(),
        count: hands[piece]
    }));
    return (React.createElement("div", { style: Object.assign({}, getHandStyle(scale), style) }, pieces.map(hand => (React.createElement(Cell_1.default, { key: hand.piece, piece: hand.piece, count: hand.count, scale: scale, onClick: () => onClick(hand.piece), highlight: hand.piece == highlight })))));
};
exports.default = exports.Hand;
const getHandStyle = (scale) => ({
    width: scale * (43 + 2),
    height: scale * 454,
    background: "url('img/ban_dark.png')",
    backgroundRepeat: "no-repeat"
});
const pieceDisplayOrder = {
    black: ['R', 'B', 'G', 'S', 'N', 'L', 'P'],
    white: ['P', 'L', 'N', 'S', 'G', 'B', 'R'],
};
//# sourceMappingURL=Hand.js.map