import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Library = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Цитаты для карусели с переводами
  const quotes = [
    {
      text: t('library.quotes.billGates.text'),
      author: t('library.quotes.billGates.author'),
      description: t('library.quotes.billGates.description'),
      image: "/images/billgeit.jpg"
    },
    {
      text: t('library.quotes.johnDewey.text'),
      author: t('library.quotes.johnDewey.author'),
      description: t('library.quotes.johnDewey.description'),
      image: "/images/jondu.jpg"
    },
    {
      text: t('library.quotes.benjaminFranklin.text'),
      author: t('library.quotes.benjaminFranklin.author'),
      description: t('library.quotes.benjaminFranklin.description'),
      image: "/images/bendzhamin.jpg"
    }
  ];

  // Рекомендуемые книги с переводами
  const recommendedBooks = [
    {
      title: t('library.books.thinkingFast.title'),
      author: t('library.books.thinkingFast.author'),
      link: "https://loveread.me/book-comments.php?book=45769",
      description: t('library.books.thinkingFast.description'),
      cover: "/images/dumai_medlenno.jpg"
    },
    {
      title: t('library.books.nudge.title'),
      author: t('library.books.nudge.author'),
      link: "https://loveread.me/read_book.php?id=68424&p=1",
      description: t('library.books.nudge.description'),
      cover: "/images/nudge.jpg"
    },
    {
      title: t('library.books.elonMusk.title'),
      author: t('library.books.elonMusk.author'),
      link: "https://libcat.ru/knigi/starinnaya-literatura/95744-eshli-vens-ilon-mask-tesla-spacex-i-doroga-v-budushhee.html",
      description: t('library.books.elonMusk.description'),
      cover: "/images/ilon_mask.jpg"
    },
    {
      title: t('library.books.nike.title'),
      author: t('library.books.nike.author'),
      link: "https://loveread.me/read_book.php?id=66592&p=1",
      description: t('library.books.nike.description'),
      cover: "/images/nike.jpg"
    },
    {
      title: t('library.books.zeroToOne.title'),
      author: t('library.books.zeroToOne.author'),
      link: "https://loveread.me/book-comments.php?book=66165",
      description: t('library.books.zeroToOne.description'),
      cover: "/images/ot_nulya.jpg"
    },
    {
      title: t('library.books.leanStartup.title'),
      author: t('library.books.leanStartup.author'),
      link: "https://loveread.me/book-comments.php?book=66637",
      description: t('library.books.leanStartup.description'),
      cover: "/images/biznes.jpg"
    },
    {
      title: t('library.books.goodStrategy.title'),
      author: t('library.books.goodStrategy.author'),
      link: "https://loveread.me/book-comments.php?book=66258",
      description: t('library.books.goodStrategy.description'),
      cover: "/images/horoshya.png"
    },
    {
      title: t('library.books.thinkAndGrow.title'),
      author: t('library.books.thinkAndGrow.author'),
      link: "https://loveread.me/read_book.php?id=9064&p=1",
      description: t('library.books.thinkAndGrow.description'),
      cover: "/images/dumai_i_bog.jpg"
    }
  ];

  // Сервисы библиотеки с переводами
  const libraryServices = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      title: t('library.services.digitalResources'),
      image: "/images/block1.png"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
        </svg>
      ),
      title: t('library.services.studySpaces'),
      image: "/images/block2.png"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
        </svg>
      ),
      title: t('library.services.researchSupport'),
      image: "/images/block3.png"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      ),
      title: t('library.services.databases'),
      image: "/images/block2.png"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/libra.png" 
            alt={t('library.title')} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative h-full flex items-end justify-center pb-20">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t('library.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              {t('library.subtitle')}
            </p>
            <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('library.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* First Block - Full Image */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-80">
                <img 
                  src="/images/block1.png" 
                  alt={t('library.services.digitalResources')}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Second Block - Text and Icon */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-[#991E1E] mb-6 flex justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {t('library.services.digitalResources')}
                </h3>
              </div>
            </div>

            {/* Third Block - Text and Icon */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-[#991E1E] mb-6 flex justify-center">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {t('library.services.studySpaces')}
                </h3>
              </div>
            </div>

            {/* Fourth Block - Image and Text */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48">
                <img 
                  src="/images/block3.png" 
                  alt={t('library.services.researchSupport')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                  {t('library.services.researchSupport')}
                </h3>
              </div>
            </div>

            {/* Fifth Block - Image and Text */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48">
                <img 
                  src="/images/block2.png" 
                  alt={t('library.services.databases')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                  {t('library.services.databases')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Quote Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Block - Description */}
            <div>
              <p className="text-2xl text-gray-800 leading-relaxed font-medium">
                {t('library.aboutTitle')} {t('library.trainingSessions')} {t('library.trainingSessionsDesc')}
              </p>
            </div>

            {/* Right Block - Quote Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 relative">
              {/* Quote Navigation */}
              <div className="flex gap-4 mb-4">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`text-sm font-semibold transition-colors ${
                      currentQuote === index 
                        ? 'text-[#991E1E] underline' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Quote Mark */}
              <div className="text-[#991E1E] text-5xl font-bold mb-4">"</div>

              {/* Quote Text with Animation */}
              <div className="relative h-24 mb-6 overflow-hidden">
                {quotes.map((quote, index) => (
                  <blockquote 
                    key={index}
                    className={`text-lg text-gray-800 leading-relaxed absolute w-full transition-all duration-500 ease-in-out ${
                      currentQuote === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    {quote.text}
                  </blockquote>
                ))}
              </div>

              {/* Author Info with Animation */}
              <div className="relative h-12 overflow-hidden">
                {quotes.map((quote, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 absolute w-full transition-all duration-500 ease-in-out ${
                      currentQuote === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={quote.image} 
                        alt={quote.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[#991E1E] text-base uppercase">
                        {quote.author}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {quote.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book Recommendations Section */}
      <div className="py-20 bg-red-900">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {t('library.books.title')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t('library.recommendationsTitle')}
            </h2>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendedBooks.map((book, index) => (
              <div key={index} className="text-center">
                {/* Book Cover */}
                <div className="w-full h-112 rounded-lg mb-4 overflow-hidden shadow-lg">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Book Info */}
                <h3 className="text-white font-semibold text-lg mb-2 leading-tight">
                  {book.title}
                </h3>
                <p className="text-red-200 text-sm mb-4">
                  {book.author}
                </p>
                <p className="text-red-100 text-xs mb-4 leading-relaxed">
                  {book.description}
                </p>
                
                {/* Link to Book */}
                <a 
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  {t('library.books.readOnline')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Library; 