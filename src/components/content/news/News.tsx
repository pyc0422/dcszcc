import React, { useState } from 'react';
import { useAppContext } from "@/components/AppContext"
import styles from './PhotoCarousel.module.css';
import Typography from '@mui/material/Typography';
import { getImg, sortedArray } from "@/utility/functions";
import Image from "next/image";
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { Button } from '@mui/material';

const photos = [
  'https://res.cloudinary.com/tidibubu/image/upload/v1697636250/Picture2_ifafly.jpg',
  'https://res.cloudinary.com/tidibubu/image/upload/v1697636250/Picture1_fidjdk.jpg',
  'https://res.cloudinary.com/tidibubu/image/upload/v1697636250/Picture3_mjaf2c.jpg'
];

export default function News() {
  const {newsList} = useAppContext()

  console.log(newsList[0]);

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section id="news">
      <div className="flex-center">
        <Image src="/p-logo.png" alt="logo" width={36} height={36}/>
        <span className="text-xl md:text-2xl font-medium p-2">近期活动 ｜ News</span>
      </div>
      <div className='flex flex-row justify-between items-center'>
        <div className='w-1/2 p-2 md:mr-16'>
          <ul >
            {sortedArray(newsList, "time").slice(0,5).map((e) =>
               <li key={e.id} className='p-2 m-2 border border-2 rounded-md pb-4'>
                <div className='flex flex-row justify-between items-center'>
                  <div className="text-sm font-normal pb-1">{e.title}</div>
                  <div className='text-xs'>{e.news_date}</div>
                </div>
                <div className='text-xs'>{e.content.replaceAll(/<[^>]+>/g, '').slice(0,70)+'...'}</div>
                <Link href={`/articles/${e.id}` } className='float-right mt-0 text-xs font-normal hover:font-medium'>
                  更多...
                </Link>
               </li>
            )}
          </ul>
          {newsList.length > 5 &&
            <div className='flex justify-center'>
              <button  className='text-center outline outline-1 border-black py-1 px-8'>
                <Link href="/articles">更多活动</Link>
              </button>
            </div>
          }
          </div>
     <div className={`${styles.carousel} w-1/2 p-2`}>
      <img className={styles.photo} src={photos[activeIndex]} alt={`Photo ${activeIndex + 1}`} />
      <button className={styles.prevButton} onClick={handlePrev}>Previous</button>
      <button className={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
       </div>
    </section>
  );
};

