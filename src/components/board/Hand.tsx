import * as React from "react"
import { Style } from "types"
import Cell from "components/board/Cell"

type Hands = { [key: string]: number }

interface HandProps {
    hands: Hands
    color: "black" | "white"
    style?: Style
    scale?: number
    onClick?: Function
    highlight?: string
}

export const Hand = ({ hands, color, style = {}, scale = 1, onClick = () => {}, highlight }: HandProps) => {
    const pieces = pieceDisplayOrder[color]
        .filter(piece => hands[piece] > 0)
        .map(piece => ({
            piece: color == "black" ? piece : piece.toLowerCase(),
            count: hands[piece]
        }))
    return (
        <div style={{ ...getHandStyle(scale), ...style }}>
            {pieces.map(hand => (
                <Cell key={hand.piece} piece={hand.piece} count={hand.count} scale={scale}
                    onClick={() => onClick(hand.piece)}
                    highlight={hand.piece == highlight} />
            ))}
        </div>
    )
}

export default Hand

const getHandStyle = (scale: number) => ({
    width: scale * (43 + 2),
    height: scale * 454,
    background: "url('img/ban_dark.png')",
    backgroundRepeat: "no-repeat"
})

const pieceDisplayOrder = {
    black: ['R', 'B', 'G', 'S', 'N', 'L', 'P'],
    white: ['P', 'L', 'N', 'S', 'G', 'B', 'R'],
}
