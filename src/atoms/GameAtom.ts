import { Game } from '@/domains/Game'
import { atom } from 'recoil'

export const gameAtom = atom<Game>({
  key: 'gameState',
  default: new Game(),
})
