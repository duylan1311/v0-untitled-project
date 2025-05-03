import Image from "next/image"
import Link from "next/link"
import { Moon, Eye, Flame } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="container mx-auto py-6 px-4">
        <nav className="flex justify-between items-center bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-4">
          <div className="flex space-x-8">
            <Link href="/" className="text-xl hover:text-emerald-300 transition-colors">
              HOME
            </Link>
            <Link href="/blog" className="text-xl hover:text-emerald-300 transition-colors">
              BLOG
            </Link>
          </div>

          <div className="flex space-x-8">
            <Link href="/artwork" className="text-xl hover:text-emerald-300 transition-colors">
              ARTWORK
            </Link>
            <Link href="/characters" className="text-xl hover:text-emerald-300 transition-colors">
              CHARACTERS
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4 text-center">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg inline-block">
          <h1 className="text-5xl md:text-7xl tracking-wider text-emerald-100 glow-text">
            WELCOME TO THE
            <br />
            SURREAL WORLD...
          </h1>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 py-12">
        {/* Latest Post */}
        <section>
          <h2 className="text-3xl mb-8 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg inline-block">
            LATEST POST
          </h2>
          <div className="bg-black bg-opacity-60 backdrop-blur-sm p-6 rounded-lg">
            <Link href="/blog/strange-cat" className="block">
              <div className="relative h-80 mb-6 overflow-hidden rounded-md transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/images/strange-cat.png"
                  alt="A strange cat with multiple eyes"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            </Link>
            <h3 className="text-3xl mb-4">A STRANGE CAT</h3>
            <p className="text-emerald-200 mb-6">
              In the depths of the surreal world, there exists a peculiar feline entity known as "The Strange Cat."
              Unlike ordinary cats, this mystical creature possesses multiple eyes that glow with an otherworldly
              emerald light...
            </p>
            <Link
              href="/blog/strange-cat"
              className="inline-block text-xl border-b border-emerald-400 hover:text-emerald-400 transition-colors"
            >
              READ MORE
            </Link>
          </div>
        </section>

        {/* About Me */}
        <section>
          <h2 className="text-3xl mb-8 bg-black bg-opacity-50 backdrop-blur-sm p-4 rounded-lg inline-block">
            ABOUT ME
          </h2>
          <div className="bg-black bg-opacity-60 backdrop-blur-sm p-6 rounded-lg flex flex-col items-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-emerald-800">
              <Image
                src="/images/eye-plant.png"
                alt="Eye plant - symbol of the chronicler"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-2xl text-center mb-6">
              I am the chronicler
              <br />
              of strange dreams...
            </p>
            <p className="text-lg text-emerald-200 text-center">
              My vision extends beyond the veil of ordinary perception. Through the eye of the cosmic plant, I observe
              the hidden realms and document the surreal wonders that most cannot see.
            </p>
          </div>
        </section>
      </div>

      {/* Footer Icons */}
      <footer className="container mx-auto py-12 px-4">
        <div className="flex justify-center space-x-8">
          <Link
            href="/symbols/snake"
            className="bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-sm w-20 h-20 flex items-center justify-center hover:bg-emerald-900 hover:bg-opacity-40 transition-colors"
          >
            <div className="text-emerald-400">
              <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path d="M20.5 12c0 5.5-4.5 10-10 10S.5 17.5.5 12 5 2 10.5 2s10 4.5 10 10z" />
                <path d="M10.5 8c1.5-1 3-1.5 4.5-1 1.5.5 2 1.5 2 3 0 1.5-1 2.5-2.5 3-1.5.5-3 .5-4.5 0" />
                <path d="M10.5 16c-1.5 1-3 1.5-4.5 1-1.5-.5-2-1.5-2-3 0-1.5 1-2.5 2.5-3 1.5-.5 3-.5 4.5 0" />
                <path d="M10.5 8v8" />
              </svg>
            </div>
          </Link>
          <Link
            href="/symbols/eye-flower"
            className="bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-sm w-20 h-20 flex items-center justify-center hover:bg-emerald-900 hover:bg-opacity-40 transition-colors"
          >
            <div className="text-emerald-400">
              <Eye className="w-10 h-10" />
            </div>
          </Link>
          <Link
            href="/symbols/moon"
            className="bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-sm w-20 h-20 flex items-center justify-center hover:bg-emerald-900 hover:bg-opacity-40 transition-colors"
          >
            <div className="text-emerald-400">
              <Moon className="w-10 h-10" />
            </div>
          </Link>
          <Link
            href="/symbols/flame-king"
            className="bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-sm w-20 h-20 flex items-center justify-center hover:bg-emerald-900 hover:bg-opacity-40 transition-colors"
          >
            <div className="text-emerald-400">
              <Flame className="w-10 h-10" />
            </div>
          </Link>
          <Link
            href="/symbols/third-eye"
            className="bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-sm w-20 h-20 flex items-center justify-center hover:bg-emerald-900 hover:bg-opacity-40 transition-colors"
          >
            <div className="text-emerald-400">
              <Eye className="w-10 h-10" />
            </div>
          </Link>
        </div>
      </footer>
    </div>
  )
}
