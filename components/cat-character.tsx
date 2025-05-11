"use client"

import { useState, useEffect } from "react"

interface CatCharacterProps {
  isThinking?: boolean
  isSpeaking?: boolean
  message?: string
  mood?: "happy" | "thinking" | "excited" | "sad" | "normal"
}

export default function CatCharacter({
  isThinking = false,
  isSpeaking = false,
  message,
  mood = "normal",
}: CatCharacterProps) {
  const [blinking, setBlinking] = useState(false)
  const [wiggling, setWiggling] = useState(false)

  useEffect(() => {
    // Random blinking - more frequent for cute effect
    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 150)
      },
      Math.random() * 2000 + 1500,
    )

    // Random wiggling
    const wiggleInterval = setInterval(
      () => {
        if (Math.random() > 0.7) {
          setWiggling(true)
          setTimeout(() => setWiggling(false), 500)
        }
      },
      Math.random() * 4000 + 3000,
    )

    return () => {
      clearInterval(blinkInterval)
      clearInterval(wiggleInterval)
    }
  }, [])

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech bubble */}
      {isSpeaking && message && (
        <div className="mb-4 bg-[#FFF8E1] rounded-3xl p-4 max-w-[250px] text-[#E65100] relative shadow-sm">
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FFF8E1] rotate-45"></div>
          <p className="text-center">{message}</p>
        </div>
      )}

      {/* Thinking dots */}
      {isThinking && (
        <div className="mb-4 bg-[#FFF8E1] rounded-3xl p-3 px-5 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#E65100] animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#E65100] animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#E65100] animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}

      {/* Cat character container */}
      <div className={`relative w-40 h-48 ${wiggling ? "animate-wiggle" : "animate-float"}`}>
        {/* Shadow under cat */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-[#FFB74D]/40 rounded-full blur-sm"></div>

        {/* Main cat body */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {/* Cat head - yellow */}
          <div className="absolute inset-0 bg-[#FFCA28] rounded-full border-2 border-[#E65100]"></div>

          {/* Cat ears */}
          <div className="absolute -top-5 -left-2 w-10 h-10 bg-[#FFCA28] border-2 border-[#E65100] rounded-tl-[120%] transform rotate-[30deg]"></div>
          <div className="absolute -top-5 -right-2 w-10 h-10 bg-[#FFCA28] border-2 border-[#E65100] rounded-tr-[120%] transform -rotate-[30deg]"></div>

          {/* Inner ears */}
          <div className="absolute -top-3 left-1 w-6 h-6 bg-[#FFAB91] rounded-tl-[120%] transform rotate-[30deg]"></div>
          <div className="absolute -top-3 right-1 w-6 h-6 bg-[#FFAB91] rounded-tr-[120%] transform -rotate-[30deg]"></div>

          {/* Face container */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!blinking ? (
              <>
                {/* Face with BIG ROUND EYES */}
                <div className="relative w-24 h-16">
                  {/* Eyes - BIG and ROUND */}
                  <div className="absolute left-2 top-0 w-6 h-6 bg-[#E65100] rounded-full"></div>
                  <div className="absolute right-2 top-0 w-6 h-6 bg-[#E65100] rounded-full"></div>

                  {/* Eye pupils */}
                  <div className="absolute left-4 top-2 w-2 h-4 bg-black rounded-full"></div>
                  <div className="absolute right-4 top-2 w-2 h-4 bg-black rounded-full"></div>

                  {/* Eye highlights for cuteness */}
                  <div className="absolute left-3 top-1 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute right-3 top-1 w-2 h-2 bg-white rounded-full"></div>

                  {/* Nose */}
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-[#FFAB91] rounded-full"></div>

                  {/* Mouth */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-2">
                    <div className="absolute left-0 w-3 h-3 border-b-2 border-l-2 border-[#E65100] rounded-bl-full"></div>
                    <div className="absolute right-0 w-3 h-3 border-b-2 border-r-2 border-[#E65100] rounded-br-full"></div>
                  </div>

                  {/* Whiskers */}
                  <div className="absolute left-0 top-8 w-8 h-1 border-t border-[#E65100]/60"></div>
                  <div className="absolute left-0 top-10 w-8 h-1 border-t border-[#E65100]/60"></div>
                  <div className="absolute right-0 top-8 w-8 h-1 border-t border-[#E65100]/60"></div>
                  <div className="absolute right-0 top-10 w-8 h-1 border-t border-[#E65100]/60"></div>

                  {/* Cheeks - softer, more blended */}
                  <div className="absolute left-0 top-8 w-4 h-3 bg-[#FFAB91] rounded-full opacity-70 blur-[1px]"></div>
                  <div className="absolute right-0 top-8 w-4 h-3 bg-[#FFAB91] rounded-full opacity-70 blur-[1px]"></div>
                </div>
              </>
            ) : (
              // Blinking face - closed eyes with cute expression
              <div className="relative w-24 h-16">
                {/* Closed eyes - gentle curves */}
                <div className="absolute left-2 top-2 w-6 h-1 border-b-2 border-[#E65100] rounded-full"></div>
                <div className="absolute right-2 top-2 w-6 h-1 border-b-2 border-[#E65100] rounded-full"></div>

                {/* Nose */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-[#FFAB91] rounded-full"></div>

                {/* Mouth */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-6 h-2">
                  <div className="absolute left-0 w-3 h-3 border-b-2 border-l-2 border-[#E65100] rounded-bl-full"></div>
                  <div className="absolute right-0 w-3 h-3 border-b-2 border-r-2 border-[#E65100] rounded-br-full"></div>
                </div>

                {/* Whiskers */}
                <div className="absolute left-0 top-8 w-8 h-1 border-t border-[#E65100]/60"></div>
                <div className="absolute left-0 top-10 w-8 h-1 border-t border-[#E65100]/60"></div>
                <div className="absolute right-0 top-8 w-8 h-1 border-t border-[#E65100]/60"></div>
                <div className="absolute right-0 top-10 w-8 h-1 border-t border-[#E65100]/60"></div>

                {/* Cheeks */}
                <div className="absolute left-0 top-8 w-4 h-3 bg-[#FFAB91] rounded-full opacity-70 blur-[1px]"></div>
                <div className="absolute right-0 top-8 w-4 h-3 bg-[#FFAB91] rounded-full opacity-70 blur-[1px]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
