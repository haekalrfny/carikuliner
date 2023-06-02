import React, { useState, useEffect } from "react";
import picture from "../assets/telur.jpg";
import picture2 from "../assets/sate.jpg";
import picture3 from '../assets/roti.jpg'
import picture4 from '../assets/donat.jpg'
import picture5 from '../assets/oseng.jpg'
import { RxDotFilled } from "react-icons/rx";

const Carousel = () => {
  const slides = [
    {
      photo: picture,
      p: `“Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture. It has a history. It has a story. It has relationships.”`,
      figure:' - Winona LaDuke'
    },
    { 
      photo: picture2,
      p: `“Food brings people together on many different levels. It’s nourishment of the soul and body; it’s truly love.”`,
      figure:' - Giada De Laurentiis'
    },
    { 
      photo: picture3,
      p: `"Food, to me, is always about cooking and eating with those you love and care for."`,
      figure: ' - David Chang',
    },
    { 
      photo: picture4,
      p: `“Life is uncertain. Eat dessert first.”`,
      figure: ' - Ernestine Ulmer',
    },
    { 
      photo: picture5,
      p: `“The best comfort food will always be greens, cornbread, and fried chicken.”`,
      figure: ' - Maya Angelou',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  return (
    <div className="w-full h-full rounded-[20px] relative">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].photo})` }}
        className="w-full h-full flex rounded-[20px] bg-cover bg-center duration-1000 brightness-50"
      ></div>
      <div
        onClick={prevSlide}
        className="absolute w-[10%] h-full top-0 left-0 cursor-pointer"
      ></div>
      <div
        onClick={nextSlide}
        className="absolute top-0 h-full w-[10%] right-0 cursor-pointer"
      ></div>
      <div id="carousel-dot" className="flex justify-center py-3">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${
              slideIndex === currentIndex ? "text-[#f15e3c]" : "text-gray-500"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full p-[2%] pr-[5%]">
        <p id="carousel-p" className="text-white text-4xl font-semibold">
          {slides[currentIndex].p} <br /> <span id="carousel-span" className="text-[#f15e3c] text-3xl font-bold italic">{ slides[currentIndex].figure}</span>
        </p>
      </div>
    </div>
  );
};

export default Carousel;
