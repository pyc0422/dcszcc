import React, { useEffect, useState } from "react";
import { useAppContext } from "@/components/AppContext";
import { getImg, sortedArray } from "@/utility/functions";
import Image from "next/image";
import Link from "next/link";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Title from "@/components/utility/Title";
import { NewsType } from "@/utility/types";
const defaultImg = "/p-logo.png";
export default function News() {
  const { newsList } = useAppContext();
  const [activeIndex, setActiveIndex] = useState(0);
  const [topFive, setTopFive] = useState<NewsType[]>([]);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (newsList) {
      const five = sortedArray(newsList, "time").slice(0, 5);
      setTopFive(five);
      const topImages = five.map((news) => {
        const imgs = getImg(news.content);
        return imgs.length ? imgs[0] : defaultImg;
      });
      setImages(topImages);
    }
  }, [newsList]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <section id="news" className="flex-center">
      <div className="max-w-[960px]">
        <Title text="近期活动 ｜ News" custom="md:mt-24 md:mb-16" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 p-2 md:mr-16">
            <ul>
              {!topFive.length
                ? null
                : topFive.map((e) => (
                    <li
                      key={e.id}
                      className="p-2 m-1 border border-1 border-gray-300 rounded-md pb-4"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <div className="text-sm font-normal pb-1">
                          {e.title}
                        </div>
                        <div className="text-xs">{e.news_date}</div>
                      </div>
                      <div className="text-xs">
                        {e.content.replaceAll(/<[^>]+>/g, "").slice(0, 70) +
                          "..."}
                      </div>
                      <Link
                        href={`/articles/${e.id}`}
                        className="float-right mt-0 text-xs font-normal hover:font-medium"
                      >
                        更多...
                      </Link>
                    </li>
                  ))}
            </ul>
            {!newsList
              ? null
              : newsList.length > 5 && (
                  <div className="flex justify-center mt-2">
                    <button className="text-center outline outline-1 border-black py-1 px-8">
                      <Link href="/articles">更多活动</Link>
                    </button>
                  </div>
                )}
          </div>
          <div className="hidden md:flex w-1/2 p-2 flex-row justify-around items-center h-[450px]">
            <div onClick={handlePrev}>
              <ArrowLeftIcon
                fontSize="large"
                className="hover:text-black/50 hover:scale-125 hover:-translate-x-1 hoaver:duration-150 hover:deplay-150"
              />
            </div>
            {images.length ? (
              <Link
                href={`/articles/${topFive[activeIndex].id}`}
                className="h-full"
              >
                <Image
                  src={
                    images[activeIndex] !== defaultImg
                      ? images[activeIndex].slice(
                          1,
                          images[activeIndex].length - 1
                        )
                      : defaultImg
                  }
                  width={200}
                  height={200}
                  alt={`Photo ${activeIndex + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </Link>
            ) : null}
            <div onClick={handleNext}>
              <ArrowRightIcon
                fontSize="large"
                className="hover:text-black/50 hover:scale-125 hover:translate-x-1 hoaver:duration-150 hover:deplay-150"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
