"use client"
import React from 'react'
import Footer from '../../components/frames/Footer';
import Subscribe from '../../components/content/subscribe/Subscribe';
import About from '../../components/content/about/About';
import News from '../../components/content/news/News';
import Contact from '../../components/content/contact/Contact';

export default function Page() {

  return (
    <div>
     <div>
      <Subscribe />
      <About />
      <News />
      <Contact />
      </div>
      <Footer/>
    </div>

  )
}
