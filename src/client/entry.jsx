import React from 'react'
import store from './store'
import * as mainActions from './store/actions/main'
import { hydrate } from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

store.dispatch(mainActions.refresh())

const protocol = location.protocol.replace('http', 'ws')
const ws = new WebSocket(`${protocol}//${location.host}/ws`)

ws.addEventListener('message', () => {
	const data = JSON.parse(event.data)
	store.dispatch(data)
})

const rootElement = document.getElementById('app')
if (rootElement) {
	hydrate(
		<BrowserRouter>
			<App store={store} />
		</BrowserRouter>,
		rootElement
	)
}
