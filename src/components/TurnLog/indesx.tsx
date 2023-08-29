import { gameAtom } from '@/atoms/GameAtom'
import { myStoneAtom } from '@/atoms/MyStoneAtom'
import { Game } from '@/domains/Game'
import { Turn } from '@/domains/Turn'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import Swal from 'sweetalert2'

const TurnLog = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const myStone = useRecoilValue(myStoneAtom)

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
    <div
      tabIndex={0}
      className='collapse collapse-arrow border border-base-300 bg-base-200'
    >
      <input type='checkbox' className='peer' />
      <div className='collapse-title text-xl font-medium'>ログ</div>
      <div className='collapse-content'>
        <div className='flex flex-col gap-2 overflow-auto'>
          {game.turns.map((_t, index, turns) => {
            const target = turns[index - 1]
            if (!target) return <div key={index}></div>

            return (
              <button
                className='bg-base-100 py-2 px-5 rounded-lg hover:bg-base-300 w-full disabled:btn-disabled'
                key={`log_${index}`}
                onClick={() => clickLog(target)}
                disabled={myStone !== game.lastTurn().nextDiscView}
              >
                {target.turnCount + 1}: {target.nextDiscView}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TurnLog
