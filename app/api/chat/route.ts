import { openai } from "@ai-sdk/openai"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json()

    // Log to help with debugging (don't log the API key)
    console.log("Received message:", message)
    console.log("API key provided:", apiKey ? "Yes" : "No")

    // Create a custom OpenAI client with the provided API key if available
    const openaiClient = apiKey ? createOpenAI({ apiKey }) : openai

    // Use the environment variable or user-provided key
    const { text } = await generateText({
      model: openaiClient("gpt-3.5-turbo"),
      prompt: `You are a cute, supportive banana character named Banana. You speak in a friendly, comforting way and occasionally use banana-related puns. Keep responses short and sweet (under 100 characters when possible). The user said: ${message}`,
      system:
        "You are a cute, supportive banana character who provides comfort and gentle advice. Keep responses short and sweet.",
    })

    console.log("Generated response:", text)
    return NextResponse.json({ text })
  } catch (error: any) {
    // Improved error logging
    console.error("Error in API route:", error.message || error)

    // Return a more helpful error response
    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error.message || "Unknown error",
        fallbackResponse: "I'm having trouble thinking right now, but I'm still here for you!",
      },
      { status: 500 },
    )
  }
}
