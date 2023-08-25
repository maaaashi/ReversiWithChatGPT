'use client'

import { Game } from '@/Domains/Game'
import { Turn } from '@/Domains/Turn'
import { gameAtom } from '@/atoms/GameAtom'
import { Board } from '@/components/Board'
import { flipCells } from '@/libs/flipCells'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

export default function Home() {
  const [game, setGame] = useRecoilState(gameAtom)

  const [board, setBoard] = useState(game.lastTurn().board)
  const [nextDisc, setNextDisc] = useState(game.lastTurn().nextDiscView)

  useEffect(() => {
    const lastTurn = game.lastTurn()
    setBoard(lastTurn.board)
    setNextDisc(lastTurn.nextDiscView)
  }, [game])

  const gpt = async () => {
    const body = {
      board: game.lastTurn().getBoardString(),
      stone: game.lastTurn().nextDisc,
    }
    const res = await fetch('/api/send-chatgpt', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const json = await res.json()

    const row = json[1]
    const col = json[4]

    const board = game.lastTurn().board

    const newBoard = flipCells([...board], row, col, game.lastTurn().nextDisc)

    const nextDisc = game.lastTurn().nextDisc === 'black' ? 'white' : 'black'

    const addTurn = new Turn(uuidV4(), game.turns.length, newBoard, nextDisc)
    const newGame = new Game([...game.turns, addTurn])

    setGame(newGame)
  }

  return (
    <main className='container flex flex-col items-center'>
      <p>次は{nextDisc}の番です</p>
      <Board board={board} />
      <button className='btn' onClick={gpt}>
        send
      </button>
    </main>
  )
}
