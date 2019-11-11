import * as WebSocket from 'ws'
import { Server } from 'http'
import { joinGame, rejoinGame } from './controller'

export interface WsMessage {
    type: 'JOIN' | 'REJOIN'
    name?: string
    game?: string
}

export function createWsServer(server: Server): WebSocket.Server {
    const wss = new WebSocket.Server({ server })
    wss.on('connection', socket => {
        console.log("Incoming connection!")
        socket.once('message', data => {
            try {
                const msg = JSON.parse(data.toString()) as WsMessage
                if (msg.type === 'JOIN') {
                    joinGame(msg.game, msg.name, socket)
                } else if (msg.type === 'REJOIN') {
                    rejoinGame(msg.game, msg.name, socket)
                } else {
                    socket.send(JSON.stringify({ error: 'First message should be a JOIN message.' }))
                    socket.close(1000, 'First message should be a JOIN message.')
                }
            } catch (err) {
                console.error(err)
                socket.send(JSON.stringify({ error: 'Malformed or invalid payload.' }))
                socket.close(1000, 'Malformed or invalid payload.')
            }
        })
    })
    return wss
}