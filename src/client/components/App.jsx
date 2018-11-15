import React from 'react'
import { Provider } from 'react-redux'
import Navbar from './Navbar'
import FrontPage from './FrontPage'

import { Route, Switch } from 'react-router-dom'
import PostPage from './PostPage'

const App = ({ store }) => {
	return (
		<Provider store={store}>
			<div className="page layout">
				<Navbar />
				<br />
				<Switch>
					<Route exact path="/" component={FrontPage} />
					<Route path="/post/:id" component={PostPage} />
				</Switch>
			</div>
		</Provider>
	)
}

export default App
