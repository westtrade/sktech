import React from 'react'
import PostForm from './PostForm'
import PostFeed from './Feed'

const FrontPage = ({}) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<PostForm />

					<br />

					<PostFeed />
				</div>
			</div>
		</div>
	)
}

export default FrontPage
