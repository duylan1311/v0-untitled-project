import { NextResponse } from "next/server"

// This is just a placeholder route to acknowledge the API key update
// The actual key is stored in localStorage on the client side
export async function POST(request: Request) {
  try {
    // We don't actually store the API key on the server
    // This is just to acknowledge the request
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in update API key route:", error)
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 })
  }
}
