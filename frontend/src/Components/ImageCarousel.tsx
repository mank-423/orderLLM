import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="bg-[#ffffff]">
      <Carousel 
        showThumbs={false} 
        autoPlay 
        interval={2500} 
        infiniteLoop 
        showIndicators={false} // Hide the indicators
        showStatus={false}     // Hide the status
        showArrows = {false}
      >
        {images.map((image, index) => (
          <div key={index} className="">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="object-contain flex justify-center items-center lg:h-[350px] md:h-[400px] h-[300px]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
