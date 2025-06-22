"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Moon,
  Eye,
  Hand,
  Send,
  Bot,
  User,
  History,
  Info,
  Zap,
  SnowflakeIcon as Crystal,
  Upload,
  ImageIcon,
  X,
  Settings,
} from "lucide-react"
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

  const [specialReading, setSpecialReading] = useState<any>(null)
  const [isLoadingSpecial, setIsLoadingSpecial] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState("")
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  // Image Analysis States
  const [analysisImage, setAnalysisImage] = useState<string | null>(null)
  const [analysisType, setAnalysisType] = useState("general")
  const [analysisQuestion, setAnalysisQuestion] = useState("")
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSpecialReading = async (type: string, data: any) => {
    setIsLoadingSpecial(true)
    try {
      const response = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      setSpecialReading(result)
    } catch (error) {
      console.error("Special reading error:", error)
    } finally {
      setIsLoadingSpecial(false)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalysisImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAnalysisImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
  }

  const removeAnalysisImage = () => {
    setAnalysisImage(null)
    setAnalysisResult(null)
  }

  const handleSubmitWithImage = (e: React.FormEvent) => {
    e.preventDefault()
    if (uploadedImage) {
      // Send message with image
      handleSubmit(e, {
        data: {
          imageUrl: uploadedImage,
          apiKey: apiKey,
        },
      })
    } else {
      handleSubmit(e)
    }
  }

  const handleImageAnalysis = async () => {
    if (!analysisImage) return

    if (!apiKey && !process.env.OPENAI_API_KEY) {
      alert("Vui lòng nhập OpenAI API Key để phân tích ảnh!")
      return
    }

    setIsAnalyzing(true)
    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: analysisImage,
          analysisType,
          question: analysisQuestion,
          apiKey: apiKey,
        }),
      })
      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Image analysis error:", error)
      alert("Có lỗi xảy ra khi phân tích ảnh. Vui lòng thử lại!")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setAnalysisImage(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
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
          <TabsList className="grid w-full grid-cols-4 bg-purple-900/30 border-purple-600/30 mb-6">
            <TabsTrigger value="reading" className="data-[state=active]:bg-purple-600">
              <Hand className="w-4 h-4 mr-2" />
              Reading
            </TabsTrigger>
            <TabsTrigger value="image-analysis" className="data-[state=active]:bg-purple-600">
              <ImageIcon className="w-4 h-4 mr-2" />
              Phân Tích Ảnh
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

                {/* API Key Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-purple-200 text-sm font-medium">Cài đặt API</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                      className="text-purple-300 hover:text-purple-200"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      {showApiKeyInput ? "Ẩn" : "Cài đặt"}
                    </Button>
                  </div>

                  {showApiKeyInput && (
                    <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                      <Input
                        type="password"
                        placeholder="Nhập OpenAI API Key của bạn..."
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-purple-900/30 border-purple-600/50 text-purple-200 placeholder:text-purple-400/60"
                      />
                      <p className="text-purple-400/60 text-xs mt-1">
                        API key sẽ được lưu tạm thời để phân tích ảnh. Không chia sẻ với ai khác.
                      </p>
                    </div>
                  )}
                </div>

                {/* Image Upload Preview */}
                {uploadedImage && (
                  <div className="bg-purple-800/30 rounded-lg p-3 border border-purple-600/30">
                    <div className="flex items-start space-x-3">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded-lg border border-purple-500/30"
                      />
                      <div className="flex-1">
                        <p className="text-purple-200 text-sm font-medium">Ảnh đã tải lên</p>
                        <p className="text-purple-300/70 text-xs">Sẵn sàng để AI phân tích tướng số</p>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={removeImage}
                          className="text-red-400 hover:text-red-300 mt-1 p-0 h-auto"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Xóa ảnh
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chat Input with Image Upload */}
                <form onSubmit={handleSubmitWithImage} className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder={
                        uploadedImage ? "Hỏi về ảnh bạn vừa tải lên..." : "Hỏi Osirus về vận mệnh của bạn..."
                      }
                      className="flex-1 bg-purple-800/30 border-purple-600/50 text-purple-200 placeholder:text-purple-400/60"
                      disabled={isLoading}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="border-purple-600/50 text-purple-300 hover:bg-purple-600 hover:text-white"
                      disabled={isLoading}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading || (!input.trim() && !uploadedImage)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  {uploadedImage && (
                    <div className="flex items-center space-x-2 text-purple-300/70 text-xs">
                      <ImageIcon className="w-3 h-3" />
                      <span>Ảnh sẽ được gửi cùng tin nhắn để AI phân tích</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Special Readings */}
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-purple-200 ${playfair.className}`}>Dịch Vụ Xem Tướng Chuyên Sâu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => {
                      const palmDesc = prompt("Mô tả đường chỉ tay của bạn (màu sắc, độ sâu, độ dài...):")
                      if (palmDesc) {
                        handleSpecialReading("palm-analysis", { palmDescription: palmDesc })
                      }
                    }}
                    className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30"
                    disabled={isLoadingSpecial}
                  >
                    <div className="text-center">
                      <Hand className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Phân Tích Tướng Tay</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => {
                      const question = prompt("Đặt câu hỏi cho lá bài Tarot:")
                      if (question) {
                        handleSpecialReading("tarot-reading", { question, spreadType: "three-card" })
                      }
                    }}
                    className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30"
                    disabled={isLoadingSpecial}
                  >
                    <div className="text-center">
                      <Crystal className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Bói Tarot 3 Lá</div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => {
                      const name = prompt("Nhập họ tên đầy đủ:")
                      const birthDate = prompt("Nhập ngày sinh (YYYY-MM-DD):")
                      if (name && birthDate) {
                        handleSpecialReading("numerology", { fullName: name, birthDate })
                      }
                    }}
                    className="h-auto p-4 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30"
                    disabled={isLoadingSpecial}
                  >
                    <div className="text-center">
                      <Zap className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Thần Số Học</div>
                    </div>
                  </Button>
                </div>

                {specialReading && (
                  <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/50">
                    <CardHeader>
                      <CardTitle className="text-purple-200">
                        {specialReading.type === "palm_reading" && "Kết Quả Phân Tích Tướng Tay"}
                        {specialReading.type === "tarot_reading" && "Kết Quả Bói Tarot"}
                        {specialReading.type === "numerology_reading" && "Kết Quả Thần Số Học"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {specialReading.cards && (
                        <div className="mb-4">
                          <p className="text-purple-200 font-medium mb-2">Các lá bài được rút:</p>
                          <div className="flex flex-wrap gap-2">
                            {specialReading.cards.map((card: string, index: number) => (
                              <Badge key={index} className="bg-purple-600/50 text-purple-200">
                                {card}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {specialReading.lifePathNumber && (
                        <div className="mb-4 grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-purple-200 font-medium">Số Đường Đời:</p>
                            <Badge className="bg-green-600/50 text-green-200">{specialReading.lifePathNumber}</Badge>
                          </div>
                          <div>
                            <p className="text-purple-200 font-medium">Số Định Mệnh:</p>
                            <Badge className="bg-blue-600/50 text-blue-200">{specialReading.destinyNumber}</Badge>
                          </div>
                        </div>
                      )}
                      <div className="prose prose-invert max-w-none">
                        <p className={`text-purple-100 leading-relaxed whitespace-pre-wrap ${playfair.className}`}>
                          {specialReading.analysis || specialReading.interpretation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
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

          <TabsContent value="image-analysis" className="space-y-4">
            {/* Image Analysis Interface */}
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-purple-200 flex items-center ${playfair.className}`}>
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Phân Tích Ảnh Tướng Số
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* API Key Input for Image Analysis */}
                <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Settings className="w-4 h-4 text-purple-300" />
                    <p className="text-purple-200 text-sm font-medium">OpenAI API Key</p>
                  </div>
                  <Input
                    type="password"
                    placeholder="Nhập OpenAI API Key để phân tích ảnh..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-purple-900/30 border-purple-600/50 text-purple-200 placeholder:text-purple-400/60"
                  />
                  <p className="text-purple-400/60 text-xs mt-1">
                    Cần API key để sử dụng tính năng phân tích ảnh với AI
                  </p>
                </div>

                {/* Image Upload Area */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-purple-300" />
                    <p className="text-purple-200 text-sm font-medium">Tải Ảnh Lên</p>
                  </div>

                  {!analysisImage ? (
                    <div
                      className="border-2 border-dashed border-purple-600/50 rounded-lg p-8 text-center bg-purple-800/20 hover:bg-purple-800/30 transition-colors cursor-pointer"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("analysis-image-upload")?.click()}
                    >
                      <Upload className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                      <p className="text-purple-200 mb-2">Kéo thả ảnh vào đây hoặc click để chọn</p>
                      <p className="text-purple-400/60 text-sm">Hỗ trợ: JPG, PNG, GIF (tối đa 10MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAnalysisImageUpload}
                        className="hidden"
                        id="analysis-image-upload"
                      />
                    </div>
                  ) : (
                    <div className="bg-purple-800/30 rounded-lg p-4 border border-purple-600/30">
                      <div className="flex items-start space-x-4">
                        <img
                          src={analysisImage || "/placeholder.svg"}
                          alt="Analysis"
                          className="w-32 h-32 object-cover rounded-lg border border-purple-500/30"
                        />
                        <div className="flex-1 space-y-2">
                          <p className="text-purple-200 font-medium">Ảnh đã tải lên</p>
                          <p className="text-purple-300/70 text-sm">Sẵn sàng để phân tích</p>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeAnalysisImage}
                            className="text-red-400 hover:text-red-300 p-0 h-auto"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Xóa ảnh
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Analysis Options */}
                {analysisImage && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-purple-200 text-sm font-medium">Loại Phân Tích</label>
                        <Select value={analysisType} onValueChange={setAnalysisType}>
                          <SelectTrigger className="bg-purple-800/30 border-purple-600/50 text-purple-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-purple-900 border-purple-600/50">
                            <SelectItem value="palm">🖐️ Tướng Tay (Palmistry)</SelectItem>
                            <SelectItem value="face">👤 Tướng Mặt (Physiognomy)</SelectItem>
                            <SelectItem value="tarot">🔮 Bài Tarot</SelectItem>
                            <SelectItem value="general">✨ Phân Tích Tổng Quát</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-purple-200 text-sm font-medium">Câu Hỏi Cụ Thể (Tùy chọn)</label>
                        <Input
                          placeholder="VD: Tình duyên của tôi như thế nào?"
                          value={analysisQuestion}
                          onChange={(e) => setAnalysisQuestion(e.target.value)}
                          className="bg-purple-800/30 border-purple-600/50 text-purple-200 placeholder:text-purple-400/60"
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleImageAnalysis}
                      disabled={isAnalyzing || !apiKey}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Đang phân tích...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>Phân Tích Ảnh</span>
                        </div>
                      )}
                    </Button>
                  </div>
                )}

                {/* Analysis Results */}
                {analysisResult && (
                  <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/50">
                    <CardHeader>
                      <CardTitle className="text-purple-200 flex items-center justify-between">
                        <span>Kết Quả Phân Tích</span>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-600/50 text-green-200">{analysisResult.confidence}% tin cậy</Badge>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                            {analysisResult.analysisType}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-invert max-w-none">
                        <p className={`text-purple-100 leading-relaxed whitespace-pre-wrap ${playfair.className}`}>
                          {analysisResult.analysis}
                        </p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-purple-600/30">
                        <p className="text-purple-400/60 text-xs">
                          Phân tích vào: {new Date(analysisResult.timestamp).toLocaleString("vi-VN")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Image Analysis Guide */}
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className={`text-purple-200 ${playfair.className}`}>Hướng Dẫn Chụp Ảnh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200">Tips Chụp Ảnh Tốt:</h4>
                    <ul className="space-y-1 text-sm text-purple-300">
                      <li>• Ánh sáng tự nhiên, tránh bóng đổ</li>
                      <li>• Ảnh rõ nét, không bị mờ</li>
                      <li>• Đặt tay/mặt ở giữa khung hình</li>
                      <li>• Nền đơn giản, không phức tạp</li>
                      <li>• Khoảng cách vừa phải (30-50cm)</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-200">Loại Ảnh Phù Hợp:</h4>
                    <ul className="space-y-1 text-sm text-purple-300">
                      <li>🖐️ Lòng bàn tay mở rộng</li>
                      <li>👤 Khuôn mặt nhìn thẳng</li>
                      <li>🔮 Bài Tarot rải rõ ràng</li>
                      <li>✨ Các biểu tượng tâm linh</li>
                      <li>📱 Format: JPG, PNG, GIF</li>
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
