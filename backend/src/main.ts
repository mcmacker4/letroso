import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as Router from 'koa-router'

import { game } from './routes/game'

const app = new Koa()

app.use(bodyparser())

app.use(async (ctx, next) => {
    try {
        const result = await next();
        ctx.body = {
            status: 'Ok',
            result
        }
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

app.listen(8080)