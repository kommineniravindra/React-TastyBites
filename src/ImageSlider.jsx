import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Make sure this path is correct

const ImageSlider = ({ images, autoPlay = true, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to advance to the next slide
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to a specific slide (for dots)
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // useEffect for automatic sliding
  useEffect(() => {
    let intervalId;
    if (autoPlay) {
      intervalId = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }

    // Cleanup function: Clear the interval when the component unmounts
    // or when autoPlay/autoPlayInterval/images.length changes.
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoPlay, autoPlayInterval, images.length]); // Dependencies for useEffect

  // You might not need explicit previous/next buttons if it's purely auto-fading
  // but I'll include them for manual navigation capability if desired.
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider"> {/* Use the .slider class for the main container */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }} // Set background image via style
        ></div>
      ))}

      {/* Manual Controls (Optional, as it's an auto-fading slider) */}
      <div className="slider-controls">
        <button onClick={goToPrevious} className="slider-button prev">
          &#10094; {/* Left arrow */}
        </button>
        <button onClick={goToNext} className="slider-button next">
          &#10095; {/* Right arrow */}
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="slider-dots">
        {images.map((_, slideIndex) => (
          <span
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`dot ${currentIndex === slideIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;