import ws from 'ws'

const wsServer = new ws.Server({
    noServer: true
})

wsServer.broadcast = function broadcast(data) {
    wsServer.clients.forEach(function each(client) {
        if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};


export default wsServer