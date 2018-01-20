import * as log from "electron-log"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as _ from "lodash"
import { createStore } from "redux"
import { Provider } from "react-redux"
import KentoApp from "container/KentoApp"
import { reducers } from "reducers"
import { Store } from "redux"
import { State } from "container/KentoApp"
import { EmptyAiInfo, Ai, EmptyAi } from "lib/Ai"
import { EmptyMoveInput } from "components/Kento"
import { Position } from "lib/Kifu"
import { Config } from "config"

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

export function render(game: Position[], turn: number, config: Config): Store<State> {
    const store = initializeStore(game, turn)
    const ai = config.ai ? new Ai(store, config.ai) : EmptyAi
    ReactDOM.render(
        <App store={store} ai={ai}/>,
        document.getElementById("main-board")
    )
    return store
}

function initializeStore(game: Position[], turn: number): Store<State> {
    return createStore<State>(
        reducers,
        {
            game,
            theGame: game,
            turn,
            moveInput: EmptyMoveInput,
            branchFrom: -1,
            aiInfo: EmptyAiInfo,
            positionChanged: true
        }
    )
}
