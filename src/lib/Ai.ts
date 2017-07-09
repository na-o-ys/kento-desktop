import { StoreType } from "../App"
import { spawn } from "child_process"
import split = require("split")

export interface AiInfo {
    pv: string[]
    depth: number
    nodes: number
    nps: number
    score_cp: number
}

export const emptyAiInfo: AiInfo = {
    pv: [],
    depth: 0,
    nodes: 0,
    nps: 0,
    score_cp: 0
}

const Byoyomi = 10000
export class Ai {
    aiProcess: any
    constructor(readonly store: StoreType) {}
    start(sfen: string) {
        console.log(`ai started: ${sfen}`)
        if (this.aiProcess) {
            console.log("kill")
            this.aiProcess.kill("SIGKILL")
        }
        this.aiProcess = spawn("./release", [], { cwd: "/Users/Nao/projects/Gikou/bin" })
        this.aiProcess.stdin.write(this.generateCommand(Byoyomi, `startpos moves ${sfen}`))
        this.aiProcess.stdout.pipe(split()).on('data', data => {
            const line: string = data.toString()
            const [cmd, ...words] = line.split(" ")
            console.log(line)

            if (cmd == "info") console.log(this.parseInfo(words))
            if (cmd == "bestmove") {
                console.log(words[0])
                this.aiProcess.kill("SIGKILL")
            }
        })
        console.log(this.aiProcess)
    }

    private generateCommand(byoyomi: number, position) {
  return `usi
setoption name USI_Ponder value false
setoption name USI_Hash value 1024
isready
usinewgame
position ${position}
go btime 0 wtime 0 byoyomi ${byoyomi}
`
    }

    private parseInfo(words: string[]) {
        let result = { "pv": [], "raw_string": ["info", ...words].join(" ") }
        let command = null
        words.forEach(word => {
            switch(word) {
            case "score":
                return
            case "lowerbound":
                result["lowerbound"] = true
                return
            case "upperbound":
                result["upperbound"] = true
                return
            case "cp":
                command = "score_cp"
                return
            case "mate":
                command = "score_mate"
                return
            }
            switch(command) {
            case null:
                command = word
                return
            case "pv":
                result["pv"].push(word)
                return
            default:
                result[command] = parseInt(word)
                command = null
            }
        })
        return result
    }

    private selectBestPv(infoList: any[]) {
        return infoList.reduce((bestinfo, info) => {
            const depth         = bestinfo["depth"] || 0
            const seldepth      = bestinfo["seldepth"] || 0
            const curr_depth    = info["depth"] || 0
            const curr_seldepth = info["seldepth"] || 0
            if (depth < curr_depth || (depth == curr_depth && seldepth < curr_seldepth)) {
            return info
            }
            return bestinfo
        })
    }
}