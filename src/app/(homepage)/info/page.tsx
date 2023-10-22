import ContactInfo from "@/components/frames/ContactInfo"
import { Typography, Stack } from "@mui/material"
import Image from "next/image"
import React from "react"
const info = [
  {name: "商会地址", value: "8100 Boone Blvd, Suite 230, Vienna, VA 22182, USA "},
  {name: "邮箱", value: "dcszcc.org@gmail.com"},
  {name: "微信", value:"690238933"}
]
export default function Page () {
  return (
    <>
      <div className="flex flex-col items-center p-2 md:m-4">
        <div className="text-2xl font-normal">联系信息</div>
          <ContactInfo />
      </div>
      <div className='w-full fixed bottom-0 left-0 text-center'>
        <div className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </div>
      </div>
    </>
  )
}