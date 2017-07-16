import * as React from "react"
import MainBoard, { OnClickMainBoard } from "./board/MainBoard"
import Hand from "./board/Hand"
import VHand from "./board/VHand"
import { Position, Cell } from "../lib/Kifu"
import { Style } from "../types"

interface BoardProps {
    position: Position
    verticalHand?: boolean
    style?: Style
    scale?: number
    onClickBoard?: OnClickMainBoard
    onClickHand?: (piece: string) => void
    highlightCell?: Cell
    highlightHand?: string
}

export const Board = ({
    position,
    verticalHand = true,
    style = {},
    scale = 1,
    onClickBoard = () => {},
    onClickHand = () => {},
    highlightCell = undefined,
    highlightHand = undefined
}: BoardProps) => {
    let blackHighlightHand = undefined
    let whiteHighlightHand = undefined
    if (highlightHand) {
        highlightCell = undefined
        if (highlightHand == highlightHand.toUpperCase()) {
            blackHighlightHand = highlightHand
        } else {
            whiteHighlightHand = highlightHand.toLowerCase()
        }
    } else {
        highlightCell = highlightCell || position.lastMove.to
    }

    if (verticalHand) return (
        <div id="board" style={{ ...vBoardStyle(scale), ...style }}>
            <VHand color="white" hand={position.whiteHand} scale={scale} onClick={onClickHand}
                highlight={whiteHighlightHand} />
            <MainBoard cells={position.cells} highlightCell={highlightCell} scale={scale} onClick={onClickBoard} />
            <VHand color="black" hand={position.blackHand} scale={scale} onClick={onClickHand}
                highlight={blackHighlightHand} />
        </div>
    )
    else return (
        <div id="board" style={{ ...boardStyle(scale), ...style }}>
            <WhiteHand hands={position.whiteHand} scale={scale} onClick={onClickHand}
                highlight={whiteHighlightHand} />
            <MainBoard cells={position.cells} highlightCell={highlightCell} scale={scale} style={mainBoardStyle} onClick={onClickBoard} />
            <BlackHand hands={position.blackHand} scale={scale} onClick={onClickHand}
                highlight={blackHighlightHand} />
        </div>
    )
}

export default Board

const boardStyle = (scale: number) => ({
    height: scale * 454,
    width: scale * 500
})

const vBoardStyle = (scale: number) => ({
    height: scale * 500,
    width: scale * 410
})

const WhiteHand = ({ hands, scale, ...props }: any) => (
    <div style={handWrapperStyle(scale)}>
        <Hand color="white" hands={hands} scale={scale} {...props} />
    </div>
)

const BlackHand = ({ hands, scale, ...props }: any) => (
    <div style={handWrapperStyle(scale)}>
        <Hand color="black" hands={hands} scale={scale} style={blackHandStyle} {...props} />
    </div>
)

const blackHandStyle = {
    bottom: 0,
    position: "absolute"
}

const mainBoardStyle = {
    float: "left"
}

const handWrapperStyle: (scale: number) => React.CSSProperties = scale => ({
    position: "relative",
    float: "left",
    height: scale * 454,
    width: scale * 45
})
