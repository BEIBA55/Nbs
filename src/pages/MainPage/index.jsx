import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import EditText from '../../components/ui/EditText';
import Button from '../../components/ui/Button';
import RankingSection from '../Homepage/RankingSection';
import { useToast } from '../../hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useFormAnimation } from '../../hooks/useFormAnimation';
import { useTranslatedNews } from '../../data/translatedNewsData';

const MainPage = () => {
  const { t } = useTranslation();
  const { showConsultationSuccess, showContactSuccess } = useToast();
  const { validateConsultationForm, validateContactForm, showValidationErrors } = useFormValidation();
  const { isSubmitting, startSubmission, endSubmission, getButtonClasses, getButtonText } = useFormAnimation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactInputChange = (field, value) => {
    setContactFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConsultationSubmit = () => {
    if (isSubmitting) return;
    
    const errors = validateConsultationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    startSubmission();
    
    console.log('Consultation form submitted:', formData);
    showConsultationSuccess();
    setFormData({ name: '', phone: '', email: '' });
    endSubmission();
  };

  const handleContactSubmit = () => {
    if (isSubmitting) return;
    
    const errors = validateContactForm(contactFormData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    startSubmission();
    
    console.log('Contact form submitted:', contactFormData);
    showContactSuccess();
    setContactFormData({ name: '', email: '', phone: '' });
    endSubmission();
  };

  // Используем переведенные новости
  const newsItems = useTranslatedNews();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Video Section */}
      <div className="relative h-screen min-h-[600px] lg:min-h-[700px] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content - Mobile Optimized */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 flex flex-col items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg text-center animate-fade-in-up">
            NARKOZ Business School
          </h1>
        </div>

        {/* Call to Action Form - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-8 lg:bottom-20 left-0 right-0 z-10 flex flex-col items-center w-full px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-4 sm:mb-6 drop-shadow-lg text-center animate-fade-in-up">
            {t('main.hero.subtitle')}
          </h2>
          <form
            className="flex flex-col gap-3 sm:gap-2 w-full max-w-4xl mx-auto lg:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleConsultationSubmit();
            }}
          >
            <input
              type="text"
              placeholder={t('forms.namePlaceholder')}
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[44px] sm:h-[42px] px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:ring-opacity-50"
            />
            <input
              type="email"
              placeholder={t('forms.emailPlaceholder')}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[44px] sm:h-[42px] px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:ring-opacity-50"
            />
            <input
              type="tel"
              placeholder={t('forms.phonePlaceholder')}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[44px] sm:h-[42px] px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#991E1E] focus:ring-opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={getButtonClasses("flex-1 lg:flex-none lg:min-w-[200px] bg-[#991E1E] text-white px-4 py-2 font-medium rounded-md shadow-sm hover:bg-[#7a1818] active:bg-[#660c0c] transition-colors flex items-center justify-center h-[44px] sm:h-[42px] text-sm sm:text-base touch-manipulation")}
            >
              {getButtonText(t('main.hero.consultationTitle'))}
            </button>
          </form>
        </div>
      </div>

      {/* Main Content - Mobile Optimized */}
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <div className="animate-fade-in-up">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {t('main.intro.title')}
                </h2>
                
                <div className="prose prose-lg sm:prose-xl text-gray-600 leading-relaxed space-y-6">
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 border-l-4 border-[#991E1E] pl-6 bg-gradient-to-r from-red-50 to-transparent py-4">
                    {t('main.intro.description')}
                  </p>
                  
                  <div className="space-y-6">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {t('main.intro.details.paragraph1')}
                    </p>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {t('main.intro.details.paragraph2')}
                    </p>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                      {t('main.intro.details.paragraph3')}
                    </p>
                  </div>

                  {/* Секция с языками обучения */}
                  <div className="mt-8 p-8 bg-white rounded-xl border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                      <svg className="w-5 h-5 text-[#991E1E] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.674c-.29.516-.6.988-.882 1.326C6.538 13.828 6.14 14 6 14a1 1 0 01-.707-1.707l.707-.707A1 1 0 016 12c.14 0 .538-.172.774-.326.282-.338.592-.81.882-1.326A18.87 18.87 0 009.578 6H12a1 1 0 110-2H8V3a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      {t('main.sidebar.languages.title')}
                    </h3>
                    <p className="text-gray-600 mb-6 text-sm">
                      {t('main.sidebar.languages.description')}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#991E1E] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-sm">Қ</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{t('main.sidebar.languages.kazakh.title')}</h4>
                          <p className="text-xs text-gray-500">{t('main.sidebar.languages.kazakh.description')}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#991E1E] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-sm">Р</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{t('main.sidebar.languages.russian.title')}</h4>
                          <p className="text-xs text-gray-500">{t('main.sidebar.languages.russian.description')}</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-[#991E1E] rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-medium text-sm">E</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{t('main.sidebar.languages.english.title')}</h4>
                          <p className="text-xs text-gray-500">{t('main.sidebar.languages.english.description')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Mobile Optimized */}
            <div className="space-y-6 lg:space-y-8">
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 animate-fade-in-up">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('main.sidebar.quickInfo')}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      {t('main.sidebar.phone')}
                    </h4>
                    <a
                      href="tel:+77767083636"
                      className="text-[#991E1E] hover:text-[#7a1818] transition-colors text-sm sm:text-base"
                    >
                      +7 776 708 3636
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      {t('main.sidebar.email')}
                    </h4>
                    <a
                      href="mailto:gsb@narxoz.kz"
                      className="text-[#991E1E] hover:text-[#7a1818] transition-colors text-sm sm:text-base"
                    >
                      gsb@narxoz.kz
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                      {t('main.sidebar.address')}
                    </h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {t('main.sidebar.addressValue')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#991E1E] rounded-xl p-6 sm:p-8 lg:p-12 text-white text-center animate-fade-in-up">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
                  {t('main.sidebar.quote.title')}
                </h3>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 italic">
                  {t('main.sidebar.quote.text')}
                </p>
                <div className="text-xs sm:text-sm opacity-75">
                  {t('main.sidebar.quote.author')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Video Section */}
      <div className="py-12 px-8 max-w-7xl mx-auto mb-12">
        <div className="relative fade-in">
          {/* YouTube Video */}
          <div
            className="relative w-full overflow-hidden rounded-lg shadow-lg"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/yDw56s7ni04?rel=0&modestbranding=1&showinfo=0"
              title="Marina Obraztsova - Director NARKOZ Business School"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Why Choose Us Section */}
      <div className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-gray-900 text-4xl font-bold mb-6 slide-in-up">
              {t('main.whyChooseUs.title')}
            </h2>
            <div className="w-24 h-1 bg-[#991E1E] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Международное признание */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.internationalRecognition.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.internationalRecognition.description')}
              </p>
            </div>

            {/* Современные подходы */}
            <div
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.modernApproaches.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.modernApproaches.description')}
              </p>
            </div>

            {/* Преподаватели-практики */}
            <div
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.practitionerFaculty.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.practitionerFaculty.description')}
              </p>
            </div>

            {/* Гибкие форматы */}
            <div
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.flexibleFormats.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.flexibleFormats.description')}
              </p>
            </div>

            {/* Карьерная поддержка */}
            <div
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.careerSupport.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.careerSupport.description')}
              </p>
            </div>

            {/* Студенческая активность */}
            <div
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 slide-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#991E1E]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('main.whyChooseUs.studentActivity.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('main.whyChooseUs.studentActivity.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* Ranking Section */}
      <RankingSection />

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>

      {/* News Section */}
      <div className="py-16 px-12 max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12 slide-in-up">
          <h2 className="text-dark text-4xl font-bold">{t('homepage.sections.news')}</h2>
          <Link
            to="/news"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-muted text-lg group-hover:text-red-600 transition-colors">{t('main.news.viewAllNews')}</span>
            <img src="/images/img_group_21_blue_gray_100.svg" alt="Arrow" className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.slice(0, 4).map((news, index) => (
            <div
              key={news.id}
              className="slide-in-up hover-scale smooth-animate bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 min-h-[500px] flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <Link to={`/news/${news.id}`} className="block flex-shrink-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Date Badge */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    {news.date}
                  </div>
                  
                  {/* Category Badge */}
                  {news.category && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {t(`main.news.categories.${news.category}`)}
                    </div>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <Link to={`/news/${news.id}`} className="block">
                  <h3 className="text-dark text-xl font-bold mb-4 leading-tight line-clamp-2 group-hover:text-red-800 transition-colors duration-300">
                    {news.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="text-muted text-base leading-relaxed line-clamp-4 mb-4 flex-1">
                  {news.description}
                </p>

                {/* Tags */}
                {news.tags && news.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Read More Link */}
                <Link 
                  to={`/news/${news.id}`}
                  className="flex items-center text-red-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-auto"
                >
                  <span>{t('main.news.readMore')}</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200"></div>



      {/* Contact Form Section */}
      <div className="bg-primary py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="slide-in-left">
            <h2 className="text-white text-4xl font-bold mb-6">{t('homepage.contactForm.title')}</h2>
            <p className="text-white text-lg leading-relaxed">
              {t('homepage.contactForm.description')}
            </p>
          </div>

          <div className="space-y-4 slide-in-right">
            <EditText
              placeholder={t('homepage.contactForm.namePlaceholder')}
              value={contactFormData.name}
              onChange={(value) => handleContactInputChange('name', value)}
              className="h-[38px]"
            />
            <EditText
              placeholder={t('homepage.contactForm.emailPlaceholder')}
              value={contactFormData.email}
              onChange={(value) => handleContactInputChange('email', value)}
              className="h-[38px]"
            />
            <EditText
              placeholder={t('homepage.contactForm.phonePlaceholder')}
              value={contactFormData.phone}
              onChange={(value) => handleContactInputChange('phone', value)}
              className="h-[38px]"
            />
            <Button
              onClick={handleContactSubmit}
              disabled={isSubmitting}
              className={getButtonClasses("w-full bg-[#991E1E] text-white py-0 font-medium hover:bg-[#7a1818] transition-colors h-[38px] flex items-center justify-center")}
            >
              {getButtonText(t('homepage.contactForm.submitButton'))}
            </Button>
            <p className="text-white text-sm text-center leading-relaxed">
              {t('homepage.contactForm.privacyText')}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
