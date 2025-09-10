import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import NewsCard from './NewsCard';
import Pagination from './Pagination';
import { useTranslatedNews } from '../../data/translatedNewsData';

const News = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const newsPerPage = 8;

    // Используем переведенные новости
  const allNews = useTranslatedNews();

  // Категории для фильтрации
  const categories = [
    { key: 'all', label: t('news.allCategories') },
    { key: 'events', label: t('news.events') },
    { key: 'achievements', label: t('news.achievements') },
    { key: 'programs', label: t('news.programs') },
    { key: 'partnerships', label: t('news.partnerships') },
    { key: 'infrastructure', label: t('news.infrastructure') }
  ];

  // Фильтрация и поиск
  const filteredNews = allNews.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (news.tags && news.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Сортировка
  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === 'date') {
      // Используем ID для сортировки, так как дата одинаковая
      return b.id - a.id;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(sortedNews.length / newsPerPage);

  // Получаем новости для текущей страницы
  const currentNews = sortedNews.slice((currentPage - 1) * newsPerPage, currentPage * newsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumbs - Enhanced Mobile Optimization */}
      <div className="bg-gray-50 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm">
            <Link to="/" className="text-gray-500 hover:text-red-600 transition-colors">
              {t('common.home')}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{t('news.title')}</span>
          </nav>
        </div>
      </div>

      {/* Filters and Search Section - Enhanced Mobile Optimization */}
      <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 px-3 sm:px-4 md:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Search */}
            <div className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder={t('news.searchPlaceholder', 'Поиск новостей...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white hover:bg-gray-50 focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg text-sm sm:text-base"
                />
                <svg
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-red-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      selectedCategory === category.key
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-red-200 hover:text-red-600'
                    }`}
                  >
                    {t(`news.${category.key === 'all' ? 'allCategories' : category.key}`)}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-gray-600 text-xs sm:text-sm font-medium">{t('news.sortBy', 'Сортировать:')}</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-3 sm:px-4 py-2 sm:py-2.5 pr-8 sm:pr-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white hover:bg-gray-50 focus:bg-white shadow-sm hover:shadow-md focus:shadow-lg cursor-pointer text-xs sm:text-sm"
                  >
                    <option value="date">{t('news.sortByDate', 'По дате')}</option>
                    <option value="title">{t('news.sortByTitle', 'По названию')}</option>
                    <option value="category">{t('news.sortByCategory', 'По категории')}</option>
                  </select>
                  <svg
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Results Info */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                {searchQuery && selectedCategory !== 'all' 
                  ? t('news.foundResultsInCategory', { 
                      count: sortedNews.length, 
                      category: t(`news.${selectedCategory}`)
                    })
                  : searchQuery 
                  ? t('news.foundResultsWithQuery', { 
                      count: sortedNews.length, 
                      query: searchQuery 
                    })
                  : t('news.foundResults', { count: sortedNews.length })
                }
              </p>
            </div>
          </div>

          {/* News Grid */}
          {currentNews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 auto-rows-fr">
              {currentNews.map((news, index) => (
                <div 
                  key={news.id} 
                  className="news-card-animate"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <NewsCard news={news} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                {t('news.noNewsFound', 'Новости не найдены')}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed">
                {t('news.noNewsFoundDescription', 'Попробуйте изменить параметры поиска или фильтры')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('date');
                }}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300 font-medium text-sm sm:text-base"
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={sortedNews.length}
                itemsPerPage={newsPerPage}
              />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default News;
