import React from 'react';

const Slider = ({ images = [], className = '' }) => {
  return (
    <div className={`flex space-x-4 overflow-x-auto ${className}`}>
      {images.map((image, index) => (
        <div key={index} className="flex-shrink-0">
          <img
            src={image.src}
            alt={`Slide ${index + 1}`}
            className="h-40 w-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default Slider;
