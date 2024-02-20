import type { Metadata } from "next"
import "./globals.css"
import { IBM_Plex_Sans } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-ibmplexsans",
})

// const ibmPlexSans = localFont({
//   src: [
//     {
//       path: "../public/IBMPlexSans-Bold.ttf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "../public/IBMPlexSans-BoldItalic.ttf",
//       weight: "700",
//       style: "italic",
//     },
//   ],
// })

export const metadata: Metadata = {
  title: "Coffinder | Home",
  description: "Discover your local coffee shops.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={ibmPlexSans.className}>{children}</body>
    </html>
  )
}
