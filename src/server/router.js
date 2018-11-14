import express from 'express'
import * as db from './db'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send('ok')
})

router.get('/post/:id', async (req, res) => {
    res.send('ok')
})

router.post('/posts', (req, res) => {
    const result = db.create(req.body.text)
    return res.json(result)
})


router.get('/posts/:id/like', (req, res, next) => {
    const result = db.like(req.params.id, req.body.client)
    if (!result) {
        return next()
    }

    res.json(result)
})

router.get('/posts', (req, res) => res.json(db.list))

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

router.post('/posts/:id', async (req, res, next) => {
    if (!req.params.id) {
        return next()
    }

    const result = db.edit(req.params.id, req.body)
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