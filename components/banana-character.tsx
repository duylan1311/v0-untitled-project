"use client"

import { useState, useEffect } from "react"

interface BananaCharacterProps {
  isThinking?: boolean
  isSpeaking?: boolean
  message?: string
  mood?: "happy" | "thinking" | "excited" | "sad" | "normal"
}

export default function BananaCharacter({
  isThinking = false,
  isSpeaking = false,
  message,
  mood = "normal",
}: BananaCharacterProps) {
  const [blinking, setBlinking] = useState(false)
  const [wiggling, setWiggling] = useState(false)
  const [bouncing, setBouncing] = useState(false)

  useEffect(() => {
    // Random blinking
    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 150)
      },
      Math.random() * 3000 + 2000,
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

    // Random bouncing
    const bounceInterval = setInterval(
      () => {
        if (Math.random() > 0.8) {
          setBouncing(true)
          setTimeout(() => setBouncing(false), 800)
        }
      },
      Math.random() * 5000 + 4000,
    )

    return () => {
      clearInterval(blinkInterval)
      clearInterval(wiggleInterval)
      clearInterval(bounceInterval)
    }
  }, [])

  // Determine animation class based on state
  const animationClass = wiggling ? "animate-wiggle" : bouncing ? "animate-bounce-gentle" : "animate-float"

  return (
    <div className="relative flex flex-col items-center">
      {/* Speech bubble */}
      {isSpeaking && message && (
        <div className="mb-4 bg-[#FFF8DC] rounded-3xl p-4 max-w-[250px] text-[#5D4037] relative shadow-md animate-pop-in">
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#FFF8DC] rotate-45"></div>
          <p className="text-center">{message}</p>
        </div>
      )}

      {/* Thinking dots */}
      {isThinking && (
        <div className="mb-4 bg-[#FFF8DC] rounded-3xl p-3 px-5 shadow-md animate-pop-in">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#5D4037] animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#5D4037] animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#5D4037] animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}

      {/* Banana character - improved cute design */}
      <div className={`relative w-32 h-40 ${animationClass}`}>
        {/* Shadow under banana */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-[#5D4037]/20 rounded-full blur-sm"></div>

        {/* Main banana body - improved oval with gradient */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Banana shape - oval with gradient */}
          <div className="w-24 h-36 bg-gradient-to-br from-[#FFEB3B] to-[#FFC107] rounded-[100px] border-2 border-[#5D4037] relative shadow-md">
            {/* Subtle highlight for 3D effect */}
            <div className="absolute top-2 left-2 w-12 h-24 bg-white opacity-20 rounded-full blur-sm"></div>

            {/* Face container */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!blinking ? (
                <>
                  {/* Cute face with improved eyes and smile */}
                  <div className="relative w-16 h-12">
                    {/* Eyes - black circles */}
                    <div className="absolute left-1 top-0 w-5 h-5">
                      <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                      {/* Eye shine */}
                      <div className="absolute top-0.5 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute right-1 top-0 w-5 h-5">
                      <div className="w-3.5 h-3.5 bg-black rounded-full"></div>
                      {/* Eye shine */}
                      <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>

                    {/* Mouth - cute curved smile */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-3">
                      <div className="w-full h-full border-t-2 border-[#5D4037] rounded-full"></div>
                    </div>

                    {/* Cheeks - softer, more blended */}
                    <div className="absolute left-0 bottom-1 w-3.5 h-3.5 bg-[#FFCCBC] rounded-full opacity-60 blur-[1px]"></div>
                    <div className="absolute right-0 bottom-1 w-3.5 h-3.5 bg-[#FFCCBC] rounded-full opacity-60 blur-[1px]"></div>
                  </div>
                </>
              ) : (
                // Blinking face - cute closed eyes
                <div className="relative w-16 h-12">
                  {/* Closed eyes - thin lines */}
                  <div className="absolute left-1 top-1 w-4 h-1">
                    <div className="w-full h-full bg-black rounded-full"></div>
                  </div>
                  <div className="absolute right-1 top-1 w-4 h-1">
                    <div className="w-full h-full bg-black rounded-full"></div>
                  </div>

                  {/* Mouth - small curved line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-7 h-3">
                    <div className="w-full h-full border-t-2 border-[#5D4037] rounded-full"></div>
                  </div>

                  {/* Cheeks */}
                  <div className="absolute left-0 bottom-1 w-3.5 h-3.5 bg-[#FFCCBC] rounded-full opacity-60 blur-[1px]"></div>
                  <div className="absolute right-0 bottom-1 w-3.5 h-3.5 bg-[#FFCCBC] rounded-full opacity-60 blur-[1px]"></div>
                </div>
              )}
            </div>
          </div>

          {/* Improved leaves at the top */}
          <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2">
            <div className="relative w-12 h-12">
              {/* Left leaf */}
              <div className="absolute left-0 w-7 h-9 bg-gradient-to-br from-[#8BC34A] to-[#689F38] rounded-tl-full rounded-tr-[50%] rounded-bl-[50%] rounded-br-full transform -rotate-15 border-2 border-[#5D4037] shadow-sm"></div>

              {/* Right leaf */}
              <div className="absolute right-0 w-7 h-9 bg-gradient-to-br from-[#8BC34A] to-[#689F38] rounded-tl-[50%] rounded-tr-full rounded-bl-full rounded-br-[50%] transform rotate-15 border-2 border-[#5D4037] shadow-sm"></div>

              {/* Leaf vein details */}
              <div className="absolute left-2 top-2 w-3 h-5 border-r border-[#5D4037]/30 rounded-full transform -rotate-15"></div>
              <div className="absolute right-2 top-2 w-3 h-5 border-l border-[#5D4037]/30 rounded-full transform rotate-15"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
