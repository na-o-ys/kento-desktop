"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.Comment = ({ comments, style = {} }) => (React.createElement("div", { className: "comment", style: style },
    React.createElement("div", { className: "comment-body", style: commentBodyStyle }, comments.map((line, i) => (React.createElement("p", { key: i, style: commentStyle }, line))))));
exports.default = exports.Comment;
const commentBodyStyle = {
    height: "100%",
    overflow: "scroll"
};
const commentStyle = {
    margin: 0
};
//# sourceMappingURL=Comment.js.map