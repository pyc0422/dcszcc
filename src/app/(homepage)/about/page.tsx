"use client"
import React, { ReactElement } from "react"
import { aboutInfo, branches, president } from "@/utility/data"
import Footer from "@/components/frames/Footer"
import Image from "next/image"
export default function Page() {
  const handleDL = (e: React.MouseEvent<HTMLButtonElement>) =>{
    const version = e.currentTarget.name
    let fileName = version === 'cn' ? '美国大华府深圳商会组织章程.pdf' : 'DCSZCC Constitution.pdf'
    fetch('美国大华府深圳商会组织章程.pdf')
    .then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = fileName;
        alink.click();
      })
    })
  }
  return (
    <div className="flex flex-col items-center ">
    <div className="p-4 m-2 sm:mx-8 sm:w-3/4 max-w-[960px] mb-[150px] md:mb-[300px]">
      <div className="m-4 md:m-8">
        <p className="about_title">会长寄语</p>
        <Image src="/bill.jpg" alt="president image" width={300} height={400} className="float-left p-2 mr-4 mb-4 w-1/2 md:w-2/2"/>

        {president.split("\n").map((ele:string, i:number) =>
          <p key={i}>{ele}</p>
        )}

      </div>
      <hr className="short_hr" />
      {Object.keys(aboutInfo).map((k) =>
        <div key={k} className="flex flex-wrap flex-row justify-between items-center">
          {aboutInfo[k].map((elm,i) =>
            <div key={i} className={k === 'intro' ? (i === 0 ? "md:w-3/5 p-2 m-2" : "md:w-1/3 p-2 m-2") : (i===0 ? "md:w-2/5 p-2 m-2" : "md:w-1/2 p-2 m-2")}>
              <p className="text-2xl text-medium capitalize">{elm.name}</p>
              <div className="my-2">{elm.value}</div>
            </div>
          )}
        </div>
      )}
      <hr className="short_hr" />
      <div className="p-4">
        <p className="about_title">{branches['cn'].name} | {branches['eng'].name}</p>
        <div className="flex flex-row justify-between items-center flex-wrap">
          {branches['cn'].value.map((branch,i) =>
            <div key={i} className="w-60 min-w-max p-2 md:m-4">
              <p>{branch}</p>
              <p>{branches['eng'].value[i]}</p>
            </div>
          )}
        </div>
      </div>
      <hr className="short_hr" />
      <div className="md:px-4 w-full">
        <p className="about_title sm:mb-16">商会章程下载 | Consititution Download</p>
        <div className="flex justify-around items-center mt-4">
          <button onClick={handleDL} name="cn" className="dl_btn">
            中文版
          </button>
          <button onClick={handleDL} name="eng" className="dl_btn">
            English Verision
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}