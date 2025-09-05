import React, { useEffect } from 'react';

const NewsModal = ({ news, isOpen, onClose }) => {
  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Восстанавливаем прокрутку
    };
  }, [isOpen, onClose]);

  if (!isOpen || !news) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 shadow-lg"
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/images/Fon.png';
              }}
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                {news.category}
              </span>
            </div>

            {/* Read Time Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                {news.readTime}
              </span>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30"></div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-500 text-sm font-medium">{news.date}</span>
                <div className="flex items-center space-x-1">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-400 text-sm">{news.readTime}</span>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {news.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {news.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Full Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {news.fullContent}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500 text-sm">Narxoz Business School</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">{news.category}</span>
                </div>

                <button
                  onClick={onClose}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
