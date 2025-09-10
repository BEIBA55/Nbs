import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import PresentationModal from '../../../components/ui/PresentationModal';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { useTranslatedNews } from '../../../data/translatedNewsData';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

const ExecutiveSessions = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  const newsItems = useTranslatedNews();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    privacyConsent: false
  });
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Проверяем, что все поля заполнены
    if (!contactFormData.firstName || !contactFormData.lastName || !contactFormData.email || !contactFormData.phone) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    if (!contactFormData.privacyConsent) {
      alert('Пожалуйста, согласитесь на обработку персональных данных');
      return;
    }

    try {
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_SESSIONS);
      
      if (result.success) {
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        setContactFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          privacyConsent: false
        });
      } else {
        alert('Ошибка при отправке заявки. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при отправке контактной заявки:', error);
      alert('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  };

  const handleSubmit = () => {
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    console.log('Заявка отправлена:', formData);
    showApplicationSuccess();
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации Executive Sessions
    const link = document.createElement('a');
    link.href = '/presentations/EMBA новый (1).pdf';
    link.download = 'executive-sessions-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const testimonials = t('executiveSessions.successStories.testimonials', { returnObjects: true }).map((testimonial, index) => ({
    ...testimonial,
    avatar: `/Reviews/${index + 1}.${index < 4 ? 'png' : index < 6 ? 'jpg' : index === 6 ? 'jpeg' : 'jpg'}`
  }));

  const programTypes = [
    {
      title: t('executiveSessions.programTypes.openPrograms.title'),
      description: t('executiveSessions.programTypes.openPrograms.description'),
      image: "/images/BlockCorp.png",
      icon: null
    },
    {
      title: t('executiveSessions.programTypes.customPrograms.title'),
      description: t('executiveSessions.programTypes.customPrograms.description'),
      image: null,
      icon: "⚙️"
    },
    {
      title: t('executiveSessions.programTypes.corporatePartnership.title'),
      description: t('executiveSessions.programTypes.corporatePartnership.description'),
      image: null,
      icon: "↔️"
    },
    {
      title: "Инновационные решения",
      description: "Современные подходы к Executive Sessions с использованием передовых технологий",
      image: null,
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <img 
          src="/images/TopManHiro.png" 
          alt={t('executiveSessions.hero.title')} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-3 sm:px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('executiveSessions.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 opacity-90">
            {t('executiveSessions.hero.subtitle')}
          </p>
          
          {/* Download Button */}
          <button
            onClick={() => setShowPresentationModal(true)}
            className="bg-[#991E1E] hover:bg-[#B91C1C] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center mx-auto space-x-2 sm:space-x-3 shadow-lg"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold text-sm sm:text-base md:text-lg">{t('executiveSessions.hero.downloadButton')}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Information Cards Section - Enhanced Mobile Optimization */}
      <div className="relative -mt-8 sm:-mt-12 md:-mt-16 px-3 sm:px-4 md:px-8 pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Адаптивная сетка для мобильных */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Block 1 - Изображение */}
            <div className="lg:col-span-2 bg-[#F4F4F4] rounded-xl sm:rounded-2xl p-3 sm:p-4 h-64 sm:h-72 md:h-80">
              <div className="flex justify-center items-center h-full">
                <img 
                  src="/images/BlockCorp.png" 
                  alt="Открытые программы" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Block 2 - Заголовок и описание */}
            <div className="bg-[#F4F4F4] rounded-xl sm:rounded-2xl p-3 sm:p-4 h-64 sm:h-72 md:h-80">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full h-full flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold text-[#991E1E] mb-3 sm:mb-4">
                  {t('executiveSessions.programTypes.openPrograms.title')}
                </h3>
                <p className="text-[#6E767D] text-left text-sm sm:text-base leading-relaxed">
                  {t('executiveSessions.programTypes.openPrograms.description')}
                </p>
              </div>
            </div>

            {/* Block 3 - Иконка пазла */}
            <div className="bg-[#F4F4F4] rounded-xl sm:rounded-2xl p-3 sm:p-4 h-64 sm:h-72 md:h-80">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full h-full flex flex-col justify-start">
                <div className="flex justify-start mb-3 sm:mb-4">
                  <img 
                    src="/icons/puzzle.png" 
                    alt="Программы на заказ" 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#991E1E] mb-3 sm:mb-4">
                  {t('executiveSessions.programTypes.customPrograms.title')}
                </h3>
                <p className="text-[#6E767D] text-left text-sm sm:text-base leading-relaxed">
                  {t('executiveSessions.programTypes.customPrograms.description')}
                </p>
              </div>
            </div>

            {/* Block 4 - Иконка стрелок */}
            <div className="bg-[#F4F4F4] rounded-xl sm:rounded-2xl p-3 sm:p-4 h-64 sm:h-72 md:h-80">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full h-full flex flex-col justify-start">
                <div className="flex justify-start mb-3 sm:mb-4">
                  <img 
                    src="/icons/shooters.png" 
                    alt="Корпоративное сотрудничество" 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#991E1E] mb-3 sm:mb-4">
                  {t('executiveSessions.programTypes.corporatePartnership.title')}
                </h3>
                <p className="text-[#6E767D] text-left text-sm sm:text-base leading-relaxed">
                  {t('executiveSessions.programTypes.corporatePartnership.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Success Stories Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Block - Title */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                <span className="text-[#991E1E]">{t('executiveSessions.successStories.titlePart1')}</span>
                <span className="text-[#E94848]">{t('executiveSessions.successStories.titlePart2')}</span>
                <br />
                <span className="text-[#991E1E]">{t('executiveSessions.successStories.titlePart3')}</span>
              </h2>
              <p className="text-[#6E767D] text-lg sm:text-xl md:text-2xl leading-relaxed mt-4 sm:mt-6">
                {t('executiveSessions.successStories.subtitle')}
              </p>
            </div>

            {/* Right Block - Review Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative order-1 lg:order-2">
              {/* Review Navigation */}
              <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`text-xs sm:text-sm font-semibold transition-colors ${
                      activeTestimonial === index 
                        ? 'text-[#991E1E] underline' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Quote Mark */}
              <div className="text-[#991E1E] text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">"</div>

              {/* Review Text with Animation */}
              <div className="relative h-24 sm:h-28 md:h-32 mb-6 sm:mb-8 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <blockquote 
                    key={index}
                    className={`text-sm sm:text-base md:text-lg text-[#6E767D] leading-relaxed absolute w-full transition-all duration-500 ease-in-out ${
                      activeTestimonial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    {testimonial.text}
                  </blockquote>
                ))}
              </div>

              {/* Author Info with Animation */}
              <div className="relative h-12 sm:h-14 md:h-16 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 sm:gap-4 absolute w-full transition-all duration-500 ease-in-out ${
                      activeTestimonial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-[#E94848] text-base sm:text-lg">
                        {testimonial.author}
                      </div>
                      <div className="text-[#6E767D] text-sm sm:text-base">
                        {testimonial.position}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* News Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-8xl mx-auto px-12">
        <div className="flex justify-between items-center mb-12 slide-in-up">
          <h2 className="text-[#991E1E] text-5xl font-normal">{t('homepage.sections.news')}</h2>
          <Link
            to="/news"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-muted text-lg group-hover:text-red-600 transition-colors">{t('homepage.sections.viewAllNews')}</span>
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
                    <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                      {t(`news.${news.category}`)}
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
                  <span>{t('common.readMore', 'Читать далее')}</span>
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
      </div>

      {/* Contact Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-4 sm:mb-6">
              {t('executiveSessions.contact.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
              {t('executiveSessions.contact.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveSessions.forms.name')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveSessions.forms.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveSessions.forms.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveSessions.forms.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveSessions.forms.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveSessions.forms.phonePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={(e) => handleContactInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder="Введите вашу фамилию"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={contactFormData.privacyConsent}
                    onChange={(e) => handleContactInputChange('privacyConsent', e.target.checked)}
                    required
                    className="w-4 h-4 text-[#991E1E] border-gray-300 rounded focus:ring-[#991E1E] mt-1"
                  />
                  <label className="ml-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {t('executiveSessions.forms.privacyAgreement')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base md:text-lg"
                >
                  {t('executiveSessions.forms.submitApplication')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('executiveSessions.contact.orContact')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveSessions.contact.phone')}</h4>
                  <p className="text-gray-600">{t('executiveSessions.contact.phoneNumber')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveSessions.contact.email')}</h4>
                  <p className="text-gray-600">{t('executiveSessions.contact.emailAddress')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveSessions.contact.address')}</h4>
                  <p className="text-gray-600">{t('executiveSessions.contact.addressText')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <PresentationModal
        isOpen={showPresentationModal}
        onClose={() => setShowPresentationModal(false)}
        onDownload={handleDownloadPresentation}
        programName={t('executiveSessions.modalProgramName')}
        programType={PROGRAM_TYPES.EXECUTIVE_SESSIONS}
      />
    </div>
  );
};

export default ExecutiveSessions;
