"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Sparkles } from "lucide-react"
import { cartoonizeImage } from "@/actions/image-actions"

export default function ImageCartoonizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [cartoonImage, setCartoonImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Reset states
    setCartoonImage(null)
    setError(null)

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file")
      return
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const processImage = async () => {
    if (!originalImage) return

    try {
      setIsProcessing(true)
      setError(null)

      const result = await cartoonizeImage(originalImage)

      if (result.error) {
        setError(result.error)
      } else {
        setCartoonImage(result.cartoonizedImage)
      }
    } catch (err) {
      setError("Failed to process image. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Transform Your Images into Cartoons</h2>
        <p className="text-muted-foreground">
          Upload an image and our AI will transform it into a cartoon style illustration.
        </p>
      </div>

      {/* Example Transformations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
        <div className="space-y-2">
          <img
            src="/realistic-person.png"
            alt="Original photo"
            className="rounded-md w-full aspect-square object-cover"
          />
          <img
            src="/vibrant-cartoon-person.png"
            alt="Cartoon version"
            className="rounded-md w-full aspect-square object-cover"
          />
        </div>
        <div className="space-y-2">
          <img
            src="/realistic-cat.png"
            alt="Original photo"
            className="rounded-md w-full aspect-square object-cover"
          />
          <img
            src="/vibrant-cartoon-cat.png"
            alt="Cartoon version"
            className="rounded-md w-full aspect-square object-cover"
          />
        </div>
        <div className="space-y-2 hidden md:block">
          <img
            src="/placeholder.svg?height=200&width=200&query=realistic photo of a landscape"
            alt="Original photo"
            className="rounded-md w-full aspect-square object-cover"
          />
          <img
            src="/placeholder.svg?height=200&width=200&query=cartoon version of a landscape, vibrant colors"
            alt="Cartoon version"
            className="rounded-md w-full aspect-square object-cover"
          />
        </div>
        <div className="space-y-2 hidden md:block">
          <img
            src="/placeholder.svg?height=200&width=200&query=realistic photo of a building"
            alt="Original photo"
            className="rounded-md w-full aspect-square object-cover"
          />
          <img
            src="/placeholder.svg?height=200&width=200&query=cartoon version of a building, vibrant colors"
            alt="Cartoon version"
            className="rounded-md w-full aspect-square object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="image-upload">Upload Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById("image-upload")?.click()}
                    className="w-full h-12"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {originalImage ? (
                <div className="aspect-square relative overflow-hidden rounded-md border">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center rounded-md border bg-muted/50">
                  <p className="text-sm text-muted-foreground">Upload an image to get started</p>
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button onClick={processImage} disabled={!originalImage || isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Cartoonize Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="font-medium">Cartoon Result</h3>

              {cartoonImage ? (
                <div className="aspect-square relative overflow-hidden rounded-md border">
                  <img
                    src={cartoonImage || "/placeholder.svg"}
                    alt="Cartoonized"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center rounded-md border bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    {isProcessing ? "Processing..." : "Cartoonized image will appear here"}
                  </p>
                </div>
              )}

              {cartoonImage && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const a = document.createElement("a")
                    a.href = cartoonImage
                    a.download = "cartoonized-image.png"
                    a.click()
                  }}
                >
                  Download Image
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
