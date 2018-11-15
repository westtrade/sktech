import {
    TOGGLE_PAGE_LOADING,
    TOGGLE_FORM_LOADING,
    SET_FORM_ERROR,
    SET_POSTS,
    SET_FIED_VALUE,
    RESET_FORM,
    UPDATE_POST,
    ADD_POST,
    VIEW_POST
} from '../types';

export const loading = (state = false, {
    type,
    loading
}) => {
    if (type === TOGGLE_PAGE_LOADING) {
        if (typeof loading !== 'undefined') {
            return !!loading
        }

        return !state
    }

    return state
}


export const posts = (state = [], {
    type,
    posts = [],
    post
}) => {
    if (type === SET_POSTS) {
        return [
            ...posts
        ]
    }

    if (type === UPDATE_POST) {
        return state.reduce((result, currentPost) => {
            if (currentPost.id === post.id) {
                currentPost = post
            }
            return [...result, currentPost]
        }, []).sort((prev, next) => next.createdAt - prev.createdAt)
    }



    if (type === ADD_POST) {
        return [
            ...state,
            post
        ].sort((prev, next) => next.createdAt - prev.createdAt)
    }

    return state
}


export const post = (state = null, {
    type,
    post
}) => {
    if (type === VIEW_POST) {
        return post
    }

    if (type === UPDATE_POST && state) {
        if (state.id === post.id) {
            return post
        }
    }

    return state
}



const defaultFormData = {
    id: null,
    likes: [],
    content: '',
    errors: [],
    canSend: true,
}

export const form = (state = defaultFormData, {
    type,
    error,
    name,
    value,
    loading
}) => {
    if (type === SET_FORM_ERROR) {
        return {
            ...state,
            errors: [error]
        }
    }

    if (type === SET_FIED_VALUE) {
        return {
            ...state,
            errors: [],
            [name]: value
        }
    }


    if (type === RESET_FORM) {
        return {
            ...defaultFormData
        }
    }

    if (type === TOGGLE_FORM_LOADING) {
        const canSend = typeof loading !== 'undefined' ? !loading : !state.canSend
        return {
            ...state,
            canSend
        }
    }

    return {
        ...state
    }
}