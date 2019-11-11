import * as Router from 'koa-router'
import { newGame } from '../controller'
import * as store from '../store'

export const game = new Router({ prefix: '/game' })


/*
Params:
    - Categories: string[]
    - Rounds: number
Returns:
    - Map code
*/
interface NewGameParams {
    categories: string[]
    rounds: number
}

const okPayload = (result: any) => ({
    status: 'Ok',
    result
})

game.get('/:id', async ctx => {
    const id = ctx.params['id']
    const wrapper = store.fetch(id)
    if (!wrapper) {
        ctx.status = 404
        throw new Error("Game not found.")
    }
    ctx.body = okPayload(wrapper.game)
})

game.post('/new', async ctx => {
    const props = ctx.request.body as NewGameParams
    if (!props) {
        throw new Error("Request did not contain a body.")
    } else if (!(typeof props.rounds === 'number' && props.categories instanceof Array)) {
        throw new Error("Malformed request body.")
    } else if (props.rounds < 1 || props.rounds > 10) {
        throw new Error("Invalid number of rounds")
    } else if (props.categories.length < 1 || props.categories.length > 10) {
        throw new Error("Invalid number of categories.")
    } else if (props.categories.some(cat => cat.length < 3 || cat.length > 20)) {
        throw new Error("Invalid categories.")
    }
    const game = newGame(props.categories, props.rounds)
    store.saveNew(game)
    ctx.body = okPayload(game.id)
})