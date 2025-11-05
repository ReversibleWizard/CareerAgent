"use client"

import { Card, CardContent } from "@/components/ui/card"
import RoadmapTimeline from "@/components/roadmap-timeline"
import { CheckCircle, Clock, Target } from "lucide-react"

interface RoadmapPhase {
  id: string
  phase: string
  duration: string
  title: string
  description: string
  skills: string[]
  status: "completed" | "current" | "upcoming"
}

const roadmapPhases: RoadmapPhase[] = [
  {
    id: "phase-1",
    phase: "Phase 1",
    duration: "Months 1-3",
    title: "Foundations",
    description: "Build core technical skills and foundational knowledge",
    skills: ["JavaScript", "React", "Web Basics", "Git"],
    status: "current",
  },
  {
    id: "phase-2",
    phase: "Phase 2",
    duration: "Months 4-6",
    title: "Backend Mastery",
    description: "Learn backend development and database management",
    skills: ["Node.js", "APIs", "Databases", "Authentication"],
    status: "upcoming",
  },
  {
    id: "phase-3",
    phase: "Phase 3",
    duration: "Months 7-9",
    title: "System Design",
    description: "Understand architecture and system design patterns",
    skills: ["Architecture", "Scalability", "Performance", "Testing"],
    status: "upcoming",
  },
  {
    id: "phase-4",
    phase: "Phase 4",
    duration: "Months 10-12",
    title: "Professional Practice",
    description: "Master professional development practices and leadership",
    skills: ["Code Review", "Mentoring", "DevOps", "Leadership"],
    status: "upcoming",
  },
]

export default function RoadmapPage() {
  const stats = [
    { icon: Target, label: "Total Duration", value: "12 Months" },
    { icon: CheckCircle, label: "Phases", value: "4" },
    { icon: Clock, label: "Current Phase", value: "Foundations" },
  ]

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-background to-secondary px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Your 12-Month Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            A structured path to mastering your career with guided milestones
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="space-y-6">
          {roadmapPhases.map((phase, index) => (
            <RoadmapTimeline key={phase.id} phase={phase} index={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
