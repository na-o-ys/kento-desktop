"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.Comment = ({ comments }) => (React.createElement("div", { className: "comment" },
    React.createElement("div", { className: "comment-body" }, comments.map((line, i) => (React.createElement("p", { key: i, style: commentStyle }, line))))));
exports.default = exports.Comment;
const commentStyle = {
    margin: 0
};
//# sourceMappingURL=Comment.js.map