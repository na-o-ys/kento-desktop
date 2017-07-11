"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const split = require("split");
const AiAction = require("../actions/ai");
const _ = require("lodash");
exports.emptyAiInfo = {
    pv: [],
    pvJp: [],
    depth: 0,
    nodes: 0,
    nps: 0
};
const Byoyomi = 30000;
class Ai {
    constructor(store) {
        this.store = store;
    }
    start(game, turn) {
        const position = game.getPosition(turn);
        const color = position.nextColor;
        const sfen = game.getSfen(turn);
        console.log(`ai started: ${sfen}`);
        if (this.aiProcess) {
            this.aiProcess.kill("SIGKILL");
        }
        this.aiProcess = child_process_1.spawn("./YaneuraOu-20170711-sse42", [], { cwd: "/Users/naoyoshi/projects/shogi-ai/relmo8-YaneuraOu-sse42" });
        this.aiProcess.stdin.write(this.generateCommand(Byoyomi, `startpos moves ${sfen}`));
        this.aiProcess.stdout.pipe(split()).on('data', data => {
            const line = data.toString();
            const [cmd, ...words] = line.split(" ");
            console.log(line);
            if (cmd == "info") {
                const info = this.parseInfo(words, game, turn);
                if (color == "w") {
                    if (info.score_cp) {
                        info.score_cp *= -1;
                    }
                    if (info.score_mate) {
                        info.score_mate *= -1;
                    }
                }
                this.store.dispatch(AiAction.updateAiInfo(info));
                console.log(info);
            }
            if (cmd == "bestmove") {
                console.log(words[0]);
                this.aiProcess.kill("SIGKILL");
            }
        });
    }
    generateCommand(byoyomi, position) {
        return `usi
setoption name USI_Ponder value false
setoption name USI_Hash value 2048
setoption name ConsiderationMode value true
setoption name Threads value 4
isready
usinewgame
position ${position}
go btime 0 wtime 0 byoyomi ${byoyomi}
`;
    }
    parseInfo(words, game, turn) {
        let result = _.cloneDeep(exports.emptyAiInfo);
        let command = null;
        words.forEach(word => {
            switch (word) {
                case "score":
                    return;
                case "lowerbound":
                    result["lowerbound"] = true;
                    return;
                case "upperbound":
                    result["upperbound"] = true;
                    return;
                case "cp":
                    command = "score_cp";
                    return;
                case "mate":
                    command = "score_mate";
                    return;
            }
            switch (command) {
                case null:
                    command = word;
                    return;
                case "pv":
                    result.pv.push(word);
                    return;
                default:
                    result[command] = parseInt(word);
                    command = null;
            }
        });
        const newGame = game.branch(turn);
        for (const sfen of result.pv) {
            const crrTurn = newGame.maxTurn;
            const crrPosition = newGame.getPosition(crrTurn);
            const crrColor = crrPosition.nextColor;
            const move = this.parseSfen(sfen, crrPosition);
            // console.log(crrPosition.getPiece(move.from))
            newGame.appendMove({
                color: crrColor == "b" ? 0 : 1,
                from: move.from,
                to: move.to,
                piece: move.piece || crrPosition.getPiece(move.from),
                promote: move.promote
            });
        }
        result.pvJp = newGame.jpKifu.slice(turn + 1);
        return result;
    }
    parseSfen(sfen, position) {
        const fromHand = sfen[1] == "*";
        const from = fromHand ? null : {
            x: sfen.charCodeAt(0) - "0".charCodeAt(0),
            y: sfen.charCodeAt(1) - "a".charCodeAt(0) + 1
        };
        const to = {
            x: sfen.charCodeAt(2) - "0".charCodeAt(0),
            y: sfen.charCodeAt(3) - "a".charCodeAt(0) + 1
        };
        const piece = fromHand ? sfen[0] : position.getPiece(from);
        const moveInput = {
            from,
            to,
            fromHand,
            piece,
            promote: null
        };
        if (!fromHand && this.canPromote(moveInput, position.nextColor)) {
            moveInput.promote = sfen[4] == "+";
        }
        return moveInput;
    }
    // TODO: ルールが散らばっている
    canPromote(moveInput, color) {
        const { piece } = moveInput;
        const canPromotePiece = ["l", "n", "s", "b", "r", "p"]
            .includes(moveInput.piece.toLowerCase());
        if (moveInput.fromHand || !canPromotePiece)
            return false;
        const isPromoteArea = (y) => ((color == "b" && y <= 3) || (color == "w" && y >= 7));
        return isPromoteArea(moveInput.from.y) || isPromoteArea(moveInput.to.y);
    }
}
exports.Ai = Ai;
//# sourceMappingURL=Ai.js.map