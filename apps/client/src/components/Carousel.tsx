'use client';
import { useState, useEffect, useRef } from 'react';

const slides = [
  { id: 1, img: 'Banner-1.webp', alt: 'Slide 1' },
  { id: 2, img: 'Banner-2.webp', alt: 'Slide 2' },
  { id: 3, img: 'Banner-3.jpg', alt: 'Slide 3' },
  { id: 4, img: 'Banner-4.jpg', alt: 'Slide 4' },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      const slideWidth = containerRef.current.clientWidth;
      containerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    scrollToSlide(newIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    scrollToSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex === slides.length - 1 ? 0 : prevIndex + 1;
        if (containerRef.current) {
          const slideWidth = containerRef.current.clientWidth;
          containerRef.current.scrollTo({
            left: nextIndex * slideWidth,
            behavior: 'smooth',
          });
        }
        return nextIndex;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-2 flex items-center justify-center">
      <div className="relative sm:w-[70%] w-full rounded-xl overflow-hidden shadow-md group">
        <div
          ref={containerRef}
          className="carousel flex overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="carousel-item relative w-full flex-shrink-0 snap-start"
            >
              <img
                alt={slide.alt}
                src={slide.img}
                className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95 cursor-pointer"
        >
          ❮
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95 cursor-pointer"
        >
          ❯
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/80 w-2.5'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;