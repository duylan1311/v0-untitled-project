"use client"

import { Button } from "@/components/ui/button"
import BananaCharacter from "./banana-character"
import { VolumeX } from "lucide-react"
import { useState } from "react"

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-[#FFF8E1] to-[#FFF0E0]">
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/80 text-[#5D4037] hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsMuted(!isMuted)}
        >
          <VolumeX size={20} className={isMuted ? "opacity-100" : "opacity-50"} />
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold text-[#5D4037] mb-2 tracking-tight">Bạn Chuối</h1>
          <p className="text-2xl text-[#5D4037]/80 font-medium">Người bạn tâm sự!</p>
        </div>

        <div className="mb-8 animate-float">
          <BananaCharacter isSpeaking={true} message="Mọi chuyện rồi sẽ ổn thôi." mood="happy" />
        </div>
      </div>

      <Button
        className="w-full max-w-xs bg-gradient-to-r from-[#FFCCBC] to-[#FFAB91] hover:from-[#FFAB91] hover:to-[#FF8A65] text-[#5D4037] font-medium rounded-full py-6 text-lg shadow-md transition-all duration-300 transform hover:scale-105"
        onClick={onStart}
      >
        Chia sẻ tâm sự
      </Button>
    </div>
  )
}
