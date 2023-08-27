'use client'

import { Game } from '@/Domains/Game'
import { Turn } from '@/Domains/Turn'
import { gameAtom } from '@/atoms/GameAtom'
import { Board } from '@/components/Board'
import { useEffect, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'
import Swal from 'sweetalert2'
import { loadingAtom } from '@/atoms/LoadingAtom'
import Loading from '@/components/Loading'
import { BoardUsecase } from '@/usecases/BoardUsecase'
import { GameUsecase } from '@/usecases/GameUsecase'

export default function Home() {
  const [game, setGame] = useRecoilState(gameAtom)
  const setLoading = useSetRecoilState(loadingAtom)

  const [myStone, setMyStone] = useState<'' | '黒' | '白'>('')
  const [board, setBoard] = useState(game.lastTurn().board)
  const [nextDisc, setNextDisc] = useState(game.lastTurn().nextDiscView)

  useEffect(() => {
    if (myStone) return
    ;(async () => {
      const stone = await Swal.fire({
        title: 'あなたの石は？',
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#000',
        confirmButtonText: '黒',
        cancelButtonText: '白',
        color: '#323245',
      })

      setMyStone(stone.isConfirmed ? '黒' : '白')
    })()
  }, [])

  useEffect(() => {
    if (!game.result) return

    if (game.result === 'win') {
      Swal.fire({
        title: 'あなたの勝ちです！',
        icon: 'success',
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        title: 'あなたの負けです！',
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }, [game])

  useEffect(() => {
    if (!myStone) return
    if (game.result) return

    const lastTurn = game.lastTurn()
    setBoard(lastTurn.board)
    setNextDisc(lastTurn.nextDiscView)

    Swal.fire({
      title: `次は${
        lastTurn.nextDiscView === myStone ? 'あなた' : 'ChatGPT'
      }の番です`,
      icon: 'info',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    })

    if (lastTurn.nextDiscView === myStone) return

    setLoading(true)
    setTimeout(async () => {
      await gpt()
      setLoading(false)
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  if (!myStone) return <></>

  const gpt = async () => {
    const body = {
      board: game.lastTurn().getBoardString(),
      stone: game.lastTurn().nextDisc,
    }
    const res = await fetch('/api/send-chatgpt', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const { content } = await res.json()

    // エラー時にはユーザーの勝利
    if (!content) {
      const newGame = new Game([...game.turns], 'win')
      setGame(newGame)
      return
    }

    const row = +content[1]
    const col = +content[4]

    const board = game.lastTurn().board

    const newBoard = BoardUsecase.flipCells(
      [...board],
      row,
      col,
      game.lastTurn().nextDisc
    )

    const nDisc = game.lastTurn().nextDisc === 'black' ? 'white' : 'black'

    const addTurn = new Turn(uuidV4(), game.turns.length, newBoard, nDisc)

    const newGame = new Game([...game.turns, addTurn])
    newGame.setResult(GameUsecase.judge(newGame, myStone))

    setGame(newGame)
  }

  return (
    <main className='container flex flex-col items-center'>
      <p>次は{nextDisc === myStone ? 'あなた' : 'ChatGPT'}の番です</p>
      <Board board={board} disabled={nextDisc === myStone} />
      <Loading />
    </main>
  )
}
