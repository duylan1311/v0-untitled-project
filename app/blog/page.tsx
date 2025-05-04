import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      slug: "strange-cat",
      title: "A STRANGE CAT",
      excerpt:
        "In the depths of the surreal world, there exists a peculiar feline entity known as 'The Strange Cat.' Unlike ordinary cats, this mystical creature possesses multiple eyes that glow with an otherworldly emerald light...",
      image: "/images/strange-cat.png",
      date: "May 3, 2025",
    },
    {
      slug: "cosmic-doorways",
      title: "COSMIC DOORWAYS",
      excerpt:
        "Hidden between the folds of reality lie passages to other dimensions. These cosmic doorways appear only to those who have trained their perception beyond the mundane. The journey through these portals is both terrifying and enlightening...",
      image: "/images/cosmic-doorway.png",
      date: "April 28, 2025",
    },
    {
      slug: "language-of-dreams",
      title: "THE LANGUAGE OF DREAMS",
      excerpt:
        "Dreams speak to us in symbols and metaphors, a language older than words. Learning to decipher this ancient code reveals truths about ourselves and the universe that our waking minds cannot comprehend...",
      image: "/images/dream-symbols.png",
      date: "April 15, 2025",
    },
    {
      slug: "shadow-beings",
      title: "SHADOW BEINGS",
      excerpt:
        "They lurk at the edge of vision, entities composed of darkness and whispers. The shadow beings have watched humanity since the dawn of consciousness, their motives as mysterious as their origins...",
      image: "/images/shadow-realm.png",
      date: "April 7, 2025",
    },
  ]

  return (
    <div className="min-h-screen">
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
      <main className="container mx-auto px-4 py-8">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm p-6 rounded-lg max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl mb-12 text-center glow-text">CHRONICLES OF THE SURREAL</h1>

          <div className="grid gap-8 md:gap-12">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="bg-black bg-opacity-60 backdrop-blur-sm rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
                  <div className="md:flex">
                    <div className="relative h-60 md:h-auto md:w-1/3">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="text-emerald-400 text-sm mb-2">{post.date}</div>
                      <h2 className="text-2xl md:text-3xl mb-3 group-hover:text-emerald-300 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-emerald-100">{post.excerpt}</p>
                      <div className="mt-4 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        Read more →
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
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
