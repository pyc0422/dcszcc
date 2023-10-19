"use client"
import { getOneNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import { convertTimestamp } from "@/utility/functions"
import React, { useEffect, useState } from "react"

export default function Page ({ params }: { params: { article_id: string } }) {
  const [article, setArticle] = useState<NewsType>({title:'', news_date:'', important:false,content:'', author:'', created_time: null})
  const [isScrolled, setScrolled] = useState(false)

  const toggleScrolled = () => {
    document.body.scrollTop > 200 ? setScrolled(true) :setScrolled(false)
  }
  const goTop = () => {
    isScrolled && document.body.scrollTo({top:0,behavior:'smooth'})
  }
  useEffect(() => {
    getOneNews(params.article_id)
      .then((res) => {
        setArticle(res)
      })
    //add eventlistener to window
    document.body.addEventListener("scroll", toggleScrolled, true);
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      document.body.removeEventListener("scroll", toggleScrolled, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex flex-col justify-center items-center p-2 m-4" id="top">
      {article.content.length ?
      <div className="p-4 m-6 w-full md:w-3/4 flex flex-col justify-between">
        <div>
        <h1 className="text-3xl font-bold text-center mb-8">{article.title}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content}} />
        <div className="text-right text-sm font-light mt-2 text-slate-400">作者：{article.author}</div>
        {article.created_time &&
        <div className="text-right text-sm font-light mt-2 text-slate-400">编辑于{convertTimestamp(article.created_time)}</div>
        }
        </div>
        <div className="bottom-20 flex flex-row justify-around items-center mt-16">
          {isScrolled && <button className='py-1 px-6' onClick={goTop}>回到顶部</button>}
          <button className="py-1 px-6"><a href="/articles">返回列表</a></button>
        </div>
      </div>
      :
      <h1>正在加载，请等待...</h1>
      }

    </div>
  )
}