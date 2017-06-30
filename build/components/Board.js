"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MainBoard_1 = require("./board/MainBoard");
const Hand_1 = require("./board/Hand");
const VHand_1 = require("./board/VHand");
exports.Board = ({ position, verticalHand = true, style = {}, scale = 1 }) => {
    if (verticalHand)
        return (React.createElement("div", { style: Object.assign({}, vBoardStyle(scale), style) },
            React.createElement(VHand_1.default, { color: "white", hands: position.white_hand, scale: scale }),
            React.createElement(MainBoard_1.default, { cells: position.cells, highlightCell: position.movedCell, scale: scale }),
            React.createElement(VHand_1.default, { color: "black", hands: position.black_hand, scale: scale })));
    else
        return (React.createElement("div", { style: Object.assign({}, boardStyle(scale), style) },
            React.createElement(WhiteHand, { hands: position.white_hand, scale: scale }),
            React.createElement(MainBoard_1.default, { cells: position.cells, highlightCell: position.movedCell, scale: scale, style: mainBoardStyle }),
            React.createElement(BlackHand, { hands: position.black_hand, scale: scale })));
};
exports.default = exports.Board;
const boardStyle = scale => ({
    height: scale * 454,
    width: scale * 500
});
const vBoardStyle = scale => ({
    height: scale * 500,
    width: scale * 410
});
const WhiteHand = ({ hands, scale }) => (React.createElement("div", { style: handWrapperStyle(scale) },
    React.createElement(Hand_1.default, { color: "white", hands: hands, scale: scale })));
const BlackHand = ({ hands, scale }) => (React.createElement("div", { style: handWrapperStyle(scale) },
    React.createElement(Hand_1.default, { color: "black", hands: hands, scale: scale, style: blackHandStyle })));
const blackHandStyle = {
    bottom: 0,
    position: "absolute"
};
const mainBoardStyle = {
    float: "left"
};
const handWrapperStyle = scale => ({
    position: "relative",
    float: "left",
    height: scale * 454,
    width: scale * 45
});
//# sourceMappingURL=Board.js.map