import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LanguageOfDreamsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4">
        <div className="flex gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3 text-emerald-300 hover:text-emerald-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-3 text-emerald-300 hover:text-emerald-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>All Posts</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg max-w-4xl w-full">
          <h1 className="text-4xl md:text-6xl mb-8 text-center glow-text">THE LANGUAGE OF DREAMS</h1>

          {/* Main image */}
          <div className="relative w-full aspect-video mb-8 rounded-md overflow-hidden">
            <Image
              src="/images/dream-symbols.png"
              alt="Mystical dream symbols floating in space"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Dreams speak to us in symbols and metaphors, a language older than words. Learning to decipher this
              ancient code reveals truths about ourselves and the universe that our waking minds cannot comprehend.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">The Forgotten Tongue</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Before humans developed spoken language, we communicated through images and symbols. This primal mode of
              expression remains embedded in our subconscious, emerging when our rational minds surrender to sleep.
              Dreams are not random firings of neurons but messages encoded in the oldest language known to
              consciousness.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              The symbols that appear in our dreams are not universal in their specific forms but are universal in their
              underlying patterns. A snake may represent transformation to one dreamer and danger to another, but both
              interpretations stem from the snake's fundamental qualities: its ability to shed its skin and its
              potential venom.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Common Archetypes</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Certain symbols appear across cultures and throughout time, suggesting a collective unconscious that all
              humans can access:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">
                <span className="text-emerald-300">The Eye</span> - Perception, awareness, being watched by forces
                beyond our understanding
              </li>
              <li className="mb-2">
                <span className="text-emerald-300">The Spiral</span> - Evolution, growth, the journey inward toward
                self-knowledge
              </li>
              <li className="mb-2">
                <span className="text-emerald-300">Water</span> - Emotions, the unconscious mind, purification or
                drowning
              </li>
              <li className="mb-2">
                <span className="text-emerald-300">Doors</span> - Transitions, opportunities, passages between states of
                being
              </li>
              <li>
                <span className="text-emerald-300">The Shadow</span> - The unknown aspects of self, repressed qualities,
                potential for transformation
              </li>
            </ul>

            <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-8">
              <p className="text-lg md:text-xl">
                "In my recurring dream, I follow a spiral staircase that descends forever. Each night I go deeper,
                passing doors that open onto impossible landscapes. Last night, I finally reached the bottom and found a
                mirror. My reflection had eyes that glowed like emerald stars."
              </p>
              <footer className="text-emerald-400">— From the Dream Journal of E.L.</footer>
            </blockquote>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Beyond Personal Symbolism</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              While many dreams process our personal experiences and emotions, some dreamers report encounters that
              transcend individual psychology. These dreams may represent:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Contact with collective human consciousness</li>
              <li className="mb-2">Messages from aspects of reality normally imperceptible to human senses</li>
              <li className="mb-2">Glimpses of possible futures or parallel realities</li>
              <li>Ancestral memories encoded in our genetic material</li>
            </ul>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Such dreams often have a different quality—more vivid, more coherent, and accompanied by a sense of
              profound significance. The dreamer may wake with knowledge they did not possess before or with answers to
              questions they had been contemplating.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Learning the Language</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              To become fluent in the language of dreams requires practice and dedication:
            </p>

            <ol className="list-decimal pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Keep a dream journal beside your bed and record dreams immediately upon waking</li>
              <li className="mb-2">Look for recurring symbols and themes specific to your dream world</li>
              <li className="mb-2">Practice lucid dreaming techniques to become conscious within the dream state</li>
              <li className="mb-2">
                Study the dream symbols of various cultures while developing your personal lexicon
              </li>
              <li>Pay attention to the emotions associated with dream images, not just the images themselves</li>
            </ol>

            <p className="text-lg md:text-xl text-emerald-100">
              As you become more adept at reading this ancient language, you may find that your dreams become more
              profound and instructive. The veil between conscious and unconscious mind grows thinner, allowing wisdom
              to flow more freely between these aspects of self.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mt-6">
              Remember that in the realm of dreams, you are both the author and the reader of your own symbolic text.
              The ultimate interpreter of your dreams can only be you.
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
