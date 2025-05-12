import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Creative Studio",
  description: "Transform images into cartoons and create illustrated storybooks with AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main>{children}</main>
          <footer className="bg-muted/30 border-t py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">AI Creative Studio</h3>
                  <p className="text-muted-foreground">
                    Unleash your creativity with our AI-powered tools for image transformation and story creation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Features</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Image to Cartoon Conversion</li>
                    <li>AI Storybook Generation</li>
                    <li>Multiple Cartoon Styles</li>
                    <li>Age-Appropriate Content</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Resources</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Help Center</li>
                    <li>API Documentation</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
                <p>© 2024 AI Creative Studio. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
