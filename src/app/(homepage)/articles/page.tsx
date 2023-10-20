"use client"

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
    <div className="flex flex-col items-center min-h-screen">
    <div className="p-4 m-2 md:m-8 max-w-[960px] max-h-[800px]">
      <p className="text-xl md:text-3xl font-medium text-center mb-4">新闻与活动列表</p>
      <div className="mt-4 w-full">
      {!newsList?<h1 className="text-center">正在加载，请稍等...</h1>:
      !newsList.length ? <h1 className="text-center">暂时没有新闻</h1>
        :
        <ul className="md:pl-5 list-disc">
          {newsList.map((news) =>
          <li key={news.id} className="p-1 m-1">
            <div className="flex flex-row justify-between items-center border-b-2 border-gray-300 md:border-b-0">
              <a className="w-2/3 hover:underline hover:opacity-60" href={`/articles/${news.id}`}>{news.title}</a>
              <div className="w-1/3 text-right">{news.news_date.toString()}</div>
            </div>
          </li>
          )
          }
        </ul>

      }
      </div>
      <div className='w-full fixed bottom-0 left-0 text-center'>
        <p className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </p>
      </div>
    </div>
    </div>
  )
}