import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CosmicDoorwaysPage() {
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
          <h1 className="text-4xl md:text-6xl mb-8 text-center glow-text">COSMIC DOORWAYS</h1>

          {/* Main image */}
          <div className="relative w-full aspect-video mb-8 rounded-md overflow-hidden">
            <Image
              src="/images/cosmic-doorway.png"
              alt="A cosmic doorway between dimensions"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Hidden between the folds of reality lie passages to other dimensions. These cosmic doorways appear only to
              those who have trained their perception beyond the mundane. The journey through these portals is both
              terrifying and enlightening.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">The Veil Between Worlds</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              What we perceive as solid reality is merely the thinnest layer of existence. Beneath this veil lies a vast
              network of interconnected dimensions, each with its own laws of physics and forms of consciousness. The
              boundaries between these realms are not fixed but fluid, creating temporary passages that sensitive minds
              can detect.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              These cosmic doorways manifest in various forms: spiraling vortices of light, shimmering tears in the
              fabric of space, or sometimes as ordinary-looking doors that appear in impossible locations. They are most
              commonly found at nexus points where the energy of multiple dimensions converges.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Signs of a Doorway</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Those attuned to the subtle energies of the universe may notice these signs that a cosmic doorway is
              nearby:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Unexplained shifts in temperature or atmospheric pressure</li>
              <li className="mb-2">Distortions in sound, such as echoes where none should exist</li>
              <li className="mb-2">The sensation of being watched from an unseen vantage point</li>
              <li className="mb-2">Recurring dreams of the same unfamiliar location</li>
              <li>Objects that cast shadows inconsistent with their surroundings</li>
            </ul>

            <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-8">
              <p className="text-lg md:text-xl">
                "I found my first doorway in an abandoned subway tunnel. The air shimmered like heat rising from
                pavement, but it was ice cold to the touch. When I stepped through, I experienced a thousand lifetimes
                in what felt like seconds. When I returned, only minutes had passed, but I was forever changed."
              </p>
              <footer className="text-emerald-400">— Journal of an Anonymous Traveler</footer>
            </blockquote>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">The Dangers of Crossing</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Passing through a cosmic doorway is not without risk. The human mind and body were not designed to
              transition between dimensional states. Those who cross unprepared may experience:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Temporal displacement, returning to find years have passed in their absence</li>
              <li className="mb-2">Memory fragmentation or the acquisition of memories that aren't their own</li>
              <li className="mb-2">Perceptual shifts that make it difficult to readjust to baseline reality</li>
              <li>The attention of entities that dwell between dimensions, who may follow the traveler back</li>
            </ul>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Despite these dangers, those who have successfully navigated cosmic doorways report experiences of
              profound beauty and insight. Many speak of encountering vast intelligences that communicate in pure
              thought, or witnessing the birth and death of universes as if watching waves on a shore.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Finding Your Own Path</h2>

            <p className="text-lg md:text-xl text-emerald-100">
              For those drawn to seek these passages between worlds, remember that the most important doorway is the one
              within your own consciousness. Through meditation, lucid dreaming, and the study of ancient wisdom, you
              can prepare your mind for the journey. When you are ready, the doorways will reveal themselves to you.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mt-6">
              But be warned: once you step through, you can never return to the person you were before. The knowledge
              gained beyond the veil will forever alter how you perceive reality.
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
