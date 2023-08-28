import { Cell } from '@/swap/Cell'
import { Game } from '@/swap/Game'
import { Turn } from '@/swap/Turn'
import { gameAtom } from '@/atoms/GameAtom'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'
import { BoardUsecase } from '@/usecases/BoardUsecase'

interface Props {
  board: Cell[][]
  disabled: boolean
}

export const Board: FC<Props> = ({ board, disabled }) => {
  const [gameState, setGameState] = useRecoilState(gameAtom)

  const cellClick = (row: number, col: number) => {
    const board = gameState.lastTurn().board
    if (!BoardUsecase.canPlace(board, row, col, gameState.lastTurn().nextDisc))
      return

    const newBoard = BoardUsecase.flipCells(
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

    return !BoardUsecase.canPlace(
      board,
      row,
      col,
      gameState.lastTurn().nextDisc
    )
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
                  ) : disabled ? (
                    <div
                      className='w-8 h-8 bg-base-200 hover:bg-base-300 cursor-pointer'
                      onClick={() => {
                        cellClick(index, i)
                      }}
                    ></div>
                  ) : (
                    cell.view()
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
