import { Cell } from '@/Domains/Cell'
import { Game } from '@/Domains/Game'
import { Turn } from '@/Domains/Turn'
import { gameAtom } from '@/atoms/GameAtom'
import { canPlace } from '@/libs/canPlace'
import { flipCells } from '@/libs/flipCells'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

interface Props {
  board: Cell[][]
}

export const Board: FC<Props> = ({ board }) => {
  const [gameState, setGameState] = useRecoilState(gameAtom)

  const cellClick = (row: number, col: number) => {
    const board = gameState.lastTurn().board
    if (!canPlace(board, row, col, gameState.lastTurn().nextDisc)) return

    const newBoard = flipCells(
      [...board],
      row,
      col,
      gameState.lastTurn().nextDisc
    )

    const nextDisc =
      gameState.lastTurn().nextDisc === 'black' ? 'white' : 'black'

    const addTurn = new Turn(
      uuidV4(),
      gameState.turns.length,
      newBoard,
      nextDisc
    )
    const newGame = new Game([...gameState.turns, addTurn])

    setGameState(newGame)
  }

  const clickEnabled = (cell: Cell, row: number, col: number): boolean => {
    if (cell.view()) return true

    return !canPlace(board, row, col, gameState.lastTurn().nextDisc)
  }

  return (
    <main>
      {board.map((row, index) => {
        return (
          <div key={`row_${index}`} className='flex'>
            {row.map((cell, i) => {
              return (
                <div
                  className='border w-10 h-10 flex justify-center items-center bg-white'
                  key={`col_${i}`}
                >
                  {clickEnabled(cell, index, i) ? (
                    cell.view()
                  ) : (
                    <div
                      className='w-8 h-8 bg-base-200 hover:bg-base-300 cursor-pointer'
                      onClick={() => {
                        cellClick(index, i)
                      }}
                    ></div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </main>
  )
}
