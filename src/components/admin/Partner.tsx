import React, { useEffect, useState } from 'react'
import { AlertType, NewsType, OppType, PartnerType } from '../../utility/types';

import Loading from '../utility/Loading'
import { getPartners } from '@/lib/api'
import Image from 'next/image';
export default function Partner () {
  const [partners, setPartners] = useState<PartnerType[]|null>(null)
  const [isForm, openForm] = useState(false)
  useEffect(() => {
    getPartners()
      .then((res) => {
        if (res) {
          setPartners(res.data)
        }
      })
  },[])
  return (
    <div className="flex flex-col justify-center items-center">
      {!partners ? <Loading /> :
      !partners.length ?<h1>没有合作伙伴，请添加新的合作伙伴</h1> :
      <div className="max-w-[960px] w-full flex flex-col">
      {partners.map((company) =>
        <div key={company.id} className='h-max p-2 m-2 border-2 shadow-lg rounded-md'>
          <div className="flex flex-row items-center p-1 m-2">
            <label className="">企业名称：</label>
            <input type="text" className="post_input" value={company.name}/>
          </div>
          <div className="flex flex-row items-center p-1 m-2">
            <label className="">官网链接：</label>
            <input type="text" className="post_input" value={company.link}/>
          </div>
          <div className="flex flex-row items-center p-1 m-2">
            <div>企业LOGO：</div>
            <div>
              <Image src={company.logo} alt={`${company.name} logo`} height={50} width={50}/>
            </div>
            <div className="flex flex-row mx-4 items-baseline">
              <label htmlFor="logo" className='min-w-max px-2'>请选择上传新的LOGO:</label>
              <input type="file" id="logo" name="logo" accept="image/png, image/jpeg, image/svg, image/jpg"/>
            </div>
          </div>
          <div className="flex flex-col p-1 m-2">
            <label className="rit">
              企业简介：已经输入<strong>{company.intro.length}</strong>个字
              <span className="text-red-500"> 企业简介应少于105个字</span></label>

            <textarea
            value={company.intro}
            className='shadow h-full border border-gray-400 px-2 py-1 bg-transparent'/>
          </div>
        </div>
      )
      }
      </div>
    }
    <button
    className="px-8 py-2 text-lg font-light text-slate-50 border w-fit bg-[#0362AA] hover:opacity-80 active:opacity-100 shadow-sx border rounded-md px-4 py-1 text-m my-2 focus:outline-none focus:ring-2"
    onClick={() => openForm(true)}>新增合作企业信息</button>
    </div>
  )
}