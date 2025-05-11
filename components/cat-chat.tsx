"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Home, BookOpen, SmilePlus, Settings } from "lucide-react"
import Link from "next/link"
import CatCharacter from "./cat-character"
import WelcomeScreen from "./welcome-screen"

type Message = {
  id: string
  text: string
  sender: "user" | "cat"
  timestamp: number
}

// Predefined responses for the cat character
const catResponses = [
  "I'm here for you! Things will get better.",
  "That's interesting! Tell me more about it.",
  "Sometimes life is challenging, but we'll get through it!",
  "I'm all ears (and whiskers)!",
  "You're doing great! Keep going!",
  "That sounds challenging. Need a cat cuddle?",
  "Remember to take care of yourself today!",
  "I believe in you! You've got this!",
  "Let's solve this problem together!",
  "Your feelings are valid. It's okay to feel that way.",
  "What a day! Let's make it better together.",
  "You're stronger than you think!",
  "That's purr-fect! Tell me more.",
  "I'm here to support you! Keep going!",
  "You're making great progress!",
]

// Vietnamese responses
const vietnameseCatResponses = [
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

export default function CatChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasApiKey, setHasApiKey] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [catMood, setCatMood] = useState<"happy" | "thinking" | "excited" | "sad" | "normal">("normal")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("cat_chat_messages")
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
      localStorage.setItem("cat_chat_messages", JSON.stringify(messages))
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

  // Update cat mood based on messages
  useEffect(() => {
    if (isLoading) {
      setCatMood("thinking")
      return
    }

    if (messages.length === 0) {
      setCatMood("normal")
      return
    }

    const lastMessage = messages[messages.length - 1]
    if (lastMessage.sender === "cat") {
      // Set a random mood for the cat
      const moods: Array<"happy" | "excited" | "normal"> = ["happy", "excited", "normal"]
      setCatMood(moods[Math.floor(Math.random() * moods.length)])
    } else {
      setCatMood("normal")
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
        sender: "cat",
        timestamp: Date.now(),
      },
    ])
  }

  const handleClearChat = () => {
    localStorage.removeItem("cat_chat_messages")
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

        const catResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          sender: "cat",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, catResponse])
      } else {
        // Use the fallback responses
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use Vietnamese responses
        const randomResponse = vietnameseCatResponses[Math.floor(Math.random() * vietnameseCatResponses.length)]

        const catResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: "cat",
          timestamp: Date.now(),
        }

        setMessages((prev) => [...prev, catResponse])
      }
    } catch (error) {
      console.error("Error generating response:", error)

      // Use a fallback response
      const randomResponse = vietnameseCatResponses[Math.floor(Math.random() * vietnameseCatResponses.length)]

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "cat",
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

  // Get the last cat message for the character to display
  const lastCatMessage = messages.filter((m) => m.sender === "cat").pop()?.text

  return (
    <Card className="w-full max-w-md h-[90vh] flex flex-col overflow-hidden shadow-sm rounded-none border-0">
      <div className="bg-[#FFF8E1] p-6 text-center">
        <h1 className="text-4xl font-bold text-[#E65100]">An Ui Nhẹ Nhàng</h1>
        <p className="text-2xl text-[#E65100] mt-2">Chào mừng bạn!</p>
      </div>

      {showWelcome ? (
        <WelcomeScreen onStart={handleStartChat} />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFF8E1]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user" ? "bg-[#FFB74D] text-[#E65100]" : "bg-white text-[#E65100]"
                  } shadow-sm`}
                >
                  <div className="mb-1">{message.text}</div>
                  <div className="text-xs text-[#E65100]/60 text-right">{formatTime(message.timestamp)}</div>
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-center mt-4">
                <CatCharacter isThinking={true} mood="thinking" />
              </div>
            ) : (
              messages.length > 0 && (
                <div className="flex justify-center mt-4">
                  <CatCharacter isSpeaking={!!lastCatMessage} message={lastCatMessage} mood={catMood} />
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-[#FFF8E1]">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="bg-white border-[#E65100]/20 rounded-full shadow-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-[#FFB74D] hover:bg-[#FFA726] text-[#E65100] rounded-full shadow-sm transition-all duration-200"
                disabled={isLoading || !input.trim()}
              >
                Gửi
              </Button>
            </form>
          </div>
        </>
      )}

      <div className="flex justify-between p-4 bg-[#FFF8E1] border-t border-[#E65100]/10">
        <Button variant="ghost" className="text-[#E65100] hover:bg-[#FFB74D]/30 transition-colors duration-200">
          <Home size={24} />
        </Button>
        <Button variant="ghost" className="text-[#E65100] hover:bg-[#FFB74D]/30 transition-colors duration-200">
          <BookOpen size={24} />
        </Button>
        <Button
          variant="ghost"
          className="text-[#E65100] hover:bg-[#FFB74D]/30 transition-colors duration-200"
          onClick={handleClearChat}
        >
          <SmilePlus size={24} />
        </Button>
        <Link href="/settings">
          <Button variant="ghost" className="text-[#E65100] hover:bg-[#FFB74D]/30 transition-colors duration-200">
            <Settings size={24} />
          </Button>
        </Link>
      </div>

      {!hasApiKey && !showWelcome && (
        <div className="absolute bottom-20 left-0 right-0 mx-auto w-[90%] bg-white border border-[#E65100]/20 rounded-lg p-3 text-sm text-[#E65100] shadow-sm">
          <p className="font-medium">Add your OpenAI API key for AI responses</p>
          <p className="text-xs mt-1">Currently using pre-defined responses</p>
          <Link href="/settings">
            <Button
              size="sm"
              className="mt-2 w-full bg-[#FFB74D] hover:bg-[#FFA726] text-[#E65100] rounded-full transition-all duration-200"
            >
              Add API Key
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
