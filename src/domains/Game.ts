import { Turn } from './Turn'
import { v4 as uuidV4 } from 'uuid'
import { Cell } from './Cell'
import { BoardUsecase } from '@/usecases/BoardUsecase'

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
    this._turns.push(
      new Turn(uuidV4(), 0, BoardUsecase.initialBoard(), 'black')
    )
  }

  setResult(re: 'win' | 'lose' | 'draw' | ''): void {
    this._result = re
  }
}
