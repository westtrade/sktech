import React from 'react'
import { connect } from 'react-redux'
import { setFieldValue, sendForm } from '../store/actions/main'

const PostForm = ({
	id = null,
	text = '',
	canSend = true,
	postData,
	setField,
}) => {
	return (
		<div className="card">
			<form className="card-body" onSubmit={postData}>
				<div className="form-group">
					<textarea
						name="text"
						id="text-field"
						rows="3"
						onChange={setField}
						className="form-control"
						placeholder="Введите текст..."
						value={text}
					/>
				</div>

				<button
					type="submit"
					disabled={!canSend}
					className="btn btn-block btn-primary"
				>
					{canSend ? 'Создать' : <i className="fas fa-spin fa-spinner" />}
				</button>
			</form>
		</div>
	)
}

const mapProps = ({ form }) => ({
	...form,
})

const mapDispatch = dispatch => ({
	postData: event => {
		event.preventDefault()
		dispatch(sendForm())
	},
	setField: ({ target: { value, name } }) =>
		dispatch(setFieldValue(name, value)),
})

export default connect(
	mapProps,
	mapDispatch
)(PostForm)
