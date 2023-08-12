import { Game } from '@/Domains/Game'
import {
  GameUsecaseInputPort,
  GameUsecaseOutputPort,
} from './Port/GameUsecasePort'

export class GameUsecase {
  constructor(
    private gameUsecaseInputPort: GameUsecaseInputPort,
    private gameUsecaseOutputPort: GameUsecaseOutputPort
  ) {}

  startGame(): Game {
    return this.gameUsecaseInputPort.startGame()
  }
}
