import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import PresentationModal from '../../../components/ui/PresentationModal';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

const MiniMBA = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  
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
  const [showContactInfo, setShowContactInfo] = useState(false);

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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.MINI_MBA);
      
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

  const handleSubmit = async () => {
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    try {
      // Сохраняем данные формы в CSV формате
      const saveResult = await formDataAPI.savePresentationFormData(formData, PROGRAM_TYPES.MINI_MBA);
      
      if (saveResult.success) {
        console.log('Данные формы сохранены:', saveResult.data);
        showApplicationSuccess();
        setFormData({ name: '', email: '', phone: '', company: '' });
      } else {
        console.error('Ошибка при сохранении данных формы');
        showApplicationSuccess(); // Показываем успех пользователю, но логируем ошибку
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных формы:', error);
      showApplicationSuccess(); // Показываем успех пользователю, но логируем ошибку
    }
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации Mini MBA
    const link = document.createElement('a');
    link.href = '/presentations/mini MBA.pdf';
    link.download = 'mini-mba-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <img 
          src="/images/MiniMba/Hiro.jpg" 
          alt={t('miniMba.hero.title')} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-3 sm:px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('miniMba.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 opacity-90">
            {t('miniMba.hero.subtitle')}
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
              <div className="font-semibold text-sm sm:text-base md:text-lg">{t('miniMba.hero.downloadButton')}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Description Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Section - Заголовок и кнопка */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal mb-8 sm:mb-12 md:mb-20 leading-tight">
                <span className="text-[#E94848]">{t('miniMba.descriptionSection.title.part1')}</span>
                <span className="text-[#991E1E]">{t('miniMba.descriptionSection.title.part2')}</span>
              </h2>
              <button 
                onClick={() => setShowContactInfo(true)}
                className="bg-[#991E1E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base"
              >
                {t('miniMba.hero.contactButton')}
              </button>
            </div>

            {/* Right Section - Описание */}
            <div className="order-1 lg:order-2">
              <div className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed space-y-2">
                {t('miniMba.descriptionLines', { returnObjects: true }).map((line, index) => (
                  <p key={index} className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose Section - Для чего mini-MBA? - Enhanced Mobile Optimization */}
      <div className="px-3 sm:px-4 md:px-8">
        <div className="max-w-full mx-auto">
          <div className="bg-[#991E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-left mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
                  {t('miniMba.purposeSection.title')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {t('miniMba.purposeSection.cards', { returnObjects: true }).map((card, index) => (
                  <div 
                    key={index}
                    className="bg-[#F06565] rounded-2xl overflow-hidden relative group hover:shadow-xl transition-all duration-300 w-full h-80 sm:h-88 md:h-96"
                  >
                    {/* Декоративная волнистая форма */}
                    <div className="absolute top-0 left-0 w-full h-24 sm:h-28 md:h-32 bg-[#CD3333] rounded-t-2xl opacity-80"></div>
                    
                    {/* Изображение */}
                    <div className="relative z-10 p-3 sm:p-4">
                      <div className="w-full h-48 sm:h-52 md:h-56 rounded-xl overflow-hidden mb-3 sm:mb-4">
                        <img 
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Заголовок карточки */}
                      <h3 className="text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed text-left">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Section - Инвестируйте в Будущее - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Top Banner */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-gray-50 border border-[#6E767D] rounded-full px-4 sm:px-6 py-1 sm:py-2">
              <span className="text-[#991E1E] text-xs sm:text-sm font-medium">
                {t('miniMba.investmentSection.topBanner')}
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-[#E94848]">{t('miniMba.investmentSection.titlePart1')}</span>
              <br />
              <span className="text-[#C24040]">{t('miniMba.investmentSection.titlePart2')}</span>
            </h2>
          </div>

                    {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {t('miniMba.investmentSection.cards', { returnObjects: true }).map((card, index) => (
                              <div 
                  key={index}
                  className="bg-white rounded-xl sm:rounded-2xl border border-gray-300 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 h-80 sm:h-88 md:h-96 w-full group"
                >
                  {/* Image */}
                  <div className="p-4 sm:p-6 h-full flex flex-col justify-between">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
                      <img 
                        src={`/icons/${index + 1}bloc.png`}
                        alt={`Block ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    {/* Text Box */}
                    <div className="bg-gray-50 rounded-lg p-2 sm:p-3 h-40 sm:h-44 md:h-48 transition-all duration-300 group-hover:bg-gray-100">
                      <p className="text-sm sm:text-base leading-relaxed text-[#991E1E] transition-all duration-300">
                        {card.title}
                      </p>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disciplines Section - Обязательные дисциплины - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('miniMba.disciplines.label')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#E94848]">{t('miniMba.disciplines.title')}</span>
              <span className="text-[#991E1E]">{t('miniMba.disciplines.titleHighlight')}</span>
            </h2>
          </div>

          {/* Сетка дисциплин - 3 ряда */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {t('miniMba.disciplines.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  {/* Левая часть - номер и название */}
                  <div className="flex-1">
                    <div className="text-gray-400 text-xs sm:text-sm mb-2">{discipline.number}</div>
                    <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#991E1E]">{discipline.title}</h3>
                  </div>
                  
                  {/* Правая часть - описание */}
                  <div className="text-left sm:text-right flex items-start sm:items-center w-full sm:w-auto">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{discipline.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Elective Disciplines Section - Дисциплины по выбору - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('miniMba.electiveDisciplines.label')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#991E1E]">{t('miniMba.electiveDisciplines.title')}</span>
              <span className="text-[#E94848]">{t('miniMba.electiveDisciplines.titleHighlight')}</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-3 sm:mt-4">
              {t('miniMba.electiveDisciplines.subtitle')}
            </p>
          </div>

          {/* Сетка дисциплин - 2 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {t('miniMba.electiveDisciplines.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <div className="text-gray-400 text-xs sm:text-sm mb-2">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-normal text-[#991E1E]">{discipline}</h3>
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
              {t('miniMba.contact.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
              {t('miniMba.contact.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('miniMba.forms.name')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('miniMba.forms.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('miniMba.forms.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('miniMba.forms.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('miniMba.forms.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('miniMba.forms.phonePlaceholder')}
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
                    {t('miniMba.forms.privacyAgreement')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base md:text-lg"
                >
                  {t('miniMba.forms.submitApplication')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('miniMba.contact.orContact')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('miniMba.contact.phone')}</h4>
                  <p className="text-gray-600">{t('miniMba.contact.phoneNumber')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('miniMba.contact.email')}</h4>
                  <p className="text-gray-600">{t('miniMba.contact.emailAddress')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('miniMba.contact.address')}</h4>
                  <p className="text-gray-600">{t('miniMba.contact.addressText')}</p>
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
                {t('miniMba.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('miniMba.contactModal.phone')}</p>
                    <p className="text-gray-600">{t('miniMba.contactModal.phoneNumber')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('miniMba.contactModal.email')}</p>
                    <p className="text-gray-600">{t('miniMba.contactModal.emailAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('miniMba.contactModal.address')}</p>
                    <p className="text-gray-600">{t('miniMba.contactModal.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('miniMba.contactModal.close')}
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
        programName={t('miniMba.modalProgramName')}
        programType={PROGRAM_TYPES.MINI_MBA}
      />
    </div>
  );
};

export default MiniMBA;
