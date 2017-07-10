import { AiInfo } from "../lib/Ai"

export type UpdateInfoAction = { type: "update_ai_info", info: AiInfo}
export function updateAiInfo(info: AiInfo) {
    return { type: "update_ai_info", info }
}
