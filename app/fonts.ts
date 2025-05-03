import { Cinzel, Lora, Montserrat } from "next/font/google"

export const headingFont = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
  display: "swap",
})

export const bodyFont = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
})

export const navFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nav",
  display: "swap",
})
