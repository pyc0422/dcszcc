"use client"
import React from 'react'
import Footer from '../../components/frames/Footer';
import Subscribe from '../../components/content/subscribe/Subscribe';
import About from '../../components/content/about/About';
import News from '../../components/content/news/News';
import Contact from '../../components/content/contact/Contact';
import Partners from '@/components/content/partner/Partners';

export default function Page() {

  return (
    <>
      <div className='mb-[150px] md:mb-[300px] flex flex-col items-center'>
        <Subscribe />

        <About />
        <News />
        <Partners />
        <Contact />


       </div>
    <Footer/>
    </>

  )
}
