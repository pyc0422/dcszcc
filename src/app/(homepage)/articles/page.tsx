"use client"

import { useAppContext } from "@/components/AppContext"
import { getAllNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import { useEffect, useState } from "react"

export default function Page () {

  const [newsList, setNewsList] = useState<NewsType[]|null>(null)
  useEffect(() => {
    getAllNews()
      .then((res) => {
        if (res.data) {
          const sorted = res.data.sort((a:NewsType,b:NewsType) => (new Date(b.news_date).getTime()- new Date(a.news_date).getTime()))
          setNewsList(sorted)
        }
      })
  },[])
  // console.log(newsList)
  return (
    <div className="flex flex-col items-center justify-center p-4 m-2 md:m-8">
      <p className="text-3xl font-medium text-center mb-4">新闻与活动</p>
      <div className="mt-4 w-full md:w-3/4">
      {!newsList?<h1 className="text-center">正在加载，请稍等...</h1>:
      !newsList.length ? <h1 className="text-center">暂时没有新闻</h1>
        :
        <ul className="md:pl-5 list-disc text-sm md:text-lg">
          {newsList.map((news) =>
          <li key={news.id} className="p-1 m-1">
            <div className="flex flex-row justify-between items-center">
              <a className="w-2/3 hover:underline hover:opacity-60" href={`/articles/${news.id}`}>{news.title}</a>
              <div className="w-1/3 text-right text-left">{news.news_date.toString()}</div>
            </div>
          </li>
          )
          }
        </ul>

      }
      </div>

    </div>
  )
}