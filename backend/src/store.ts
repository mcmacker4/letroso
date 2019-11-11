import { Game } from "./controller";

const games = new Map<string, Game>()

export function fetchGame(id: string): string {
    return games[id]
}

export function storeGame(game: Game) {
    games[game.id] = game
}
