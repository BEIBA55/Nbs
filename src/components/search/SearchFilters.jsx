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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('search.filters')}</h3>
      
      <div className="space-y-6">
        {/* Тип контента */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('search.contentType')}
          </label>
          <select
            value={filters.type || 'all'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E]"
          >
            <option value="all">{t('search.allTypes')}</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {getTypeLabel(type)}
              </option>
            ))}
          </select>
        </div>

        {/* Категория */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('search.category')}
          </label>
          <select
            value={filters.category || 'all'}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E]"
          >
            <option value="all">{t('search.allCategories')}</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Сброс фильтров */}
        <div>
          <button
            onClick={() => onFilterChange({})}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E] transition-colors"
          >
            {t('search.resetFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

const getTypeLabel = (type) => {
  switch (type) {
    case 'program':
      return 'Программы';
    case 'news':
      return 'Новости';
    case 'faculty':
      return 'Преподаватели';
    case 'accreditation':
      return 'Аккредитации';
    case 'partner':
      return 'Партнеры';
    case 'graduate':
      return 'Выпускники';
    case 'library':
      return 'Библиотека';
    default:
      return type;
  }
};

export default SearchFilters; 