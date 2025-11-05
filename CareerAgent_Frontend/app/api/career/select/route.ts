import { type NextRequest, NextResponse } from "next/server"

// Mock career database
const careerSelections: Map<string, string> = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, careerPath } = body

    if (!userId || !careerPath) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Store career selection
    careerSelections.set(userId, careerPath)

    return NextResponse.json({
      success: true,
      careerPath,
    })
  } catch (error) {
    console.error("Career selection error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
