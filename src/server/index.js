import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
import http from 'http'
import ws from './ws'
import url from 'url'
import path from 'path'
import * as db from './db'
import signale from 'signale'


const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
const STATIC_PATH = path.resolve(__dirname, '../../dist')

app.use(router)
app.use(express.static(STATIC_PATH))

const server = http.createServer(app)
server.on('upgrade', (req, socket, head) => {
    const pathname = url.parse(req.url).pathname;
    if (pathname === '/ws') {
        return ws.handleUpgrade(req, socket, head, wsSocket => ws.emit('connection', wsSocket, req))
    }

    socket.destroy()
})

const PORT = process.env.PORT || 3000

const timeout = (ms = 300) => new Promise(resolve => {
    const timer = setTimeout(() => resolve(timer), ms)
})

const ticker = async (onTick, ms) => {
    signale.info('tick')
    await timeout(ms)
    await onTick && onTick()
    await ticker(onTick, ms)
}

async function main() {
    await db.synchronize()

    server.listen(PORT, () =>
        console.log(`Server runned at: http://localhost:${PORT}/`)
    )

    ticker(db.synchronize, 1500)
}

main()