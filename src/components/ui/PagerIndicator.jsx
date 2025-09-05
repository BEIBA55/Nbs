import React from 'react';

const PagerIndicator = ({ totalPages = 5, currentPage = 0, onPageChange, className = '' }) => {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange && onPageChange(index)}
          className={`
            w-6 h-6 rounded-full transition-colors duration-200
            ${index === currentPage ? 'bg-pager-active' : 'bg-pager-inactive'}
          `}
        />
      ))}
    </div>
  );
};

export default PagerIndicator;
