import { ReactNode } from 'react'

export class Cell {
  constructor(private _cell: 'black' | 'white' | 'empty') {}

  get cell() {
    return this._cell
  }

  set cell(value: 'black' | 'white' | 'empty') {
    this._cell = value
  }

  view(): '●' | '○' | '' {
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
