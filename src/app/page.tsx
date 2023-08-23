'use client'

import { gameAtom } from '@/atoms/GameAtom'
import { Board } from '@/components/Board'
import { useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function Home() {
  const game = useRecoilValue(gameAtom)

  const [board, setBoard] = useState(game.lastTurn().board)
  const [nextDisc, setNextDisc] = useState(game.lastTurn().nextDisc)

  useEffect(() => {
    const lastTurn = game.lastTurn()
    setBoard(lastTurn.board)
    setNextDisc(lastTurn.nextDisc)
  }, [game])

  return (
    <main className='container flex flex-col items-center'>
      <p>次は{nextDisc}の番です</p>
      <Board board={board} />
    </main>
  )
}
