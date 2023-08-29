import { gameAtom } from '@/atoms/GameAtom'
import { Game } from '@/domains/Game'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Status = () => {
  const game = useRecoilValue(gameAtom)

  const count = (color: 'black' | 'white') => {
    const lastTurnBoard = game
      .lastTurn()
      .board.reduce((acc, curr) => acc.concat(curr), [])

    return lastTurnBoard.filter((cell) => cell.cell === color).length
  }

  return (
    <div className='bg-base-200 w-full rounded-lg p-10 flex justify-evenly'>
      <div>黒: {count('black')}</div>
      <div>白: {count('white')}</div>
    </div>
  )
}

export default Status
