"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

const CAREER_OPTIONS = [
  {
    id: "sql",
    title: "SQL Developer",
    description: "Master database design, queries, and optimization",
    icon: "🗄️",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Build beautiful, responsive user interfaces",
    icon: "🎨",
  },
  {
    id: "data-science",
    title: "Data Scientist",
    description: "Analyze data and build predictive models",
    icon: "📊",
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    description: "Deploy and manage cloud infrastructure",
    icon: "⚙️",
  },
  {
    id: "fullstack",
    title: "Full Stack Developer",
    description: "Build complete web applications end-to-end",
    icon: "🌐",
  },
  {
    id: "ml-engineer",
    title: "ML Engineer",
    description: "Develop machine learning systems and models",
    icon: "🤖",
  },
]

export default function CareerSelector() {
  const router = useRouter()
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSelectCareer = async (careerId: string) => {
    setSelectedCareer(careerId)
    setLoading(true)

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ career: careerId }),
      })

      console.log("Career selection response:", response)

      if (response.ok) {
        // Store selected career in session/context
        sessionStorage.setItem("selectedCareer", careerId)
        setTimeout(() => {
          router.push("/roadmap")
        }, 500)
      }
    } catch (error) {
      console.log("Career selection error:", error)
      setLoading(false)
      setSelectedCareer(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {CAREER_OPTIONS.map((career) => (
        <Card
          key={career.id}
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedCareer === career.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleSelectCareer(career.id)}
        >
          <CardHeader>
            <div className="text-4xl mb-4">{career.icon}</div>
            <CardTitle>{career.title}</CardTitle>
            <CardDescription>{career.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={loading && selectedCareer !== career.id}
              variant={selectedCareer === career.id ? "default" : "outline"}
            >
              {loading && selectedCareer === career.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Selecting...
                </>
              ) : (
                "Select"
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
