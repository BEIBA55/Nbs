import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchCategories, useSearchTypes } from '../../hooks/useSearch';

const SearchFilters = ({ filters, onFilterChange }) => {
  const { t } = useTranslation();
  const { data: categories = [] } = useSearchCategories();
  const { data: types = [] } = useSearchTypes();

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('search.filters')}</h3>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Тип контента */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            {t('search.contentType')}
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E] text-sm sm:text-base"
          >
            <option value="all">{t('search.allTypes')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type, t)}
              </option>
            ))}
          </select>
        </div>

        {/* Категория */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
            {t('search.category')}
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E] text-sm sm:text-base"
          >
            <option value="all">{t('search.allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {getCategoryLabel(category, t)}
              </option>
            ))}
          </select>
        </div>

        {/* Сброс фильтров */}
        <div>
          <button
            onClick={() => onFilterChange({})}
            className="w-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E] transition-colors"
          >
            {t('search.resetFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

const getTypeLabel = (type, t) => {
  switch (type) {
    case 'program':
      return t('search.program');
    case 'news':
      return t('search.news');
    case 'faculty':
      return t('search.faculty');
    case 'accreditation':
      return t('search.accreditation');
    case 'partner':
      return t('search.partner');
    case 'graduate':
      return t('search.graduate');
    case 'library':
      return t('search.library');
    default:
      return type;
  }
};

const getCategoryLabel = (category, t) => {
  return t(`search.categories.${category}`, category);
};

export default SearchFilters; 