import { atom } from 'recoil'

export const loadingAtom = atom<boolean>({
  key: 'loadingState',
  default: false,
})
