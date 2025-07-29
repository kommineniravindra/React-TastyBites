import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Custom CSS for shadows, hover effects

const ImageSlider = ({ images }) => {
  const sliderRef = useRef();

  const scroll = (direction) => {
    const container = sliderRef.current;
    const scrollAmount = container.offsetWidth / 1.2;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="container py-4">
      <h4 className="mb-3">Top Deals for You</h4>

      <div className="position-relative">
        {/* Scroll Buttons */}
        <button
          className="carousel-control prev"
          onClick={() => scroll('left')}
        >
          ❮
        </button>
        <button
          className="carousel-control next"
          onClick={() => scroll('right')}
        >
          ❯
        </button>

        {/* Image Row */}
        <div
          ref={sliderRef}
          className="d-flex overflow-auto scroll-snap"
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-2 shadow-sm rounded product-card"
            >
              <img
                src={img}
                alt={`Slide ${index}`}
                className="img-fluid rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
