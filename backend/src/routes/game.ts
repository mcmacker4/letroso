import * as Router from 'koa-router'

export const game = new Router({ prefix: '/game' })


/*
Params:
    - Categories: string[]
    - Rounds: number
    - Name: string
Returns:
    - Map code
*/
game.post('/new', async ctx => {
    
})