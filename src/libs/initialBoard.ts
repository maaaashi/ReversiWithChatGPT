import { Cell } from '@/Domains/Cell'

export const initialBoard = (): Cell[][] => {
  let board: Cell[][] = Array(8)
    .fill(null)
    .map(() => Array(8).fill(new Cell('empty')))

  board[3][3] = new Cell('white')
  board[3][4] = new Cell('black')
  board[4][3] = new Cell('black')
  board[4][4] = new Cell('white')

  return board
}
