import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = ({ loading }) => (
	<nav className="navbar navbar-light bg-light">
		<Link to="/" className="navbar-brand mb-0 h1 mx-auto">
			{!loading ? (
				<i className="fab fa-fw fa-twitter" />
			) : (
				<i className="fas fa-spin fa-spinner" />
			)}
		</Link>
	</nav>
)

const mapProps = ({ loading }) => ({ loading })

export default connect(mapProps)(Navbar)
