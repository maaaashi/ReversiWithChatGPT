import { Game } from '@/Domains/Game'

export interface GameGatewayInputPort {
  startGame(): Game
}
