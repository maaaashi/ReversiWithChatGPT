import { Game } from '@/Domains/Game'
import { GameGatewayInputPort } from '@/Gateway/Port/GameGatewayInputPort'

export class GameDriver implements GameGatewayInputPort {
  startGame(): Game {
    throw new Error('未実装')
  }
}
