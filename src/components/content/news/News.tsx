import React, { useState } from 'react';
import { useAppContext } from "@/components/AppContext"
import styles from './PhotoCarousel.module.css';
import Typography from '@mui/material/Typography';
import { getImg, sortedArray } from "@/utility/functions";
import Image from "next/image";
import Grid from '@mui/material/Grid';

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
           <Grid container alignItems="center" justifyContent="center" >
           <Grid item>
          <Image src="/p-logo.png" alt="logo" width={36} height={36}/>
          </Grid>
          <Grid item>
          <Typography align="center" variant="h5" fontWeight={600}>近期活动 | News</Typography>
          </Grid>
          </Grid>

          <div>
            {
              sortedArray(newsList, "time").map((e) =>
               <div key={e.id}>
                {/* {JSON.stringify(getImg(e.content))} */}
               </div>

            )
            }
          </div>
     <div className={styles.carousel}>
      <img className={styles.photo} src={photos[activeIndex]} alt={`Photo ${activeIndex + 1}`} />
      <button className={styles.prevButton} onClick={handlePrev}>Previous</button>
      <button className={styles.nextButton} onClick={handleNext}>Next</button>
    </div>
       <div>


       </div>
    </section>
  );
};

