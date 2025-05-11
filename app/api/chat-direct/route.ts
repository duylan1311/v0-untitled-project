import { NextResponse } from "next/server"

// Use the Edge Runtime to ensure this runs in a server environment
export const runtime = "edge"

export async function POST(request: Request) {
  try {
    const { message, apiKey } = await request.json()

    if (!apiKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 400 })
    }

    // Call the OpenAI API directly using fetch
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
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
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "OpenAI API request failed")
    }

    const data = await response.json()
    const text = data.choices[0]?.message?.content || "I'm here for you!"

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
