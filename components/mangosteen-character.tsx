"use client"

import { useState, useEffect } from "react"

interface MangosteenCharacterProps {
  isThinking?: boolean
  isSpeaking?: boolean
  message?: string
  mood?: "happy" | "thinking" | "excited" | "sad" | "normal"
}

export default function MangosteenCharacter({
  isThinking = false,
  isSpeaking = false,
  message,
  mood = "normal",
}: MangosteenCharacterProps) {
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
        <div className="mb-4 bg-[#F3E5F5] rounded-3xl p-4 max-w-[250px] text-[#4A148C] relative shadow-sm">
          <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#F3E5F5] rotate-45"></div>
          <p className="text-center">{message}</p>
        </div>
      )}

      {/* Thinking dots */}
      {isThinking && (
        <div className="mb-4 bg-[#F3E5F5] rounded-3xl p-3 px-5 shadow-sm">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-[#4A148C] animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#4A148C] animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 rounded-full bg-[#4A148C] animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      )}

      {/* Mangosteen character container */}
      <div className={`relative w-40 h-48 ${wiggling ? "animate-wiggle" : "animate-float"}`}>
        {/* Shadow under mangosteen */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-[#CE93D8]/40 rounded-full blur-sm"></div>

        {/* Main mangosteen body - round shape */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          {/* Mangosteen outer shell - dark purple */}
          <div className="absolute inset-0 bg-[#4A148C] rounded-full border-2 border-[#3E2723]"></div>

          {/* Mangosteen cap/crown at the bottom */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-24 h-8 bg-[#4A148C] rounded-b-full border-2 border-[#3E2723] overflow-hidden">
            {/* Decorative lines for the cap */}
            <div className="absolute top-0 left-1/4 w-1 h-full bg-[#3E2723]/20"></div>
            <div className="absolute top-0 right-1/4 w-1 h-full bg-[#3E2723]/20"></div>
          </div>

          {/* White flesh showing at the top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/6 w-20 h-16 bg-white rounded-t-full border-2 border-[#3E2723] overflow-hidden">
            {/* Decorative lines for the flesh segments */}
            <div className="absolute top-0 left-1/3 w-1 h-full bg-[#3E2723]/20"></div>
            <div className="absolute top-0 right-1/3 w-1 h-full bg-[#3E2723]/20"></div>
          </div>

          {/* Face container - positioned in the middle of the white flesh */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 flex items-center justify-center">
            {!blinking ? (
              <>
                {/* Face with BIG ROUND EYES */}
                <div className="relative w-16 h-10 mt-2">
                  {/* Eyes - BIG and ROUND */}
                  <div className="absolute left-1 top-0 w-5 h-5 bg-[#3E2723] rounded-full"></div>
                  <div className="absolute right-1 top-0 w-5 h-5 bg-[#3E2723] rounded-full"></div>

                  {/* Eye highlights for cuteness */}
                  <div className="absolute left-2 top-1 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute right-2 top-1 w-2 h-2 bg-white rounded-full"></div>

                  {/* Mouth - small curved line */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-2 border-t-2 border-[#3E2723] rounded-full"></div>

                  {/* Cheeks - softer, more blended */}
                  <div className="absolute left-0 bottom-0 w-4 h-3 bg-[#F8BBD0] rounded-full opacity-70 blur-[1px]"></div>
                  <div className="absolute right-0 bottom-0 w-4 h-3 bg-[#F8BBD0] rounded-full opacity-70 blur-[1px]"></div>
                </div>
              </>
            ) : (
              // Blinking face - closed eyes with cute expression
              <div className="relative w-16 h-10 mt-2">
                {/* Closed eyes - gentle curves for the big round eyes */}
                <div className="absolute left-1 top-2 w-5 h-1 border-b-2 border-[#3E2723] rounded-full"></div>
                <div className="absolute right-1 top-2 w-5 h-1 border-b-2 border-[#3E2723] rounded-full"></div>

                {/* Mouth - small curved line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-5 h-2 border-t-2 border-[#3E2723] rounded-full"></div>

                {/* Cheeks */}
                <div className="absolute left-0 bottom-0 w-4 h-3 bg-[#F8BBD0] rounded-full opacity-70 blur-[1px]"></div>
                <div className="absolute right-0 bottom-0 w-4 h-3 bg-[#F8BBD0] rounded-full opacity-70 blur-[1px]"></div>
              </div>
            )}
          </div>
        </div>

        {/* Leaves at the top */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-10 z-10">
          {/* Left leaf */}
          <div className="absolute left-0 w-7 h-6 bg-[#388E3C] rounded-full transform -rotate-15 border-2 border-[#3E2723]"></div>

          {/* Right leaf */}
          <div className="absolute right-0 w-7 h-6 bg-[#388E3C] rounded-full transform rotate-15 border-2 border-[#3E2723]"></div>

          {/* Stem connecting the leaves */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-[#795548] rounded-t-full border-2 border-[#3E2723]"></div>
        </div>
      </div>
    </div>
  )
}
