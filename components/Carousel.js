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
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, handleNextSlide]);

  return (
    <div className="relative w-full lg:w-[70%] mt-10 h-fit mx-auto rounded-lg lg:rounded-2xl">
      <AiOutlineLeft
        onClick={handlePrevSlide}
        className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-white/50 z-20"
      />
      <div className="w-full bg-slate-900/50 md:h-[50vh] h-[30vh] flex overflow-hidden relative m-auto rounded-2xl">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 w-full h-full"
        >
          {images.map((item, index) => {
            if (index === currentSlide) {
              return (
                <div className="h-auto w-[90%]" key={`carousel-image-${index}`}>
                  <Image
                    height={item.image.height} width={item.image.width}
                    src={item.image.url} alt={item.name}
                    className="object-fit h-full lg:w-auto absolute inset-0 mx-auto animate-fade-in"
                  />
                  <div className="absolute inset-x-0 bottom-0 mx-auto bg-slate-900/50 backdrop-blur-sm items-center p-2">
                    <h4 className="text-center text-white text-xl lg:text-3xl font-bold lg:font-extrabold leading-[1.6]">
                      {item.name}
                    </h4>
                    <p className="text-white/60 text-center mt-3 hidden lg:block">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </Swipe>
      </div>
      <AiOutlineRight
        onClick={handleNextSlide}
        className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-white/50 z-20"
      />
      <div className="relative flex justify-center p-2">
        {images.map((_, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}