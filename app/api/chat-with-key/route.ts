import { NextResponse } from "next/server"
import OpenAI from "openai"

// Use the Edge Runtime to ensure this runs in a server environment
export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Create OpenAI client with the provided API key
    const openai = new OpenAI({
      apiKey: apiKey,
      // No need for dangerouslyAllowBrowser flag in Edge Runtime
    })

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a cute, supportive banana character who provides comfort and gentle advice. Keep responses short and sweet (under 100 characters when possible).",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
    })

    const text = completion.choices[0]?.message?.content || "I'm here for you!"

    return NextResponse.json({ text })
  } catch (error: any) {
    console.error("Error in API route:", error.message || error)

    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}
