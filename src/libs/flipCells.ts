import { Cell } from '@/Domains/Cell'

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

export const flipCells = (
  board: Cell[][],
  row: number,
  col: number,
  cell: 'black' | 'white'
): Cell[][] => {
  const opponent = cell === 'black' ? 'white' : 'black'
  let results: Cell[][] = [...Array(8)].fill(null).map((_, r_i) =>
    [...Array(8)].map((_, c_i) => {
      if (r_i === row && c_i === col) {
        return new Cell(cell)
      }
      return board[r_i][c_i]
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
      board[nx][ny].cell === opponent
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
      board[nx][ny].cell === cell
    ) {
      for (const stone of stonesToFlip) {
        results[stone.x][stone.y] = new Cell(cell)
      }
    }
  }

  return results
}
