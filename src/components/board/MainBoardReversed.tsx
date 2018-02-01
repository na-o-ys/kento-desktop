import * as log from "electron-log"
import * as _ from "lodash"
import * as React from "react"
import { Style } from "types"
import * as Kifu from "lib/Kifu"
import Cell from "components/board/Cell"

export interface OnClickMainBoardReversed {
    (x: number, y: number): void
}

type MainBoardReversedProps = {
    cells: Array<string | null>,
    highlightCell?: Kifu.Cell,
    style?: Style,
    scale?: number,
    onClick?: OnClickMainBoardReversed
}

export const MainBoardReversed = ({ cells, highlightCell = { x: 0, y: 0 }, style = {}, scale = 1, onClick = () => {} }: MainBoardReversedProps) => {
    log.info("here")
    const cellsReversed = _.cloneDeep(cells).reverse()
    const rankCells = (rankIdx: number) =>
        cellsReversed.slice(rankIdx * 9, (rankIdx + 1) * 9)
    const highlightIdx = (rankIdx: number) =>
        (highlightCell.y === 9 - rankIdx) ? highlightCell.x - 1 : -1
    return (
        <div style={{ ...getMainBoardStyle(scale), ...style }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(rankIdx => (
                <Rank key={rankIdx} cells={rankCells(rankIdx)} rankIdx={rankIdx} scale={scale} highlightIdx={highlightIdx(rankIdx)} onClick={onClick} />
            ))}
        </div>
    )
}

export default MainBoardReversed

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
            <Cell key={idx} piece={PieceReverseMap.get(piece) || ""} highlight={idx == highlightIdx}
            style={{ float: "left" }} scale={scale} onClick={() => onClick(idx + 1, 9 - rankIdx)} />
        ))}
    </div>
)

const PiecePairsA = [
    ["K", "k"],
    ["R", "r"],
    ["B", "b"],
    ["G", "g"],
    ["S", "s"],
    ["N", "n"],
    ["L", "l"],
    ["P", "p"],
    ["+R", "+r"],
    ["+B", "+b"],
    ["+S", "+s"],
    ["+N", "+n"],
    ["+L", "+l"],
    ["+P", "+p"]
]
const PiecePairsB = PiecePairsA.map(([a, b]) => ([b, a]))
const PieceReverseMap = new Map<string, string>(
    _.concat(PiecePairsA, PiecePairsB) as Array<[string, string]>
)

const rankStyle = {
    // height: 50,
    // width: 500,
}
