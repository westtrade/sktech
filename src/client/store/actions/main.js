import * as api from '../../api'

import {
    TOGGLE_PAGE_LOADING,
    SET_FORM_ERROR,
    SET_POSTS,
    SET_FIED_VALUE,
    RESET_FORM,
    TOGGLE_FORM_LOADING,
    UPDATE_POST,
    ADD_POST,
    VIEW_POST
} from '../types';


export const loading = loading => ({
    type: TOGGLE_PAGE_LOADING,
    loading
})


export const formLoading = loading => ({
    type: TOGGLE_FORM_LOADING,
    loading
})

export const setFormError = error => ({
    type: SET_FORM_ERROR,
    error,
})


export const setPostList = posts => ({
    type: SET_POSTS,
    posts
})


export const setFieldValue = (name, value) => ({
    type: SET_FIED_VALUE,
    name,
    value
})

export const resetForm = () => ({
    type: RESET_FORM
})


export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})

export const refresh = () => async dispatch => {
    dispatch(loading(true))

    try {
        const posts = await api.list()
        dispatch(setPostList(posts))
    } catch (error) {
        dispatch(setFormError(error.message))
    }


    dispatch(loading(false))
}


export const createPost = text => async (dispatch) => {
    dispatch(loading(true))

    try {
        const post = await api.createPost(text)
        // dispatch(addPost(post))
    } catch (error) {
        dispatch(setFormError(error))
    }

    dispatch(loading(false))
}

export const sendForm = () => async (dispatch, getState) => {
    const {
        form
    } = getState()

    if (!form.canSend) {
        return
    }

    dispatch(formLoading(true))

    await dispatch(createPost(form.text))
    dispatch(resetForm())

    dispatch(formLoading(false))
}


export const likePost = (id) => async dispatch => {
    try {
        const post = await api.like(id)
        dispatch(updatePost(post))
    } catch (error) {
        console.log(error)
    }
}

export const viewPost = (post = null) => ({
    type: VIEW_POST,
    post
})

export const fetchPost = id => async dispatch => {
    dispatch(loading(true))
    dispatch(viewPost(null))

    try {
        const post = await api.getPost(id)
        dispatch(viewPost(post))
    } catch (error) {
        console.log(error);
    }

    dispatch(loading(false))
}