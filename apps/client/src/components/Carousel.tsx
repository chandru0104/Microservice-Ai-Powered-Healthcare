const Carousel = () => {
    return (
        <div className="relative w-full group pt-8">

            <div className="carousel w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-xl shadow-md [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full flex-shrink-0 snap-start">
                    <img
                        alt="Slide 1"
                        src="Banner-1.webp"
                        className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none z-10">
                        <a
                            href="#slide4"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide2"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full flex-shrink-0 snap-start">
                    <img
                        alt="Slide 2"
                        src="Banner-2.webp"
                        className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none z-10">
                        <a
                            href="#slide1"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide3"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full flex-shrink-0 snap-start">
                    <img
                        alt="Slide 3"
                        src="Banner-3.jpg"
                        className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none z-10">
                        <a
                            href="#slide2"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide4"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❯
                        </a>
                    </div>
                </div>

                {/* Slide 4 */}
                <div id="slide4" className="carousel-item relative w-full flex-shrink-0 snap-start">
                    <img
                        alt="Slide 4"
                        src="Banner-4.jpg"
                        className="w-full h-[180px] sm:h-[220px] md:h-[280px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                    <div className="absolute left-3 right-3 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none z-10">
                        <a
                            href="#slide3"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❮
                        </a>
                        <a
                            href="#slide1"
                            className="pointer-events-auto w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md text-sm transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
                        >
                            ❯
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Carousel;