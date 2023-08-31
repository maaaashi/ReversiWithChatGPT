import { Cell } from '@/domains/Cell'

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

export class BoardUsecase {
  constructor(private _board: Cell[][]) {}

  canPlace(row: number, col: number, cell: 'black' | 'white'): boolean {
    const opponent = cell === 'black' ? 'white' : 'black'
    let result = false

    for (const [dx, dy] of directions) {
      let nRow = row + dx
      let nCol = col + dy

      if (nRow < 0 || 8 <= nRow || nCol < 0 || 8 <= nCol) {
        continue
      }

      if (this._board[nRow][nCol].cell !== opponent) {
        continue
      }

      nRow += dx
      nCol += dy

      let findEmpty = false

      while (nRow >= 0 && nRow < 8 && nCol >= 0 && nCol < 8 && !findEmpty) {
        if (this._board[nRow][nCol].cell === 'empty') findEmpty = true
        if (this._board[nRow][nCol].cell === cell) result = true
        nRow += dx
        nCol += dy
      }
    }

    return result
  }

  flipCells(row: number, col: number, cell: 'black' | 'white'): Cell[][] {
    const opponent = cell === 'black' ? 'white' : 'black'
    let results: Cell[][] = [...Array(8)].fill(null).map((_, r_i) =>
      [...Array(8)].map((_, c_i) => {
        if (r_i === row && c_i === col) {
          return new Cell(cell)
        }
        return this._board[r_i][c_i]
      })
    )

    for (const [dx, dy] of directions) {
      let nx = row + dx
      let ny = col + dy
      let stonesToFlip: { x: number; y: number }[] = []

      while (
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        this._board[nx][ny].cell === opponent
      ) {
        stonesToFlip.push({ x: nx, y: ny })
        nx += dx
        ny += dy
      }

      if (
        stonesToFlip.length > 0 &&
        nx >= 0 &&
        nx < 8 &&
        ny >= 0 &&
        ny < 8 &&
        this._board[nx][ny].cell === cell
      ) {
        for (const stone of stonesToFlip) {
          results[stone.x][stone.y] = new Cell(cell)
        }
      }
    }

    return results
  }

  static initialBoard(): Cell[][] {
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
