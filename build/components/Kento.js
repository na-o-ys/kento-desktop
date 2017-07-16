"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_modal_1 = require("react-modal");
const Board_1 = require("./Board");
const Ai_1 = require("./Ai");
const ShogiRule = require("../lib/ShogiRule");
class Kento extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (isReady(nextProps.moveInput, nextProps.position)) {
            nextProps.control.doMove(nextProps.moveInput, nextProps.position);
            return null;
        }
    }
    render() {
        const { position, control, moveInput, branchFrom, aiInfo, positionChanged, ai } = this.props;
        console.log(position);
        console.log(position.getSfen());
        const onClickCell = (x, y) => {
            const piece = position.getPiece({ x, y });
            // 自駒
            if (piece && (piece.toUpperCase() == piece) == (position.nextColor == "b")) {
                control.setMoveFrom({ x, y }, piece);
                return;
            }
            // 相手駒 or 空白
            if (moveInput.piece) {
                const movables = moveInput.from ?
                    ShogiRule.getMovablesFromCell(moveInput.from, position) :
                    ShogiRule.getMovablesFromHand(moveInput.piece, position);
                if (movables.includes({ x, y })) {
                    control.setMoveTo({ x, y });
                }
            }
        };
        const onClickHand = (piece) => {
            if ((piece.toUpperCase() == piece) == (position.nextColor == "b")) {
                control.setMoveFromHand(piece);
            }
        };
        if (positionChanged) {
            ai.start(position);
        }
        const askPromote = moveInput.to &&
            moveInput.promote == null &&
            moveInput.from && ShogiRule.canPromote(moveInput.from, moveInput.to, position);
        return (React.createElement("div", { className: "main", style: mainStyle },
            React.createElement(react_modal_1.default, { isOpen: askPromote, contentLabel: "promote", style: promoteModalStyle },
                React.createElement("button", { onClick: () => control.setPromote(true) }, "\u6210"),
                React.createElement("button", { onClick: () => control.setPromote(false) }, "\u4E0D\u6210")),
            React.createElement("div", { style: { float: "left" } },
                React.createElement(Board_1.default, { position: position, verticalHand: false, style: boardStyle, onClickBoard: onClickCell, onClickHand: onClickHand }),
                React.createElement(Control, { style: controlStyle, turn: position.turn, showReturnTheGame: branchFrom != -1, returnTheGame: control.returnTheGame, control: control })),
            React.createElement("div", { style: { float: "left" } },
                React.createElement(Ai_1.AiResult, { aiInfo: aiInfo, style: { width: aiWidth } }))));
    }
}
exports.Kento = Kento;
function isReady(moveInput, position) {
    const { from, to, fromHand, promote } = moveInput;
    return to &&
        (fromHand ||
            promote != null ||
            from && !ShogiRule.canPromote(from, to, position));
}
const promoteModalStyle = {
    content: {
        width: 100,
        height: 80,
        margin: "auto"
    }
};
const moveControlStyle = {
    float: "left",
    width: 30,
    textAlign: "center"
};
const returnTheGameStyle = {
    float: "right",
    width: 100,
    textAlign: "center"
};
const Control = ({ control, turn, showReturnTheGame, returnTheGame, style = {} }) => (React.createElement("div", { style: style },
    React.createElement("div", { style: moveControlStyle, onClick: () => control.setTurn(turn - 1) }, "<"),
    React.createElement("div", { style: moveControlStyle, onClick: () => control.setTurn(turn + 1) }, ">"),
    showReturnTheGame ?
        React.createElement("div", { style: returnTheGameStyle, onClick: () => returnTheGame() }, "\u68CB\u8B5C\u306B\u623B\u308B") :
        null));
const boardScale = 1.0;
const baseMargin = 10;
const boardWidth = 500 * boardScale + baseMargin * 2;
const aiWidth = 140;
const mainStyle = {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: boardWidth + aiWidth + baseMargin,
    height: 514
};
const boardStyle = {
    margin: baseMargin,
    "-webkit-app-region": "no-drag"
};
const controlStyle = {
    margin: baseMargin,
    height: 30,
    "-webkit-app-region": "no-drag"
};
exports.emptyMoveInput = { promote: null };
//# sourceMappingURL=Kento.js.map