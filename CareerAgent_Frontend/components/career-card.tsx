"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Career {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface CareerCardProps {
  career: Career
  isSelected: boolean
  onSelect: () => void
}

export default function CareerCard({ career, isSelected, onSelect }: CareerCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
        isSelected && "ring-2 ring-primary shadow-lg scale-105",
      )}
    >
      <CardHeader className="space-y-4">
        <div
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-white",
            `bg-gradient-to-br ${career.color}`,
          )}
        >
          {career.icon}
        </div>
        <div>
          <CardTitle className="text-xl">{career.title}</CardTitle>
          <CardDescription>{career.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{isSelected ? "✓ Selected" : "Click to select"}</span>
          {isSelected && (
            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
