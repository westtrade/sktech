import assert from 'assert'

/**
 * @typedef Post
 * @param {String} id Post id
 * @param {Stirng} text Post content
 * @param {Array[string]} likes Likes counter
 */


/**
 * @param {Array<Post>} list - Array of posts
 */
export let list = []

/**
 * Post id generator
 */
const makeID = () => '_' + Math.random().toString(36).substr(2, 9);

/**
 * Create post with content
 */
export const create = (text) => {
    assert(typeof text === 'string', `text: Text field must be a string`)
    assert(text.length >= 1, `text: Text can't be empty`)

    const post = {
        id: makeID(),
        text,
        likes: 0
    }

    list.push(post)
    return post
}

/**
 * Get post by id
 * @param {String} id Post id
 */
export const get = (id) => list.find(_ => _.id === id)

/**
 * Remove post by id
 * @param {String} id Post id
 */
export const remove = (id) => (list = list.filter(_ => _.id !== id) && true)

/**
 * Filter unique items
 * @param {Any} val Current value
 * @param {Number} idx Element index
 * @param {Array<any>} arr Array of items
 */
const unqiue = (val, idx, arr) => arr.indexOf(val) === idx

/**
 * 
 * @param {String} id Post
 * @param {Post} param1 
 */
export const edit = (id, {
    text,
    likes = []
} = {}) => {

    if (typeof text === 'string') {
        assert(text.length >= 1, `text: Text can't be empty`)
    }

    list = list.reduce((result, item) => {

        if (item.id === id) {
            likes = likes.filter(unqiue)

            item = {
                text,
                likes,
                ...item
            }
        }

        return [...result, item]
    }, [])

    return find(id)
}


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