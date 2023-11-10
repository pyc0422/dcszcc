import React, { useState } from 'react'
import Image from 'next/image'
import { partnerShips } from '@/utility/data'
const Partners = () => {
  const [hover, setHover] = useState(-1)
  return (
    <div className='h-96 mb-24' id="partners">
      <div className="flex-center md:mt-24 md:mb-16">
        <div className="w-[25px] h-[25px]">
          <Image src="/p-logo.png" alt="logo" width={36} height={36} className="w-full h-full object-cover"/>
        </div>
        <span className="font-serif_SC text-xl md:text-2xl p-2">会员企业 ｜ Membership</span>
      </div>
      <div className='md:w-[960px] flex flex-wrap flex-row justify-evenly items-center hover:items-start'>
        {partnerShips.map((p, i) =>
          <div
            key={i}
            className='p-2 h-24 shadow-md rounded-md hover:h-72 w-48 border border-1 flex flex-col items-center justify-start'
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
          >
            <div className='h-[50px] flex items-center'>
            <Image src={p.logo} alt={p.name} height={50} width={50}/>
            </div>
            <div className={hover !== i ? 'mt-2 font-medium text-xl' : 'hidden'}>{p.name}</div>
            <div className={hover === i ? 'flex flex-col' : 'hidden'}>
              <a href={p.link} className="text-sm text-center font-medium hover:underline">
                {p.name}官方网站
              </a>
              <div className='mt-1 p-1'>{p.intro}</div>
            </div>

          </div>

        )}
      </div>

    </div>
  )
}

export default Partners