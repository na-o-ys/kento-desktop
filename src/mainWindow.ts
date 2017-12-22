import { remote } from "electron"
import * as path from "path"
import * as _ from "lodash"
import { startGame, registerGame } from "./App"
import { parseText } from "./lib/Kifu"
import axios from "axios"

const { BrowserWindow, clipboard } = remote

// const kifu = clipboard.readText()
const kifu = `V2.2
N+na_o_ys (2級)
N-mimikomura (2級)
$EVENT:将棋ウォーズ 10分切れ負け (http://shogiwars.heroz.jp:3002/games/na_o_ys-mimikomura-20171220_204238)
$START_TIME:2017/12/20 11:42:00
$TIME_LIMIT:00:10+00
PI
+
+7776FU
T0
-8384FU
T1
+2726FU
T7
-8485FU
T1
+8877KA
T2
-7172GI
T3
+7988GI
T9
-7283GI
T1
+6978KI
T3
-8384GI
T3
+9796FU
T7
-9394FU
T4
+7768KA
T17
-3334FU
T4
+8877GI
T9
-9495FU
T4
+9695FU
T3
-8495GI
T2
+9995KY
T35
-9195KY
T2
+0097FU
T17
-0098FU
T6
+2625FU
T16
-4132KI
T6
+2524FU
T12
-2324FU
T4
+2824HI
T10
-0023KY
T6
+2434HI
T11
-2329NY
T5
+0024FU
T38
-2939NY
T3
+4939KI
T2
-0033FU
T10
+3436HI
T11
-0025GI
T3
+3666HI
T26
-3334FU
T5
+6663RY
T7
-9899TO
T8
+0023KY
T54
-2244KA
T6
+2321NY
T2
-3142GI
T3
+0023GI
T33
-3233KI
T10
+2111NY
T24
-9989TO
T9
+0045KE
T51
-3324KI
T4
+2332NG
T2
-9597NY
T7
+4533NK
T31
-6162KI
T13
+3242NG
T15
-5161OU
T3
+0084KY
T20
-8272HI
T15
+0052GI
T17
-6171OU
T3
+6372RY
T2
-6272KI
T5
+0061HI
T6
%TSUMI`
const game = parseText(kifu)
const latestPosition = _.last(game)
startGame(game, latestPosition ? latestPosition.turn : 0)

// const url = clipboard.readText()

// registerGame(genSubscribeKifu(url), 0)

// function genSubscribeKifu(url) {
//     return callback => {
//         const fetchGame = () =>
//             axios.get(url).then(res => callback(Game.parseText(res.data)))
//         fetchGame()
//         setInterval(fetchGame, 1 * 60 * 1000)
//     }
// }
