"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Cell_1 = require("./Cell");
exports.MainBoard = ({ cells, highlightCell = -1, style = {}, scale = 1, onClick = () => { } }) => {
    const rankCells = (rankIdx) => cells.slice(rankIdx * 9, (rankIdx + 1) * 9);
    const highlightIdx = (rankIdx) => highlightCell - rankIdx * 9;
    return (React.createElement("div", { style: Object.assign({}, getMainBoardStyle(scale), style) }, [0, 1, 2, 3, 4, 5, 6, 7, 8].map(rankIdx => (React.createElement(Rank, { key: rankIdx, cells: rankCells(rankIdx), rankIdx: rankIdx, scale: scale, highlightIdx: highlightIdx(rankIdx), onClick: onClick })))));
};
exports.default = exports.MainBoard;
const getMainBoardStyle = (scale) => ({
    background: "url('img/masu_dot_xy.png'), url('img/ban_kaya_a.png')",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    height: scale * (454 - 22),
    width: scale * (410 - 22),
    padding: scale * 11,
});
const Rank = ({ cells, rankIdx, scale, highlightIdx, onClick }) => (React.createElement("div", { style: rankStyle }, cells.map((piece, idx) => (React.createElement(Cell_1.default, { key: idx, piece: piece, highlight: idx == highlightIdx, style: { float: "left" }, scale: scale, onClick: () => onClick(9 - idx, rankIdx + 1) })))));
const rankStyle = {};
//# sourceMappingURL=MainBoard.js.map