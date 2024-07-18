
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Serif_SC } from 'next/font/google'
import { AppWrapper } from '../components/AppContext'
import React from 'react'
const noto_serif_sc= Noto_Serif_SC({subsets:['latin'],weight:"900",display:'swap', variable:'--font-noto-serif'})

export const metadata: Metadata = {
  title: 'SZCC',
  description: 'D.C. Area - Shenzhen Chamber of Commerce',
  keywords:['D.C. Area Chamber of Commerce', 'Shenzhen Chamber of Commerce', 'Next.js', 'React']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="cn"
      suppressHydrationWarning
      className={`${noto_serif_sc.variable}`}
    >
      <body className=" font-light text-sm">
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  )
}
