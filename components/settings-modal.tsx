"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Settings, Eye, EyeOff } from "lucide-react"

export default function SettingsModal() {
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key")
    if (savedApiKey) {
      setApiKey(savedApiKey)
      setIsSaved(true)
    }
  }, [])

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openai_api_key", apiKey.trim())
      setIsSaved(true)

      // Notify the server about the new API key
      fetch("/api/settings/update-api-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: apiKey.trim() }),
      }).catch((error) => {
        console.error("Error updating API key:", error)
      })
    }
  }

  const handleClearApiKey = () => {
    localStorage.removeItem("openai_api_key")
    setApiKey("")
    setIsSaved(false)

    // Notify the server about clearing the API key
    fetch("/api/settings/update-api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ apiKey: "" }),
    }).catch((error) => {
      console.error("Error clearing API key:", error)
    })
  }

  return (
    <>
      <Button variant="ghost" className="text-amber-900" onClick={() => setOpen(true)}>
        <Settings size={24} />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-amber-50 border-amber-200">
          <DialogHeader>
            <DialogTitle className="text-amber-900">Settings</DialogTitle>
            <DialogDescription className="text-amber-700">
              Configure your banana chat application settings.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey" className="text-amber-900">
                OpenAI API Key {isSaved && <span className="text-green-600 text-sm">(Saved)</span>}
              </Label>
              <div className="flex">
                <Input
                  id="apiKey"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="flex-1 border-amber-200"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="ml-2 border-amber-200"
                >
                  {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              <p className="text-xs text-amber-700 mt-1">
                Your API key is stored locally in your browser and is never sent to our servers.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClearApiKey} className="border-amber-200 text-amber-900">
              Clear
            </Button>
            <Button onClick={handleSaveApiKey} className="bg-amber-500 hover:bg-amber-600 text-white">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
