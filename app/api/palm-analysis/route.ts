import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { palmDescription, specificQuestion } = await req.json()

    const result = await generateText({
      model: openai("gpt-4o"),
      system: `You are Osirus, an expert palmist. Analyze palm descriptions and provide detailed readings focusing on the four major lines: Heart Line (tình duyên), Life Line (sức khỏe/tuổi thọ), Head Line (trí tuệ), and Fate Line (sự nghiệp/vận mệnh).

Provide structured analysis with:
1. Overall palm assessment
2. Detailed line-by-line interpretation
3. Predictions for love, career, health, wealth
4. Lucky elements and spiritual advice
5. Specific timeframes when possible

Use traditional palmistry knowledge and Vietnamese cultural context.`,
      prompt: `Phân tích tướng tay dựa trên mô tả: "${palmDescription}"
      ${specificQuestion ? `Câu hỏi cụ thể: "${specificQuestion}"` : ""}
      
      Hãy đưa ra phân tích chi tiết và dự đoán cụ thể.`,
      temperature: 0.7,
      maxTokens: 800,
    })

    return Response.json({
      analysis: result.text,
      timestamp: new Date().toISOString(),
      type: "palm_reading",
    })
  } catch (error) {
    console.error("Palm Analysis Error:", error)
    return Response.json({ error: "Không thể phân tích tướng tay. Vui lòng thử lại." }, { status: 500 })
  }
}
