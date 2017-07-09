"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.AiResult = ({ aiInfo }) => (React.createElement("div", null,
    React.createElement("dl", null,
        aiInfo.score_cp == null ?
            null :
            React.createElement("div", null,
                React.createElement("dt", null, "\u30B9\u30B3\u30A2"),
                React.createElement("dd", null, aiInfo.score_cp)),
        aiInfo.score_mate == null ?
            null :
            React.createElement("div", null,
                React.createElement("dt", null, "\u8A70\u307F"),
                React.createElement("dd", null, aiInfo.score_mate))),
    React.createElement("ul", null, aiInfo.pv.map((move, idx) => (React.createElement("li", { key: idx }, move))))));
//# sourceMappingURL=Ai.js.map