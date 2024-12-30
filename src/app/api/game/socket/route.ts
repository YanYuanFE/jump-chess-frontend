import { NextResponse } from 'next/server'
import { Server } from 'socket.io'
import type { Server as HTTPServer } from 'http'
import type { Socket as NetSocket } from 'net'
import type { NextApiRequest } from 'next'
import type { Socket } from 'socket.io'

interface SocketServer extends HTTPServer {
  io?: Server
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiRequest {
  socket: SocketWithIO
}

const games = new Map()

export function GET(req: NextApiResponseWithSocket) {
  if (!req.socket.server.io) {
    const io = new Server(req.socket.server)
    req.socket.server.io = io

    io.on('connection', (socket: Socket) => {
      socket.on('joinGame', (gameId: string) => {
        socket.join(gameId)
        const game = games.get(gameId) || {
          players: [],
          board: [
            'GREEN', null, 'ORANGE',  // Bottom-left, Top-left, Bottom-right
            'ORANGE', 'GREEN'         // Top-right, Center
          ],
          currentPlayer: 'GREEN'
        }
        games.set(gameId, game)
        io.to(gameId).emit('gameState', game)
      })

      socket.on('move', ({ gameId, from, to }) => {
        const game = games.get(gameId)
        if (game) {
          // Update game state
          const newBoard = [...game.board]
          newBoard[to] = newBoard[from]
          newBoard[from] = null
          game.currentPlayer = game.currentPlayer === 'GREEN' ? 'ORANGE' : 'GREEN'
          games.set(gameId, { ...game, board: newBoard })
          io.to(gameId).emit('gameState', game)
        }
      })

      socket.on('disconnect', () => {
        // Handle player disconnect
      })
    })
  }

  return NextResponse.json({ success: true })
}

