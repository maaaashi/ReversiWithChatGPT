import { Cell } from '@/Domains/Cell'
import { gameState } from '@/atoms/GameAtom'
import { FC } from 'react'
import { useSetRecoilState } from 'recoil'

interface Props {
  board: Cell[][]
}

export const Board: FC<Props> = ({ board }) => {
  const setGameState = useSetRecoilState(gameState)

  const cellClick = (row: number, col: number) => {
    return
  }

  return (
    <main>
      {board.map((row, index) => {
        return (
          <div key={index} className='flex'>
            {row.map((cell, i) => {
              return (
                <div
                  className='border w-10 h-10 flex justify-center items-center bg-white'
                  key={i}
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
