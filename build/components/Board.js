"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MainBoard_1 = require("./board/MainBoard");
const Hand_1 = require("./board/Hand");
const VHand_1 = require("./board/VHand");
exports.Board = ({ position, verticalHand = true, style = {}, scale = 1, onClickBoard = () => { }, onClickHand = () => { }, highlightCell = undefined, highlightHand = undefined }) => {
    let blackHighlightHand = undefined;
    let whiteHighlightHand = undefined;
    if (highlightHand) {
        highlightCell = undefined;
        if (highlightHand == highlightHand.toUpperCase()) {
            blackHighlightHand = highlightHand;
        }
        else {
            whiteHighlightHand = highlightHand.toLowerCase();
        }
    }
    else {
        highlightCell = highlightCell || position.lastMove.to;
    }
    if (verticalHand)
        return (React.createElement("div", { id: "board", style: Object.assign({}, vBoardStyle(scale), style) },
            React.createElement(VHand_1.default, { color: "white", hand: position.whiteHand, scale: scale, onClick: onClickHand, highlight: whiteHighlightHand }),
            React.createElement(MainBoard_1.default, { cells: position.cells, highlightCell: highlightCell, scale: scale, onClick: onClickBoard }),
            React.createElement(VHand_1.default, { color: "black", hand: position.blackHand, scale: scale, onClick: onClickHand, highlight: blackHighlightHand })));
    else
        return (React.createElement("div", { id: "board", style: Object.assign({}, boardStyle(scale), style) },
            React.createElement(WhiteHand, { hands: position.whiteHand, scale: scale, onClick: onClickHand, highlight: whiteHighlightHand }),
            React.createElement(MainBoard_1.default, { cells: position.cells, highlightCell: highlightCell, scale: scale, style: mainBoardStyle, onClick: onClickBoard }),
            React.createElement(BlackHand, { hands: position.blackHand, scale: scale, onClick: onClickHand, highlight: blackHighlightHand })));
};
exports.default = exports.Board;
const boardStyle = (scale) => ({
    height: scale * 454,
    width: scale * 500
});
const vBoardStyle = (scale) => ({
    height: scale * 500,
    width: scale * 410
});
const WhiteHand = (_a) => {
    var { hands, scale } = _a, props = __rest(_a, ["hands", "scale"]);
    return (React.createElement("div", { style: handWrapperStyle(scale) },
        React.createElement(Hand_1.default, Object.assign({ color: "white", hands: hands, scale: scale }, props))));
};
const BlackHand = (_a) => {
    var { hands, scale } = _a, props = __rest(_a, ["hands", "scale"]);
    return (React.createElement("div", { style: handWrapperStyle(scale) },
        React.createElement(Hand_1.default, Object.assign({ color: "black", hands: hands, scale: scale, style: blackHandStyle }, props))));
};
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