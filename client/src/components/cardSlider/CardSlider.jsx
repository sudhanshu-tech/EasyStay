import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import hotel from '../../assets/hotelImg.png';
import room from '../../assets/roomImg2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const images = [hotel, room, hotel, room, hotel, room, hotel, room, hotel, room];

export default function CardSlider() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);

  const cardsPerView = () => {
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const handleSlide = (direction) => {
    const totalCards = images.length;
    const visibleCards = cardsPerView();
    const maxIndex = totalCards - visibleCards;

    setCurrent((prev) => {
      let next = direction === 'next' ? prev + 1 : prev - 1;
      if (next > maxIndex) next = 0;
      else if (next < 0) next = maxIndex;
      return next;

    });

  };

  const getTranslateValue = () => {
    const visibleCards = cardsPerView();
    return `translateX(-${(100 / visibleCards) * current}%)`;
  };

  useEffect(()=>{
    containerRef.current = setInterval(() => {
      handleSlide('next');
    }, 3000);

    return () => {
      clearInterval(containerRef.current);
    };
  })
  return (
    <div className="relative max-w-7xl mx-auto py-8 bg-cream flex justify-center items-center">
      <div className="overflow-hidden w-[94%]">
        <div
          ref={containerRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: getTranslateValue(),
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex-shrink-0"
            >
              <div className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform">
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-48 object-cover rounded-xl p-1.5"
                />
                <div className="px-4 py-2">
                  <div className="flex items-center gap-1 mt-4 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FontAwesomeIcon icon={faStar} key={i} />
                    ))}
                    <p className="ml-2 text-sm text-gray-700">5/5</p>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Sudhanshu</h2>
                  <p className="text-gray-600">$300</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-red-500 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => handleSlide('prev')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ChevronLeft size={25} className="bg-white hover:bg-gray-300 rounded-full" />
      </button>
      <button
        onClick={() => handleSlide('next')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
      >
        <ChevronRight size={25} className="bg-white hover:bg-gray-300 rounded-full" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {Array.from({ length: images.length - cardsPerView() + 1 }).map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full ${idx === current ? 'bg-blue-600' : 'bg-gray-300'}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
