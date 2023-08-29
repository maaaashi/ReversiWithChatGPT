import { gameAtom } from '@/atoms/GameAtom'
import { myStoneAtom } from '@/atoms/MyStoneAtom'
import { Game } from '@/domains/Game'
import { Turn } from '@/domains/Turn'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

const PassButton = () => {
  const [game, setGame] = useRecoilState(gameAtom)
  const myStone = useRecoilValue(myStoneAtom)

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

  return (
    <button
      className='btn bg-base-100 disabled:btn-disabled w-fit'
      onClick={pass}
      disabled={myStone !== game.lastTurn().nextDiscView}
    >
      PASS
    </button>
  )
}

export default PassButton
