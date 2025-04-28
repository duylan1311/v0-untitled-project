"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, ArrowUp, Users, TrendingUp, Home } from "lucide-react"

export default function GamePage() {
  const [money, setMoney] = useState(1000)
  const [employees, setEmployees] = useState(0)
  const [farms, setFarms] = useState(0)
  const [reputation, setReputation] = useState(10)
  const [day, setDay] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const [dialogText, setDialogText] = useState(
    "Welcome to your watermelon empire! I'm the Watermelon Boss, and I'll be watching your progress. Make me proud!",
  )

  const farmCost = 500 + farms * 100
  const employeeCost = 200 + employees * 50
  const dailyIncome = farms * 100 + employees * 50

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const nextDay = () => {
    setMoney((prev) => prev + dailyIncome)
    setDay((prev) => prev + 1)
    setReputation((prev) => Math.min(100, prev + (farms > 0 ? 1 : 0)))

    // Random events
    if (day % 5 === 0) {
      setIsDialogOpen(true)
      setDialogText("Quarterly report is in! Your watermelon business is growing nicely.")
    }
  }

  const hirePerson = () => {
    if (money >= employeeCost) {
      setMoney((prev) => prev - employeeCost)
      setEmployees((prev) => prev + 1)
    }
  }

  const buyFarm = () => {
    if (money >= farmCost) {
      setMoney((prev) => prev - farmCost)
      setFarms((prev) => prev + 1)
    }
  }

  return (
    <main className="min-h-screen bg-[#2d3319] text-[#e9d8a6] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-[#e9d8a6]">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Watermelon Empire - Day {day}</h1>
        </div>

        {isDialogOpen && (
          <div className="bg-[#3d4425] border-2 border-[#e9d8a6] p-4 rounded-lg mb-6 relative">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 relative flex-shrink-0">
                <Image src="/watermelon-face.png" alt="Watermelon Boss" width={64} height={64} />
              </div>
              <p>{dialogText}</p>
            </div>
            <Button
              className="absolute top-2 right-2 h-6 w-6 p-0"
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
            >
              ✕
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#3d4425] p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Resources</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-yellow-400" />
                  <span>Money</span>
                </div>
                <span className="font-bold">${money.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-blue-400" />
                  <span>Employees</span>
                </div>
                <span className="font-bold">{employees}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
                  <span>Farms</span>
                </div>
                <span className="font-bold">{farms}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <ArrowUp className="mr-2 h-5 w-5 text-purple-400" />
                  <span>Reputation</span>
                </div>
                <div className="w-32">
                  <Progress value={reputation} className="h-2" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>Daily Income</span>
                <span className="font-bold text-green-400">+${dailyIncome}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#3d4425] p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Actions</h2>
            <div className="space-y-4">
              <div>
                <Button
                  onClick={hirePerson}
                  disabled={money < employeeCost}
                  className="w-full bg-[#8b4513] hover:bg-[#6b3000] border border-[#e9d8a6]"
                >
                  Hire Employee (${employeeCost})
                </Button>
                <p className="text-sm mt-1">Each employee generates $50 per day</p>
              </div>

              <div>
                <Button
                  onClick={buyFarm}
                  disabled={money < farmCost}
                  className="w-full bg-[#8b4513] hover:bg-[#6b3000] border border-[#e9d8a6]"
                >
                  Buy Watermelon Farm (${farmCost})
                </Button>
                <p className="text-sm mt-1">Each farm generates $100 per day</p>
              </div>

              <div>
                <Button onClick={nextDay} className="w-full bg-green-700 hover:bg-green-800 mt-4">
                  Next Day
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#3d4425] p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Watermelon Empire Status</h2>
          {reputation < 30 && <p>Your business is struggling. The Watermelon Boss is not impressed.</p>}
          {reputation >= 30 && reputation < 60 && <p>Your business is stable. The Watermelon Boss sees potential.</p>}
          {reputation >= 60 && reputation < 90 && <p>Your business is thriving! The Watermelon Boss is pleased.</p>}
          {reputation >= 90 && <p>Your watermelon empire is legendary! The Watermelon Boss considers you worthy.</p>}
        </div>
      </div>
    </main>
  )
}
