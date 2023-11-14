import React, { useState } from 'react'
import Image from 'next/image'
import { partnerShips } from '@/utility/data'
import Title from '@/components/utility/Title'
import { useAppContext } from '@/components/AppContext'
const Partners = () => {
  const [hover, setHover] = useState(-1)
  const {partners} = useAppContext()
  return (
    <div className='h-96 mb-24' id="partners">
      <Title custom="md:mt-24 md:mb-16" text="会员企业 ｜ Membership"/>
      <div className='md:w-[960px] flex flex-wrap flex-row justify-evenly items-center hover:items-start'>
        {partners.map((p, i) =>
          <div
            key={i}
            className='p-2 h-24 shadow-2xl rounded-md hover:h-80 w-48 border border-1 flex flex-col items-center justify-start'
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
          >
            <div className='h-[50px] flex items-center'>
             <Image src={p.logo} alt={p.name} height={50} width={50}/>
            </div>
            <div className='mt-2 font-medium text-xl'>{p.name}</div>
            <div className={hover === i ? 'flex flex-col mt-4' : 'hidden'}>
              <a href={p.link} className={p.link.length ? "mb-4 text-sm text-center" : 'hidden'}>
                {'>>> '}<span className=" font-medium hover:underline">官方网站</span>{" <<<"}
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