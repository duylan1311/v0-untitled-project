import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { birthDate, fullName } = await req.json()

    // Calculate life path number
    const calculateLifePath = (dateStr: string) => {
      const date = new Date(dateStr)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      let sum = day + month + year
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum
          .toString()
          .split("")
          .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0)
      }
      return sum
    }

    // Calculate destiny number from name
    const calculateDestiny = (name: string) => {
      const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 1,
        k: 2,
        l: 3,
        m: 4,
        n: 5,
        o: 6,
        p: 7,
        q: 8,
        r: 9,
        s: 1,
        t: 2,
        u: 3,
        v: 4,
        w: 5,
        x: 6,
        y: 7,
        z: 8,
      }

      let sum = name
        .toLowerCase()
        .replace(/[^a-z]/g, "")
        .split("")
        .reduce((total, char) => {
          return total + (values[char] || 0)
        }, 0)

      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum
          .toString()
          .split("")
          .reduce((a, b) => Number.parseInt(a) + Number.parseInt(b), 0)
      }
      return sum
    }

    const lifePathNumber = calculateLifePath(birthDate)
    const destinyNumber = calculateDestiny(fullName)

    const result = await generateText({
      model: openai("gpt-4o"),
      system: `You are Osirus, a master numerologist with deep understanding of the mystical significance of numbers. Interpret numerology readings with ancient wisdom and practical guidance.

Explain the meaning of:
- Life Path Number (from birth date)
- Destiny Number (from full name)
- How these numbers interact and influence the person's life
- Personality traits, strengths, challenges
- Career guidance and relationship compatibility
- Lucky numbers, colors, and spiritual advice

Provide detailed, personalized insights based on traditional numerology principles.`,
      prompt: `Phân tích thần số học cho:
      Họ tên: ${fullName}
      Ngày sinh: ${birthDate}
      Số đường đời (Life Path): ${lifePathNumber}
      Số định mệnh (Destiny): ${destinyNumber}
      
      Hãy giải thích ý nghĩa sâu sắc của các con số này và đưa ra lời khuyên tâm linh.`,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return Response.json({
      lifePathNumber,
      destinyNumber,
      interpretation: result.text,
      birthDate,
      fullName,
      timestamp: new Date().toISOString(),
      type: "numerology_reading",
    })
  } catch (error) {
    console.error("Numerology Error:", error)
    return Response.json({ error: "Không thể tính toán thần số học. Vui lòng thử lại." }, { status: 500 })
  }
}
