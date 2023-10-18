import { getAllNews } from "@/lib/api"
import { NewsType } from "@/utility/types"
import React, { useEffect, useState } from "react"

export default function News () {
  const [newsList, setNewsList] = useState<NewsType[]|null>(null)
  useEffect(() => {
    getAllNews()
      .then((res) => {
        setNewsList(res.data)
      })
  },[])
  return (
    <section id="news">
      {/* {JSON.stringify(newsList)} */}
      This is the news article part.
    </section>
  )
}