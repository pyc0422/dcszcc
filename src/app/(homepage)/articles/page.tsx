"use client"
import Title from "@/components/utility/Title";
import { useAppContext } from "@/components/AppContext"
import Loading from "@/components/utility/Loading";
import { sortedArray } from "@/utility/functions"
export default function Page () {

  const {newsList} = useAppContext();

  return (
    <div className="flex flex-col items-center min-h-screen">
    <div className="p-4 m-2 md:m-8 max-w-[960px] max-h-[800px]">
    {!newsList ? <Loading /> :
      !newsList.length ? <h1>暂时没有新闻</h1>
      :
      <>
        <Title text="新闻与活动 ｜ News & Activities" custom="md:mt-4 md:mb-8 mx-2"/>
        <div className="mt-4 w-full">

          <ul className="md:pl-5 list-disc">
            {sortedArray(newsList, "time").map((news) =>
            <li key={news.id} className="p-1 m-1">
              <div className="flex flex-row justify-between items-center border-b-2 border-gray-300 md:border-b-0">
                <a className="w-2/3 hover:underline hover:opacity-60" href={`/articles/${news.id}`}>{news.title}</a>
                <div className="w-1/3 text-right">{news.news_date.toString()}</div>
              </div>
            </li>
            )
            }
          </ul>
        </div>
      </>
      }
      <div className='w-full fixed bottom-0 left-0 text-center'>
        <p className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </p>
      </div>
    </div>
    </div>
  )
}