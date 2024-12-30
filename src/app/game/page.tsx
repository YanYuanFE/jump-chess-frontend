'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GameLobbyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const createGame = async () => {
    const gameId = Math.random().toString(36).substring(7)
    router.push(`/game/${gameId}`)
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>游戏大厅</CardTitle>
          <CardDescription>
            创建或加入游戏
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            className="w-full" 
            onClick={createGame}
          >
            创建新游戏
          </Button>
          {/* TODO: Add list of available games */}
        </CardContent>
      </Card>
    </div>
  )
}

