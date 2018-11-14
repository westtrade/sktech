import {
    START_PAGE_LOADING,
    STOP_PAGE_LOADING
} from '../types';

export const loading = (state = false, action) => {
    if (action.type === START_PAGE_LOADING) {
        return true
    }

    if (action.type === STOP_PAGE_LOADING) {
        return false
    }

    return state
}


export const posts = (state = [], action) => {


    return state
}


const defaultFormData = {
    id: null,
    likes: 0,
    content: '',
}

export const form = (state = defaultFormData, action) => {
    return {
        ...state
    }
}