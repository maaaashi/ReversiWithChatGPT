import { Cell } from '@/swap/Cell'
import { Game } from '@/swap/Game'

export class GameUsecase {
  constructor() {}

  static judge(game: Game, myStone: '黒' | '白'): Game['_result'] {
    const board = game.lastTurn().board
    const flatArray = board.reduce((acc, curr) => acc.concat(curr), [])

    if (flatArray.some((cell) => cell.cell === 'empty')) {
      return ''
    }

    const blackCount = flatArray.filter((cell) => cell.cell === 'black').length
    const whiteCount = flatArray.filter((cell) => cell.cell === 'white').length
    const stone = myStone === '黒' ? 'black' : 'white'

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
