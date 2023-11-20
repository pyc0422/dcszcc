import { getAllNews, getOpps } from "@/lib/api"
import React, {useState, useEffect} from "react"
import Loading from "../utility/Loading"
import { NewsEditPropType, NewsType, OppType } from "@/utility/types"
import Link from "next/link"
import Post from "./Post"
export default function Change () {
  const [data, setData] = useState<Record<string,NewsType[]>>({news:[], opps:[]})
  const [open, toggleOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<NewsEditPropType>({type:"",values:null})
  const getAllData =  async () => {
    try {
      const news = await getAllNews()
      const opps = await getOpps()
      setData({ news: news.data, opps: opps.data })
    } catch (err) {
      return console.log('getalldata error:', err)
    }
  }

  useEffect(() => {
    getAllData()
  },[])

  const handleClick = (type:string, values:NewsType | null) => {
    if (!values) {return }
    setSelected({type:type, values:{...values, important:values.important === false ? "no" : 'yes', notified: values.notified === false ?"no":"yes"}})
    toggleOpen(true)
  }
  return (
    <div className="flex justify-center">
        {open &&
        <div className="fixed inset-0 items-center z-50 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
           <div className="mt-8 md:mt-auto md:relative md:top-8 md:mx-auto p-2 md:border-2 md:w-full overflow-x-scroll max-w-[1000px] md:h-5/6 md:shadow-lg md:rounded-md bg-white">
          <div
       className="text-black text-right text-lg mr-2 pr-1 hover:opacity-80 cursor-pointer"
       onClick={() => toggleOpen(false)}>x</div>

      <div className='px-2 mx-2  border-2  flex flex-col justify-evenly shadow-lg rounded-md'>
          <Post list={data} setList={setData} values={selected} toggleOpen={toggleOpen}/>
        </div>
        </div>
        </div>
        }
       <div className="max-w-[960px] w-screen flex flex-row justify-between">
          {['news','opps'].map((tab) =>
            <div key={tab} className="md:w-1/2">
              <div className="text-center text-xl md:text-2xl font-medium p-2">{tab === 'news' ? '新闻活动列表' : '合作机会列表'}</div>
              <div className="shadow-lg h-full" >
                <ul>
                  {data[tab].map((ele, i) =>
                    <li key={i} className="p-1 m-1 hover:font-medium" onClick={() => handleClick(tab, ele)}>
                      <div>{ele.title}</div>
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