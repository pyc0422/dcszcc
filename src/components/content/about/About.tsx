import { useAppContext } from "@/components/AppContext"
import { sortedArray } from "@/utility/functions"
import React from "react"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import Image from "next/image"
import "./about.css"

export default function About () {
  const {newsList} = useAppContext()
  return (
    <section id="about" className="h-1/3 max-h-[800px] my-8 md:my-16 flex flex-row justify-between items-center">
      <div className="w-1/2 mr-16">
        <div className="flex-center">
          <Image src="/p-logo.png" alt="logo" width={36} height={36}/>
          <span className="text-xl md:text-2xl font-normal p-2">关于我们 ｜ About</span>
        </div>
        <p>2018年4月，美国大华府地区-中国深圳商会秉持“搭建美国大华府地区与中国深圳两地在各行业机构与人才的友好交流平台；促进两地长期商业深度合作交流；推进各行业创新创业项目互惠互利”的宗旨，推动两地专业人士业务交流和往来，也得到了参加人员的欢迎和充分认可。</p>
      </div>
      <div className="border-4 overflow-hidden w-full">
      <VerticalTimeline>
      {sortedArray(newsList, "important").map((e) =>
        <VerticalTimelineElement
          key={e.id}
          className="vertical-timeline-element-work"
          contentStyle={{ backgroundColor: "rgba(255,255,244,0.5)", color: '#000' }}
          contentArrowStyle={{borderRight: '7px solid #fdf7da' }}
          date={e.news_date.toString()}
          // iconStyle={{ background: '#fdf7da', color: '#000', padding:'0.5%'}}
          icon={<Image src="/p-logo.png" alt="icon" width={24} height={24} className="w-full"/>}
        >
            <h3 className="vertical-timeline-element-title">{e.title}</h3>
            {/* <h5 className="vertical-timeline-element-subtitle">{e.subTitle}</h5> */}

            {/* <p>
               <span className="vertical-timeline-content">{e.content.slice(0,200)}</span>
            </p> */}



        </VerticalTimelineElement>
      )}
      </VerticalTimeline>
      </div>

    </section>
  )
}