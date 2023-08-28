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

  const pass = () => {
    const nDisc = game.lastTurn().nextDisc === 'black' ? 'white' : 'black'

    const addTurn = new Turn(
      uuidV4(),
      game.turns.length,
      game.lastTurn().board,
      nDisc
    )

    const newGame = new Game([...game.turns, addTurn])
    setGame(newGame)
  }

  const clickLog = async (turn: Turn) => {
    const confirm = await Swal.fire({
      title: `${turn.turnCount + 1}: ${turn.nextDiscView}に戻ります`,
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#000',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      color: '#323245',
    })

    if (!confirm.isConfirmed) return

    const newGame = new Game(game.turns.slice(0, turn.turnCount + 2))
    setGame(newGame)
  }

  return (
    <main className='container mx-auto overflow-y-auto h-full flex flex-1 justify-around p-5 flex-col gap-5 md:flex-row md:gap-0'>
      <div className='flex flex-col items-center'>
        <p>次は{nextDisc === myStone ? 'あなた' : 'ChatGPT'}の番です</p>
        <Board board={board} disabled={nextDisc === myStone} />
        <Loading />
        {nextDisc === myStone ? (
          <button className='btn' onClick={pass}>
            PASS
          </button>
        ) : (
          ''
        )}
      </div>
      <div className='flex bg-base-200 p-3 flex-col gap-2 items-center h-fit'>
        ログ
        <div className='flex flex-col gap-2 w-48 h-64 overflow-auto'>
          {game.turns.map((_t, index, turns) => {
            const target = turns[index - 1]
            if (!target) return <></>

            return (
              <button
                className='bg-base-100 py-2 px-5 rounded-lg hover:bg-base-300 w-full disabled:btn-disabled'
                key={index}
                onClick={() => clickLog(target)}
                disabled={nextDisc !== myStone}
              >
                {target.turnCount + 1}: {target.nextDiscView}
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
