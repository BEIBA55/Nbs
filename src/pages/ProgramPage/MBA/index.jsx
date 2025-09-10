import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import PresentationModal from '../../../components/ui/PresentationModal';
import RankingSection from '../../Homepage/RankingSection';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

const MBA = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  
  const [activeModule, setActiveModule] = useState(null);
  const [showDocuments, setShowDocuments] = useState(false);
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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.MBA);
      
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
      const saveResult = await formDataAPI.savePresentationFormData(formData, PROGRAM_TYPES.MBA);
      
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
    // Создаем ссылку для скачивания презентации MBA
    const link = document.createElement('a');
    link.href = '/presentations/MBA presentation.pdf';
    link.download = 'MBA-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modules = [
    {
      title: 'Стратегический менеджмент',
      description:
        'Формирование стратегического мышления и навыков разработки долгосрочных планов развития организации',
      topics: [
        'Анализ внешней и внутренней среды организации',
        'Формулирование миссии, видения и стратегических целей',
        'Разработка конкурентных стратегий',
        'Стратегическое планирование и контроль',
        'Корпоративная культура и управление изменениями',
      ],
      duration: '3 дня',
      credits: '6 ECTS',
    },
    {
      title: 'Финансовый менеджмент',
      description:
        'Изучение принципов управления финансами компании и принятия инвестиционных решений',
      topics: [
        'Анализ финансовой отчетности и ключевых показателей',
        'Управление оборотным капиталом',
        'Инвестиционный анализ и оценка проектов',
        'Структура капитала и стоимость финансирования',
        'Управление рисками и финансовое планирование',
      ],
      duration: '3 дня',
      credits: '6 ECTS',
    },
    {
      title: 'Маркетинг и продажи',
      description: 'Современные подходы к маркетингу и управлению продажами в цифровую эпоху',
      topics: [
        'Стратегический маркетинг и позиционирование',
        'Цифровой маркетинг и социальные медиа',
        'Управление брендом и клиентским опытом',
        'Техники продаж и управление командой продаж',
        'Аналитика маркетинга и ROI',
      ],
      duration: '3 дня',
      credits: '6 ECTS',
    },
    {
      title: 'Лидерство и команды',
      description: 'Развитие лидерских качеств и навыков эффективного управления командами',
      topics: [
        'Теории лидерства и стили управления',
        'Эмоциональный интеллект и коммуникация',
        'Управление конфликтами и переговоры',
        'Мотивация и развитие персонала',
        'Построение эффективных команд',
      ],
      duration: '3 дня',
      credits: '6 ECTS',
    },
    {
      title: 'Операционное управление',
      description: 'Оптимизация бизнес-процессов и повышение операционной эффективности',
      topics: [
        'Управление качеством и процессный подход',
        'Логистика и управление цепями поставок',
        'Проектное управление и управление рисками',
        'Инновации и цифровая трансформация',
        'Устойчивое развитие и корпоративная социальная ответственность',
      ],
      duration: '3 дня',
      credits: '6 ECTS',
    },
  ];

  const testimonials = [
    {
      name: 'Иванов Иван',
      title: 'Директор «Микрофинансовой организации «Auto Siyliq Finance»',
      role: 'Слушатель MBA',
    },
    {
      name: 'Иванов Иван',
      title: 'Директор «Микрофинансовой организации «Auto Siyliq Finance»',
      role: 'Слушатель MBA',
    },
    {
      name: 'Иванов Иван',
      title: 'Директор «Микрофинансовой организации «Auto Siyliq Finance»',
      role: 'Слушатель MBA',
    },
    {
      name: 'Иванов Иван',
      title: 'Директор «Микрофинансовой организации «Auto Siyliq Finance»',
      role: 'Слушатель MBA',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 sm:py-48 md:py-64 px-3 sm:px-4 md:px-8 min-h-screen flex items-end pb-16 sm:pb-24 md:pb-32 pt-24 sm:pt-28 md:pt-32"
        style={{ backgroundImage: 'url(/images/Fon.png)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto text-center w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight">{t('mbaPage.hero.title')}</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4 sm:mb-6 font-medium">
            {t('mbaPage.hero.subtitle')}
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-8 sm:mb-12 md:mb-16">{t('mbaPage.hero.description')}</p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <div className="bg-red-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg">
              {t('mbaPage.hero.duration')}
            </div>
            <div className="bg-red-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg">
              {t('mbaPage.hero.teachers')}
            </div>
            <div className="bg-red-800 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg">
              {t('mbaPage.hero.format')}
            </div>
            <div
              onClick={() => setShowPresentationModal(true)}
              className="bg-[#E94848] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-[#D13A3A] transition-colors cursor-pointer"
            >
              {t('mbaPage.hero.downloadPresentation')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-12 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative">
                <img src="/images/Krug.png" alt="MBA студенты" className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight" style={{ color: '#991E1E' }}>
                {t('mbaPage.mainContent.title')}
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                <p>
                  {t('mbaPage.mainContent.paragraph1')}
                </p>
                <p>
                  {t('mbaPage.mainContent.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-12 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-red-800 text-white p-4 sm:p-6 md:p-8 rounded-3xl h-auto md:h-80 relative">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                <h3 className="text-lg sm:text-xl font-normal">{t('mbaPage.features.weekendFormat.title')}</h3>
                <img
                  src="/images/vrema.png"
                  alt="Время"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-2xl flex-shrink-0"
                />
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-wider mb-2 drop-shadow-lg">
                {t('mbaPage.features.weekendFormat.duration')}
              </div>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                {t('mbaPage.features.weekendFormat.description')}
              </p>
            </div>

            <div className="bg-red-800 text-white p-4 sm:p-6 md:p-8 rounded-3xl h-auto md:h-80 relative">
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-black tracking-wider drop-shadow-lg">{t('mbaPage.features.groupSize.title')}</h3>
              </div>
              <p className="text-xs sm:text-sm opacity-90 mb-4 leading-relaxed">
                {t('mbaPage.features.groupSize.description')}
              </p>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="text-xs opacity-75">{t('mbaPage.features.groupSize.important')}</div>
                <img
                  src="/images/gruppa.png"
                  alt="Группа"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-2xl flex-shrink-0"
                />
              </div>
            </div>

            <div className="bg-red-800 text-white p-4 sm:p-6 md:p-8 rounded-3xl h-auto md:h-80 relative">
              <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                <h3 className="text-lg sm:text-xl font-normal">{t('mbaPage.features.experts.title')}</h3>
                <img
                  src="/images/experty.png"
                  alt="Эксперты"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-2xl flex-shrink-0"
                />
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-wider mb-3 drop-shadow-lg">
                {t('mbaPage.features.experts.count')}
              </div>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                {t('mbaPage.features.experts.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Testimonials - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#991E1E' }}>{t('mbaPage.videoTestimonials.title')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-112 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/zfRNg7XXrKU?modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-112 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/Ne3sLt3LPAE?modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-112 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/ptS951v22co?modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            <div className="w-full h-48 sm:h-64 md:h-80 lg:h-112 rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/M2zmZwVhKzw?modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      {/* Program Features - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12" style={{ color: '#991E1E' }}>{t('mbaPage.programFeatures.title')}</h2>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-[#991E1E] mb-2">{t('mbaPage.programFeatures.feature1.number')}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">
                    {t('mbaPage.programFeatures.feature1.title')}
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>
                        {t('mbaPage.programFeatures.feature1.point1')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>{t('mbaPage.programFeatures.feature1.point2')}</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-52 flex-shrink-0 flex justify-center lg:justify-end">
                  <img
                    src="/images/BlokMba1.png"
                    alt="Особенности"
                    className="w-32 h-auto sm:w-40 lg:w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-[#991E1E] mb-2">{t('mbaPage.programFeatures.feature2.number')}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">{t('mbaPage.programFeatures.feature2.title')}</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>
                        {t('mbaPage.programFeatures.feature2.point1')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>
                        {t('mbaPage.programFeatures.feature2.point2')}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-52 flex-shrink-0 flex justify-center lg:justify-end">
                  <img
                    src="/images/BlokMba2.png"
                    alt="Особенности"
                    className="w-32 h-auto sm:w-40 lg:w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="text-xs sm:text-sm text-[#991E1E] mb-2">{t('mbaPage.programFeatures.feature3.number')}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-red-800 mb-3 sm:mb-4">{t('mbaPage.programFeatures.feature3.title')}</h3>
                  <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>
                        {t('mbaPage.programFeatures.feature3.point1')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2 sm:mr-3 mt-1">•</span>
                      <span>{t('mbaPage.programFeatures.feature3.point2')}</span>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-52 flex-shrink-0 flex justify-center lg:justify-end">
                  <img
                    src="/images/BlokMba3.png"
                    alt="Особенности"
                    className="w-32 h-auto sm:w-40 lg:w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

             {/* Skills Development Section - Enhanced Mobile Optimization */}
       <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#991E1E' }}>
         <div className="max-w-7xl mx-auto">
           <div className="text-left mb-8 sm:mb-12 md:mb-16">
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
               {t('mbaPage.skillsDevelopment.title')}
          </h2>
             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: '#E94848' }}>
               {t('mbaPage.skillsDevelopment.subtitle')}
              </h3>
            </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
             {/* IQ Block */}
             <div className="bg-[#E94848] rounded-3xl overflow-hidden h-auto lg:h-128">
               <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
                 <img 
                   src="/images/BlockMbaF1.jpg" 
                   alt="IQ" 
                   className="w-full h-full object-cover"
                 />
                    </div>
               <div className="p-4 sm:p-6 flex flex-col h-auto lg:h-80">
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">{t('mbaPage.skillsDevelopment.iq.title')}</h3>
                 <p className="text-white text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-grow">
                   {t('mbaPage.skillsDevelopment.iq.description')}
                 </p>
                 <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                   {t('mbaPage.skillsDevelopment.iq.skills', { returnObjects: true }).map((skill, index) => (
                     <span key={index} className="bg-[#F06565] text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                       {skill}
                     </span>
                   ))}
              </div>
            </div>
          </div>

             {/* EQ Block */}
             <div className="bg-[#E94848] rounded-3xl overflow-hidden h-auto lg:h-128">
               <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
                 <img 
                   src="/images/BlockMbaF2.jpg" 
                   alt="EQ" 
                className="w-full h-full object-cover"
              />
        </div>
               <div className="p-4 sm:p-6 flex flex-col h-auto lg:h-80">
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">{t('mbaPage.skillsDevelopment.eq.title')}</h3>
                 <p className="text-white text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-grow">
                   {t('mbaPage.skillsDevelopment.eq.description')}
                 </p>
                 <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                   {t('mbaPage.skillsDevelopment.eq.skills', { returnObjects: true }).map((skill, index) => (
                     <span key={index} className="bg-[#F06565] text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                       {skill}
                     </span>
                   ))}
      </div>
            </div>
          </div>

             {/* Social Capital Block */}
             <div className="bg-[#E94848] rounded-3xl overflow-hidden h-auto lg:h-128">
               <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
              <img
                   src="/images/BlockMbaF3.jpg" 
                   alt="Соц. капитал" 
                className="w-full h-full object-cover"
              />
                    </div>
               <div className="p-4 sm:p-6 flex flex-col h-auto lg:h-80">
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">{t('mbaPage.skillsDevelopment.socialCapital.title')}</h3>
                 <p className="text-white text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-grow">
                   {t('mbaPage.skillsDevelopment.socialCapital.description')}
                 </p>
                 <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                   {t('mbaPage.skillsDevelopment.socialCapital.skills', { returnObjects: true }).map((skill, index) => (
                     <span key={index} className="bg-[#F06565] text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                       {skill}
                     </span>
                   ))}
                  </div>
                      </div>
                    </div>

             {/* Meta-skills Block */}
             <div className="bg-[#E94848] rounded-3xl overflow-hidden h-auto lg:h-128">
               <div className="h-32 sm:h-40 md:h-48 overflow-hidden">
                 <img 
                   src="/images/BlockMbaF4.jpg" 
                   alt="Meta-skills" 
                   className="w-full h-full object-cover"
                 />
                    </div>
               <div className="p-4 sm:p-6 flex flex-col h-auto lg:h-80">
                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">{t('mbaPage.skillsDevelopment.metaSkills.title')}</h3>
                 <p className="text-white text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed flex-grow">
                   {t('mbaPage.skillsDevelopment.metaSkills.description')}
                 </p>
                 <div className="flex flex-wrap gap-2 mt-auto">
                   {t('mbaPage.skillsDevelopment.metaSkills.skills', { returnObjects: true }).map((skill, index) => (
                     <span key={index} className="bg-[#F06565] text-white px-3 py-1 rounded-full text-xs">
                       {skill}
                     </span>
                   ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Ranking Section */}
      <RankingSection />

      {/* Обязательные дисциплины Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('mbaPage.requiredDisciplines.tag')}
            </span>
            </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#E94848]">{t('mbaPage.requiredDisciplines.title').split(' ')[0]}</span>
              <span className="text-[#991E1E]"> {t('mbaPage.requiredDisciplines.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            </div>

          {/* Сетка дисциплин - 2 колонки, 6 рядов */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t('mbaPage.requiredDisciplines.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="text-gray-400 text-sm mb-2">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-bold text-[#991E1E]">{discipline}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Дисциплины по выбору Section */}
      <div className="py-16 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('mbaPage.electiveDisciplines.tag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#991E1E]">{t('mbaPage.electiveDisciplines.title').split(' ')[0]}</span>
              <span className="text-[#E94848]"> {t('mbaPage.electiveDisciplines.title').split(' ').slice(1).join(' ')}</span>
            </h2>
          </div>

          {/* Сетка дисциплин - 2 колонки, 3 ряда */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t('mbaPage.electiveDisciplines.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="text-gray-400 text-sm mb-2">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-bold text-[#991E1E]">{discipline}</h3>
              </div>
            ))}
          </div>
              </div>
            </div>

      {/* Специализации на выбор Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('mbaPage.specializations.tag')}
              </span>
      </div>

                    {/* Заголовок */}
          <div className="text-center mb-6">
            <h2 className="text-5xl font-normal mb-4">
              <span className="text-[#E94848]">{t('mbaPage.specializations.title').split(' ')[0]}</span>
              <span className="text-[#991E1E]"> {t('mbaPage.specializations.title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              {t('mbaPage.specializations.subtitle')}
            </p>
            </div>

                      {/* Сетка специализаций - 2 колонки, 2 ряда */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
              {/* Специализация 1 */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  <img 
                    src="/images/BlockMbaF4.jpg" 
                    alt="Стратегическое управление" 
                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                  />
                  </div>
                <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-gray-500 text-sm mb-2">{t('mbaPage.specializations.tag')}</div>
                  <h3 className="text-2xl font-bold text-[#E94848] mb-6">{t('mbaPage.specializations.strategicManagement.title')}</h3>
                  <ul className="space-y-3">
                    {t('mbaPage.specializations.strategicManagement.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                </ul>
                </div>
            </div>

                          {/* Специализация 2 */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  <img 
                    src="/images/BMba2.png" 
                    alt="Цифровое управление" 
                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                  />
        </div>
                <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-gray-500 text-sm mb-2">{t('mbaPage.specializations.tag')}</div>
                  <h3 className="text-2xl font-bold text-[#E94848] mb-6">{t('mbaPage.specializations.digitalManagement.title')}</h3>
                  <ul className="space-y-3">
                    {t('mbaPage.specializations.digitalManagement.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                </ul>
      </div>
            </div>

                                                      {/* Специализация 3 */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  <img 
                    src="/images/BMba3.jpg" 
                    alt="Финансовые технологии" 
                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                  />
                </div>
                <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-gray-500 text-sm mb-2">{t('mbaPage.specializations.tag')}</div>
                  <h3 className="text-2xl font-bold text-[#E94848] mb-6">{t('mbaPage.specializations.finTech.title')}</h3>
                  <ul className="space-y-3">
                    {t('mbaPage.specializations.finTech.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                </ul>
              </div>
              </div>

                                                      {/* Специализация 4 */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="h-64 overflow-hidden rounded-t-2xl">
                  <img 
                    src="/images/BMba4.jpg" 
                    alt="Предпринимательство" 
                    className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                    style={{ objectPosition: 'center 25%' }}
                  />
                </div>
                <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                  <div className="text-gray-500 text-sm mb-2">{t('mbaPage.specializations.tag')}</div>
                  <h3 className="text-2xl font-bold text-[#E94848] mb-6">{t('mbaPage.specializations.entrepreneurship.title')}</h3>
                  <ul className="space-y-3">
                    {t('mbaPage.specializations.entrepreneurship.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>

      {/* Возможные выездные модули Section */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-left mb-16">
            <h2 className="text-5xl font-bold">
              <span className="text-[#991E1E]">{t('mbaPage.studyAbroad.title').split(' ')[0]}</span>
              <span className="text-[#E94848]"> {t('mbaPage.studyAbroad.title').split(' ').slice(1).join(' ')}</span>
            </h2>
      </div>

          {/* Сетка университетов - 3 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Algebra Bernays */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/ALGEBRA.jpg" 
                  alt="Algebra Bernays" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-6 rounded-t-2xl rounded-b-2xl">
                <h3 className="text-xl font-bold text-[#991E1E] mb-4">{t('mbaPage.studyAbroad.algebraBernays.title')}</h3>
                <p className="text-[#6E767D] text-sm mb-6 leading-relaxed">
                  {t('mbaPage.studyAbroad.algebraBernays.description')}
                </p>
                <a 
                  href="https://www.algebra.hr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#E94848] text-white py-3 px-6 rounded-full font-medium hover:bg-[#D13A3A] transition-colors"
                >
                  {t('mbaPage.studyAbroad.algebraBernays.website')}
                </a>
              </div>
            </div>

            {/* University of New York in Prague */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/UNYP.jpg" 
                  alt="University of New York in Prague" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-6 rounded-t-2xl rounded-b-2xl">
                <h3 className="text-xl font-bold text-[#991E1E] mb-4">{t('mbaPage.studyAbroad.unyp.title')}</h3>
                <p className="text-[#6E767D] text-sm mb-6 leading-relaxed">
                  {t('mbaPage.studyAbroad.unyp.description')}
                </p>
                <a 
                  href="https://www.unyp.cz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#E94848] text-white py-3 px-6 rounded-full font-medium hover:bg-[#D13A3A] transition-colors"
                >
                  {t('mbaPage.studyAbroad.unyp.website')}
                </a>
                  </div>
                </div>

            {/* ZTE University */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/ZTE.jpg" 
                  alt="ZTE University" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-6 rounded-t-2xl rounded-b-2xl">
                <h3 className="text-xl font-bold text-[#991E1E] mb-4">{t('mbaPage.studyAbroad.zte.title')}</h3>
                <p className="text-[#6E767D] text-sm mb-6 leading-relaxed">
                  {t('mbaPage.studyAbroad.zte.description')}
                </p>
                <a 
                  href="https://www.zte.com.cn/global/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#E94848] text-white py-3 px-6 rounded-full font-medium hover:bg-[#D13A3A] transition-colors"
                >
                  {t('mbaPage.studyAbroad.zte.website')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Контактная секция */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#991E1E] mb-6">
              {t('mbaPage.contact.title')}
            </h2>
            <p className="text-[#6E767D] text-lg max-w-3xl mx-auto">
              {t('mbaPage.contact.subtitle')}
            </p>
          </div>

          {/* Форма заявки */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.name')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('forms.namePlaceholderFull')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={(e) => handleContactInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('forms.lastNamePlaceholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('forms.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('forms.phonePlaceholderForm')}
                    />
                  </div>
                         </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="privacyConsent"
                    checked={contactFormData.privacyConsent}
                    onChange={(e) => handleContactInputChange('privacyConsent', e.target.checked)}
                    required
                    className="w-4 h-4 text-[#991E1E] border-gray-300 rounded focus:ring-[#991E1E]"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    {t('forms.privacyAgreement')}
                  </label>
        </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-lg"
                >
                  {t('forms.submitApplication')}
                </button>
              </form>
      </div>

            {/* Контактная информация */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('mbaPage.contact.orContact')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('mbaPage.contact.phone')}</h4>
                  <p className="text-[#6E767D]">{t('mbaPage.contact.phoneNumber')}</p>
            </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('mbaPage.contact.email')}</h4>
                  <p className="text-[#6E767D]">{t('mbaPage.contact.emailAddress')}</p>
            </div>
                <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('mbaPage.contact.address')}</h4>
                  <p className="text-[#6E767D]">{t('mbaPage.contact.addressText')}</p>
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
        programName={t('mbaPage.mainContent.title')}
        programType={PROGRAM_TYPES.MBA}
      />
    </div>
  );
};

export default MBA;
