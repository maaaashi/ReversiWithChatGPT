import { Turn } from './Turn'

export class Game {
  constructor(
    private _id: string,
    private _turns: Turn[],
    private _startAt: Date
  ) {}
}
