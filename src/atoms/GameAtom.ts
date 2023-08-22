import { Game } from '@/Domains/Game'
import { atom } from 'recoil'

const newGame = () => {
  const newGameInstance = new Game([])
  newGameInstance.newGame()
  return newGameInstance
}

export const gameState = atom<Game>({
  key: 'gameState',
  default: newGame(),
})
