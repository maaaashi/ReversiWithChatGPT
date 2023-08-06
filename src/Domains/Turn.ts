import { Move } from './Move'
import { Square } from './Square'

export class Turn {
  constructor(
    private _id: number,
    private _turnCount: number,
    private _move: Move,
    private _squares: Square[],
    private _nextDisc: 'black' | 'white',
    private _endAt: Date
  ) {}
}
