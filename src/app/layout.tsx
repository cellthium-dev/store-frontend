import { getBaseURL } from "@lib/util/env"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body className={`${GeistMono.variable} ${GeistSans.variable} font-sans`}>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
