import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './_components/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WikiSpelunk',
  description: 'Spelunk the Wiki',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-screen">
        <Navbar />
        <div className="h-full mt-2">{children}</div>
      </body>
    </html>
  )
}
