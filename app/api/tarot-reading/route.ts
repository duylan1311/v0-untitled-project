import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { question, spreadType = "three-card" } = await req.json()

    // Simulate card drawing
    const tarotCards = [
      "The Fool",
      "The Magician",
      "The High Priestess",
      "The Empress",
      "The Emperor",
      "The Hierophant",
      "The Lovers",
      "The Chariot",
      "Strength",
      "The Hermit",
      "Wheel of Fortune",
      "Justice",
      "The Hanged Man",
      "Death",
      "Temperance",
      "The Devil",
      "The Tower",
      "The Star",
      "The Moon",
      "The Sun",
      "Judgement",
      "The World",
    ]

    const drawnCards = []
    const cardCount = spreadType === "three-card" ? 3 : spreadType === "single" ? 1 : 5

    for (let i = 0; i < cardCount; i++) {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      drawnCards.push(randomCard)
    }

    const result = await generateText({
      model: openai("gpt-4o"),
      system: `You are Osirus, a master Tarot reader with deep knowledge of card meanings and spreads. Interpret Tarot cards with wisdom, providing both traditional meanings and intuitive insights.

For each card, explain:
- Traditional meaning and symbolism
- How it relates to the querent's question
- Practical advice and spiritual guidance
- Timing and energy influences

Provide a cohesive reading that tells a story and offers clear guidance.`,
      prompt: `Câu hỏi: "${question}"
      Các lá bài được rút: ${drawnCards.join(", ")}
      Loại spread: ${spreadType}
      
      Hãy giải thích ý nghĩa từng lá bài và đưa ra lời giải đáp tổng thể cho câu hỏi.`,
      temperature: 0.8,
      maxTokens: 1000,
    })

    return Response.json({
      cards: drawnCards,
      interpretation: result.text,
      question,
      spreadType,
      timestamp: new Date().toISOString(),
      type: "tarot_reading",
    })
  } catch (error) {
    console.error("Tarot Reading Error:", error)
    return Response.json({ error: "Không thể thực hiện bói Tarot. Vui lòng thử lại." }, { status: 500 })
  }
}
