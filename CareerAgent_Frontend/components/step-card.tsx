"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TaskItem {
  task: string
  status: "pending" | "completed"
}

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  tasks: TaskItem[]
  isExpanded: boolean
  onToggle: () => void
}

export default function StepCard({ stepNumber, title, description, tasks, isExpanded, onToggle }: StepCardProps) {
  const completedTasks = tasks.filter((t) => t.status === "completed").length

  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg" onClick={onToggle}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              Step {stepNumber}
            </Badge>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {completedTasks}/{tasks.length}
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="checkbox" checked={task.status === "completed"} readOnly className="w-4 h-4" />
                <span className={task.status === "completed" ? "line-through text-muted-foreground" : ""}>
                  {task.task}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
