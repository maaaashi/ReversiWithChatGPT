import { Game } from '@/domains/Game'

export class GameUsecase {
  constructor(private _game: Game) {}

  judge(myStone: '黒' | '白'): Game['_result'] {
    const board = this._game.lastTurn().board
    const stone = myStone === '黒' ? 'black' : 'white'

    const flatArray = board.reduce((acc, curr) => acc.concat(curr), [])

    const redicer = flatArray.reduce(
      (acc, curr) => {
        acc[curr.cell] += 1
        return acc
      },
      { black: 0, white: 0, empty: 0 }
    )

    if (redicer.black === 0 || redicer.white === 0) {
      switch (true) {
        case redicer.black === 0:
          return stone === 'black' ? 'lose' : 'win'
        case redicer.white === 0:
          return stone === 'white' ? 'lose' : 'win'
      }
    }

    if (flatArray.some((cell) => cell.cell === 'empty')) {
      return ''
    }

    const blackCount = flatArray.filter((cell) => cell.cell === 'black').length
    const whiteCount = flatArray.filter((cell) => cell.cell === 'white').length

    switch (true) {
      case blackCount < whiteCount:
        return stone === 'black' ? 'lose' : 'win'
      case whiteCount < blackCount:
        return stone === 'white' ? 'lose' : 'win'
      default:
        return 'draw'
    }
  }
}
