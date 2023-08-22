export class Cell {
  constructor(private _cell: 'black' | 'white' | 'empty') {}

  get cell() {
    return this._cell
  }

  view(): string {
    switch (this._cell) {
      case 'black':
        return '●'
      case 'white':
        return '○'
      case 'empty':
        return ''
    }
  }
}

export class Game {
  constructor(private _board: Cell[][] = initialBoard()) {}

  get board(): Cell[][] {
    return this._board
  }
}

const initialBoard = (): Cell[][] => {
  let board: Cell[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(new Cell('empty')))

  // 初期配置
  board[3][3] = new Cell('white')
  board[3][4] = new Cell('black')
  board[4][3] = new Cell('black')
  board[4][4] = new Cell('white')

  return board
}
