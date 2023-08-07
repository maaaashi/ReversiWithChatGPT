import { Game } from '@/Domains/Game'
import {
  GameUsecaseInputPort,
  GameUsecaseOutputPort,
} from './Port/GameUsecasePort'

export class GameUsecase {
  constructor(
    gameUsecaseInputPort: GameUsecaseInputPort,
    gameUsecaseOutputPort: GameUsecaseOutputPort
  ) {}

  startGame(): Game {
    throw new Error('Method not implemented.')
  }
}
