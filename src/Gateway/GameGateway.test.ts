import { describe, expect, it, vi } from 'vitest'
import { GameGatewayInputPort } from './Port/GameGatewayInputPort'
import { GameGateway } from './GameGateway'

describe('GameUsecase', () => {
  it('startGame() should work', () => {
    const mockInputPort = {} as GameGatewayInputPort
    mockInputPort.registerGame = vi.fn(async () => {
      return await fetch('https://www.google.com')
    })

    const gameGateway = new GameGateway(mockInputPort)

    expect(gameGateway.startGame()).toBeCalled()
  })
})
