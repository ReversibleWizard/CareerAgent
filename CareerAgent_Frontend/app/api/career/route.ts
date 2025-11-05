export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("[API] Career selection:", body)

    // Simulate career selection success
    return Response.json({ message: "Career selected successfully", career: body.career }, { status: 200 })
  } catch (error) {
    console.error("[API] Career selection error:", error)
    return Response.json({ error: "Career selection failed" }, { status: 500 })
  }
}
