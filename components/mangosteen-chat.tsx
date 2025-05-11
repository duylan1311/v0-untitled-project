"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Home, BookOpen, SmilePlus, Settings } from "lucide-react"
import Link from "next/link"
import MangosteenCharacter from "./mangosteen-character"
import WelcomeScreen from "./welcome-screen"

type Message = {
  id: string
  text: string
  sender: "user" | "mangosteen"
  timestamp: number
}

// Predefined responses for the mangosteen character
const mangosteenResponses = [
  "I'm here for you! Things will get better.",
  "That's interesting! Tell me more about it.",
  "Sometimes life is sweet and sour, but we'll get through it!",
  "I'm all ears (well, if mangosteens had ears)!",
  "You're doing great! Keep going!",
  "That sounds challenging. Need a mangosteen hug?",
  "Remember to take care of yourself today!",
  "I believe in you! You've got this!",
  "Let's solve this problem together!",
  "Your feelings are valid. It's okay to feel that way.",
  "What a day! Let's make it better together.",
  "You're stronger than you think!",
  "That's sweet! Tell me more.",
  "I'm here to support you! Keep going!",
  "You're making great progress!",
]

// Vietnamese responses
const vietnameseMangosteenResponses = [
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

export default function MangosteenChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [mangosteenMood, setMangosteenMood] = useState<"happy" | "thinking" | "excited" | "sad" | "normal">("normal")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("mangosteen_chat_messages")
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
      localStorage.setItem("mangosteen_chat_messages", JSON.stringify(messages))
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

  // Update mangosteen mood based on messages
  useEffect(() => {
    if (isLoading) {
      setMangosteenMood("thinking")
      return
    }

    if (messages.length === 0) {
      setMangosteenMood("normal")
      return
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage.sender === "mangosteen") {
      // Set a random mood for the mangosteen
      const moods: Array<"happy" | "excited" | "normal"> = ["happy", "excited", "normal"]
      setMangosteenMood(moods[Math.floor(Math.random() * moods.length)])
    } else {
      setMangosteenMood("normal")
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
        sender: "mangosteen",
        timestamp: Date.now(),
      },
    ])
  }

  const handleClearChat = () => {
    localStorage.removeItem("mangosteen_chat_messages")
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

        const mangosteenResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          sender: "mangosteen",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, mangosteenResponse])
      } else {
        // Use the fallback responses
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use Vietnamese responses
        const randomResponse =
          vietnameseMangosteenResponses[Math.floor(Math.random() * vietnameseMangosteenResponses.length)]

        const mangosteenResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "mangosteen",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, mangosteenResponse])
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Use a fallback response
      const randomResponse =
        vietnameseMangosteenResponses[Math.floor(Math.random() * vietnameseMangosteenResponses.length)]

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "mangosteen",
        timestamp: Date.now(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Get the last mangosteen message for the character to display
  const lastMangosteenMessage = messages.filter((m) => m.sender === "mangosteen").pop()?.text

  return (
    <Card className="w-full max-w-md h-[90vh] flex flex-col overflow-hidden shadow-sm rounded-none border-0">
      <div className="bg-[#F3E5F5] p-6 text-center">
        <h1 className="text-4xl font-bold text-[#4A148C]">An Ui Nhẹ Nhàng</h1>
        <p className="text-2xl text-[#4A148C] mt-2">Chào mừng bạn!</p>
      </div>

      {showWelcome ? (
        <WelcomeScreen onStart={handleStartChat} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F3E5F5]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user" ? "bg-[#CE93D8] text-[#4A148C]" : "bg-white text-[#4A148C]"
                  } shadow-sm`}
                >
                  <div className="mb-1">{message.text}</div>
                  <div className="text-xs text-[#4A148C]/60 text-right">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-center mt-4">
                <MangosteenCharacter isThinking={true} mood="thinking" />
              </div>
            ) : (
              messages.length > 0 && (
                <div className="flex justify-center mt-4">
                  <MangosteenCharacter
                    isSpeaking={!!lastMangosteenMessage}
                    message={lastMangosteenMessage}
                    mood={mangosteenMood}
                  />
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-[#F3E5F5]">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="bg-white border-[#4A148C]/20 rounded-full shadow-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#CE93D8] hover:bg-[#BA68C8] text-[#4A148C] rounded-full shadow-sm transition-all duration-200"
                disabled={isLoading || !input.trim()}
              >
                Gửi
              </Button>
            </form>
          </div>
        </>
      )}

      <div className="flex justify-between p-4 bg-[#F3E5F5] border-t border-[#4A148C]/10">
        <Button variant="ghost" className="text-[#4A148C] hover:bg-[#CE93D8]/30 transition-colors duration-200">
          <Home size={24} />
        </Button>
        <Button variant="ghost" className="text-[#4A148C] hover:bg-[#CE93D8]/30 transition-colors duration-200">
          <BookOpen size={24} />
        </Button>
        <Button
          variant="ghost"
          className="text-[#4A148C] hover:bg-[#CE93D8]/30 transition-colors duration-200"
          onClick={handleClearChat}
        >
          <SmilePlus size={24} />
        </Button>
        <Link href="/settings">
          <Button variant="ghost" className="text-[#4A148C] hover:bg-[#CE93D8]/30 transition-colors duration-200">
            <Settings size={24} />
          </Button>
        </Link>
      </div>

      {!hasApiKey && !showWelcome && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-[90%] bg-white border border-[#4A148C]/20 rounded-lg p-3 text-sm text-[#4A148C] shadow-sm">
          <p className="font-medium">Add your OpenAI API key for AI responses</p>
          <p className="text-xs mt-1">Currently using pre-defined responses</p>
          <Link href="/settings">
            <Button
              size="sm"
              className="mt-2 w-full bg-[#CE93D8] hover:bg-[#BA68C8] text-[#4A148C] rounded-full transition-all duration-200"
            >
              Add API Key
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
