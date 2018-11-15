import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'

const PostFeed = ({ posts = [] }) => (
	<div className="posts feed">
		{!posts.length && (
			<div className="alert alert-info" role="alert">
				Лента пуста
			</div>
		)}
		{posts.map(post => (
			<Post key={post.id} isLink={true} {...post} />
		))}
	</div>
)

const mapProps = ({ posts }) => ({
	posts,
})

export default connect(mapProps)(PostFeed)
