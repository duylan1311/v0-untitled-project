import { NextResponse } from "next/server"

// Predefined responses for the banana character
const bananaResponses = [
  "I'm here for you! Things will get better.",
  "That's interesting! Tell me more about it.",
  "Sometimes life is bananas, but we'll get through it!",
  "I'm all ears (well, if bananas had ears)!",
  "You're doing great! Keep going!",
  "That sounds challenging. Need a banana hug?",
  "Remember to take care of yourself today!",
  "I believe in you! You've got this!",
  "Let's split this problem and solve it together!",
  "Your feelings are valid. It's okay to feel that way.",
  "What a day! Let's make it better together.",
  "You're stronger than you think!",
  "That's a-peeling! Tell me more.",
  "I'm bunches of supportive! Keep going!",
  "You're making great progress!",
]

export async function POST(request: Request) {
  try {
    // Get a random response
    const randomResponse = bananaResponses[Math.floor(Math.random() * bananaResponses.length)]

    // Simulate a delay to make it feel more natural
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ text: randomResponse })
  } catch (error) {
    console.error("Error in fallback API route:", error)
    return NextResponse.json({
      text: "I'm here for you! Things will get better.",
    })
  }
}
