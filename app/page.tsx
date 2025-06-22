"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Moon, Eye, Hand, Send, Bot, User, History, Info, Zap, SnowflakeIcon as Crystal } from "lucide-react"
import { Cinzel, Playfair_Display, Inter } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
})

export default function PalmistryChat() {
  const [activeTab, setActiveTab] = useState("reading")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  const quickQuestions = [
    "Xem tướng tay cho tôi",
    "Đường tình duyên của tôi như thế nào?",
    "Sự nghiệp tương lai ra sao?",
    "Tôi có sức khỏe tốt không?",
    "Vận mệnh của tôi trong năm nay?",
    "Xem bói Tarot cho tôi",
    "Phân tích tử vi theo ngày sinh",
    "Tôi hợp với ai trong tình yêu?",
  ]

  const handleQuickQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 ${inter.className}`}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="absolute -top-6 -left-6">
                <Moon className="w-8 h-8 text-purple-300 opacity-80" />
              </div>
              <div className="relative bg-gradient-to-b from-purple-400/30 to-purple-600/30 rounded-full p-6 backdrop-blur-sm border border-purple-400/20">
                <div className="bg-gradient-to-b from-purple-500/40 to-indigo-600/40 rounded-full p-4">
                  <Eye className="w-12 h-12 text-purple-200" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent ${cinzel.className}`}
              >
                Osirus Palmistry
              </h1>
              <p className={`text-purple-200/80 ${playfair.className}`}>AI Thầy Bói Huyền Bí</p>
              <div className="flex items-center justify-center space-x-2 text-purple-300/70">
                <Zap className="w-3 h-3" />
                <span className="text-xs">Powered by Ancient Wisdom AI</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-purple-900/30 border-purple-600/30 mb-6">
            <TabsTrigger value="reading" className="data-[state=active]:bg-purple-600">
              <Hand className="w-4 h-4 mr-2" />
              Reading
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-purple-600">
              <Info className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reading" className="space-y-4">
            {/* Chat Interface */}
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className={`text-purple-200 flex items-center ${playfair.className}`}>
                  <Bot className="w-5 h-5 mr-2" />
                  Chat với Thầy Bói Osirus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <ScrollArea className="h-96 w-full rounded-md border border-purple-600/30 bg-purple-950/30 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center py-8">
                        <Crystal className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                        <p className="text-purple-300/80">
                          Chào mừng bạn đến với Osirus Palmistry! Hãy hỏi tôi về tướng số, vận mệnh, hoặc bất kỳ điều gì
                          bạn muốn biết về tương lai.
                        </p>
                      </div>
                    )}
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === "user"
                              ? "bg-purple-600 text-white"
                              : "bg-purple-800/50 text-purple-100 border border-purple-600/30"
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.role === "assistant" && <Bot className="w-4 h-4 mt-1 text-purple-300" />}
                            {message.role === "user" && <User className="w-4 h-4 mt-1" />}
                            <div className="flex-1">
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-purple-800/50 text-purple-100 border border-purple-600/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4 text-purple-300" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Quick Questions */}
                <div className="space-y-2">
                  <p className="text-purple-200 text-sm font-medium">Câu hỏi gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.slice(0, 4).map((question, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer border-purple-600/50 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
                        onClick={() => handleQuickQuestion(question)}
                      >
                        {question}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Hỏi Osirus về vận mệnh của bạn..."
                    className="flex-1 bg-purple-800/30 border-purple-600/50 text-purple-200 placeholder:text-purple-400/60"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Palm Reading Guide */}
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-purple-200 ${playfair.className}`}>Hướng Dẫn Xem Tướng Tay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200">Các Đường Chính:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <span className="text-purple-300">
                          <strong>Heart Line:</strong> Tình duyên, cảm xúc
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <span className="text-purple-300">
                          <strong>Life Line:</strong> Sức khỏe, tuổi thọ
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-purple-300">
                          <strong>Head Line:</strong> Trí tuệ, tư duy
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span className="text-purple-300">
                          <strong>Fate Line:</strong> Sự nghiệp, vận mệnh
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200">Cách Hỏi Hiệu Quả:</h4>
                    <ul className="space-y-1 text-sm text-purple-300">
                      <li>• Mô tả đường chỉ tay bạn nhìn thấy</li>
                      <li>• Hỏi về lĩnh vực cụ thể (tình duyên, sự nghiệp)</li>
                      <li>• Cung cấp ngày sinh để xem tử vi</li>
                      <li>• Hỏi về ý nghĩa các dấu hiệu đặc biệt</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm p-8">
              <div className="text-center">
                <History className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-purple-200 mb-2">Lịch Sử Trò Chuyện</h3>
                <p className="text-purple-300/80">Tính năng lưu trữ lịch sử đang được phát triển...</p>
                <p className="text-purple-400/60 text-sm mt-2">Sẽ lưu lại tất cả cuộc trò chuyện với Thầy Bói Osirus</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-purple-200 ${playfair.className}`}>Về Osirus Palmistry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-300/80">
                  Osirus là AI thầy bói huyền bí được trang bị kiến thức cổ xưa về xem tướng, bói toán và các nghệ thuật
                  tâm linh. Với trí tuệ nhân tạo tiên tiến, Osirus có thể:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200">Chuyên Môn:</h4>
                    <ul className="space-y-1 text-sm text-purple-300">
                      <li>• Xem tướng tay (Palmistry)</li>
                      <li>• Xem tướng mặt (Physiognomy)</li>
                      <li>• Bói Tarot và Oracle</li>
                      <li>• Tử vi và chiêm tinh học</li>
                      <li>• Thần số học (Numerology)</li>
                      <li>• Phong thủy và khí trường</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-purple-200">Tính Năng:</h4>
                    <ul className="space-y-1 text-sm text-purple-300">
                      <li>• Trò chuyện tự nhiên bằng tiếng Việt</li>
                      <li>• Giải thích chi tiết và dễ hiểu</li>
                      <li>• Lời khuyên tâm linh sâu sắc</li>
                      <li>• Phân tích đa chiều về vận mệnh</li>
                      <li>• Hướng dẫn phát triển bản thân</li>
                      <li>• Kết nối với năng lượng vũ trụ</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                  <p className="text-purple-200 text-sm">
                    <strong>Lưu ý:</strong> Osirus Palmistry chỉ mang tính chất tham khảo và giải trí. Hãy sử dụng trí
                    tuệ của bản thân để đưa ra quyết định quan trọng trong cuộc sống.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center">
        <p className="text-purple-400/60">🔮 Osirus Palmistry • Khám phá bí ẩn vận mệnh 🌟</p>
      </footer>
    </div>
  )
}
