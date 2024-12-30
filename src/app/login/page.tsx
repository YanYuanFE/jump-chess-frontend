import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from 'lucide-react'
import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>登录</CardTitle>
          <CardDescription>
            登录后开始游戏
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={() => signIn('github', { callbackUrl: '/game' })}
          >
            <Github className="mr-2 h-4 w-4" />
            使用 GitHub 登录
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

