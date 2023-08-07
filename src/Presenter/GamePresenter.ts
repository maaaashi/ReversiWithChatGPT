import { Turn } from '@/Domains/Turn'
import { GameUsecaseOutputPort } from '@/Usecases/Port/GameUsecasePort'

export class GamePresenter implements GameUsecaseOutputPort {
  registerTurn(turn: Turn): void {
    throw new Error('未実装')
  }
}
