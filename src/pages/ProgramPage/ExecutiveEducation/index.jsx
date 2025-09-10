import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import PresentationModal from '../../../components/ui/PresentationModal';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

const ExecutiveEducation = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess, showMultipleValidationErrors } = useToast();
  const { validateApplicationForm } = useFormValidation();
  
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    0: 0, 1: 0, 2: 0, 3: 0
  });
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isStatsVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const stats = [25, 5000, 30, 95];
      const intervals = stats.map((target, index) => {
        const increment = target / steps;
        let current = 0;

        return setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(intervals[index]);
          }

          setAnimatedNumbers((prev) => ({
            ...prev,
            [index]: Math.floor(current),
          }));
        }, stepDuration);
      });

      return () => intervals.forEach((interval) => clearInterval(interval));
    }
  }, [isStatsVisible]);

  const handleDownloadBrochure = () => {
    setShowPresentationModal(true);
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации Executive Education
    const link = document.createElement('a');
    link.href = '/presentations/probono-presentation.pdf';
    link.download = 'Executive-Education-Presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_EDUCATION);
      
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
      showMultipleValidationErrors(errors);
      return;
    }
    
    console.log('Заявка отправлена:', formData);
    showApplicationSuccess();
    setFormData({ name: '', email: '', phone: '', company: '' });
  };

  const handleNewsClick = (url) => {
    window.open(url, '_blank');
  };

  const handleContactClick = () => {
    setShowContactInfo(true);
  };

  const handleProgramClick = (programType) => {
    console.log(`Переход к программам: ${programType}`);
    // Здесь можно добавить навигацию к конкретным программам
    alert(`Переход к программам: ${programType}`);
  };

  const handleCourseSearch = () => {
    console.log('Поиск курсов');
    // Здесь можно добавить модальное окно поиска или переход на страницу поиска
    alert('Функция поиска курсов будет доступна в ближайшее время');
  };

  const handleViewCourses = (category) => {
    console.log(`Просмотр курсов категории: ${category}`);
    // Здесь можно добавить навигацию к курсам конкретной категории
    alert(`Переход к курсам: ${category}`);
  };

  const handleLearnMore = (type) => {
    console.log(`Узнать больше о: ${type}`);
    // Здесь можно добавить навигацию к подробной информации
    alert(`Подробная информация о: ${type}`);
  };

  const scrollToProgramCategories = () => {
    const programCategoriesSection = document.getElementById('program-categories-section');
    if (programCategoriesSection) {
      programCategoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToCorporateClients = () => {
    window.location.href = '/corporate-clients';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <img 
          src="/images/HeroExEu.jpg" 
          alt={t('executiveEducation.hero.imageAlt')} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-3 sm:px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('executiveEducation.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 opacity-90">
            {t('executiveEducation.hero.subtitle')}
          </p>
          
          {/* Download Button */}
          <button
            onClick={handleDownloadBrochure}
            className="bg-[#991E1E] hover:bg-[#B91C1C] text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 flex items-center justify-center mx-auto space-x-2 sm:space-x-3 shadow-lg"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold text-sm sm:text-base md:text-lg">{t('executiveEducation.hero.downloadButton')}</div>
              <div className="text-xs sm:text-sm opacity-90 uppercase">
                {t('executiveEducation.hero.downloadDescription')}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* New Section - Two Columns - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Left Column - Headline and Button */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                <span className="text-[#E94848]">{t('executiveEducation.twoColumns.headline.line1')}<br />
                {t('executiveEducation.twoColumns.headline.line2')}</span><br />
                <span className="text-[#991E1E]">{t('executiveEducation.twoColumns.headline.line3')}<br />
                {t('executiveEducation.twoColumns.headline.line4')}</span>
              </h2>
              <button
                onClick={handleContactClick}
                className="bg-[#991E1E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base"
              >
                {t('executiveEducation.twoColumns.contactButton')}
              </button>
            </div>
            
            {/* Right Column - Body Text */}
            <div className="order-1 lg:order-2 text-[#6E767D] text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4">
              <p>
                {t('executiveEducation.twoColumns.description.paragraph1')}
              </p>
              <p>
                {t('executiveEducation.twoColumns.description.paragraph2')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Enhanced Mobile Optimization */}
      <div id="stats-section" className="py-12 sm:py-16 px-3 sm:px-4 md:px-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-2">
                {animatedNumbers[0]}+
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">{t('executiveEducation.stats.experience')}</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-2">
                {animatedNumbers[1]}+
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">{t('executiveEducation.stats.graduates')}</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-2">
                {animatedNumbers[2]}+
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">{t('executiveEducation.stats.countries')}</div>
            </div>
            <div className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-2">
                {animatedNumbers[3]}%
              </div>
              <div className="text-gray-600 font-medium text-sm sm:text-base">{t('executiveEducation.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Cards Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Executive Education Card */}
            <div className="bg-gradient-to-br from-[#991E1E] to-[#B91C1C] rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col h-full relative overflow-hidden">
              {/* Animated color block */}
              <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-[#E94848] rounded-lg blur-xl animate-pulse opacity-80"></div>
              <div className="absolute top-16 sm:top-20 right-6 sm:right-10 w-24 h-24 sm:w-36 sm:h-36 bg-[#E94848] rounded-lg blur-xl animate-pulse opacity-70" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-16 sm:bottom-20 left-1/4 w-40 h-40 sm:w-56 sm:h-56 bg-[#E94848] rounded-lg blur-xl animate-pulse opacity-75" style={{animationDelay: '2s'}}></div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal mb-4 sm:mb-6 leading-tight max-w-md relative z-10">{t('executiveEducation.twoCards.executiveEducation.title')}</h3>
              <p className="text-white mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg relative z-10">
                {t('executiveEducation.twoCards.executiveEducation.description')}
              </p>
              
              <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end relative z-10 gap-4 sm:gap-0">
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-normal mb-2">{t('executiveEducation.twoCards.executiveEducation.statistic')}</div>
                  <div className="text-white text-xs sm:text-sm max-w-xs">
                    {t('executiveEducation.twoCards.executiveEducation.statisticDescription')}
                  </div>
                </div>
                
                <div className="flex items-center cursor-pointer" onClick={scrollToProgramCategories}>
                  <div className="flex items-center border-2 border-white rounded-full px-4 sm:px-6 py-2 bg-white">
                    <span className="text-[#991E1E] font-medium text-xs sm:text-sm">{t('executiveEducation.twoCards.executiveEducation.moreButton')}</span>
                  </div>
                  <div className="flex items-center border-2 border-white rounded-full w-6 h-6 sm:w-8 sm:h-8 ml-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto sm:w-[18px] sm:h-[18px]"
                    >
                      <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Training Card */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/Cartt.png" 
                alt={t('executiveEducation.twoCards.corporateTraining.imageAlt')} 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Box */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-[#F2F2F2]/85 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl min-h-[160px] sm:min-h-[200px]">
                <div className="mb-4 sm:mb-6">
                  <div className="mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#991E1E]">{t('executiveEducation.twoCards.corporateTraining.title').split(' ')[0]}</div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#991E1E]">{t('executiveEducation.twoCards.corporateTraining.title').split(' ')[1]}</div>
                      <div className="flex items-center gap-2 cursor-pointer" onClick={navigateToCorporateClients}>
                        <div className="flex items-center border-2 border-[#6E767D] rounded-full px-3 sm:px-6 py-1 sm:py-2">
                          <span className="text-[#991E1E] font-medium text-xs sm:text-sm">{t('executiveEducation.twoCards.corporateTraining.moreButton')}</span>
                        </div>
                        <div className="flex items-center border-2 border-[#6E767D] rounded-full w-6 h-6 sm:w-8 sm:h-8">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto sm:w-[18px] sm:h-[18px]"
                          >
                            <path d="M6 12L10 8L6 4" stroke="#991E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg mt-4 sm:mt-6">
                    {t('executiveEducation.twoCards.corporateTraining.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('executiveEducation.newsSection.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('executiveEducation.newsSection.subtitle')}
            </p>
          </div>

                    <div className="max-w-4xl mx-auto space-y-8">
            {/* News Card 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="/images/news1.png" 
                  alt={t('executiveEducation.newsSection.newsCard1.imageAlt')} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Source Tag on Image */}
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#991E1E] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {t('executiveEducation.newsSection.newsCard1.source')}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#991E1E] transition-colors">
                  {t('executiveEducation.newsSection.newsCard1.title')}
                </h3>
                <div className="w-16 h-1 bg-[#991E1E] mb-4"></div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {t('executiveEducation.newsSection.newsCard1.description')}
                </p>
                
                <button 
                  onClick={() => handleNewsClick('https://tengrinews.kz/article/bilet-vyisshuyu-ligu-narxoz-business-school-otkryivaet-3051/')}
                  className="inline-flex items-center text-[#991E1E] font-semibold hover:text-[#B91C1C] transition-all duration-300 text-lg"
                >
                  {t('executiveEducation.newsSection.newsCard1.readArticleButton')}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src="/images/news2.png" 
                  alt={t('executiveEducation.newsSection.newsCard2.imageAlt')} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Source Tag on Image */}
                <div className="absolute bottom-6 left-6">
                  <span className="bg-[#991E1E] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {t('executiveEducation.newsSection.newsCard2.source')}
                  </span>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#991E1E] transition-colors">
                  {t('executiveEducation.newsSection.newsCard2.title')}
                </h3>
                <div className="w-16 h-1 bg-[#991E1E] mb-4"></div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {t('executiveEducation.newsSection.newsCard2.description')}
                </p>
                
                <button 
                  onClick={() => handleNewsClick('https://forbes.kz/articles/bilet-vvysshuyu-ligu-narxoz-business-school-otkryvaet-dostup-kstatusu-ccim')}
                  className="inline-flex items-center text-[#991E1E] font-semibold hover:text-[#B91C1C] transition-all duration-300 text-lg"
                >
                  {t('executiveEducation.newsSection.newsCard2.readArticleButton')}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Categories Section */}
      <div id="program-categories-section" className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* First Row - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Leadership Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-normal text-[#991E1E] mb-4">{t('executiveEducation.programCategories.leadership.title')}</h3>
              <p className="text-[#6E767D] leading-relaxed">
                {t('executiveEducation.programCategories.leadership.description')}
              </p>
            </div>

            {/* Finance Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-normal text-[#991E1E] mb-4">{t('executiveEducation.programCategories.finance.title')}</h3>
              <p className="text-[#6E767D] leading-relaxed">
                {t('executiveEducation.programCategories.finance.description')}
              </p>
            </div>
              </div>

          {/* Second Row - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* General Management Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-normal text-[#991E1E] mb-4">{t('executiveEducation.programCategories.generalManagement.title')}</h3>
              <p className="text-[#6E767D] leading-relaxed">
                {t('executiveEducation.programCategories.generalManagement.description')}
              </p>
            </div>

            {/* Strategy Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-normal text-[#991E1E] mb-4">{t('executiveEducation.programCategories.strategy.title')}</h3>
              <p className="text-[#6E767D] leading-relaxed">
                {t('executiveEducation.programCategories.strategy.description')}
              </p>
            </div>

            {/* AI Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-normal text-[#991E1E] mb-4">{t('executiveEducation.programCategories.ai.title')}</h3>
              <p className="text-[#6E767D] leading-relaxed">
                {t('executiveEducation.programCategories.ai.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Контактная секция */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-4 sm:mb-6">
              {t('executiveEducation.contactSection.title')}
            </h2>
            <p className="text-[#6E767D] text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              {t('executiveEducation.contactSection.subtitle')}
            </p>
          </div>

          {/* Форма заявки */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveEducation.contactSection.form.firstName')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveEducation.contactSection.form.firstNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveEducation.contactSection.form.lastName')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={(e) => handleContactInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveEducation.contactSection.form.lastNamePlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveEducation.contactSection.form.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveEducation.contactSection.form.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('executiveEducation.contactSection.form.phone')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('executiveEducation.contactSection.form.phonePlaceholder')}
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
                    {t('executiveEducation.contactSection.form.privacyAgreement')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base md:text-lg"
                >
                  {t('executiveEducation.contactSection.form.submitButton')}
                </button>
              </form>
            </div>

            {/* Контактная информация */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('executiveEducation.contactSection.contactInfo.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveEducation.contactSection.contactInfo.phone.label')}</h4>
                  <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.phone.value')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveEducation.contactSection.contactInfo.email.label')}</h4>
                  <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.email.value')}</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('executiveEducation.contactSection.contactInfo.address.label')}</h4>
                  <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.address.value')}</p>
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
                {t('executiveEducation.contactSection.contactInfo.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveEducation.contactSection.contactInfo.contactModal.phone')}</p>
                    <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.contactModal.phoneNumber')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveEducation.contactSection.contactInfo.contactModal.email')}</p>
                    <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.contactModal.emailAddress')}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('executiveEducation.contactSection.contactInfo.contactModal.address')}</p>
                    <p className="text-gray-600">{t('executiveEducation.contactSection.contactInfo.contactModal.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('executiveEducation.contactSection.contactInfo.contactModal.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Presentation Modal */}
      <PresentationModal
        isOpen={showPresentationModal}
        onClose={() => setShowPresentationModal(false)}
        onDownload={handleDownloadPresentation}
        programName="Executive Education"
        programType={PROGRAM_TYPES.EXECUTIVE_EDUCATION}
      />

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ExecutiveEducation;
