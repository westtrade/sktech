import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { likePost } from '../store/actions/main'

const Post = ({ id, text, isLink = false, likes = [], toggleLike }) => (
	<div className="card" style={{ marginBottom: '15px' }}>
		<div className="card-body">
			{isLink ? (
				<Link to={`/post/${id}`}>
					<p className="card-text">{text}</p>
				</Link>
			) : (
				<p className="card-text">{text}</p>
			)}

			<div className="text-right">
				<a
					href="#"
					onClick={event => {
						toggleLike(id)
						event.preventDefault()
					}}
					data-post={id}
					className="btn btn-link"
				>
					<i className="far fa-fw fa-heart" /> {likes.length}
				</a>
			</div>
		</div>
	</div>
)

const mapDispatch = dispatch => ({
	toggleLike(post) {
		dispatch(likePost(post))
	},
})

export default connect(
	() => ({}),
	mapDispatch
)(Post)
