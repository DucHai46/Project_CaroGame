export class Room {
    id: number = 0
    player_1: string = '___'
    player_2: string = '___'
    chessBoard_state: string = ''
    score_1: number = 0
    score_2: number = 0
    turn: number = 1

    constructor() { }
}