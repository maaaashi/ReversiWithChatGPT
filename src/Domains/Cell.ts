import { ReactNode } from 'react'

export class Cell {
  constructor(private _cell: 'black' | 'white' | 'empty') {}

  get cell() {
    return this._cell
  }

  view(): string {
    switch (this._cell) {
      case 'black':
        return '●'
      case 'white':
        return '○'
      case 'empty':
        return ''
    }
  }
}
