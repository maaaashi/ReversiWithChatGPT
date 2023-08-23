import { Cell } from '@/Domains/Cell'
import { Game } from '@/Domains/Game'
import { Turn } from '@/Domains/Turn'
import { gameAtom } from '@/atoms/GameAtom'
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

    const newBoard = [...Array(8)].map((_, r) => {
      return [...Array(8)].map((_, c) => {
        if (r === row && c === col) {
          return new Cell(gameState.lastTurn().nextDisc)
        }
        return board[r][c]
      })
    })

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
                  {cell.view() ? (
                    cell.view()
                  ) : (
                    <div
                      className='w-8 h-8 hover:bg-base-200 cursor-pointer'
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
