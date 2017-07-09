import { StoreType } from "../App"
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

export class Ai {
    constructor(readonly store: StoreType) {}
    start(sfen: string) {
        console.log(`ai started: ${sfen}`)
    }
}