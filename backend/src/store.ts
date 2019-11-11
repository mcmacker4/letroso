import { GameWrapper, Game } from "./controller";


const games = new Map<string, GameWrapper>()

export function fetch(id: string): GameWrapper {
    return games.get(id)
}

export function saveNew(game: Game) {
    games.set(game.id, {
        game,
        connections: []
    })
}