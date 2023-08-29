import { Header } from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { RecoilRootComponent } from '@/components/RecoilRootComponent'
import 'animate.css'

export const metadata: Metadata = {
  title: 'ChatCPT Reversi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className='bg-base-300 h-screen overflow-hidden w-full flex flex-col'>
        <RecoilRootComponent>
          <Header />
          {children}
        </RecoilRootComponent>
      </body>
    </html>
  )
}
