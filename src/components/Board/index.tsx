import { Cell } from '@/domains/Cell'
import { Game } from '@/domains/Game'
import { Turn } from '@/domains/Turn'
import { gameAtom } from '@/atoms/GameAtom'
import { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuidV4 } from 'uuid'
import { BoardUsecase } from '@/usecases/BoardUsecase'
import { myStoneAtom } from '@/atoms/MyStoneAtom'

interface Props {
  board: Cell[][]
  disabled: boolean
}

export const Board: FC<Props> = ({ board, disabled }) => {
  const [gameState, setGameState] = useRecoilState(gameAtom)
  const myStone = useRecoilValue(myStoneAtom)

  const cellClick = (row: number, col: number) => {
    if (!myStone) return

    const board = gameState.lastTurn().board
    const boardUsecase = new BoardUsecase(board)

    if (!boardUsecase.canPlace(row, col, gameState.lastTurn().nextDisc)) return

    const newBoard = boardUsecase.flipCells(
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
    if (gameState.result) return true

    const boardUsecase = new BoardUsecase(board)

    return !boardUsecase.canPlace(row, col, gameState.lastTurn().nextDisc)
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
