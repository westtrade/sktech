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

const store = createStore(
    combineReducers({
        ...mainReducers
    }),
    compose(
        ...middlewares
    )
)



export default store