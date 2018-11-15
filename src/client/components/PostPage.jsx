import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from './Post'
import { fetchPost } from '../store/actions/main'

class PostPage extends Component {
	componentDidMount() {
		const { id, loadPost } = this.props
		loadPost(id)
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Link to="/" className="btn btn-block btn-primary">
							Вернуться в ленту
						</Link>
						<br />
						<br />
						{this.props.post ? <Post {...this.props.post} /> : 'Загрузка...'}
					</div>
				</div>
			</div>
		)
	}
}

const mapProps = ({ post }, props) => {
	return {
		id: props.match.params.id,
		post,
	}
}

const mapDispatch = dispatch => ({
	loadPost: post => dispatch(fetchPost(post)),
})

export default withRouter(
	connect(
		mapProps,
		mapDispatch
	)(PostPage)
)
