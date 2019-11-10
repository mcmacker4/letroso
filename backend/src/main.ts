import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as Router from 'koa-router'

import { game } from './routes/game'

const app = new Koa()

app.use(bodyparser())

const applyRouter = (router: Router) =>
    app.use(router.routes()).use(router.allowedMethods())

applyRouter(game)

app.listen(8080)