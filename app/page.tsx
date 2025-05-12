import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageCartoonizer from "@/components/image-cartoonizer"
import StoryCreator from "@/components/story-creator"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <img src="/colorful-digital-art-studio.png" alt="AI Creative Studio Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Creative Studio</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Transform images into cartoons and create magical storybooks with AI
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4">
        <Tabs defaultValue="cartoonize" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cartoonize">Image Cartoonizer</TabsTrigger>
            <TabsTrigger value="story">Story Creator</TabsTrigger>
          </TabsList>

          <TabsContent value="cartoonize" className="mt-4">
            <ImageCartoonizer />
          </TabsContent>

          <TabsContent value="story" className="mt-4">
            <StoryCreator />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
