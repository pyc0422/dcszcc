import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
// import { partners } from '../../utility/data';
import ContactInfo from './ContactInfo';
import { useAppContext } from '../AppContext';

export default function Footer () {
  const {partners} = useAppContext()
  return (
    <div className="flex flex-col inset-x-0 bg-[#D9D9D9] bottom-0 w-screen min-h-fit max-w-[960x]">
      <div className='flex flex-row px-4 py-8 justify-around items-start'>
      <div className="footer-grid">
        <Typography component="a" href="/partner" className="footer-title">合作伙伴</Typography>
        <div className="hidden md:flex flex-row items-center justify-center mt-4">
          {!partners ? null : partners.slice(0,5).map((company) =>
            <a key={company.id} title={company.name} href={company.link} className="hover:scale-110 hover:-translate-y-1 ease-in-out duration-300 hover:duration-150 hover:delay-150 font-light text-sm p-2">
              <Image src={company.logo} alt={company.name} unoptimized width={30} height={30} className='w-auto h-8'/>
            </a>
          )}
          {partners && partners.length > 5 ?
          <Button sx={{color:"#101a30", fontWeight:500}} size="small" href='/partner'>更多...</Button>
           : null}
        </div>
      </div>
      <div className='footer-grid'>
        <Typography component={"a"} href="/info" className="footer-title">联系信息</Typography>
        <div className='hidden md:block '>
        <ContactInfo />
        </div>
      </div>
      </div>
      <div className='w-full bottom-0 left-0 text-center'>
        <div className='font-extralight text-xs text-slate-700'>
        &copy; 2023 SZCC
        </div>
      </div>
    </div>
  )
}