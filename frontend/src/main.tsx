import { h, render } from 'preact'
import { useCallback } from 'preact/hooks'
import { createStore, Action } from 'redux'
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

function getCount(state: State) {
    return state.count
}

function CountView() {
    const count = useSelector(getCount)
    const dispatch = useDispatch()
    const increment = useCallback(() => dispatch('INCR'), [dispatch])
    return (
        <div>
            <h3>Count: {count}</h3>
            <button onClick={increment}>Increment</button>
        </div>
    )
}

function App() {
    return (
        <Provider store={store}>
            <CountView />
        </Provider>
    )
}

render(<App />, document.body)