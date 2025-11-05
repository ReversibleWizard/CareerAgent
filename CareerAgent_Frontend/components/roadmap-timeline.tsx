"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Phase {
  id: string
  phase: string
  duration: string
  title: string
  description: string
  skills: string[]
  status: "completed" | "current" | "upcoming"
}

interface RoadmapTimelineProps {
  phase: Phase
  index: number
}

export default function RoadmapTimeline({ phase, index }: RoadmapTimelineProps) {
  const getStatusIcon = () => {
    switch (phase.status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "current":
        return <Clock className="w-6 h-6 text-primary animate-pulse" />
      default:
        return <Circle className="w-6 h-6 text-muted-foreground" />
    }
  }

  const getStatusBadge = () => {
    switch (phase.status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "current":
        return <Badge variant="default">In Progress</Badge>
      default:
        return <Badge variant="outline">Upcoming</Badge>
    }
  }

  return (
    <div className="flex gap-6">
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        {getStatusIcon()}
        {index < 3 && (
          <div className={cn("w-1 h-24 mt-2", phase.status === "completed" ? "bg-green-500" : "bg-muted")} />
        )}
      </div>

      {/* Content */}
      <Card className="flex-1 mb-4">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{phase.phase}</p>
              <CardTitle className="text-2xl mt-1">{phase.title}</CardTitle>
              <CardDescription>{phase.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{phase.duration}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge()}
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-2">Key Skills</p>
            <div className="flex flex-wrap gap-2">
              {phase.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-full">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {phase.status === "current" && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mt-4">
              <p className="text-sm font-medium text-primary">You are currently in this phase</p>
              <p className="text-xs text-muted-foreground mt-1">Complete the skills to progress to the next phase</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
