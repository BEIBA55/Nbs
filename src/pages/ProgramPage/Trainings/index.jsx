import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import PresentationModal from '../../../components/ui/PresentationModal';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

const Trainings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    privacyConsent: false
  });

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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.TRAININGS);
      
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

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации тренингов
    const link = document.createElement('a');
    link.href = '/presentations/trainings-presentation.pdf';
    link.download = 'Trainings-Presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactClick = () => {
    setShowContactInfo(true);
  };

  const handleRegisterTraining = (trainingTitle) => {
    // Перенаправляем на страницу ивентов с параметром для открытия модального окна регистрации
    navigate('/events', { 
      state: { 
        openRegistration: true, 
        trainingTitle: trainingTitle 
      } 
    });
  };

  // Функция для фильтрации будущих ивентов
  const getUpcomingTrainings = () => {
    const allTrainings = t('trainings.scheduleSection.trainings', { returnObjects: true });
    const today = new Date();
    
    return allTrainings.filter(training => {
      // Парсим дату из строки (например, "15 июля 2025")
      const dateStr = training.date;
      let eventDate;
      
      // Простой парсинг для русских дат
      if (dateStr.includes('июля')) {
        const day = parseInt(dateStr.split(' ')[0]);
        eventDate = new Date(2025, 6, day); // июль = 6 (0-indexed)
      } else if (dateStr.includes('августа')) {
        const day = parseInt(dateStr.split(' ')[0]);
        eventDate = new Date(2025, 7, day); // август = 7 (0-indexed)
      } else if (dateStr.includes('July')) {
        const day = parseInt(dateStr.split(' ')[1].replace(',', ''));
        eventDate = new Date(2025, 6, day);
      } else if (dateStr.includes('August')) {
        const day = parseInt(dateStr.split(' ')[1].replace(',', ''));
        eventDate = new Date(2025, 7, day);
      } else if (dateStr.includes('шілдесі')) {
        const day = parseInt(dateStr.split(' ')[0]);
        eventDate = new Date(2025, 6, day);
      } else if (dateStr.includes('тамызы')) {
        const day = parseInt(dateStr.split(' ')[0]);
        eventDate = new Date(2025, 7, day);
      }
      
      return eventDate && eventDate >= today;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <img 
          src="/images/Тренинги/Hiro.jpg" 
          alt="Тренинги Narxoz Business School" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-3 sm:px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('trainings.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 opacity-90">
            {t('trainings.hero.subtitle')}
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
              <div className="font-semibold text-sm sm:text-base md:text-lg">{t('trainings.hero.downloadButton')}</div>
              <div className="text-xs sm:text-sm opacity-90 uppercase">
                {t('trainings.hero.catalogInfo')}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Photo and What is Trainings Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Photo Section */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden w-full max-w-6xl mx-auto">
              <img 
                src="/images/Тренинги/bloc.jpg" 
                alt="Тренинги Narxoz Business School - Бизнес-тренинг" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* What is Trainings Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Column - Headline and Button */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                <span className="text-[#E94848]">{t('trainings.whatIsSection.title')}</span><br />
                <span className="text-[#991E1E]">{t('trainings.whatIsSection.titleHighlight')}</span>
              </h2>
              <div className="pt-6 sm:pt-8 md:pt-12">
                <button
                  onClick={handleContactClick}
                  className="bg-[#991E1E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base"
                >
                  {t('trainings.whatIsSection.contactButton')}
                </button>
              </div>
            </div>
            
            {/* Right Column - Body Text */}
            <div className="order-1 lg:order-2 text-[#6E767D] text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4">
              <p className="leading-6 sm:leading-7 md:leading-8">
                {t('trainings.whatIsSection.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E]">
              {t('trainings.scheduleSection.title')}
            </h2>
          </div>

          {/* Trainings Grid */}
          {(() => {
            const upcomingTrainings = getUpcomingTrainings();
            
            if (upcomingTrainings.length === 0) {
              return (
                <div className="text-center py-12 sm:py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-600 mb-3 sm:mb-4">
                      {t('trainings.scheduleSection.noEventsTitle')}
                    </h3>
                    <p className="text-gray-500 text-base sm:text-lg">
                      {t('trainings.scheduleSection.noEventsDescription')}
                    </p>
                  </div>
                </div>
              );
            }
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {upcomingTrainings.map((training, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                {/* Training Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[#991E1E] mb-3 sm:mb-4">
                  {training.title}
                </h3>
                
                {/* Training Details */}
                <div className="space-y-2 sm:space-y-3 flex-grow">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 bg-[#E94848] rounded-full"></div>
                    <span className="text-gray-600 font-medium text-sm sm:text-base">{training.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 bg-[#E94848] rounded-full"></div>
                    <span className="text-gray-600 text-sm sm:text-base">{training.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 bg-[#E94848] rounded-full"></div>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      training.format === 'Онлайн' || training.format === 'Online' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {training.format}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 bg-[#E94848] rounded-full"></div>
                    <span className="text-gray-600 text-xs sm:text-sm">{training.speaker}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-2 h-2 bg-[#E94848] rounded-full"></div>
                    <span className="text-gray-600 text-xs sm:text-sm">{training.location}</span>
                  </div>
                </div>
                
                {/* Register Button */}
                <button 
                  onClick={() => handleRegisterTraining(training.title)}
                  className="w-full mt-4 sm:mt-6 bg-[#991E1E] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-full font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base"
                >
                  {t('trainings.scheduleSection.registerButton')}
                </button>
              </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Contact Section - Форма заявки - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-4 sm:mb-6">
              {t('trainings.applicationFormSection.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-xl max-w-3xl mx-auto">
              {t('trainings.applicationFormSection.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('trainings.applicationFormSection.form.name')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('trainings.applicationFormSection.form.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('trainings.applicationFormSection.form.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('trainings.applicationFormSection.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('trainings.applicationFormSection.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('trainings.applicationFormSection.form.phonePlaceholder')}
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
                    {t('trainings.applicationFormSection.form.privacyAgreement')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base md:text-lg"
                >
                  {t('trainings.applicationFormSection.form.submitButton')}
                </button>
              </form>

              {/* Contact Information */}
              <div className="mt-8 sm:mt-10 md:mt-12 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-[#991E1E] mb-4 sm:mb-6">
                  {t('trainings.applicationFormSection.contactTitle')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{t('trainings.contactInfo.phone')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('trainings.contactInfo.phoneNumber')}</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">{t('trainings.contactInfo.email')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('trainings.contactInfo.emailAddress')}</p>
                  </div>
                  <div>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{t('trainings.contactInfo.address')}</h4>
                    <p className="text-gray-600 text-sm sm:text-base">{t('trainings.contactInfo.addressValue')}</p>
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
                {t('trainings.contactInfo.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('trainings.contactInfo.phone')}</p>
                    <p className="text-gray-600">{t('trainings.contactInfo.phoneNumber')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('trainings.contactInfo.email')}</p>
                    <p className="text-gray-600">{t('trainings.contactInfo.emailAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('trainings.contactInfo.address')}</p>
                    <p className="text-gray-600">{t('trainings.contactInfo.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('trainings.contactInfo.close')}
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
        programName={t('trainings.modalProgramName')}
        programType={PROGRAM_TYPES.TRAININGS}
      />
    </div>
  );
};

export default Trainings;
