import assert from 'assert'
import {
    makeID,
    unique
} from '../libs'

import ws from './ws'
import {
    ADD_POST,
    UPDATE_POST
} from '../client/store/types';

/**
 * @typedef Post
 * @param {String} id Post id
 * @param {Stirng} text Post content
 * @param {Array[string]} likes Likes counter
 * @param {Number} createdAt Created timestamp
 * @param {Number} updatedAt Created timestamp
 */


/**
 * @param {Array<Post>} list - Array of posts
 */
export let list = []

/**
 * Create post with content
 */
export const create = (text) => {
    assert(typeof text === 'string', `text: Text field must be a string`)
    assert(text.length >= 1, `text: Text can't be empty`)

    const post = {
        id: makeID(),
        text,
        likes: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    }

    ws.broadcast({
        type: ADD_POST,
        post,
    })

    list = [post, ...list]
    return post
}

/**
 * Get post by id
 * @param {String} id Post id
 */
export const get = (id) => {
    return list.find(_ => _.id === id)
}

/**
 * Remove post by id
 * @param {String} id Post id
 */
export const remove = id => {
    const post = get(id)
    if (!post) {
        return
    }

    list = list.filter(_ => _.id !== id)
    return true
}

/**
 * 
 * @param {String} id Post
 * @param {Post} param1 
 */
export const edit = (id, {
    text,
    likes
} = {}) => {
    if (typeof text === 'string') {
        assert(text.length >= 1, `text: Text can't be empty`)
    }

    list = list.reduce((result, item) => {

        if (item.id === id) {
            if (likes) {
                likes = likes.filter(unique)
            }

            item = {
                ...item,
                text: text || item.text,
                likes: likes || item.likes,
                updatedAt: Date.now(),
            }

            ws.broadcast({
                type: UPDATE_POST,
                post: item,
            })
        }

        return [...result, item]
    }, [])

    return get(id)
}

/**
 * Like/Dislike post
 * @param {String} id Post id
 * @param {String} client Client id
 */
export const like = (id, client) => {
    const post = get(id)
    if (!post) {
        return
    }

    const likes = post.likes.includes(client) ?
        post.likes.filter(_ => _ !== client) : [...post.likes, client]

    return edit(id, {
        likes
    })
}