import { useAppContext } from '@/components/AppContext';
import Title from '@/components/utility/Title';
import { getImg } from '@/utility/functions';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
const Opp = () => {
  const {opps} = useAppContext();
  return (
    <div>
      <Title text="合作机会 ｜ Opportunities" custom="md:mt-24 md:mb-16"/>
      <div className='flex flex-wrap flex-row flex-wrap justify-evenly'>
      {opps && opps.length ? opps.map((op) =>
        <Link href={`/opps/${op.id}`} key={op.id} className='md:h-36 md:w-96 shadow-lg rounded-md py-2 m-2 flex flex-row justify-evenly items-center bg-blue-200/50 hover:scale-110 ease-in-out duration-300'>

          <div className='h-36 w-3/5 inset-0 flex justify-center items-center overflow-none'>
            <Image src={op.img || getImg(op.content)[0].slice(1,-1)} height={50} width={50} alt={`${op.title} photo`} className="h-full w-full object-cover rounded-md"/>
          </div>

          <div className="text-center w-3/4 ">
            <span className="text-lg font-medium">{op.title}</span>
            <div>{">>> "}<strong>点击了解更多</strong>{" <<<"}</div>
          </div>

        </Link>
      ) : null}
      </div>
    </div>
  )
}

export default Opp;