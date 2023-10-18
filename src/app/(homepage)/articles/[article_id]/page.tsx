"use client"
import { getOneNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import { Timestamp } from "firebase/firestore"
import React, { useEffect, useState } from "react"
export default function SingleNews ({ params }: { params: { article_id: string } }) {
  const [article, setArticle] = useState<NewsType>({title:'', news_date:'', important:false,content:'', author:'', created_time: null})
  function convertTimestamp(time:Timestamp) {
    return new Date(time.seconds * 1000).toDateString()
  }

  useEffect(() => {
    getOneNews(params.article_id)
      .then((res) => {
        setArticle(res)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col justify-center items-center p-2 m-4" id="top">
      {article.content.length ?
      <div  className="p-4 m-6 w-3/4">
        <h1 className="text-3xl font-bold text-center">{article.title}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content}} />
        <div className="text-right text-sm font-light mt-2 text-slate-400">作者：{article.author}</div>
        {article.created_time &&
        <div className="text-right text-sm font-light mt-2 text-slate-400">编辑于{convertTimestamp(article.created_time)}</div>
        }
        <div className="flex flex-row justify-around items-center mt-16">
          <button className='py-1 px-6'><a href={`/articles/${params.article_id}#header`}>回到顶部</a></button>
          <button className="py-1 px-6"><a href="/articles">返回列表</a></button>
        </div>
      </div>
      :
      <h1>正在加载，请等待...</h1>
      }

    </div>
  )
}