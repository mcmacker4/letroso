import * as id from 'shortid'
import * as WebSocket from 'ws'

import * as store from './store'
import { WsMessage } from './websocket'

export interface GameWrapper {
    game: Game
    connections: WebSocket[]
}

export interface Game {
    id: string
    players: string[]

    categories: string[]
    answers: { [player: string]: string }
    scores: { [player: string]: boolean }

    rounds: number
    status: 'PRE_ROUND' | 'ROUND' | 'FINISHED'
    currentRound: number
    letter?: string
}

export function newGame(categories: string[], rounds: number): Game {
    return {
        id: id.generate(),
        players: [],

        categories,
        answers: {},
        scores: {},

        status: 'PRE_ROUND',
        rounds,
        currentRound: 0
    }
}

export function joinGame(id: string, name: string, socket: WebSocket) {
    const wrapper = store.fetch(id)
    if (wrapper) {
        const { game, connections } = wrapper
        if (game.players.indexOf(name) >= 0) {
            socket.send(JSON.stringify({ error: 'Name already in use.' }))
            socket.close(1000, 'Name already in use.')
        } else {
            const idx = game.players.length
            game.players.push(name)
            connections.push(socket)
            socket.on('close', () => connections[idx] = null)
            socket.on('message', data => {
                const msg = JSON.parse(data.toString())
                execMessage(msg, game)
            })
            socket.send(JSON.stringify({ status: "JOIN_OK" }))
        }
    } else {
        socket.send(JSON.stringify({ error: 'Game not found.' }))
        socket.close(1000, 'Game not found.')
    }
}

export function rejoinGame(id: string, name: string, socket: WebSocket) {
    const { game, connections } = store.fetch(id)
    const idx = game.players.indexOf(name)
    if (idx >= 0 && connections[idx] == null) {
        connections[idx] = socket
        socket.on('message', data => {
            const msg = JSON.parse(data.toString())
            execMessage(msg, game)
        })
        socket.send(JSON.stringify({ status: "REJOIN_OK" }))
    } else {
        socket.send(JSON.stringify({ error: "Username not found in game." }))
    }
}

function execMessage(msg: WsMessage, game: Game) {
    
}