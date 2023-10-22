import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { partners } from '../../utility/data';
import ContactInfo from './ContactInfo';

export default function Footer () {
  return (
    <div className="flex flex-col inset-x-0 bg-[#D9D9D9] bottom-0 w-screen min-h-fit">
      <div className='flex flex-row px-4 py-8 justify-around items-start'>
      <div className="footer-grid">
        <Typography component="a" href="/partner" className="footer-title">合作伙伴</Typography>
        <div className="hidden md:flex flex-row items-center justify-center mt-4">
          {partners.slice(0,5).map((company, i) =>
            <a key={i} title={company.name} href={company.link} className="hover:scale-110 hover:-translate-y-1 hover:duration-150 hover:delay-150 font-light text-sm p-2">
              <Image src={company.logo} alt={company.name} width={30} height={30}/>
            </a>
          )}
          {partners.length > 5 ?
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