import { getAllNews, getOpps } from "@/lib/api"
import React, {useState, useEffect} from "react"
import Loading from "../utility/Loading"
import { NewsType, OppType } from "@/utility/types"
import Link from "next/link"
export default function Change () {
  const [data, setData] = useState<Record<string,NewsType[] | OppType[]>>({news:[], opps:[]})

  const getAllData =  async () => {
    try {
      const news = await getAllNews()
      const opps = await (getOpps())
      setData({ news: news.data, opps: opps.data })
    } catch (err) {
      return console.log('getalldata error:', err)
    }
  }

  useEffect(() => {
    getAllData()
  },[])

  return (
    <div className="flex justify-center">

       <div className="max-w-[960px] w-screen flex flex-row justify-between">
          {['news','opps'].map((tab) =>
            <div key={tab} className="md:w-1/2">
              <div className="text-center text-xl md:text-2xl font-medium p-2">{tab === 'news' ? '新闻活动列表' : '合作机会列表'}</div>
              <div className="shadow-lg h-full" >
                <ul>
                  {data[tab].map((ele, i) =>
                    <li key={i} className="p-1 m-1 hover:font-medium">
                      <Link href={tab === 'news' ? `/articles/${ele.id}` : `/opps/${ele.id}`}>{ele.title}</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>

          )}

       </div>

    </div>
  )
}