/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState, useEffect } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Carousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentSlide, handleNextSlide]);

  return (
    <div className="relative w-[98%] max-w-2xl mt-10 h-fit mx-auto rounded-lg">
      <div className="relative flex w-full m-auto overflow-hidden rounded-lg bg-transparent backdrop-blur-lg h-72 sm:h-96">
        <div className="absolute inset-y-0 left-0 z-20 grid px-1 bg-gradient-to-l from-transparent to-slate-900/30 place-items-center">
          <AiOutlineLeft onClick={handlePrevSlide} className="m-auto text-3xl cursor-pointer md:text-5xl inset-y-1/2 text-white/70 hover:text-white" />
        </div>
        <Swipe onSwipeLeft={handleNextSlide} onSwipeRight={handlePrevSlide} className="relative z-10 w-full h-full">
          {images.map((item, index) => {
            if (index === currentSlide) {
              return (
                <div key={`carousel-image-${index}`}>
                  <Image priority
                    height={item.image.height} width={item.image.width}
                    src={item.image.url} alt={item.name}
                    className="absolute inset-0 object-cover h-full mx-auto animate-fade-in" />
                  <div className="absolute inset-x-0 bottom-0 items-center p-2 mx-auto text-center bg-slate-900/10 backdrop-blur-sm">
                    <span className="text-white text-xl lg:text-2xl font-bold lg:font-bold leading-[1.6]">{item.name}</span>
                    <p className="hidden text-white/60 sm:block">{item.description}</p>
                  </div>
                </div>
              );
            }
          })}
        </Swipe>
        <div className="absolute inset-y-0 right-0 z-20 grid px-1 bg-gradient-to-r from-transparent to-slate-900/30 place-items-center">
          <AiOutlineRight onClick={handleNextSlide} className="m-auto text-3xl cursor-pointer md:text-5xl inset-y-1/2 text-white/70 hover:text-white" />
        </div>
      </div>
      <div className="relative flex justify-center p-2">
        {images.map((_, index) => {
          return (
            <div
              className={"h-1 w-6 mx-1 cursor-pointer rounded-sm " + (index === currentSlide ? "bg-gray-300" : "bg-gray-500/50")}
              key={index}
              onClick={ () => setCurrentSlide(index) }
            />
          );
        })}
      </div>
    </div>
  );
}
