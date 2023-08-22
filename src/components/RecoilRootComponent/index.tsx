'use client'

import React, { FC, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

interface Props {
  children: ReactNode
}

export const RecoilRootComponent: FC<Props> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>
}
