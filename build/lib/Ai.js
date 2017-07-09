"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const split = require("split");
const AiAction = require("../actions/ai");
const _ = require("lodash");
exports.emptyAiInfo = {
    pv: [],
    depth: 0,
    nodes: 0,
    nps: 0
};
const Byoyomi = 10000;
class Ai {
    constructor(store) {
        this.store = store;
    }
    start(sfen, color) {
        console.log(`ai started: ${sfen}`);
        if (this.aiProcess) {
            console.log("kill");
            this.aiProcess.kill("SIGKILL");
        }
        this.aiProcess = child_process_1.spawn("./release", [], { cwd: "/Users/Nao/projects/Gikou/bin" });
        this.aiProcess.stdin.write(this.generateCommand(Byoyomi, `startpos moves ${sfen}`));
        this.aiProcess.stdout.pipe(split()).on('data', data => {
            const line = data.toString();
            const [cmd, ...words] = line.split(" ");
            console.log(line);
            if (cmd == "info") {
                const info = this.parseInfo(words);
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
setoption name USI_Hash value 1024
isready
usinewgame
position ${position}
go btime 0 wtime 0 byoyomi ${byoyomi}
`;
    }
    parseInfo(words) {
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
        return result;
    }
    selectBestPv(infoList) {
        return infoList.reduce((bestinfo, info) => {
            const depth = bestinfo["depth"] || 0;
            const seldepth = bestinfo["seldepth"] || 0;
            const curr_depth = info["depth"] || 0;
            const curr_seldepth = info["seldepth"] || 0;
            if (depth < curr_depth || (depth == curr_depth && seldepth < curr_seldepth)) {
                return info;
            }
            return bestinfo;
        });
    }
}
exports.Ai = Ai;
//# sourceMappingURL=Ai.js.map