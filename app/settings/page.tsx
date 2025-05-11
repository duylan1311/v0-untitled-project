"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import BananaCharacter from "@/components/banana-character"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [bananaMood, setBananaMood] = useState<"happy" | "thinking" | "normal">("normal")

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key")
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setIsSaved(true)
      setBananaMood("happy")
    }
  }, [])

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim())
      setIsSaved(true)
      setSaveMessage("API key saved successfully!")
      setBananaMood("happy")

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }
  }

  const handleClearApiKey = () => {
    localStorage.removeItem("openai_api_key")
    setApiKey("")
    setIsSaved(false)
    setSaveMessage("API key cleared!")
    setBananaMood("normal")

    // Clear message after 3 seconds
    setTimeout(() => {
      setSaveMessage("")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8E1] to-[#FFF0E0] p-4 flex flex-col items-center justify-center">
      <Card className="max-w-md w-full p-6 bg-white/90 backdrop-blur-sm border-[#5D4037]/10 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-[#5D4037] hover:bg-[#FFCCBC]/30 rounded-full transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-[#5D4037]">Settings</h1>
        </div>

        <div className="flex justify-center mb-6">
          <BananaCharacter
            isSpeaking={true}
            message={isSaved ? "Your API key is saved!" : "Add your API key here!"}
            mood={bananaMood}
          />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-[#5D4037] mb-1">
              OpenAI API Key{" "}
              {isSaved && (
                <span className="text-green-600 text-sm ml-2 inline-flex items-center">
                  <Check size={14} className="mr-1" /> Saved
                </span>
              )}
            </label>
            <div className="flex">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="flex-1 border-[#5D4037]/20 rounded-l-full focus:ring-2 focus:ring-[#FFAB91] focus:border-[#FFAB91] transition-all duration-300"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowApiKey(!showApiKey)}
                className="border-[#5D4037]/20 rounded-r-full hover:bg-[#FFCCBC]/20 transition-all duration-300"
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-xs text-[#5D4037]/70 mt-1">
              Your API key is stored locally in your browser and is never sent to our servers.
            </p>
          </div>

          {saveMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded-full text-sm text-center animate-pop-in">
              {saveMessage}
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={handleClearApiKey}
              className="border-[#5D4037]/20 text-[#5D4037] rounded-full hover:bg-[#FFCCBC]/20 transition-all duration-300"
            >
              Clear
            </Button>
            <Button
              onClick={handleSaveApiKey}
              className="bg-gradient-to-r from-[#FFCCBC] to-[#FFAB91] hover:from-[#FFAB91] hover:to-[#FF8A65] text-[#5D4037] rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
