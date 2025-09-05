import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSearch } from '../../hooks/useSearch';
import Header from '../../components/common/Header';
import SearchCard from '../../components/search/SearchCard';
import SearchFilters from '../../components/search/SearchFilters';

const SearchResults = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'all',
    category: searchParams.get('category') || 'all'
  });

  const { data: searchResults, isLoading, error } = useSearch(query, filters);

  // Обновляем URL при изменении фильтров
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (query) newParams.set('q', query);
    if (filters.type && filters.type !== 'all') newParams.set('type', filters.type);
    if (filters.category && filters.category !== 'all') newParams.set('category', filters.category);
    setSearchParams(newParams);
  }, [query, filters, setSearchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get('search');
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {t('search.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {t('search.subtitle')}
              </p>
              
                             <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
                 <div className="flex">
                   <input
                     type="text"
                     name="search"
                     placeholder={t('search.placeholder')}
                     className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E]"
                     autoFocus
                   />
                   <button
                     type="submit"
                     className="px-6 py-3 text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                     style={{ backgroundColor: '#991E1E' }}
                   >
                     {t('search.searchButton')}
                   </button>
                 </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Поисковая строка */}
          <div className="mb-8">
                         <form onSubmit={handleSearchSubmit} className="max-w-2xl">
               <div className="flex">
                                   <input
                     type="text"
                     name="search"
                     defaultValue={query}
                     placeholder={t('search.placeholder')}
                     className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:border-[#991E1E]"
                   />
                   <button
                     type="submit"
                     className="px-6 py-3 text-white font-medium rounded-r-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                     style={{ backgroundColor: '#991E1E' }}
                   >
                     {t('search.searchButton')}
                   </button>
               </div>
             </form>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Фильтры */}
            <div className="lg:w-80 flex-shrink-0">
              <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {/* Результаты */}
            <div className="flex-1">
                             {isLoading ? (
                 <div className="text-center py-12">
                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#991E1E' }}></div>
                   <p className="mt-4 text-gray-600">{t('search.loading')}</p>
                 </div>
               ) : error ? (
                 <div className="text-center py-12">
                   <p className="text-red-600">{t('search.error')}</p>
                 </div>
               ) : searchResults?.total === 0 ? (
                 <div className="text-center py-12">
                   <div className="text-gray-400 mb-4">
                     <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                   </div>
                   <h3 className="text-lg font-medium text-gray-900 mb-2">
                     {t('search.noResults')}
                   </h3>
                   <p className="text-gray-600">
                     {t('search.noResultsDescription', { query })}
                   </p>
                 </div>
               ) : (
                <div>
                                     {/* Статистика результатов */}
                   <div className="mb-6">
                     <p className="text-gray-600">
                       {t('search.foundResults', { count: searchResults?.total, query })}
                     </p>
                   </div>

                  {/* Результаты поиска */}
                  <div className="space-y-4">
                    {searchResults?.results.map((item) => (
                      <SearchCard key={item.id} item={item} />
                    ))}
                  </div>

                                     {/* Пагинация (если нужно) */}
                   {searchResults?.total > 10 && (
                     <div className="mt-8 text-center">
                       <p className="text-gray-600">
                         {t('search.showingResults', { shown: searchResults.results.length, total: searchResults.total })}
                       </p>
                     </div>
                   )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 