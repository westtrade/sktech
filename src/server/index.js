import express from 'express'
import router from './router'
import bodyParser from 'body-parser'
import http from 'http'
import ws from './ws'
import url from 'url'
import path from 'path'
import isHeroku from 'is-heroku'

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

const PORT = isHeroku ? 80 : 3000

server.listen(PORT, () =>
    console.log(`Server runned at: http://localhost:${PORT}/`)
)