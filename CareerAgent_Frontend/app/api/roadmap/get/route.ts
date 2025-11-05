import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { careerPath, preferences } = body

    // If no career path provided, default to "sql"
    const selectedCareer = careerPath || "software engineer"

    // Prepare encoded preferences for the query string
    const encodedPreferences = encodeURIComponent(
      JSON.stringify(preferences || {
        focus: "backend",
        tools: ["Software Engineer", "PostgreSQL", "ETL"],
      })
    )

    // Make request to backend endpoint
    const backendUrl = `http://127.0.0.1:8000/api/career/roadmap/${selectedCareer}/?preferences=${encodedPreferences}`

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Backend request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Directly return backend response (in your required format)
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("Roadmap fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch roadmap data" },
      { status: 500 }
    )
  }
}
