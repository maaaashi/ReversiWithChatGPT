import { Turn } from './Turn'
import { v4 as uuidV4 } from 'uuid'
import { Cell } from './Cell'

export class Game {
  constructor(
    private _turns: Turn[] = [],
    private _result: 'win' | 'lose' | 'draw' | '' = ''
  ) {
    if (_turns.length === 0) this.newGame()
  }

  get turns(): Turn[] {
    return this._turns
  }

  get result(): 'win' | 'lose' | 'draw' | '' {
    return this._result
  }

  lastTurn(): Turn {
    return this._turns[this._turns.length - 1]
  }

  newGame(): void {
    this._turns = []
    this._turns.push(new Turn(uuidV4(), 0, this.initialBoard(), 'black'))
  }

  setResult(re: 'win' | 'lose' | 'draw' | ''): void {
    this._result = re
  }

  initialBoard(): Cell[][] {
    let board: Cell[][] = [...Array(8)]
      .fill(null)
      .map(() => [...Array(8)].map(() => new Cell('empty')))

    board[3][3] = new Cell('white')
    board[3][4] = new Cell('black')
    board[4][3] = new Cell('black')
    board[4][4] = new Cell('white')

    return board
  }
}
