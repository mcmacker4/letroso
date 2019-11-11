import * as Router from 'koa-router'
import { newGame } from '../controller'
import { storeGame, fetchGame } from '../store'

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

game.get('/:id', async ctx => {
    const id = ctx.params['id']
    return fetchGame(id)
})

game.post('/new', async ctx => {
    const props = ctx.request.body as NewGameParams
    if (!props) throw new Error("Request did not contain a body.")
    if (!(typeof props.rounds === 'number' && props.categories instanceof Array)) throw new Error("Malformed request body.")
    if (props.rounds < 1 || props.rounds > 10) throw new Error("Invalid number of rounds")
    if (props.categories.length < 1 || props.categories.length > 10) throw new Error("Invalid number of categories.")
    if (props.categories.some(cat => cat.length < 3 || cat.length > 20)) throw new Error("Invalid categories.")
    const game = newGame(props.categories, props.rounds)
    storeGame(game)
    return game.id
})