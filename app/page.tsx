"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Eye, Sparkles, Hand, Star, SnowflakeIcon as Crystal, Users, Calendar } from "lucide-react"
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

export default function FortuneApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [readings, setReadings] = useState([
    {
      id: 1,
      type: "Xem Tướng Tay",
      date: "2024-01-15",
      result: "Tích Cực",
      content: "Đường sự nghiệp rất rõ ràng, bạn sẽ có nhiều cơ hội thăng tiến trong thời gian tới...",
    },
    {
      id: 2,
      type: "Xem Tướng Mặt",
      date: "2024-01-14",
      result: "Thịnh Vượng",
      content: "Tướng mặt cho thấy bạn có phúc khí tốt, tài lộc sẽ đến trong năm nay...",
    },
  ])

  const [fortuneResult, setFortuneResult] = useState("")
  const [isReading, setIsReading] = useState(false)

  const fortuneTypes = [
    { name: "Xem Tướng Tay", icon: Hand, desc: "Đọc vận mệnh qua đường chỉ tay" },
    { name: "Xem Tướng Mặt", icon: Eye, desc: "Phân tích tính cách qua khuôn mặt" },
    { name: "Xem Bói Tarot", icon: Star, desc: "Dự đoán tương lai với bài Tarot" },
    { name: "Xem Tử Vi", icon: Moon, desc: "Tính toán vận mệnh theo ngày sinh" },
  ]

  const generateFortune = (type: string) => {
    setIsReading(true)
    setTimeout(() => {
      const fortunes = {
        "Xem Tướng Tay": [
          "Đường sự nghiệp của bạn rất rõ ràng và dài, báo hiệu thành công lớn trong tương lai.",
          "Đường tình duyên có nhiều nhánh, bạn sẽ gặp được người đặc biệt trong năm nay.",
          "Đường sức khỏe mạnh mẽ, bạn có thể thể chất tốt và tuổi thọ cao.",
        ],
        "Xem Tướng Mặt": [
          "Khuôn mặt phúc hậu, bạn có khả năng tích lũy tài sản và giàu có.",
          "Đôi mắt sáng, thông minh, bạn có trí tuệ và khả năng lãnh đạo tốt.",
          "Tướng mặt quý phái, bạn sẽ có địa vị cao trong xã hội.",
        ],
        "Xem Bói Tarot": [
          "Lá bài The Sun xuất hiện - thành công và hạnh phúc đang đến gần bạn.",
          "Lá bài The Star báo hiệu hy vọng mới và những cơ hội tuyệt vời.",
          "Lá bài Wheel of Fortune - vận may sẽ xoay chuyển theo hướng tích cực.",
        ],
        "Xem Tử Vi": [
          "Sao Tử Vi chiếu mệnh, bạn có vận mệnh quý phái và thành đạt.",
          "Cung Tài Bạch sáng, tài lộc dồi dào trong thời gian tới.",
          "Sao Văn Xương hỗ trợ, học hành và sự nghiệp đều thuận lợi.",
        ],
      }

      const typeFortures = fortunes[type as keyof typeof fortunes] || fortunes["Xem Tướng Tay"]
      const randomFortune = typeFortures[Math.floor(Math.random() * typeFortures.length)]
      setFortuneResult(randomFortune)
      setIsReading(false)
    }, 2000)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 ${inter.className}`}>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo Recreation */}
            <div className="relative">
              <div className="absolute -top-8 -left-8">
                <Moon className="w-12 h-12 text-purple-300 opacity-80" />
              </div>
              <div className="relative bg-gradient-to-b from-purple-400/30 to-purple-600/30 rounded-full p-8 backdrop-blur-sm border border-purple-400/20">
                <div className="bg-gradient-to-b from-purple-500/40 to-indigo-600/40 rounded-full p-6">
                  <Eye className="w-16 h-16 text-purple-200" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1
                className={`text-6xl font-bold bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200 bg-clip-text text-transparent ${cinzel.className}`}
              >
                Thiên Cơ
              </h1>
              <p className={`text-purple-200/80 text-lg ${playfair.className}`}>Ứng dụng xem tướng hàng đầu</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-center space-x-2">
          {[
            { id: "home", label: "Trang Chủ", icon: Sparkles },
            { id: "reading", label: "Xem Tướng", icon: Hand },
            { id: "history", label: "Lịch Sử", icon: Calendar },
            { id: "community", label: "Cộng Đồng", icon: Users },
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              onClick={() => setActiveTab(id)}
              className={`${
                activeTab === id
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "text-purple-200 hover:text-white hover:bg-purple-800/50"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className={`text-3xl font-bold text-purple-200 ${playfair.className}`}>Khám Phá Vận Mệnh Của Bạn</h2>
              <p className="text-purple-300/80 max-w-2xl mx-auto">
                Ứng dụng xem tướng chính xác nhất với công nghệ AI hiện đại. Khám phá tương lai, tình duyên, sự nghiệp
                và sức khỏe.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fortuneTypes.map((type, index) => (
                <Card
                  key={index}
                  className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm hover:bg-purple-800/40 transition-colors cursor-pointer"
                >
                  <CardHeader className="text-center">
                    <type.icon className="w-12 h-12 text-purple-300 mx-auto mb-2" />
                    <CardTitle className={`text-purple-200 text-lg ${playfair.className}`}>{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-300/80 text-sm text-center">{type.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={() => setActiveTab("reading")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3"
              >
                <Crystal className="w-5 h-5 mr-2" />
                Bắt Đầu Xem Tướng
              </Button>
            </div>
          </div>
        )}

        {activeTab === "reading" && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className={`text-2xl font-bold text-purple-200 mb-4 ${playfair.className}`}>Chọn Loại Xem Tướng</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {fortuneTypes.map((type, index) => (
                <Card key={index} className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className={`text-purple-200 flex items-center ${playfair.className}`}>
                      <type.icon className="w-6 h-6 mr-3" />
                      {type.name}
                    </CardTitle>
                    <CardDescription className="text-purple-300/70">{type.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => generateFortune(type.name)}
                      disabled={isReading}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isReading ? "Đang xem tướng..." : "Xem Ngay"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {fortuneResult && (
              <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-200 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Kết Quả Xem Tướng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-purple-100 text-lg leading-relaxed ${playfair.className}`}>{fortuneResult}</p>
                  <div className="mt-4 flex justify-center">
                    <Badge className="bg-purple-600/50 text-purple-200">Độ chính xác: 95%</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold text-purple-200 ${playfair.className}`}>Lịch Sử Xem Tướng</h2>
            <div className="space-y-4">
              {readings.map((reading) => (
                <Card key={reading.id} className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-purple-200">{reading.type}</CardTitle>
                        <CardDescription className="text-purple-300/70">{reading.date}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-purple-700/50 text-purple-200">
                        {reading.result}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-300/80">{reading.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div className="text-center space-y-4">
            <h2 className={`text-2xl font-bold text-purple-200 ${playfair.className}`}>Cộng Đồng Xem Tướng</h2>
            <Card className="bg-purple-900/30 border-purple-600/30 backdrop-blur-sm p-8">
              <Users className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-purple-300/80">Tính năng cộng đồng đang được phát triển...</p>
              <p className="text-purple-400/60 text-sm mt-2">Chia sẻ kinh nghiệm và thảo luận với các chuyên gia</p>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-purple-400/60">🔮 Vận mệnh trong tầm tay 🔮</p>
      </footer>
    </div>
  )
}
