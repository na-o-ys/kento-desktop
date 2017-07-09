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
import { emptyAiInfo } from "./lib/Ai"

const App = ({ store }) => (
    <Provider store={store}>
        <KentoApp />
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
            moveInput: { state: 'selectingMoveFrom' },
            theGame: game,
            branchFrom: -1,
            aiInfo: emptyAiInfo,
            positionChanged: true
        }
    )
    ReactDOM.render(
        <App store={store} />,
        document.getElementById("main-board")
    )
    return store
}
