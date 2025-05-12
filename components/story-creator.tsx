"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Download, Sparkles } from "lucide-react"
import { generateStory } from "@/actions/story-actions"
import { Slider } from "@/components/ui/slider"

type StoryPage = {
  text: string
  image: string
}

export default function StoryCreator() {
  const [prompt, setPrompt] = useState("")
  const [title, setTitle] = useState("")
  const [ageGroup, setAgeGroup] = useState(5)
  const [isGenerating, setIsGenerating] = useState(false)
  const [storyPages, setStoryPages] = useState<StoryPage[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleGenerateStory = async () => {
    if (!prompt.trim() || !title.trim()) {
      setError("Please provide both a title and story prompt")
      return
    }

    try {
      setIsGenerating(true)
      setError(null)

      const result = await generateStory({
        prompt,
        title,
        ageGroup,
      })

      if (result.error) {
        setError(result.error)
      } else {
        setStoryPages(result.pages)
      }
    } catch (err) {
      setError("Failed to generate story. Please try again.")
      console.error(err)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Create Illustrated Storybooks</h2>
        <p className="text-muted-foreground">
          Describe your story idea and our AI will generate an illustrated storybook for children.
        </p>
      </div>

      {/* Example Storybook */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="/placeholder.svg?height=300&width=1200&query=open children's storybook with colorful illustrations, fantasy scene"
          alt="Example storybook"
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-xl font-bold">Create Magical Stories</h3>
            <p>Generate beautiful illustrated storybooks with just a few clicks</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for your story"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Story Idea</Label>
            <Textarea
              id="prompt"
              placeholder="Describe your story idea (e.g., 'A friendly dragon who helps children overcome their fears')"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="age-group">Age Group: {ageGroup} years</Label>
            </div>
            <Slider
              id="age-group"
              min={3}
              max={12}
              step={1}
              value={[ageGroup]}
              onValueChange={(value) => setAgeGroup(value[0])}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            onClick={handleGenerateStory}
            disabled={isGenerating || !prompt.trim() || !title.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Story...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Story
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {storyPages.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">{title}</h3>
            <Button
              variant="outline"
              onClick={() => {
                // In a real app, this would generate a PDF
                alert("In a production app, this would download a PDF of your story")
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Story
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storyPages.map((page, index) => (
              <Card
                key={index}
                className="overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={page.image || "/placeholder.svg"}
                    alt={`Story page ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="pt-4">
                  <p>{page.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Story Ideas */}
      {storyPages.length === 0 && !isGenerating && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Story Ideas to Try:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                setTitle("The Magic Paintbrush")
                setPrompt("A child finds a paintbrush that brings drawings to life")
              }}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=100&width=100&query=magic paintbrush with sparkles, children's illustration"
                    alt="Magic Paintbrush"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">The Magic Paintbrush</h4>
                  <p className="text-xs text-muted-foreground">Drawings come to life</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                setTitle("Space Adventures")
                setPrompt("A group of children build a rocket ship and explore the stars")
              }}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=100&width=100&query=cartoon rocket ship with stars, children's illustration"
                    alt="Space Adventures"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">Space Adventures</h4>
                  <p className="text-xs text-muted-foreground">Exploring the stars</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                setTitle("The Friendly Monster")
                setPrompt("A misunderstood monster who just wants to make friends")
              }}
            >
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src="/placeholder.svg?height=100&width=100&query=cute friendly monster, children's illustration"
                    alt="Friendly Monster"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">The Friendly Monster</h4>
                  <p className="text-xs text-muted-foreground">Making unexpected friends</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
