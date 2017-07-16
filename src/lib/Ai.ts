import { StoreType } from "../App"
import { spawn } from "child_process"
import split = require("split")
import * as AiAction from "../actions/ai"
import * as _ from "lodash"
import { JsonKifuFormat } from "../types"
import * as Kifu from "../lib/Kifu"

export interface AiInfo {
    pv: string[]
    pvJp: string[]
    depth: number
    nodes: number
    nps: number
    score_cp?: number
    score_mate?: number
}

export const emptyAiInfo: AiInfo = {
    pv: [],
    pvJp: [],
    depth: 0,
    nodes: 0,
    nps: 0
}

export const emptyAi: Ai = {
    aiProcess: null,
    start(position: Kifu.Position) {}
} as Ai

const Byoyomi = 30000
export class Ai {
    aiProcess: any
    constructor(readonly store: StoreType) {}
    start(position: Kifu.Position) {
        const color = position.nextColor
        const sfen = position.getSfen()
        console.log(`ai started: ${sfen}`)
        if (this.aiProcess) {
            this.aiProcess.kill("SIGKILL")
        }
        this.aiProcess = spawn("./YaneuraOu-20170711-sse42", [], { cwd: "/Users/naoyoshi/projects/shogi-ai/relmo8-YaneuraOu-sse42" })
        this.aiProcess.stdin.write(this.generateCommand(Byoyomi, sfen))
        this.aiProcess.stdout.pipe(split()).on('data', data => {
            const line: string = data.toString()
            const [cmd, ...words] = line.split(" ")
            console.log(line)

            if (cmd == "info") {
                const info = this.parseInfo(words, position)
                if (color == "w") {
                    if (info.score_cp) {
                        info.score_cp *= -1
                    }
                    if (info.score_mate) {
                        info.score_mate *= -1
                    }
                }
                this.store.dispatch(AiAction.updateAiInfo(
                    info
                ))
                console.log(info)
            }
            if (cmd == "bestmove") {
                console.log(words[0])
                this.aiProcess.kill("SIGKILL")
            }
        })
    }

    private generateCommand(byoyomi: number, position) {
        return `usi
setoption name USI_Ponder value false
setoption name USI_Hash value 2048
setoption name ConsiderationMode value true
setoption name Threads value 4
isready
usinewgame
position ${position}
go btime 0 wtime 0 byoyomi ${byoyomi}
`
    }

    private parseInfo(words: string[], position: Kifu.Position): AiInfo {
        let result = _.cloneDeep(emptyAiInfo)
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
                result.pv.push(word)
                return
            default:
                result[command] = parseInt(word)
                command = null
            }
        })

        let currPosition = position
        for (const sfen of result.pv) {
            const move = this.parseSfen(sfen)
            result.pvJp.push(currPosition.getMoveJp(move))
            currPosition = currPosition.move(move)
        }
        return result
    }

    private parseSfen(sfen: string): Kifu.Move {
        // TODO: rep_inf 等への対応
        // http://yaneuraou.yaneu.com/2017/06/16/%E6%8B%A1%E5%BC%B5usi%E3%83%97%E3%83%AD%E3%83%88%E3%82%B3%E3%83%AB-%E8%AA%AD%E3%81%BF%E7%AD%8B%E5%87%BA%E5%8A%9B%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/
        const fromHand = sfen[1] == "*"
        const from = fromHand ? null : {
            x: sfen.charCodeAt(0) - "0".charCodeAt(0),
            y: sfen.charCodeAt(1) - "a".charCodeAt(0) + 1
        }
        const to = {
            x: sfen.charCodeAt(2) - "0".charCodeAt(0),
            y: sfen.charCodeAt(3) - "a".charCodeAt(0) + 1
        }
        const piece = fromHand ?
            sfen[0].toLowerCase() as Kifu.Piece :
            null
        const promote = sfen[4] == "+"
        return {
            from,
            to,
            piece,
            promote
        }
    }

    // TODO: ルールが散らばっている
    canPromote(moveInput, color: string): boolean {
        const { piece } = moveInput
        const canPromotePiece = ["l", "n", "s", "b", "r", "p"]
            .includes(moveInput.piece.toLowerCase())
        if (moveInput.fromHand || !canPromotePiece) return false
        const isPromoteArea = (y: number) => ((color == "b" && y <= 3) || (color == "w" && y >= 7))
        return isPromoteArea(moveInput.from.y) || isPromoteArea(moveInput.to.y)
    }
}
