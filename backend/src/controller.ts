import * as id from 'shortid'

export interface Game {
    id: string
    players: string[]

    categories: string[]
    answers: { [player: string]: string }
    scores: { [player: string]: boolean }

    rounds: number
    currentRound: number
}


export function newGame(categories: string[], rounds: number) {
    return {
        id: id.generate(),
        players: [],

        categories,
        answers: {},
        scores: {},

        rounds,
        currentRound: 0
    }
}