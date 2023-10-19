"use client"
import React from "react"
import { aboutInfo, branches } from "@/utility/data"
import Footer from "@/components/frames/Footer"
export default function Page() {
  const handleDL = () =>{
    fetch('美国大华府深圳商会组织章程.pdf')
    .then(response => {
      response.blob().then(blob => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = '美国大华府深圳商会组织章程.pdf';
        alink.click();
      })
    })
  }
  return (
    <>
    <div className="p-4 m-2 md:m-8">
      <p className="text-3xl font-medium text-center mb-8">关于我们</p>
      {Object.keys(aboutInfo).map((k) =>
        <div key={k} className="flex flex-row justify-between items-center">
          {aboutInfo[k].map((elm,i) =>
            <div key={i} className={k === 'intro' ? (i === 0 ? "w-3/5 p-2 m-2" : "w-1/3") : (i===0 ? "w-2/5 p-2 m-2" : "w-1/2 p-2 m-2")}>
              <p className="text-2xl text-medium capitalize">{elm.name}</p>
              <div className="my-2">{elm.value}</div>
            </div>
          )}
        </div>
      )}
      <hr className="w-96 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-500 opacity-80" />
      <div className="p-4">
        <p className="capitalize text-center text-2xl font-base my-4">{branches['cn'].name} | {branches['eng'].name}</p>
        <div className="flex flex-row justify-between items-center flex-wrap">
          {branches['cn'].value.map((branch,i) =>
            <div key={i} className="w-60 min-w-max p-2 m-4">
              <p>{branch}</p>
              <p>{branches['eng'].value[i]}</p>
            </div>
          )}
        </div>
      </div>
      <hr className="w-96 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-500 opacity-80" />
      <div className="flex justify-center">
      <button
        onClick={handleDL}
        className="py-2 px-16 text-grey-500 font-light text-center"
      >
        下载商会章程
      </button>
      </div>
    </div>
    <Footer />
    </>
  )
}