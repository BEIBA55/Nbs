import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ news, className = '' }) => {
  const { t } = useTranslation();
  const { title, description, date, image, category, tags, readTime } = news;
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <article
      className={`
        bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 
        cursor-pointer overflow-hidden group border border-gray-100/50
        transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation
        flex flex-col h-full relative
        hover:border-red-200/50
        ${className}
      `}
    >
      {/* Image Container with Overlay */}
      {image && (
        <Link to={`/news/${news.id}`} className="block">
          <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0 bg-gray-100">
            {/* Loading State */}
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            )}
            
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              decoding="async"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              imageLoading ? 'pointer-events-none' : ''
            }`} />
            
            {/* Category Badge on Image */}
            {category && (
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-xs text-white font-semibold bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  {t(`news.${category}`)}
                </span>
              </div>
            )}
            

          </div>
        </Link>
      )}

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow relative">
        {/* Category Badge (Desktop) */}
        {category && (
          <div className="hidden sm:block mb-3">
            <span className="inline-flex items-center text-xs text-red-600 font-semibold bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {t(`news.${category}`)}
            </span>
          </div>
        )}

        {/* Date */}
        {date && (
          <div className="flex items-center text-xs text-gray-500 font-medium mb-3">
            <svg className="w-3.5 h-3.5 mr-1.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {date}
          </div>
        )}

        {/* Title */}
        <Link to={`/news/${news.id}`} className="block mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-red-700 transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Description */}
        {description && (
          <div className="mb-4 flex-grow">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center text-xs text-gray-600 bg-gray-50 hover:bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200 transition-colors duration-200"
              >
                <svg className="w-2.5 h-2.5 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link 
            to={`/news/${news.id}`}
            className="inline-flex items-center justify-between w-full text-red-600 hover:text-red-700 font-semibold text-sm transition-all duration-300 group/btn"
          >
            <span className="flex items-center">
              {t('common.readMore', 'Читать далее')}
              <svg
                className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <div className="w-6 h-6 rounded-full bg-red-50 group-hover/btn:bg-red-100 transition-colors duration-300 flex items-center justify-center">
              <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </article>
  );
};

export default NewsCard;
