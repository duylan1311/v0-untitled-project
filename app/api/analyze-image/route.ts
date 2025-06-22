import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { imageUrl, analysisType = "general", question, apiKey } = await req.json()

    if (!apiKey && !process.env.OPENAI_API_KEY) {
      return Response.json(
        {
          error: "Vui lòng cung cấp OpenAI API Key để phân tích ảnh.",
        },
        { status: 400 },
      )
    }

    // Create OpenAI client with custom API key if provided
    const model = openai("gpt-4o", { apiKey })

    const analysisPrompts = {
      palm: "Phân tích chi tiết tướng tay trong ảnh này. Xem xét các đường chính: đường tim (heart line), đường đời (life line), đường trí tuệ (head line), đường vận mệnh (fate line). Đưa ra dự đoán về tình duyên, sự nghiệp, sức khỏe và tài lộc.",
      face: "Phân tích tướng mặt trong ảnh này theo nguyên lý physiognomy. Xem xét hình dáng khuôn mặt, đôi mắt, mũi, miệng, trán để đưa ra nhận định về tính cách, vận mệnh và tương lai.",
      general:
        "Phân tích ảnh này từ góc độ tâm linh và tướng số. Tìm kiếm các dấu hiệu, biểu tượng hoặc đặc điểm có thể liên quan đến vận mệnh và tương lai.",
      tarot:
        "Phân tích các lá bài Tarot trong ảnh này. Giải thích ý nghĩa từng lá bài và đưa ra lời giải đáp tổng thể.",
    }

    const prompt = question
      ? `${question}\n\nHãy phân tích ảnh này và trả lời câu hỏi.`
      : analysisPrompts[analysisType as keyof typeof analysisPrompts] || analysisPrompts.general

    const result = await generateText({
      model,
      system: `You are Osirus, a master fortune teller and image analyst. When analyzing images for fortune telling:

1. Carefully examine all visual details
2. Apply traditional fortune telling knowledge
3. Provide specific, detailed interpretations
4. Give practical advice and predictions
5. Explain the spiritual significance of what you see
6. Use mystical language while being clear and helpful
7. Reference Vietnamese cultural elements when appropriate

Always provide comprehensive analysis with specific predictions and spiritual guidance.`,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image", image: imageUrl },
          ],
        },
      ],
      temperature: 0.7,
      maxTokens: 1200,
    })

    return Response.json({
      analysis: result.text,
      analysisType,
      timestamp: new Date().toISOString(),
      confidence: Math.floor(Math.random() * 20) + 80, // Simulate confidence score
    })
  } catch (error) {
    console.error("Image Analysis Error:", error)
    return Response.json(
      {
        error: "Không thể phân tích ảnh. Vui lòng kiểm tra API key và thử lại.",
      },
      { status: 500 },
    )
  }
}
