import { Game } from '@/Domains/Game'
import { FC } from 'react'

interface Props {
  game: Game
}

export const Board: FC<Props> = ({ game }) => {
  return (
    <main>
      {game.board.map((row, index) => {
        return (
          <div key={index} className='flex'>
            {row.map((cell, i) => {
              return (
                <div
                  className='border w-10 h-10 flex justify-center items-center bg-white'
                  key={i}
                >
                  {cell.view()}
                </div>
              )
            })}
          </div>
        )
      })}
    </main>
  )
}
