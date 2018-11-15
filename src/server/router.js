import express from 'express'
import * as db from './db'
import signale from 'signale'
import fs from 'fs'
import path from 'path'

import React from 'react'
import ReactDOMServer from 'react-dom/server';
import {
    StaticRouter
} from 'react-router-dom';

import App from '../client/components/App'
import {
    createStore,
    combineReducers,
} from 'redux'
import * as mainReducers from '../client/store/reducers/main'


const router = express.Router()

router.use((req, res, next) => {
    signale.info(`${new Date().toISOString()}: ${ req.method.toUpperCase() } ${ req.path }`)
    next()
})

const SPA_PATH = path.resolve(__dirname, '../../dist/index.html')
const spaController = (req, res, next) => {
    fs.readFile(SPA_PATH, (err, data) => {
        if (err) {
            return next(err)
        }

        let state = req.state || {}

        state = {
            ...state,
            posts: [
                ...db.list
            ]
        };

        const store = createStore(
            combineReducers({
                ...mainReducers
            }),
            state,
        )

        const app = ReactDOMServer.renderToString(
            <StaticRouter location={req.url}>
                <App store={store}/>
            </StaticRouter>
        );

        const preloadedState = `
        <script>
            window.__PRELOADED_STATE__ = ${ JSON.stringify(state) }
        </script>
        `

        let page = data.toString()
        res.send(page.replace(
            '<div id="app"></div>', `<div id="app">${app}</div>${ preloadedState }`
        ))
    })
}


router.get('/', spaController)
router.get('/post/:id', (req, res, next) => {
    req.state = {
        post: db.get(req.params.id)
    }
    next()
},spaController)


router.post('/posts/:id/like', (req, res, next) => {
    const result = db.like(req.params.id, req.body.client)
    if (!result) {
        return next()
    }

    res.json(result)
})

router.post('/posts', (req, res) => {
    const result = db.create(req.body.text)
    return res.json(result)
})


router.post('/posts/:id', async (req, res, next) => {
    if (!req.params.id) {
        return next()
    }

    const result = db.edit(req.params.id, req.body)
    if (!result) {
        return next()
    }

    return res.json(result)
})



router.get('/posts', (req, res) => res.json([...db.list]))

router.get('/posts/:id', async (req, res, next) => {
    if (!req.params.id) {
        return next()
    }

    const result = db.get(req.params.id)
    if (!result) {
        return next()
    }

    return res.json(result)
})




router.delete('/posts/:id', (req, res, next) => {
    if (!req.params.id) {
        return next()
    }

    const result = db.remove(req.params.id)
    return res.json(result)
})



export default router