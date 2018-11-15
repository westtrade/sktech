import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux'

import thunk from 'redux-thunk'

import * as mainReducers from './reducers/main'

const middlewares = [
    applyMiddleware(thunk),
]

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
if (devTools) {
    middlewares.push(devTools)
}


const preloadedState = global.__PRELOADED_STATE__ || {}
delete global.__PRELOADED_STATE__

const store = createStore(
    combineReducers({
        ...mainReducers
    }),
    preloadedState,
    compose(
        ...middlewares
    )
)

export default store