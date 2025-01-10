'use client'

import { useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { GameState } from '@/types'

let socket: Socket | null = null

export function useGameSocket(gameId: string, onGameStateUpdate: (state: GameState) => void) {
  useEffect(() => {
    const initSocket = async () => {
      await fetch('/api/game/socket')
      
      if (!socket) {
        socket = io()

        socket.on('connect', () => {
          console.log('Connected to WebSocket')
          socket?.emit('joinGame', gameId)
        })

        socket.on('gameState', (gameState: GameState) => {
          onGameStateUpdate(gameState)
        })
      }
    }

    initSocket()

    return () => {
      if (socket) {
        socket.disconnect()
        socket = null
      }
    }
  }, [gameId, onGameStateUpdate])

  const makeMove = useCallback((from: number, to: number) => {
    socket?.emit('move', { gameId, from, to })
  }, [gameId])

  return { makeMove }
}

