import { getAllNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import React, { useEffect, useState } from "react"
export default function News () {
  const [news, setNews] = useState<Array<NewsType>>([])
  useEffect(() => {
    getAllNews()
     .then((res) => {
        setNews(res.data)
     })
  }, [])
  return (
    <section id="news">
      This is the news article part.
      {!news.length ?null :
       news.map((article, i) =>
       <div key={i}>
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{__html: article.content}} />
       </div>
       )
      }
    </section>
  )
}