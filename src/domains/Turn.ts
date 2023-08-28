import { Cell } from './Cell'

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

  get turnCount() {
    return this._turnCount
  }

  get nextDisc(): 'black' | 'white' {
    return this._nextDisc
  }

  get nextDiscView(): '黒' | '白' {
    switch (this._nextDisc) {
      case 'black':
        return '黒'
      case 'white':
        return '白'
    }
  }

  getBoardString(): string {
    return JSON.stringify(
      this._board.map((row) => {
        return row.map((col) => {
          switch (col.cell) {
            case 'empty':
              return 0
            case 'white':
              return 1
            case 'black':
              return -1
          }
        })
      })
    )
  }
}
