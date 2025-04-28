import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#2d3319] text-[#e9d8a6] overflow-hidden">
      <div className="container max-w-md px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#e9d8a6]">Watermelon Boss</h1>

        <div className="relative w-full aspect-square mb-8">
          <Image
            src="/watermelon-boss.png"
            alt="Watermelon Boss sitting at desk"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="text-xl text-center mb-8 animate-pulse">The Watermelon Boss is preparing to meet you...</p>

        <div className="flex gap-4">
          <Link href="/game">
            <Button className="bg-[#8b4513] hover:bg-[#6b3000] text-[#e9d8a6] border-2 border-[#e9d8a6]">
              Start Game
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="border-[#e9d8a6] text-[#e9d8a6] hover:bg-[#3d4425]">
              About
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
