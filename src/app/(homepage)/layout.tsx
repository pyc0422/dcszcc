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
      <div className='w-full absolute bottom-0 left-0 text-center'>

        <p className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </p>
      </div>
    </div>
  )
}
