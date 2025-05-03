import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function StrangeCatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3 text-emerald-300 hover:text-emerald-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg max-w-4xl w-full">
          <h1 className="text-4xl md:text-6xl mb-8 text-center glow-text">A STRANGE CAT</h1>

          {/* Main image */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] mb-8 rounded-md overflow-hidden">
            <Image
              src="/images/strange-cat.png"
              alt="A strange cat with multiple eyes"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              In the depths of the surreal world, there exists a peculiar feline entity known as "The Strange Cat."
              Unlike ordinary cats, this mystical creature possesses multiple eyes that glow with an otherworldly
              emerald light.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Legend says that The Strange Cat can perceive beyond the veil of our reality, seeing into dimensions that
              remain hidden to human perception. Its multiple eyes don't just see the physical world, but also glimpse
              the ethereal threads that connect all living beings.
            </p>

            {/* Second image - new closeup */}
            <div className="relative w-full aspect-[3/4] md:aspect-[1/1] my-8 rounded-md overflow-hidden">
              <Image
                src="/images/strange-cat-closeup.png"
                alt="A closeup of the strange cat"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              The Strange Cat appears in many forms. Sometimes with multiple eyes that see across dimensions, and other
              times in a more familiar form with just two eyes - though still glowing with that unmistakable emerald
              light. Even in its more conventional appearance, there is nothing ordinary about this being.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Those who encounter The Strange Cat often report experiencing vivid dreams for weeks afterward, dreams
              filled with spiral patterns of glowing orbs and whispered secrets from beyond the known universe.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Some believe The Strange Cat is a guardian of ancient knowledge, while others see it as a messenger
              between worlds. Whatever the truth may be, its presence in our world is as rare as it is profound.
            </p>

            <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-8">
              <p className="text-lg md:text-xl">
                "I saw it once, sitting perfectly still beneath the full moon. Its eyes—all of them—seemed to look
                through me rather than at me. In that moment, I understood something profound about existence, though
                the knowledge faded like morning dew as soon as the cat disappeared."
              </p>
              <footer className="text-emerald-400">— Anonymous Witness</footer>
            </blockquote>

            <p className="text-lg md:text-xl text-emerald-100">
              The Strange Cat appears when it wishes, disappears when it pleases, and leaves those who encounter it
              forever changed.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-8 px-4 text-center">
        <p className="text-emerald-400 text-sm">© The Surreal World | Chronicles of Strange Dreams</p>
      </footer>
    </div>
  )
}
