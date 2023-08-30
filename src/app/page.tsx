'use client'

import { Game } from '@/domains/Game'
import { Turn } from '@/domains/Turn'
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
import { myStoneAtom } from '@/atoms/MyStoneAtom'
import PassButton from '@/components/Buttons/Pass'
import TurnLog from '@/components/TurnLog/indesx'
import Status from '@/components/Status'
import { Header } from '@/components/Header'

export default function Home() {
  const [game, setGame] = useRecoilState(gameAtom)
  const setLoading = useSetRecoilState(loadingAtom)

  const [myStone, setMyStone] = useRecoilState(myStoneAtom)
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
  }, [game, myStone])

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
      showConfirmButton: false,
      showClass: {
        popup: 'animate__animated animate__backInLeft',
      },
    })

    if (lastTurn.nextDiscView === myStone) return

    setLoading(true)
    setTimeout(async () => {
      await gpt()
      setLoading(false)
    }, 1000)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, myStone])

  if (!myStone) return <></>

  const gpt = async () => {
    const body = {
      board: game.lastTurn().getBoardString(),
      stone: game.lastTurn().nextDisc,
    }
    let res: Response | undefined = undefined
    let conti = true

    while (conti) {
      const response: Response = await fetch('/api/send-chatgpt', {
        method: 'POST',
        body: JSON.stringify(body),
      })

      if (response.status === 200) {
        conti = false
        res = response
      }
    }

    if (!res) return

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
    <main
      className='bg-base-300 h-screen overflow-hidden w-full flex flex-col'
      style={{ height: '100vh !important' }}
    >
      <Header />
      <div className='container mx-auto overflow-y-auto flex flex-1 p-5 flex-col gap-5 items-center'>
        <div className='flex gap-5 flex-col md:flex-row'>
          <div className='w-full flex flex-col gap-5 self-end items-center bg-base-200 p-5 rounded-lg md:w-44'>
            <div>
              <p>{nextDisc === myStone ? 'あなた' : 'ChatGPT'}の番です</p>
              <Loading />
            </div>
            <PassButton />
          </div>
          <Board board={board} disabled={nextDisc === myStone} />
          <div className='hidden md:flex flex-col items-center w-44'>
            <TurnLog />
          </div>
        </div>
        <Status />
      </div>
    </main>
  )
}
