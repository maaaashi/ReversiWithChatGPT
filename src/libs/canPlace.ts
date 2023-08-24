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

export const canPlace = (
  board: Cell[][],
  row: number,
  col: number,
  cell: 'black' | 'white'
): boolean => {
  const opponent = cell === 'black' ? 'white' : 'black'
  let result = false

  for (const [dx, dy] of directions) {
    let nRow = row + dx
    let nCol = col + dy

    if (nRow < 0 || 8 <= nRow || nCol < 0 || 8 <= nCol) {
      continue
    }

    if (board[nRow][nCol].cell !== opponent) {
      continue
    }

    nRow += dx
    nCol += dy

    let findEmpty = false

    while (nRow >= 0 && nRow < 8 && nCol >= 0 && nCol < 8 && !findEmpty) {
      if (board[nRow][nCol].cell === 'empty') findEmpty = true
      if (board[nRow][nCol].cell === cell) result = true
      nRow += dx
      nCol += dy
    }
  }

  return result
}
