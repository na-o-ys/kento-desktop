"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.Cell = ({ piece, highlight = false, count = 1, style = {}, scale = 1, onClick = () => { } }) => (React.createElement("div", { style: Object.assign({}, getOuterStyle(scale), style), onClick: onClick },
    React.createElement("span", { style: getCellStyle({ piece, highlight, scale }) }),
    count > 1 ? React.createElement(Count, Object.assign({}, { count, scale })) : null));
exports.default = exports.Cell;
const getOuterStyle = scale => (Object.assign({ position: "relative" }, cellSize(scale)));
const Count = ({ count, scale }) => (React.createElement("span", { style: getCountStyle(scale) }, count));
const getCountStyle = scale => ({
    position: "absolute",
    top: 0,
    right: scale * 43 / 16,
    color: "white",
    fontSize: scale * 48 / 2.4,
    textShadow: ".5px .5px black, .5px -.5px black, -.5px .5px black, -.5px -.5px black"
});
function getCellStyle({ piece, highlight, scale }) {
    let cellStyle = {
        backgroundSize: "100%",
        display: "block"
    };
    if (piece)
        cellStyle["backgroundImage"] = `url(${getPieceImagePath(piece)})`;
    if (highlight)
        cellStyle["backgroundColor"] = "rgba(255, 255, 255, 0.7)";
    return Object.assign({}, cellStyle, cellSize(scale));
}
const cellSize = (scale) => ({
    width: scale * 43,
    height: scale * 48,
});
const pieceImages = {
    "K": "Sou.png",
    "R": "Shi.png",
    "B": "Skaku.png",
    "G": "Skin.png",
    "S": "Sgin.png",
    "N": "Skei.png",
    "L": "Skyo.png",
    "P": "Sfu.png",
    "+R": "Sryu.png",
    "+B": "Suma.png",
    "+S": "Sngin.png",
    "+N": "Snkei.png",
    "+L": "Snkyo.png",
    "+P": "Sto.png",
    "k": "Gou.png",
    "r": "Ghi.png",
    "b": "Gkaku.png",
    "g": "Gkin.png",
    "s": "Ggin.png",
    "n": "Gkei.png",
    "l": "Gkyo.png",
    "p": "Gfu.png",
    "+r": "Gryu.png",
    "+b": "Guma.png",
    "+s": "Gngin.png",
    "+n": "Gnkei.png",
    "+l": "Gnkyo.png",
    "+p": "Gto.png",
};
function getPieceImagePath(piece) {
    return `img/koma/${pieceImages[piece]}`;
}
//# sourceMappingURL=Cell.js.map