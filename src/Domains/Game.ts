import { initialBoard } from '@/libs/initialBoard'
import { Turn } from './Turn'
import { v4 as uuidV4 } from 'uuid'
import { Cell } from './Cell'

export class Game {
  constructor(private _turns: Turn[] = []) {
    if (_turns.length === 0) this.newGame()
  }

  get turns(): Turn[] {
    return this._turns
  }

  lastTurn(): Turn {
    return this._turns[this._turns.length - 1]
  }

  newGame(): void {
    this._turns = []
    this._turns.push(new Turn(uuidV4(), 0, initialBoard(), 'black'))
  }
}
