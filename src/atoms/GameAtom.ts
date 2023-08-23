import { Game } from '@/Domains/Game'
import { atom } from 'recoil'

export const gameAtom = atom<Game>({
  key: 'gameState',
  default: new Game(),
})
