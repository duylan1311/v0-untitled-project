"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Home, BookOpen, SmilePlus, Settings, VolumeX, Send } from "lucide-react"
import Link from "next/link"
import BananaCharacter from "./banana-character"
import WelcomeScreen from "./welcome-screen"

type Message = {
  id: string
  text: string
  sender: "user" | "banana"
  timestamp: number
}

// Vietnamese responses
const vietnameseBananaResponses = [
  "Mọi chuyện rồi sẽ ổn thôi.",
  "Tôi luôn ở đây lắng nghe bạn!",
  "Đôi khi cuộc sống thật khó khăn, nhưng bạn sẽ vượt qua!",
  "Bạn đang làm rất tốt, hãy tiếp tục nhé!",
  "Cảm xúc của bạn rất quan trọng và hợp lệ.",
  "Hãy nhớ chăm sóc bản thân mỗi ngày nhé!",
  "Tôi tin vào bạn! Bạn có thể làm được!",
  "Hãy cùng nhau giải quyết vấn đề này nhé!",
  "Bạn mạnh mẽ hơn bạn nghĩ đấy!",
  "Hôm nay là một ngày mới, hãy bắt đầu lại!",
  "Tôi rất vui khi được trò chuyện với bạn!",
  "Bạn không bao giờ đơn độc, tôi luôn ở đây!",
  "Hãy cho phép bản thân nghỉ ngơi khi cần thiết.",
  "Mỗi bước nhỏ đều quan trọng trên hành trình của bạn.",
  "Bạn đang tiến bộ rất nhiều đấy!",
]

export default function BananaChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [bananaMood, setBananaMood] = useState<"happy" | "thinking" | "excited" | "sad" | "normal">("normal")
  const [isMuted, setIsMuted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("banana_chat_messages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages)
        setMessages(parsedMessages)
        setShowWelcome(false)
      } catch (error) {
        console.error("Error parsing saved messages:", error)
      }
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("banana_chat_messages", JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check if API key exists
  useEffect(() => {
    const checkApiKey = () => {
      const savedApiKey = localStorage.getItem("openai_api_key")
      setHasApiKey(!!savedApiKey)
    }

    checkApiKey()

    // Listen for storage changes
    window.addEventListener("storage", checkApiKey)
    return () => window.removeEventListener("storage", checkApiKey)
  }, [])

  // Update banana mood based on messages
  useEffect(() => {
    if (isLoading) {
      setBananaMood("thinking")
      return
    }

    if (messages.length === 0) {
      setBananaMood("normal")
      return
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage.sender === "banana") {
      // Set a random mood for the banana
      const moods: Array<"happy" | "excited" | "normal"> = ["happy", "excited", "normal"]
      setBananaMood(moods[Math.floor(Math.random() * moods.length)])
    } else {
      setBananaMood("normal")
    }
  }, [messages, isLoading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleStartChat = () => {
    setShowWelcome(false)
    setMessages([
      {
        id: "1",
        text: "Mọi chuyện rồi sẽ ổn thôi.",
        sender: "banana",
        timestamp: Date.now(),
      },
    ])

    // Focus the input field after starting chat
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const handleClearChat = () => {
    localStorage.removeItem("banana_chat_messages")
    setMessages([])
    setShowWelcome(true)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      if (hasApiKey) {
        // Use the user's API key
        const apiKey = localStorage.getItem("openai_api_key")

        // Try the direct API route first
        const response = await fetch("/api/chat-direct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input,
            apiKey: apiKey,
          }),
        })

        if (!response.ok) {
          throw new Error("API request failed")
        }

        const data = await response.json()

        const bananaResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          sender: "banana",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, bananaResponse])
      } else {
        // Use the fallback responses
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use Vietnamese responses
        const randomResponse = vietnameseBananaResponses[Math.floor(Math.random() * vietnameseBananaResponses.length)]

        const bananaResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "banana",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, bananaResponse])
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Use a fallback response
      const randomResponse = vietnameseBananaResponses[Math.floor(Math.random() * vietnameseBananaResponses.length)]

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "banana",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)

      // Focus the input field after sending a message
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }

  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Get the last banana message for the character to display
  const lastBananaMessage = messages.filter((m) => m.sender === "banana").pop()?.text

  return (
    <Card className="w-full max-w-md h-[90vh] flex flex-col overflow-hidden shadow-lg rounded-xl border-0">
      {showWelcome ? (
        <WelcomeScreen onStart={handleStartChat} />
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#FFF8E1] to-[#FFF0E0] p-6 text-center relative">
            <h1 className="text-4xl font-bold text-[#5D4037] tracking-tight">Bạn Chuối</h1>
            <p className="text-xl text-[#5D4037]/80 mt-1 font-medium">Người bạn tâm sự!</p>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 rounded-full bg-white/80 text-[#5D4037] hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-300"
              onClick={() => setIsMuted(!isMuted)}
            >
              <VolumeX size={20} className={isMuted ? "opacity-100" : "opacity-50"} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#FFF0E0] to-[#FFF8E1]">
            {messages.map((message, index) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-[#FFCCBC] to-[#FFAB91] text-[#5D4037]"
                      : "bg-white text-[#5D4037]"
                  } shadow-md animate-pop-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-1">{message.text}</div>
                  <div className="text-xs text-[#5D4037]/60 text-right">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-center mt-4">
                <BananaCharacter isThinking={true} mood="thinking" />
              </div>
            ) : (
              messages.length > 0 && (
                <div className="flex justify-center mt-4">
                  <BananaCharacter isSpeaking={!!lastBananaMessage} message={lastBananaMessage} mood={bananaMood} />
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-[#FFF8E1]">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="bg-white border-[#5D4037]/20 rounded-full shadow-md focus:ring-2 focus:ring-[#FFAB91] focus:border-[#FFAB91] transition-all duration-300"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#FFCCBC] to-[#FFAB91] hover:from-[#FFAB91] hover:to-[#FF8A65] text-[#5D4037] rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                disabled={isLoading || !input.trim()}
              >
                <Send size={18} className="mr-1" />
                Gửi
              </Button>
            </form>
          </div>

          <div className="flex justify-between p-4 bg-[#FFF8E1] border-t border-[#5D4037]/10">
            <Button
              variant="ghost"
              className="text-[#5D4037] hover:bg-[#FFCCBC]/30 transition-colors duration-300 flex flex-col items-center"
            >
              <Home size={22} />
              <span className="text-xs mt-1 font-medium">Trang chủ</span>
            </Button>
            <Button
              variant="ghost"
              className="text-[#5D4037] hover:bg-[#FFCCBC]/30 transition-colors duration-300 flex flex-col items-center"
            >
              <BookOpen size={22} />
              <span className="text-xs mt-1 font-medium">Nhật ký</span>
            </Button>
            <Button
              variant="ghost"
              className="text-[#5D4037] hover:bg-[#FFCCBC]/30 transition-colors duration-300 flex flex-col items-center"
              onClick={handleClearChat}
            >
              <SmilePlus size={22} />
              <span className="text-xs mt-1 font-medium">Nhân vật</span>
            </Button>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="text-[#5D4037] hover:bg-[#FFCCBC]/30 transition-colors duration-300 flex flex-col items-center"
              >
                <Settings size={22} />
                <span className="text-xs mt-1 font-medium">Cài đặt</span>
              </Button>
            </Link>
          </div>
        </>
      )}

      {!hasApiKey && !showWelcome && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-[90%] bg-white/90 backdrop-blur-sm border border-[#5D4037]/20 rounded-xl p-3 text-sm text-[#5D4037] shadow-md animate-slide-up">
          <p className="font-medium">Add your OpenAI API key for AI responses</p>
          <p className="text-xs mt-1">Currently using pre-defined responses</p>
          <Link href="/settings">
            <Button
              size="sm"
              className="mt-2 w-full bg-gradient-to-r from-[#FFCCBC] to-[#FFAB91] hover:from-[#FFAB91] hover:to-[#FF8A65] text-[#5D4037] rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Add API Key
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
