import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import PresentationModal from '../../../components/ui/PresentationModal';
import { useToast } from '../../../hooks/useToast';

const ExecutiveMBACIO = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess } = useToast();
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showPresentationModal, setShowPresentationModal] = useState(false);

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации Executive MBA для CIO
    const link = document.createElement('a');
    link.href = '/presentations/executive-mba-cio-presentation.pdf';
    link.download = 'Executive-MBA-CIO-Presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    setShowContactInfo(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-20">
        {/* Background Image */}
        <img 
          src="/images/ExecutiveCIO/hiro.png" 
          alt="Executive MBA для CIO - Выпускники" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-8 max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('executiveMbaCio.hero.title')}
          </h1>
          <p className="text-2xl lg:text-2xl font-medium mb-8 opacity-90">
            {t('executiveMbaCio.hero.subtitle')}
          </p>
          
          {/* Download Button */}
          <button
            onClick={() => setShowPresentationModal(true)}
            className="bg-[#991E1E] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-full transition-all duration-300 flex items-center justify-center mx-auto space-x-3 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold text-lg">{t('executiveMbaCio.hero.downloadButton')}</div>
              <div className="text-sm opacity-90 uppercase">
                {t('executiveMbaCio.hero.catalogInfo')}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* What is Executive MBA for CIO Section */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Headline and Button */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-normal leading-tight">
                <span className="text-[#E94848]">{t('executiveMbaCio.whatIsSection.title')}</span><br />
                <span className="text-[#991E1E]">{t('executiveMbaCio.whatIsSection.titleHighlight')}</span>
              </h2>
              <div className="pt-12">
                <button
                  onClick={handleContactClick}
                  className="bg-[#991E1E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors"
                >
                  {t('executiveMbaCio.whatIsSection.contactButton')}
                </button>
              </div>
            </div>
            
            {/* Right Column - Body Text */}
            <div className="text-[#6E767D] text-lg leading-relaxed space-y-4">
              <p className="leading-8">
                {t('executiveMbaCio.whatIsSection.description')}
              </p>
            </div>
          </div>
          
          {/* Photo with rounded corners */}
          <div className="mt-16 text-center">
            <div className="rounded-3xl overflow-hidden w-full max-w-7xl mx-auto shadow-2xl">
              <img 
                src="/images/ExecutiveCIO/cart.png" 
                alt="Executive MBA для CIO - Бизнес-встреча" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Competencies Section - Три колонки компетенций */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Заголовок и описание */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left side - Title */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-normal leading-tight">
                <span className="text-[#991E1E]">{t('executiveMbaCio.competenciesSection.title')}</span>
                <br />
                <span className="text-[#E94848]">{t('executiveMbaCio.competenciesSection.titleHighlight')}</span>
              </h2>
            </div>
            
            {/* Right side - Description */}
            <div className="text-[#6E767D] text-lg leading-relaxed">
              <p className="leading-8">
                {t('executiveMbaCio.competenciesSection.description')}
              </p>
            </div>
          </div>

          {/* Three Columns - Competencies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1: Individual Competencies */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Icon */}
              <div className="mb-6">
                <img 
                  src="/icons/1bloc.png"
                  alt="Individual Competencies"
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-normal text-[#E94848] mb-6">
                {t('executiveMbaCio.competenciesSection.individualCompetencies.title')}
              </h3>
              
              {/* Bullet points */}
              <ul className="space-y-3 text-[#6E767D] text-sm leading-relaxed">
                {t('executiveMbaCio.competenciesSection.individualCompetencies.items', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-[#6E767D] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: IT Department Competencies */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Icon */}
              <div className="mb-6">
                <img 
                  src="/icons/2bloc.png"
                  alt="IT Department Competencies"
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-normal text-[#E94848] mb-6">
                {t('executiveMbaCio.competenciesSection.itDepartmentCompetencies.title')}
              </h3>
              
              {/* Bullet points */}
              <ul className="space-y-3 text-[#6E767D] text-sm leading-relaxed">
                {t('executiveMbaCio.competenciesSection.itDepartmentCompetencies.items', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-[#6E767D] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Business-Organizational Competencies */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Icon */}
              <div className="mb-6">
                <img 
                  src="/icons/3bloc.png"
                  alt="Business-Organizational Competencies"
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-normal text-[#E94848] mb-6">
                {t('executiveMbaCio.competenciesSection.businessOrganizationalCompetencies.title')}
              </h3>
              
              {/* Bullet points */}
              <ul className="space-y-3 text-[#6E767D] text-sm leading-relaxed">
                {t('executiveMbaCio.competenciesSection.businessOrganizationalCompetencies.items', { returnObjects: true }).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-[#6E767D] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Program Structure Section - Структура программы */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          {/* Top Banner */}
          <div className="text-center mb-6">
            <div className="inline-block bg-[#F9FAFB] border border-[#991E1E] rounded-full px-6 py-2">
              <span className="text-[#991E1E] text-sm font-medium">
                {t('executiveMbaCio.programStructureSection.banner')}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#991E1E] mb-6">{t('executiveMbaCio.programStructureSection.title')}</h2>
          </div>

          {/* Three Program Blocks */}
          <div className="grid grid-cols-1 gap-8">
            {/* Block 01: Business and Leadership */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="mb-4">
                <span className="text-gray-400 text-sm font-semibold">01</span>
              </div>
              <h3 className="text-2xl font-bold text-[#991E1E] mb-2">{t('executiveMbaCio.programStructureSection.businessLeadership.title')}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t('executiveMbaCio.programStructureSection.businessLeadership.subtitle')}</p>
              <ul className="space-y-2">
                {t('executiveMbaCio.programStructureSection.businessLeadership.courses', { returnObjects: true }).map((course, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="text-[#991E1E] mt-1">•</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Block 02: Technology and Digital Strategy */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="mb-4">
                <span className="text-gray-400 text-sm font-semibold">02</span>
              </div>
              <h3 className="text-2xl font-bold text-[#991E1E] mb-2">{t('executiveMbaCio.programStructureSection.technologyDigitalStrategy.title')}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t('executiveMbaCio.programStructureSection.technologyDigitalStrategy.subtitle')}</p>
              <ul className="space-y-2">
                {t('executiveMbaCio.programStructureSection.technologyDigitalStrategy.courses', { returnObjects: true }).map((course, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="text-[#991E1E] mt-1">•</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Block 03: Practice and Final Projects */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <div className="mb-4">
                <span className="text-gray-400 text-sm font-semibold">03</span>
              </div>
              <h3 className="text-2xl font-bold text-[#991E1E] mb-2">{t('executiveMbaCio.programStructureSection.practiceFinalProjects.title')}</h3>
              <p className="text-gray-600 mb-6 text-sm">{t('executiveMbaCio.programStructureSection.practiceFinalProjects.subtitle')}</p>
              <ul className="space-y-2">
                {t('executiveMbaCio.programStructureSection.practiceFinalProjects.courses', { returnObjects: true }).map((course, index) => (
                  <li key={index} className="text-gray-600 flex items-start gap-2">
                    <span className="text-[#991E1E] mt-1">•</span>
                    <span>{course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Форма заявки */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#991E1E] mb-6">
              {t('executiveMbaCio.applicationFormSection.title')}
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              {t('executiveMbaCio.applicationFormSection.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('executiveMbaCio.applicationFormSection.form.name')} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('executiveMbaCio.applicationFormSection.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('executiveMbaCio.applicationFormSection.form.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('executiveMbaCio.applicationFormSection.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('executiveMbaCio.applicationFormSection.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('executiveMbaCio.applicationFormSection.form.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('executiveMbaCio.applicationFormSection.form.company')} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('executiveMbaCio.applicationFormSection.form.companyPlaceholder')}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 text-[#991E1E] border-gray-300 rounded focus:ring-[#991E1E]"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    {t('executiveMbaCio.applicationFormSection.form.privacyAgreement')}
                  </label>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#991E1E] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-lg"
                >
                  {t('executiveMbaCio.applicationFormSection.form.submitButton')}
                </button>
              </form>

              {/* Contact Information */}
              <div className="mt-12 text-center">
                <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                  {t('executiveMbaCio.applicationFormSection.contactTitle')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('executiveMbaCio.contactInfo.phone')}</h4>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.phoneNumber')}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2">{t('executiveMbaCio.contactInfo.email')}</h4>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.emailAddress')}</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t('executiveMbaCio.contactInfo.address')}</h4>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.addressValue')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Modal */}
      {showContactInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowContactInfo(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('executiveMbaCio.contactInfo.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveMbaCio.contactInfo.phone')}</p>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.phoneNumber')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveMbaCio.contactInfo.email')}</p>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.emailAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveMbaCio.contactInfo.address')}</p>
                    <p className="text-gray-600">{t('executiveMbaCio.contactInfo.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('executiveMbaCio.contactInfo.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <PresentationModal
        isOpen={showPresentationModal}
        onClose={() => setShowPresentationModal(false)}
        onDownload={handleDownloadPresentation}
        programName={t('executiveMbaCio.modalProgramName')}
      />
    </div>
  );
};

export default ExecutiveMBACIO;
