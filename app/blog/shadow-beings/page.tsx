import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ShadowBeingsPage() {
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
          <h1 className="text-4xl md:text-6xl mb-8 text-center glow-text">SHADOW BEINGS</h1>

          {/* Main image */}
          <div className="relative w-full aspect-video mb-8 rounded-md overflow-hidden">
            <Image
              src="/images/shadow-realm.png"
              alt="Shadowy figures with glowing eyes in a misty forest"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>

          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              They lurk at the edge of vision, entities composed of darkness and whispers. The shadow beings have
              watched humanity since the dawn of consciousness, their motives as mysterious as their origins.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Glimpses in the Dark</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Most people have experienced it at least once—a movement in peripheral vision that vanishes when directly
              observed. A human-like silhouette standing in a doorway that disappears when you turn on the light. A
              sense of being watched when alone. These fleeting encounters are often dismissed as tricks of light or
              imagination, but those who have studied the phenomenon believe they are glimpses of entities that exist
              alongside us in a parallel state of being.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Shadow beings appear to be composed of a substance that is neither fully material nor entirely ethereal.
              They absorb light rather than reflect it, creating voids in the visual field that can only be perceived
              indirectly. Their forms are typically humanoid but lack distinct features except for their eyes, which
              witnesses describe as points of cold light or glowing orbs.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Classifications</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Those who have documented multiple encounters categorize shadow beings into several types:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">
                <span className="text-emerald-300">Watchers</span> - Tall, thin entities that observe but rarely
                interact, often seen standing perfectly still for hours
              </li>
              <li className="mb-2">
                <span className="text-emerald-300">Wanderers</span> - Shadow figures that move purposefully through
                spaces as if following predetermined paths
              </li>
              <li className="mb-2">
                <span className="text-emerald-300">Lurkers</span> - Small, quick shadows that dart between hiding places
                and seem to feed on fear or anxiety
              </li>
              <li>
                <span className="text-emerald-300">The Hooded One</span> - A particularly imposing figure wearing what
                appears to be a cloak or hood, associated with premonitions
              </li>
            </ul>

            <blockquote className="border-l-4 border-emerald-500 pl-4 italic my-8">
              <p className="text-lg md:text-xl">
                "I've seen the same shadow figure at the foot of my bed for twenty years. It never approaches or speaks,
                just watches. On nights when it appears, I always receive news—sometimes good, sometimes terrible—the
                following day."
              </p>
              <footer className="text-emerald-400">— Anonymous account, Shadow Witness Archive</footer>
            </blockquote>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Theories of Origin</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Multiple theories exist regarding the nature and origin of shadow beings:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Interdimensional travelers observing our reality</li>
              <li className="mb-2">Manifestations of collective human consciousness or unconscious fears</li>
              <li className="mb-2">
                Remnants of past civilizations or beings that evolved alongside humans but remained hidden
              </li>
              <li className="mb-2">Guardians or watchers placed to monitor human development</li>
              <li>Predators that feed on human energy or emotions</li>
            </ul>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Ancient texts from various cultures contain references to dark entities that match descriptions of shadow
              beings. The Egyptians spoke of "dwellers in the twilight," while Norse mythology mentions "watchers
              between worlds." Indigenous Australian dreamtime stories tell of "the quiet people" who can only be seen
              from the corner of the eye.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Interactions and Intentions</h2>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              Most encounters with shadow beings are passive—they observe but do not interact. However, some witnesses
              report more direct experiences:
            </p>

            <ul className="list-disc pl-6 mb-6 text-emerald-100">
              <li className="mb-2">Sensations of being touched by cold, insubstantial hands</li>
              <li className="mb-2">Hearing whispers in unknown languages</li>
              <li className="mb-2">Objects moving in their presence</li>
              <li>Electrical devices malfunctioning during encounters</li>
            </ul>

            <p className="text-lg md:text-xl text-emerald-100 mb-6">
              The intentions of shadow beings remain unknown. Some researchers believe they are neutral observers, while
              others suggest they influence human events subtly. A minority view holds that they are malevolent, feeding
              on fear or negative emotions, which would explain their tendency to appear during times of stress or in
              locations associated with trauma.
            </p>

            <h2 className="text-2xl md:text-3xl mt-10 mb-6 text-emerald-200">Encountering the Shadows</h2>

            <p className="text-lg md:text-xl text-emerald-100">
              If you believe you have encountered a shadow being, consider keeping a detailed record of the experience.
              Note the time, location, your emotional state, and any unusual phenomena that occurred before, during, or
              after the sighting. Look for patterns in multiple encounters.
            </p>

            <p className="text-lg md:text-xl text-emerald-100 mt-6">
              While most shadow beings appear to be harmless observers, maintaining a respectful distance is advisable.
              They have existed alongside humanity for millennia, and their continued presence suggests they will remain
              our silent companions for ages to come—watching from the corners of our perception, just beyond the reach
              of understanding.
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
