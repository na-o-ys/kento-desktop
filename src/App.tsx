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

export type StoreType = Store<State>

const App = ({ store, ai }) => (
    <Provider store={store}>
        <KentoApp ai={ai} />
    </Provider>
)

export function startGame(game: Position[], turn: number, useAi: boolean = true) {
    return initializeRender(game, turn, useAi)
}

type GameListener = (game: Position[]) => void
export function registerGame(subscribe: (x: GameListener) => void, turn: number, useAi: boolean = true) {
    let store: Store<State>
    subscribe(game => {
        if (!store) {
            store = initializeRender(game, turn, useAi)
        } else {
            store.dispatch(setGame(game))
        }
    })
}

function initializeRender(game: Position[], turn: number, useAi: boolean = true) {
    let store = createStore<State>(
        reducers as any, // Redux の型バグ
        {
            game,
            turn,
            turnsRead: _.last(game).turn,
            moveInput: emptyMoveInput,
            theGame: game,
            branchFrom: -1,
            aiInfo: emptyAiInfo,
            positionChanged: true
        }
    )
    const ai = useAi ? new Ai(store) : emptyAi
    ReactDOM.render(
        <App store={store} ai={ai}/>,
        document.getElementById("main-board")
    )
    return store
}
