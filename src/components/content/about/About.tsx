import { useAppContext } from "@/components/AppContext"
import { getImg, sortedArray } from "@/utility/functions"
import React from "react"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import Image from "next/image"
import "./about.css"
// import 'react-vertical-timeline-component/style.min.css';
export default function About () {
  const {newsList} = useAppContext()
  // console.log(newsList)
  return (
    <section id="about" className="h-1/3 my-8 md:my-16 flex flex-col md:flex-row justify-between items-center">
      <div className="p-2 m-2 md:mx-0 md:w-1/2 md:mr-16">
        <div className="flex-center">
          <Image src="/p-logo.png" alt="logo" width={36} height={36}/>
          <span className="text-xl md:text-2xl font-medium p-2">关于我们 ｜ About</span>
        </div>
        <p>2018年4月，美国大华府地区-中国深圳商会秉持“搭建美国大华府地区与中国深圳两地在各行业机构与人才的友好交流平台；促进两地长期商业深度合作交流；推进各行业创新创业项目互惠互利”的宗旨，推动两地专业人士业务交流和往来，也得到了参加人员的欢迎和充分认可。</p>
      </div>
      <div className="m-auto max-h-[650px] overflow-hidden w-full">
      <VerticalTimeline>
      {sortedArray(newsList, "important").map((e) =>
        <VerticalTimelineElement
          key={e.id}
          className="vertical-timeline-element-work"
          contentStyle={{ backgroundColor: "rgba(255,255,244,0.5)", color: '#000' }}
          contentArrowStyle={{borderRight: '7px solid rgba(255,255,244,0.5)' }}
          date={e.news_date.toString()}
          icon={<Image src="/p-logo.png" alt="icon" width={24} height={24} className="w-full h-full object-cover"/>}
        >
            <h3 className="text-sm font-normal pb-1">{e.title}</h3>
               <div className="flex-center">
                {getImg(e.content).slice(0,3).map((pic, i) =>
                  <div key={i} className="max-h-[80px] h-fit w-auto p-1">

                  <Image key={i} src={pic.slice(1,pic.length-1)} width={40} height={40} alt={e.title + 'img'} className="w-[120px] h-[80px] object-cover"/>
                  </div>
                )}
               </div>




        </VerticalTimelineElement>
      )}
      </VerticalTimeline>
      </div>

    </section>
  )
}