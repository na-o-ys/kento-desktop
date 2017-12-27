import * as React from "react"
import { Style } from "types"
import * as Kifu from "lib/Kifu"
import Cell from "components/board/Cell"

export interface OnClickMainBoard {
    (x: number, y: number): void
}

type MainBoardProps = {
    cells: Array<string | null>,
    highlightCell?: Kifu.Cell,
    style?: Style,
    scale?: number,
    onClick?: OnClickMainBoard
}

export const MainBoard = ({ cells, highlightCell = { x: 0, y: 0 }, style = {}, scale = 1, onClick = () => {} }: MainBoardProps) => {
    const rankCells = (rankIdx: number) =>
        cells.slice(rankIdx * 9, (rankIdx + 1) * 9)
    const highlightIdx = (rankIdx: number) =>
        (highlightCell.y == rankIdx + 1) ? 9 - highlightCell.x : -1
    return (
        <div style={{ ...getMainBoardStyle(scale), ...style }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(rankIdx => (
                <Rank key={rankIdx} cells={rankCells(rankIdx)} rankIdx={rankIdx} scale={scale} highlightIdx={highlightIdx(rankIdx)} onClick={onClick} />
            ))}
        </div>
    )
}

export default MainBoard

const getMainBoardStyle = (scale: number) => ({
    background: "url('img/masu_dot_xy.png'), url('img/ban_kaya_a.png')",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    height: scale * (454 - 22),
    width: scale * (410 - 22),
    padding: scale * 11,
})

const Rank = ({ cells, rankIdx, scale, highlightIdx, onClick }: any) => (
    <div style={rankStyle}>
        {cells.map((piece: string, idx: number) => (
            <Cell key={idx} piece={piece} highlight={idx == highlightIdx} style={{ float: "left" }} scale={scale} onClick={() => onClick(9 - idx, rankIdx + 1)} />
        ))}
    </div>
)

const rankStyle = {
    // height: 50,
    // width: 500,
}
