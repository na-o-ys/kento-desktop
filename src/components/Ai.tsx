import * as React from "react"
import { AiInfo } from "../lib/Ai"

interface AiProps {
    aiInfo: AiInfo
}
export const AiResult = ({ aiInfo }: AiProps) => (
    <div>
        <dl>
            <dt>スコア</dt>
            <dd>{ aiInfo.score_cp }</dd>
        </dl>
        <ul>
            { aiInfo.pv.map((move, idx) => (
                <li key={idx}>{move}</li>
            )) }
        </ul>
    </div>
)