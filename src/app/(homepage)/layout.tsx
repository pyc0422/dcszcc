import React from 'react'
import Header from '../../components/frames/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}

    </div>
  )
}
