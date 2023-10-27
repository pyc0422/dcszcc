
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppWrapper } from '../components/AppContext'
import React from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SZCC',
  description: 'D.C Area - Shenzhe Chamber of Commerce',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " font-light text-sm"}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
