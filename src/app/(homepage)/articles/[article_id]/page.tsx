"use client"
import { getOneNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import React, { useEffect, useState } from "react"
export default function Page ({ params }: { params: { article_id: string } }) {
  const [article, setArticle] = useState<NewsType>({title:'', news_date:'', important:false,content:'', author:''})
  useEffect(() => {
    getOneNews(params.article_id)
      .then((res) => {
        console.log('e',res)
        setArticle(res)
      })
  }, [])
  return (
    <div className="flex justify-center p-2 m-4">
      {article.content.length ?
      <div  className="w-3/4 p-2 m-4">
        <h1 className="text-3xl font-bold text-center">{article.title}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content}} />
        <div className="text-right text-sm font-light mt-2 text-slate-400">作者：{article.author}</div>
      </div>
      :
      <h1>no article</h1>
      }

    </div>
  )
}