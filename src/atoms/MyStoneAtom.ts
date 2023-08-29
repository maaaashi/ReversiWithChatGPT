import { atom } from 'recoil'

export const myStoneAtom = atom<'黒' | '白' | ''>({
  key: 'myStoneState',
  default: '',
})
