import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as Router from 'koa-router'

import { game } from './routes/game'
import { createServer } from 'http'
import { createWsServer } from './websocket'

const app = new Koa()

app.use(bodyparser())

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = 400
        ctx.body = {
            status: 'Error',
            description: err.message
        }
    }
})

const applyRouter = (router: Router) =>
    app.use(router.routes()).use(router.allowedMethods())

applyRouter(game)

const httpServer = createServer(app.callback())
const wsServer = createWsServer(httpServer)

wsServer.on('listening', () => console.log("WebSocket Server Listening."))
httpServer.listen(8080, () => console.log("HTTP Server Listening."))