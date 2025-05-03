import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { headingFont, bodyFont, navFont } from "./fonts"

export const metadata: Metadata = {
  title: "The Surreal World",
  description: "A journey into the surreal world of mystical art and strange dreams",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen text-emerald-100 ${headingFont.variable} ${bodyFont.variable} ${navFont.variable}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
