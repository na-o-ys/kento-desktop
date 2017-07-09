import * as React from "react"
import { AiInfo } from "../lib/Ai"

interface AiProps {
    aiInfo: AiInfo
}
export const AiResult = ({ aiInfo }: AiProps) => (
    <div>
        <dl>
            { aiInfo.score_cp == null ?
                null :
                <div>
                    <dt>スコア</dt>
                    <dd>{ aiInfo.score_cp }</dd>
                </div>
            }
            { aiInfo.score_mate == null ?
                null :
                <div>
                    <dt>詰み</dt>
                    <dd>{ aiInfo.score_mate }</dd>
                </div>
            }
        </dl>
        <ul>
            { aiInfo.pv.map((move, idx) => (
                <li key={idx}>{move}</li>
            )) }
        </ul>
    </div>
)