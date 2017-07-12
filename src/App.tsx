import * as React from "react"
import * as ReactDOM from "react-dom"
import { createStore } from "redux"
import { Provider } from "react-redux"
import KentoApp from "./container/KentoApp"
import { reducers } from "./reducers"
import { setGame } from "./actions"
import { Game } from "./lib/game"
import { Store } from "redux"
import { State } from "./container/KentoApp"
import { emptyAiInfo, Ai } from "./lib/Ai"
import { emptyMoveInput } from "./components/Kento"

export type StoreType = Store<State>

const App = ({ store, ai }) => (
    <Provider store={store}>
        <KentoApp ai={ai} />
    </Provider>
)

export function startGame(game: Game, turn: number) {
    return initializeRender(game, turn)
}

type GameListener = (game: Game) => void
export function registerGame(subscribe: (x: GameListener) => void, turn: number) {
    let store: Store<State>
    subscribe(game => {
        if (!store) {
            store = initializeRender(game, turn)
        } else {
            store.dispatch(setGame(game))
        }
    })
}

function initializeRender(game: Game, turn: number) {
    let store = createStore<State>(
        reducers,
        {
            game,
            turn,
            turnsRead: game.maxTurn,
            moveInput: emptyMoveInput,
            theGame: game,
            branchFrom: -1,
            aiInfo: emptyAiInfo,
            positionChanged: true
        }
    )
    const ai = new Ai(store)
    ReactDOM.render(
        <App store={store} ai={ai}/>,
        document.getElementById("main-board")
    )
    return store
}
