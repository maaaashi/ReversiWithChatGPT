import { Cell } from './Cell'
import { Move } from './Move'

export class Turn {
  constructor(
    private _id: string,
    private _turnCount: number,
    private _board: Cell[][],
    private _nextDisc: 'black' | 'white'
  ) {}

  get board() {
    return this._board
  }

  get nextDisc(): 'black' | 'white' {
    return this._nextDisc
  }

  get nextDiscView(): string {
    switch (this._nextDisc) {
      case 'black':
        return '黒'
      case 'white':
        return '白'
    }
  }
}
