import { Game } from '@/Domains/Game'
import { Turn } from '@/Domains/Turn'

export interface GameUsecaseInputPort {
  startGame(): Game
}

export interface GameUsecaseOutputPort {
  registerTurn(turn: Turn): void
}
