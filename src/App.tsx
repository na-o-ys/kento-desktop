import * as React from "react"
import * as ReactDOM from "react-dom"
import * as _ from "lodash"
import { createStore } from "redux"
import { Provider } from "react-redux"
import KentoApp from "./container/KentoApp"
import { reducers } from "./reducers"
import { setGame } from "./actions"
import { Store } from "redux"
import { State } from "./container/KentoApp"
import { emptyAiInfo, Ai, emptyAi } from "./lib/Ai"
import { emptyMoveInput } from "./components/Kento"
import { Position } from "./lib/Kifu"
import { Config } from "./config"

export type StoreType = Store<State>
export interface AppProps {
    store: StoreType
    ai: Ai
}
const App = ({ store, ai }: AppProps) => (
    <Provider store={store}>
        <KentoApp ai={ai} />
    </Provider>
)

export function startGame(
    game: Position[],
    turn: number,
    config: Config) {
    return initializeRender(game, turn, config)
}

type GameListener = (game: Position[]) => void
export function registerGame(
    subscribe: (x: GameListener) => void,
    turn: number,
    config: Config) {
    let store: Store<State>
    subscribe(game => {
        if (!store) {
            store = initializeRender(game, turn, config)
        } else {
            store.dispatch(setGame(game))
        }
    })
}

function initializeRender(game: Position[], turn: number, config: Config) {
    let store = createStore<State>(
        reducers as any, // Redux の型バグ
        {
            game,
            turn,
            turnsRead: (_.last(game) as Position).turn,
            moveInput: emptyMoveInput,
            theGame: game,
            branchFrom: -1,
            aiInfo: emptyAiInfo,
            positionChanged: true
        }
    )
    const ai = config.ai ? new Ai(store, config.ai) : emptyAi
    ReactDOM.render(
        <App store={store} ai={ai}/>,
        document.getElementById("main-board")
    )
    return store
}
