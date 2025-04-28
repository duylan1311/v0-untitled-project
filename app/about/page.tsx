import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#2d3319] text-[#e9d8a6] p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-[#e9d8a6]">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">About Watermelon Boss</h1>
        </div>

        <div className="bg-[#3d4425] p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
            <div className="w-32 h-32 relative">
              <Image src="/watermelon-face.png" alt="Watermelon Boss" width={128} height={128} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">The Watermelon Boss</h2>
              <p className="mb-4">
                The mysterious and powerful Watermelon Boss oversees all watermelon business in the region. Known for
                his shrewd business tactics and intimidating presence, he's looking for worthy entrepreneurs to expand
                his empire.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-2">How to Play</h2>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Start with $1,000 initial capital</li>
            <li>Hire employees to increase your daily income</li>
            <li>Buy watermelon farms to boost production and reputation</li>
            <li>Advance days to collect income and grow your business</li>
            <li>Reach 100 reputation to impress the Watermelon Boss</li>
          </ul>

          <h2 className="text-xl font-bold mb-2">Game Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Balance your investments between employees and farms</li>
            <li>Farms increase your reputation faster than employees</li>
            <li>Watch out for special events every 5 days</li>
            <li>The more you expand, the more expensive new purchases become</li>
          </ul>
        </div>

        <div className="text-center">
          <Link href="/game">
            <Button className="bg-[#8b4513] hover:bg-[#6b3000] text-[#e9d8a6] border-2 border-[#e9d8a6]">
              Start Playing Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
