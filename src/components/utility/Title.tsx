import React from "react";
import Image from "next/image";
const Title = ({text, custom}:{text:string, custom?:string}) => {
  return (
    <div className={`flex-center ${custom}`}>
        <div className="w-[25px] h-[25px]">
          <Image src="/p-logo.png" alt="logo" width={36} height={36} className="w-full h-full object-cover"/>
        </div>
        <span className="font-serif_SC text-xl md:text-2xl p-2">{text}</span>
      </div>
  )
}

export default Title;