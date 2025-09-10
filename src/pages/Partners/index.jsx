import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ContactModal from '../../components/ui/ContactModal';

const Partners = () => {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const trustPartners = [
    { src: '/images/RG_gold.png', name: 'RG Gold', url: 'https://rg-gold.com' },
    { src: '/images/ERG.png', name: 'ERG', url: 'https://www.erg.kz' },
    { src: '/images/Kazz.png', name: 'Kazz', url: 'https://www.kazzinc.com' },
    { src: '/images/Beeline.png', name: 'Beeline', url: 'https://beeline.kz' },
    { src: '/images/Halyk.png', name: 'Halyk Bank', url: 'https://www.halykbank.kz' },
    { src: '/images/forte.png', name: 'Forte', url: 'https://fortebank.com' },
    { src: '/images/alag.png', name: 'Alag', url: 'https://alag.kz' },
    { src: '/images/halyk_save.png', name: 'Halyk Save', url: 'https://www.halyksave.kz' },
    { src: '/images/temir.png', name: 'Temir', url: 'https://temirbank.kz' },
    { src: '/images/kaztele.png', name: 'Kaztele', url: 'https://www.kaztele.kz' },
    { src: '/images/img_image_14.png', name: 'Penn State Smeal', url: 'https://www.smeal.psu.edu' },
    {
      src: '/images/img_image_15.png',
      name: 'British Chamber of Commerce in Kazakhstan',
      url: 'https://www.bcck.kz',
    },
    { src: '/images/img_image_16.png', name: 'ESMT Berlin', url: 'https://www.esmt.org' },
    {
      src: '/images/img_image_17.png',
      name: 'Skills Development Scotland',
      url: 'https://www.skillsdevelopmentscotland.co.uk',
    },
    { src: '/images/img_image_18.png', name: 'Hult ExEd', url: 'https://www.hult.edu/en/exed' },
    { src: '/images/img_image_19.png', name: 'CUD', url: 'https://www.cud.ac.ae' },
    {
      src: '/images/img_image_21.png',
      name: 'Abertay University',
      url: 'https://www.abertay.ac.uk',
    },
    {
      src: '/images/img_image_22.png',
      name: 'Zurich Elite Business School',
      url: 'https://www.zebs.ch',
    },
    {
      src: '/images/img_image_23.png',
      name: 'Birmingham University',
      url: 'https://www.birmingham.ac.uk',
    },
    {
      src: '/images/img_image_24.png',
      name: 'International University of Monaco',
      url: 'https://www.monaco.edu',
    },
    { src: '/images/img_image_25.png', name: 'AmCham', url: 'https://www.amcham.kz' },
    { src: '/images/img_image_26.png', name: 'СберУниверситет', url: 'https://sberuniversity.ru' },
    { src: '/images/img_image_27.png', name: 'SBS Business School', url: 'https://www.sbs.edu' },
    { src: '/images/img_image_28.png', name: 'ESSCA', url: 'https://www.essca.fr' },
  ];

  // Группируем партнеров по категориям
  const corporatePartners = trustPartners.slice(0, 10); // Корпоративные партнеры
  const academicPartners = trustPartners.slice(10); // Академические партнеры

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-red-50 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 slide-in-up">
            {t('partners.title')}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed slide-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {t('partners.subtitle')}
          </p>
        </div>
      </div>

      {/* Corporate Partners Section - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 slide-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('partners.corporatePartners.title')}</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('partners.corporatePartners.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
          {corporatePartners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white h-24 sm:h-28 md:h-32 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-2 sm:p-3 md:p-4 group transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="max-h-16 sm:max-h-18 md:max-h-20 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                title={partner.name}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Academic Partners Section - Enhanced Mobile Optimization */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 slide-in-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('partners.academicPartners.title')}</h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('partners.academicPartners.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {academicPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white h-24 sm:h-28 md:h-32 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center p-2 sm:p-3 md:p-4 group transform hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-16 sm:max-h-18 md:max-h-20 max-w-full object-contain transition-all duration-300 group-hover:scale-110"
                  title={partner.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Partnership Benefits Section - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 slide-in-up">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('partners.benefits.title')}</h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('partners.benefits.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center slide-in-left">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="#991E1E" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('partners.benefits.internationalExperience.title')}</h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('partners.benefits.internationalExperience.description')}
            </p>
          </div>

          <div className="text-center slide-in-up">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="#991E1E" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('partners.benefits.careerOpportunities.title')}</h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('partners.benefits.careerOpportunities.description')}
            </p>
          </div>

          <div className="text-center slide-in-right">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="#991E1E" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('partners.benefits.innovativeProjects.title')}</h4>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('partners.benefits.innovativeProjects.description')}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced Mobile Optimization */}
      <div className="bg-[#991E1E] py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 slide-in-up">
            {t('partners.cta.title')}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-red-100 mb-6 sm:mb-8 slide-in-up" style={{ animationDelay: '0.2s' }}>
            {t('partners.cta.subtitle')}
          </p>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-white text-[#991E1E] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 slide-in-up text-sm sm:text-base w-full sm:w-auto"
            style={{ animationDelay: '0.4s' }}
          >
            {t('partners.cta.button')}
          </button>
        </div>
      </div>

      <Footer />
      
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
};

export default Partners;
