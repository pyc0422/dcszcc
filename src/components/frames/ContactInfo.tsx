import React from "react"
import Image from "next/image"
import { info } from "@/utility/data"
const ContactInfo = () => {
  return (
    <div className='text-left px-1 py-2 text-xs'>
      <div className="color-[#2a2a2b] font-normal">
        {info[0].name}: {info[0].value}
      </div>
      <div className='flex flex-wrap flex-row'>
        <div className='flex flex-col'>
        {info.slice(1).map((item, i) =>
          <span key={i} className="color-[#2a2a2b] font-normal">{item.name}: {item.value}</span>)}
        </div>
        <Image src="/wechat-qr.png" alt="wechat qr code" width={100} height={100} style={{padding:"0.3rem"}}/>
      </div>
    </div>

  )
}

export default ContactInfo