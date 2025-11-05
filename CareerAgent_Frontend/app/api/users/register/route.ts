import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in production, use a real database)
const users: Map<string, { username: string; email: string; password: string }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, password2 } = body

    // Validation
    if (!username || !email || !password || !password2) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if passwords match
    if (password !== password2) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 })
    }

    // Check if user already exists
    if (users.has(email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Store user (in production, hash the password and use a database)
    users.set(email, { username, email, password })

    return NextResponse.json({
      success: true,
      user: { username, email },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
