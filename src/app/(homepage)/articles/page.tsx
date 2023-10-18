"use client"

import { getAllNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import { useEffect, useState } from "react"

export default function Page () {
  const [newsList, setNewsList] = useState<Array<NewsType> | null>(null)
  useEffect(() => {
    getAllNews()
      .then((res) => {
        setNewsList(res.data)
      })
  },[])
  return (
    <div className="flex flex-col items-center justify-center p-4 m-8">
      <p className="text-3xl font-medium text-center mb-4">新闻与活动</p>
      <div className="w-1/2 mt-4">
      {!newsList ?
        <h1>加载中，请稍后...</h1>
        :
        !newsList.length  ? <h1>暂时没有新闻</h1>
        :
        newsList.map((news) =>
          <li key={news.id} className="p-1 m-1 hover:underline hover:opacity-60"><a href={`/articles/${news.id}`}>{news.title}</a></li>
        )
      }
      </div>

    </div>
  )
}