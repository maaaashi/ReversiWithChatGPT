import { Game } from '@/Domains/Game'
import { GameUsecaseInputPort } from '@/Usecases/Port/GameUsecasePort'
import { GameGatewayInputPort } from './Port/GameGatewayInputPort'

export class GameGateway implements GameUsecaseInputPort {
  constructor(gameGatewayInputPort: GameGatewayInputPort) {}
  startGame(): Game {
    throw new Error('未実装')
  }
}
