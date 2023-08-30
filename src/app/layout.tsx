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
      <body>
        <RecoilRootComponent>{children}</RecoilRootComponent>
      </body>
    </html>
  )
}
