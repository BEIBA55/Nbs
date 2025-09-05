import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Graduates = () => {
  const { t } = useTranslation();
  const [animateStats, setAnimateStats] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Анимация статистики при загрузке страницы
    const timer = setTimeout(() => {
      setAnimateStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Функция для плавной прокрутки к секции
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const stats = [
    {
      number: '3500',
      label: t('graduates.stats.graduates'),
      icon: (
        <svg className="w-12 h-12 text-[#991E1E]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      number: '3',
      label: t('graduates.stats.languages'),
      icon: (
        <svg className="w-12 h-12 text-[#991E1E]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.01-4.65.77-6.99l-.01-.01-1.07-1.07-1.06 1.06c-1.3 1.3-1.31 3.4-.03 4.71l.03.03-2.51 2.54c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.54-2.51.03.03c1.31 1.28 3.41 1.27 4.71-.03l1.06-1.06-1.07-1.07-.01-.01c-2.34-1.24-5.05-.97-6.99.77l-.03.03-2.51 2.54c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0z" />
        </svg>
      ),
    },
    {
      number: '2',
      label: t('graduates.stats.countries'),
      icon: (
        <svg className="w-12 h-12 text-[#991E1E]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      number: '5',
      label: t('graduates.stats.cities'),
      icon: (
        <svg className="w-12 h-12 text-[#991E1E]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    },
  ];

  // Реальные мероприятия для выпускников
  const events = [
    {
      title: t('graduates.events.miniMbaMeeting.title'),
      date: '15 июля 2025',
      description: t('graduates.events.miniMbaMeeting.description'),
      type: 'alumni'
    },
    {
      title: t('graduates.events.leaderMistakes.title'),
      date: '20 июля 2025',
      description: t('graduates.events.leaderMistakes.description'),
      type: 'masterclass'
    },
    {
      title: t('graduates.events.embaMeeting.title'),
      date: '25 июля 2025',
      description: t('graduates.events.embaMeeting.description'),
      type: 'alumni'
    },
    {
      title: t('graduates.events.networkingMeeting.title'),
      date: '30 июля 2025',
      description: t('graduates.events.networkingMeeting.description'),
      type: 'networking'
    }
  ];

  // Реальные новости
  const news = [
    {
      id: 2,
      title: t('graduates.news.top50Asia.title'),
      date: '18 июля 2025',
      excerpt: t('graduates.news.top50Asia.description'),
      category: 'achievements'
    },
    {
      id: 3,
      title: t('graduates.news.executiveMba.title'),
      date: '18 июля 2025',
      excerpt: t('graduates.news.executiveMba.description'),
      category: 'programs'
    },
    {
      id: 4,
      title: t('graduates.news.hackathon.title'),
      date: '18 июля 2025',
      excerpt: t('graduates.news.hackathon.description'),
      category: 'events'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section с улучшенным изображением */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ForGrau.jpg"
            alt="Выпускники Narxoz Business School"
            className="w-full h-full object-cover"
          />
          {/* Улучшенный overlay с градиентом */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {t('graduates.hero.title')}
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto animate-fade-in leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            {t('graduates.hero.subtitle')}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => scrollToSection('community')}
              className="inline-block bg-[#991E1E] hover:bg-[#7A1818] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
            >
              {t('common.readMore')}
            </button>
          </div>
        </div>

        {/* Декоративные элементы */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t('graduates.stats.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('graduates.stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-100 ${
                  animateStats ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-[#991E1E] mb-3">{stat.number}</div>
                <div className="text-gray-600 text-sm leading-relaxed">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('graduates.community.title')}
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  {t('graduates.community.description1')}
                </p>
                <p>
                  {t('graduates.community.description2')}
                </p>
                <p>
                  {t('graduates.community.description3')}
                </p>
              </div>
              <div className="mt-8">
                <p className="text-xl font-bold text-[#991E1E]">
                  {t('graduates.community.cta')}
                </p>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-[#991E1E] to-[#7A1818] rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">{t('graduates.benefits.title')}</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-white flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.99 2.5V20h-2v-8.5l-1.99-2.5A2.5 2.5 0 0 0 7 8H5.46c-.8 0-1.54.37-2.01 1L.96 16.37A1.5 1.5 0 0 0 2.5 18H5v6h2v-6h2v6h2v-6h2v6h2v-6h2z" />
                    </svg>
                    <span>{t('graduates.benefits.networking')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-white flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                    </svg>
                    <span>{t('graduates.benefits.education')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-white flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                    <span>{t('graduates.benefits.career')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-white flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                    <span>{t('graduates.benefits.international')}</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 mr-3 text-white flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{t('graduates.benefits.innovation')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events and News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Events */}
            <div className="animate-fade-in">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('graduates.events.title')}</h3>
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-semibold text-gray-900">{event.title}</h4>
                      <span className="text-sm text-[#991E1E] font-medium bg-[#991E1E]/10 px-3 py-1 rounded-full">{event.date}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="flex items-center">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        event.type === 'alumni' ? 'bg-amber-100 text-amber-800' :
                        event.type === 'masterclass' ? 'bg-purple-100 text-purple-800' :
                        event.type === 'networking' ? 'bg-pink-100 text-pink-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {event.type === 'alumni' ? t('graduates.events.alumni') :
                         event.type === 'masterclass' ? t('graduates.events.masterclass') :
                         event.type === 'networking' ? t('graduates.events.networking') : 'Мероприятие'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
                             <div className="mt-8 text-center">
                 <Link
                   to="/events"
                   className="inline-block bg-[#991E1E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7A1818] transition-colors duration-300"
                 >
                   {t('graduates.events.viewAll')}
                 </Link>
               </div>
            </div>

            {/* News */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">{t('graduates.news.title')}</h3>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Link to={`/news/${item.id}`} className="block flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 hover:text-[#991E1E] transition-colors duration-300 cursor-pointer">{item.title}</h4>
                      </Link>
                      <span className="text-sm text-[#991E1E] font-medium bg-[#991E1E]/10 px-3 py-1 rounded-full ml-3">{item.date}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{item.excerpt}</p>
                                         <div className="flex items-center justify-between">
                       <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                         item.category === 'achievements' ? 'bg-green-100 text-green-800' :
                         item.category === 'programs' ? 'bg-blue-100 text-blue-800' :
                         item.category === 'events' ? 'bg-orange-100 text-orange-800' :
                         'bg-gray-100 text-gray-800'
                       }`}>
                         {item.category === 'achievements' ? t('graduates.news.achievements') :
                          item.category === 'programs' ? t('graduates.news.programs') :
                          item.category === 'events' ? t('graduates.news.events') : 'Новости'}
                       </span>
                       <Link
                         to={`/news/${item.id}`}
                         className="text-[#991E1E] font-medium hover:underline transition-colors duration-300"
                       >
                         {t('graduates.news.readMore')} →
                       </Link>
                     </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                                 <Link
                   to="/news"
                   className="inline-block bg-[#991E1E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7A1818] transition-colors duration-300"
                 >
                   {t('graduates.news.viewAll')}
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#991E1E] to-[#7A1818] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('graduates.cta.title')}</h2>
          <p className="text-xl mb-8">
            {t('graduates.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-block bg-white text-[#991E1E] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
            >
              {t('graduates.cta.contact')}
            </button>
            <Link
              to="/news"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-[#991E1E] transition-all duration-300 transform hover:scale-105"
            >
              {t('graduates.cta.allNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('graduates.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('graduates.contactModal.phone')}</p>
                    <p className="text-lg font-semibold text-gray-800">+7 (727) 377-11-11</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('graduates.contactModal.email')}</p>
                    <p className="text-lg font-semibold text-gray-800">info@narxoz.kz</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('graduates.contactModal.address')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('graduates.contactModal.addressValue')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('graduates.contactModal.workingHours')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('graduates.contactModal.workingHoursValue')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsContactModalOpen(false)}
                className="mt-6 w-full bg-[#991E1E] text-white py-3 rounded-md font-medium hover:bg-[#7a1818] transition-colors"
              >
                {t('graduates.contactModal.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Graduates;
