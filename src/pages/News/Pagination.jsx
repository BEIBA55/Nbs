import React from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const { t } = useTranslation();
  // Функция для генерации массива номеров страниц
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Если общее количество страниц меньше или равно максимальному количеству видимых страниц
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Если общее количество страниц больше максимального количества видимых страниц
      if (currentPage <= 3) {
        // Если текущая страница в начале
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Если текущая страница в конце
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Если текущая страница в середине
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Вычисляем диапазон элементов на текущей странице
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Items Info */}
      <div className="text-sm text-gray-600">
        {t('news.pagination.showingResults', { start: startItem, end: endItem, total: totalItems })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
            ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:text-red-600 hover:bg-gray-100 cursor-pointer hover:scale-105'
            }
          `}
          title={t('news.pagination.previousPage')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* First Page Button (if not visible) */}
        {pageNumbers[0] > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              title={t('news.pagination.firstPage')}
            >
              1
            </button>
            {pageNumbers[0] > 2 && <span className="text-gray-400">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-105
              ${
                currentPage === pageNumber
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'
              }
            `}
            title={t('news.pagination.pageNumber', { number: pageNumber })}
          >
            {pageNumber}
          </button>
        ))}

        {/* Last Page Button (if not visible) */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-red-600 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
              title={t('news.pagination.lastPage')}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
            ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:text-red-600 hover:bg-gray-100 cursor-pointer hover:scale-105'
            }
          `}
          title={t('news.pagination.nextPage')}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Page Info */}
      <div className="text-sm text-gray-600">
        {t('news.pagination.pageInfo', { current: currentPage, total: totalPages })}
      </div>
    </div>
  );
};

export default Pagination;
