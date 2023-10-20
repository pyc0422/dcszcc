"use client"
import React, {useEffect} from 'react'
import Header from '../../components/frames/Header'
import { getAllNews } from '@/lib/api'
import { NewsType } from '@/utility/types'
import { useAppContext } from '@/components/AppContext'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {newsList, setNewsList} = useAppContext()
  useEffect(() => {
    getAllNews()
      .then((res) => {
        if (res.data) {
          // const sorted = res.data.sort((a:NewsType,b:NewsType) => (new Date(b.news_date).getTime()- new Date(a.news_date).getTime()))
          setNewsList(res.data)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
      <Header />
      {children}

    </div>
  )
}
