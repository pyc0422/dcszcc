import { Stack } from '@mui/material'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
    <div>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{margin:"1rem 3rem 1rem 1rem"}}>
       <Image src="/logo.png" priority={false} alt="logo" width="300" height="40"/>
      </Stack>
      {children}
    </div>
  )
}
