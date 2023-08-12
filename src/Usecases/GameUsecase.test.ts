import { describe, expect, it, vi } from 'vitest'
import {
  GameUsecaseInputPort,
  GameUsecaseOutputPort,
} from './Port/GameUsecasePort'
import { GameUsecase } from './GameUsecase'
import { Game } from '@/Domains/Game'

describe('GameUsecase', () => {
  it('startGame() should work', () => {
    const mockInputPort = {} as GameUsecaseInputPort
    const mockOutputPort = {} as GameUsecaseOutputPort
    mockInputPort.startGame = vi.fn(() => {
      return new Game('1', [], new Date())
    })

    const usecase = new GameUsecase(mockInputPort, mockOutputPort)
    usecase.startGame()
    expect(mockInputPort.startGame).toBeCalled()
  })
})
