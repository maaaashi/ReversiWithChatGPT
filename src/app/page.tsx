import { Game } from '@/Domains/Game'
import { Board } from '@/components/Board'

export default function Home() {
  const newGame = new Game()

  return (
    <main className='container flex flex-col items-center'>
      <p>次は？の番です</p>
      <Board game={newGame} />
    </main>
  )
}
