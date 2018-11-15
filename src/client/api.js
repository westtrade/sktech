// import ky from 'ky'
import fetch from 'cross-fetch';



import {
    makeID
} from '../libs/index';

const CLIENT_ID = global.localStorage && localStorage.getItem('CLIENT_ID') || makeID()
if (global.localStorage) {
    localStorage.setItem('CLIENT_ID', CLIENT_ID)
}

export const list = () => {
    return fetch('/posts').then(resp => resp.json())
}

export const createPost = (text) => {
    return fetch('/posts', {
        method: 'POST',
        body: JSON.stringify({
            text
        }),
        headers: {
            'content-type': 'application/json'
        }
    }).then(resp => resp.json())
}

export const editPost = (id, data) => {
    return fetch(`/posts/${id}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        }

    }).then(resp => resp.json())
}

export const getPost = id => {
    return fetch(`/posts/${id}`).then(resp => resp.json())
}

export const like = id => {
    return fetch(`/posts/${ id }/like`, {
        method: 'POST',
        body: JSON.stringify({
            client: CLIENT_ID
        }),
        headers: {
            'content-type': 'application/json'
        }

    }).then(resp => resp.json())
}

export const remove = id => {
    return fetch(`/posts/${ id }`, {
        method: 'DELETE'
    }).then(resp => resp.json())
}


// export const test = async () => {
//     const post = await createPost('text')
//     console.log(post);

//     const data = await list()
//     console.log(data);

//     const editedPost = await editPost(post.id, {
//         text: 'azaza'
//     })

//     console.log(editedPost);

//     const likeData = await like(post.id)
//     console.log(likeData);

//     const dislikeData = await like(post.id)
//     console.log(dislikeData);

//     const removeData = await remove(post.id)
//     console.log(removeData);


//     const newData = await list()
//     console.log(newData);
// }