import { h, render, Component } from 'preact'
import { createStore, Store, Action } from 'redux'
import { Provider, useSelector, useDispatch } from 'react-redux'

interface State {
    count: number
}

const store = createStore((oldState?: State, action?: Action) => {
    const state = oldState || { count: 0 }
    if (action && action.type == 'INCR') {
        return {
            count: state.count + 1
        }
    }
    return state
})

function CountView() {
    const count = useSelector((state: State) => state.count)
    const incr = useDispatch()
    return (
        <h3>{count}</h3>
    )
}

function App() {
    return (
        <Provider store={store}>
            <CountView />
        </Provider>
    )
}

console.log("Hello World")

render(<App />, document.body)