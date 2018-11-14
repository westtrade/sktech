import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    res.send('ok')
})

router.get('/post/:id', async (req, res) => {
    res.send('ok')
})

router.post('/posts', async (req, res) => {
    res.send('ok')
})

router.get('/posts/:id', async (req, res) => {

})

router.get('/posts', async (req, res) => {
    res.send('ok')
})

export default router