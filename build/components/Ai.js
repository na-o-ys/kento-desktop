"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.AiResult = ({ aiInfo }) => (React.createElement("div", null,
    React.createElement("dl", null,
        React.createElement("dt", null, "\u30B9\u30B3\u30A2"),
        React.createElement("dd", null, aiInfo.score_cp)),
    React.createElement("ul", null, aiInfo.pv.map((move, idx) => (React.createElement("li", { key: idx }, move))))));
//# sourceMappingURL=Ai.js.map