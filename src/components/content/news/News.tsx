import { useAppContext } from "@/components/AppContext"
import React from "react"

export default function News () {

  const {newsList}= useAppContext()
  return (
    <section id="news">
      {newsList.length}
      This is the news article part.
    </section>
  )
}