"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface Task {
  task: string
  status: "pending" | "completed"
}

interface StepData {
  title: string
  description: string
  tasks: Task[]
}

interface RoadmapVisualizationProps {
  data: {
    roadmap: {
      name: string
      steps: Record<string, string>
    }
  } | null
}

export default function RoadmapVisualization({ data }: RoadmapVisualizationProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(0)

  if (!data) {
    return <div>No roadmap data available</div>
  }

  const steps = Object.entries(data.roadmap.steps).map(([stepName, stepContent]) => {
    try {
      const parsed = JSON.parse(stepContent)
      return {
        name: stepName,
        ...parsed,
      }
    } catch {
      return {
        name: stepName,
        title: stepName,
        description: "Step description",
        tasks: [],
      }
    }
  })

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 capitalize">
          {data.roadmap.name} Career Roadmap
        </h1>
        <p className="text-lg text-muted-foreground">
          Your personalized learning journey to master {data.roadmap.name}
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-20 w-1 h-16 bg-gradient-to-b from-primary to-primary/20" />
            )}

            <Card
              className="cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setExpandedStep(expandedStep === index ? null : index)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      <Circle className="h-6 w-6 text-primary fill-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="mb-2">
                          Step {index + 1}
                        </Badge>
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription className="mt-2">{step.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {expandedStep === index && (
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Tasks:</h4>
                    <ul className="space-y-2">
                      {step.tasks.map((task: Task, taskIndex: number) => (
                        <li key={taskIndex} className="flex items-start gap-3">
                          {task.status === "completed" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          )}
                          <span
                            className={
                              task.status === "completed" ? "line-through text-muted-foreground" : "text-foreground"
                            }
                          >
                            {task.task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">Ready to start your learning journey?</p>
        <a
          href="/career"
          className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Select Another Career
        </a>
      </div>
    </div>
  )
}
