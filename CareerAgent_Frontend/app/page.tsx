"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">CareerAgent</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12">
          Your personalized career roadmap to professional success
        </p>
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <Link href="/login" className="flex-1">
            <Button size="lg" variant="outline" className="w-full text-lg px-8 bg-transparent">
              Login
            </Button>
          </Link>
          <Link href="/register" className="flex-1">
            <Button size="lg" className="w-full text-lg px-8">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
