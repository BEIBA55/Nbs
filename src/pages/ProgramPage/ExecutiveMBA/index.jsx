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

const features = [
  {
    number: '01',
    title: 'Обучение без отрыва от работы',
    stats: '92% студентов совмещают обучение с карьерой',
    points: [
      'Модульный формат: занятия проходят 1 раз в месяц по 3-4 дня, что позволяет совмещать обучение с работой',
      'Каждый модуль завершается решением реального бизнес-кейса или проектом',
    ],
  },
  {
    number: '02',
    title: 'Peer to Peer education',
    stats: '25+ отраслей в одном потоке',
    points: [
      'Обучение в окружении топ-менеджеров и собственников бизнеса',
      'Обмен опытом и нетворкинг с лидерами из разных отраслей',
    ],
  },
  {
    number: '03',
    title: 'Международная перспектива',
    stats: '3 страны для стажировок',
    points: [
      'Стажировки и модули в ведущих бизнес-школах Европы и Азии',
      'Международная аккредитация FIBAA',
    ],
  },
  {
    number: '04',
    title: 'Практическая направленность',
    stats: '95% выпускников отмечают рост дохода',
    points: [
      'Преподаватели — действующие топ-менеджеры и эксперты',
      'Реальные кейсы и проекты, применимые к вашей работе',
    ],
  },
];

const modules = [
  {
    title: 'Стратегический менеджмент',
    subtitle: 'Обязательный модуль',
    description:
      'Формирование стратегического мышления, анализ среды, разработка и реализация стратегии',
    topics: [
      'Анализ внешней и внутренней среды',
      'Формулирование миссии и целей',
      'Стратегии роста и конкурентные преимущества',
      'Управление изменениями',
    ],
  },
  {
    title: 'Финансовый менеджмент',
    subtitle: 'Обязательный модуль',
    description: 'Финансовый анализ, инвестиционные решения, управление капиталом',
    topics: [
      'Финансовая отчетность и анализ',
      'Бюджетирование и контроль',
      'Инвестиционный анализ',
      'Управление рисками',
    ],
  },
  {
    title: 'Маркетинг и продажи',
    subtitle: 'Обязательный модуль',
    description: 'Современные подходы к маркетингу и управлению продажами',
    topics: [
      'Стратегический маркетинг',
      'Цифровой маркетинг',
      'Управление брендом',
      'Продажи B2B и B2C',
    ],
  },
  {
    title: 'Лидерство и команды',
    subtitle: 'Обязательный модуль',
    description: 'Развитие лидерских качеств и эффективное управление командами',
    topics: [
      'Лидерство в условиях изменений',
      'Эмоциональный интеллект',
      'Построение эффективных команд',
      'Мотивация и вовлеченность',
    ],
  },
  {
    title: 'Операционное управление',
    subtitle: 'Обязательный модуль',
    description: 'Оптимизация бизнес-процессов и операционная эффективность',
    topics: [
      'Lean и Agile',
      'Управление проектами',
      'Логистика и цепи поставок',
      'Управление качеством',
    ],
  },
  {
    title: 'Цифровая трансформация',
    subtitle: 'Обязательный модуль',
    description: 'IT-стратегии и цифровые технологии в бизнесе',
    topics: [
      'Цифровые платформы',
      'Big Data и аналитика',
      'Автоматизация процессов',
      'Кибербезопасность',
    ],
  },
  {
    title: 'Международный бизнес',
    subtitle: 'Обязательный модуль',
    description: 'Ведение бизнеса на глобальных рынках',
    topics: [
      'Экспорт и импорт',
      'Международные финансы',
      'Кросс-культурные коммуникации',
      'Глобальные стратегии',
    ],
  },
];

const ExecutiveMBA = () => {
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_MBA);
      
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
    // Создаем ссылку для скачивания презентации Executive MBA
    const link = document.createElement('a');
    link.href = '/presentations/EMBA новый (1).pdf';
    link.download = 'Executive-MBA-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Данные университетов для Executive MBA
  const universities = [
    {
      id: 1,
      title: t('programs.executiveMbaPage.fieldModules.universities.0.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.0.description'),
      image: '/images/Insead.jpg',
      website: 'https://www.insead.edu',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.0.websiteText')
    },
    {
      id: 2,
      title: t('programs.executiveMbaPage.fieldModules.universities.1.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.1.description'),
      image: '/images/Monaco.jpg',
      website: 'https://www.universite-monaco.com',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.1.websiteText')
    },
    {
      id: 3,
      title: t('programs.executiveMbaPage.fieldModules.universities.2.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.2.description'),
      image: '/images/ZTE.jpg',
      website: 'https://www.zte.com.cn/global/',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.2.websiteText')
    },
    {
      id: 4,
      title: t('programs.executiveMbaPage.fieldModules.universities.3.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.3.description'),
      image: '/images/Colorado.jpg',
      website: 'https://www.mines.edu',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.3.websiteText')
    },
    {
      id: 5,
      title: t('programs.executiveMbaPage.fieldModules.universities.4.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.4.description'),
      image: '/images/Hult.png',
      website: 'https://www.hult.edu',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.4.websiteText')
    },
    {
      id: 6,
      title: t('programs.executiveMbaPage.fieldModules.universities.5.title'),
      description: t('programs.executiveMbaPage.fieldModules.universities.5.description'),
      image: '/images/ESMT.jpg',
      website: 'https://www.esmt.org',
      websiteText: t('programs.executiveMbaPage.fieldModules.universities.5.websiteText')
    }
  ];

  const slidesToShow = 3;
  const totalSlides = Math.ceil(universities.length / slidesToShow);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 400);
  };

  const getCurrentUniversities = () => {
    const startIndex = currentSlide * slidesToShow;
    return universities.slice(startIndex, startIndex + slidesToShow);
  };

  // Отзывы выпускников
  const reviews = [
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.0.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.0.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.0.position'),
      image: "/Reviews/1.png"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.1.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.1.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.1.position'),
      image: "/Reviews/2.png"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.2.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.2.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.2.position'),
      image: "/Reviews/3.png"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.3.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.3.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.3.position'),
      image: "/Reviews/4.png"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.4.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.4.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.4.position'),
      image: "/Reviews/5.jpg"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.5.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.5.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.5.position'),
      image: "/Reviews/6.jpg"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.6.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.6.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.6.position'),
      image: "/Reviews/7.jpeg"
    },
    {
      text: t('programs.executiveMbaPage.graduateReviews.reviews.7.text'),
      author: t('programs.executiveMbaPage.graduateReviews.reviews.7.author'),
      position: t('programs.executiveMbaPage.graduateReviews.reviews.7.position'),
      image: "/Reviews/8.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-64 px-8 min-h-screen flex items-end pb-32"
        style={{ backgroundImage: 'url(/images/EMBA_fon.png)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto text-center w-full">
          <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">{t('programs.executiveMbaPage.hero.title')}</h1>
          <p className="text-2xl mb-16">{t('programs.executiveMbaPage.hero.subtitle')}</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-red-800 text-white px-8 py-3 rounded-full font-semibold text-lg">
              {t('programs.executiveMbaPage.hero.teachers')}
            </div>
            <div className="bg-red-800 text-white px-8 py-3 rounded-full font-semibold text-lg">
              {t('programs.executiveMbaPage.hero.weekendFormat')}
            </div>
            <div
                     onClick={() => setShowPresentationModal(true)}
              className="bg-[#E94848] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#D13A3A] transition-colors cursor-pointer"
                   >
                     {t('programs.executiveMbaPage.hero.downloadPresentation')}
            </div>
          </div>
          </div>
        </div>

      {/* Information Cards Section */}
      <div className="relative -mt-16 px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Все 5 блоков в одном ряду */}
          <div className="flex justify-center gap-2">
            {/* Первые 3 блока в общем контейнере */}
            <div className="bg-[#F4F4F4] rounded-2xl p-3 inline-block">
              <div className="flex gap-3">
                {/* Block 1 - Только фото красных дипломов */}
                <div className="bg-[#991E1E] rounded-2xl p-1 w-48 h-64 flex justify-center items-center">
                  <img 
                    src="/images/KrasnayaObl.png" 
                    alt="Диплом Executive MBA" 
                    className="w-full h-64 object-contain"
                  />
            </div>

                {/* Block 2 - Иконка глобуса с белым контейнером */}
                <div className="bg-white rounded-2xl p-3 w-48 h-64 flex flex-col justify-between">
                  <div className="flex justify-start">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
            </div>
            </div>
                  <p className="text-[#6E767D] text-left text-base leading-relaxed">
                    {t('programs.executiveMbaPage.informationCards.internationalDiploma')}
                  </p>
                </div>

                {/* Block 3 - Иконка людей с белым контейнером */}
                <div className="bg-white rounded-2xl p-3 w-48 h-64 flex flex-col">
                  <div className="flex justify-start">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 flex items-center">
                    <p className="text-[#6E767D] text-left text-base leading-relaxed">
                      {t('programs.executiveMbaPage.informationCards.groupSize')}
                    </p>
                  </div>
          </div>
        </div>
      </div>

            {/* Block 4 - Обучение 1-2 дня в месяц */}
            <div className="bg-[#F4F4F4] rounded-2xl p-2 w-48 h-70 flex flex-col justify-between">
              <div className="flex justify-center px-1 pt-1">
                <img 
                  src="/images/Obuche.jpg" 
                  alt="Обучение 1-2 дня в месяц" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-[#6E767D] text-left text-base leading-relaxed px-2 pb-1">
                {t('programs.executiveMbaPage.informationCards.studyFormat')}
              </p>
            </div>

            {/* Block 5 - Модульная система обучения */}
            <div className="bg-[#F4F4F4] rounded-2xl p-2 w-48 h-70 flex flex-col justify-between">
              <div className="flex justify-center px-1 pt-1">
                <img 
                  src="/images/modusis.jpg" 
                  alt="Модульная система обучения" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-[#6E767D] text-left text-base leading-relaxed px-2 pb-1">
                {t('programs.executiveMbaPage.informationCards.modularSystem')}
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* About Program Section */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            {/* Left Section - Text Content */}
            <div>
              {/* Tagline */}
              <div className="inline-block bg-gray-50 border border-gray-300 text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium mb-6">
                {t('programs.executiveMbaPage.aboutProgram.label')}
      </div>

              {/* Main Title */}
              <h2 className="text-5xl font-normal text-[#991E1E] mb-8 leading-tight">
                {t('programs.executiveMbaPage.aboutProgram.title')}
            </h2>
              
              {/* Description */}
              <p className="text-[#6E767D] text-lg leading-relaxed mb-8">
                {t('programs.executiveMbaPage.aboutProgram.description')}
              </p>
              
              {/* CTA Button */}
              <button 
                onClick={() => setShowContactInfo(true)}
                className="bg-[#991E1E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors"
              >
                {t('programs.executiveMbaPage.aboutProgram.contactButton')}
              </button>
          </div>

            {/* Right Section - Information Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                  <img 
                    src="/images/RostKon.jpg" 
                    alt="Использовать изменения как точки роста" 
                    className="w-full h-64 object-cover rounded-lg"
                />
              </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('programs.executiveMbaPage.aboutProgram.cards.growthPoints')}
              </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                  <img 
                    src="/images/Razvit.jpg" 
                    alt="Развить управленческие навыки" 
                    className="w-full h-64 object-cover rounded-lg"
                />
              </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('programs.executiveMbaPage.aboutProgram.cards.managerialSkills')}
              </p>
            </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-4">
                  <img 
                    src="/images/NaShag.jpg" 
                    alt="Быть на шаг впереди" 
                    className="w-full h-64 object-cover rounded-lg"
                />
              </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t('programs.executiveMbaPage.aboutProgram.cards.uncertainty')}
              </p>
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
                {t('programs.executiveMbaPage.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                    </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('programs.executiveMbaPage.contactModal.phone')}</p>
                    <p className="text-gray-600">+7 (727) 377-33-33</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('programs.executiveMbaPage.contactModal.email')}</p>
                    <p className="text-gray-600">info@narxoz.kz</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-[#991E1E] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm"></span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{t('programs.executiveMbaPage.contactModal.address')}</p>
                    <p className="text-gray-600">{t('programs.executiveMbaPage.contactModal.addressValue')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('programs.executiveMbaPage.contactModal.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Development Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#991E1E' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              {t('programs.executiveMbaPage.skillsDevelopment.title')}
            </h2>
            <h3 className="text-4xl font-bold" style={{ color: '#E94848' }}>
              {t('programs.executiveMbaPage.skillsDevelopment.subtitle')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* IQ Block */}
            <div className="bg-[#E94848] rounded-3xl overflow-hidden h-128">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/BlockMbaF1.jpg" 
                  alt="IQ" 
                  className="w-full h-full object-cover"
                />
                </div>
              <div className="p-6 flex flex-col h-80">
                <h3 className="text-2xl font-bold text-white mb-4">{t('programs.executiveMbaPage.skillsDevelopment.iq.title')}</h3>
                <p className="text-white text-sm mb-6 leading-relaxed flex-grow">
                  {t('programs.executiveMbaPage.skillsDevelopment.iq.description')}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {t('programs.executiveMbaPage.skillsDevelopment.iq.skills', { returnObjects: true }).map((skill, index) => (
                    <span key={index} className="bg-[#F06565] text-white px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
              </div>
              </div>
            </div>

            {/* EQ Block */}
            <div className="bg-[#E94848] rounded-3xl overflow-hidden h-128">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/BlockMbaF2.jpg" 
                  alt="EQ" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col h-80">
                <h3 className="text-2xl font-bold text-white mb-4">{t('programs.executiveMbaPage.skillsDevelopment.eq.title')}</h3>
                <p className="text-white text-sm mb-6 leading-relaxed flex-grow">
                  {t('programs.executiveMbaPage.skillsDevelopment.eq.description')}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {t('programs.executiveMbaPage.skillsDevelopment.eq.skills', { returnObjects: true }).map((skill, index) => (
                    <span key={index} className="bg-[#F06565] text-white px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
            </div>
        </div>
      </div>

            {/* Social Capital Block */}
            <div className="bg-[#E94848] rounded-3xl overflow-hidden h-128">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/BlockMbaF3.jpg" 
                  alt="Соц. капитал" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col h-80">
                <h3 className="text-2xl font-bold text-white mb-4">{t('programs.executiveMbaPage.skillsDevelopment.socialCapital.title')}</h3>
                <p className="text-white text-sm mb-6 leading-relaxed flex-grow">
                  {t('programs.executiveMbaPage.skillsDevelopment.socialCapital.description')}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {t('programs.executiveMbaPage.skillsDevelopment.socialCapital.skills', { returnObjects: true }).map((skill, index) => (
                    <span key={index} className="bg-[#F06565] text-white px-3 py-1 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
          </div>
        </div>
      </div>

            {/* Meta-skills Block */}
            <div className="bg-[#E94848] rounded-3xl overflow-hidden h-128">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/BlockMbaF4.jpg" 
                  alt="Meta-skills" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col h-80">
                <h3 className="text-2xl font-bold text-white mb-4">{t('programs.executiveMbaPage.skillsDevelopment.metaSkills.title')}</h3>
                <p className="text-white text-sm mb-6 leading-relaxed flex-grow">
                  {t('programs.executiveMbaPage.skillsDevelopment.metaSkills.description')}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {t('programs.executiveMbaPage.skillsDevelopment.metaSkills.skills', { returnObjects: true }).map((skill, index) => (
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

      {/* Program Purpose Section */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="text-center mb-6">
            <span className="inline-block bg-gray-50 border border-[#6E767D] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('programs.executiveMbaPage.programPurpose.label')}
            </span>
                    </div>
          
          {/* Main Title */}
          <h2 className="text-5xl font-normal text-[#991E1E] text-center mb-16">
            {t('programs.executiveMbaPage.programPurpose.title')}
          </h2>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Card 1 - Strategic Vision */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#E94848] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                  </div>
              <h3 className="text-lg font-bold text-[#991E1E] mb-3">
                {t('programs.executiveMbaPage.programPurpose.cards.strategicVision.title')}
              </h3>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.programPurpose.cards.strategicVision.description')}
            </p>
                </div>

            {/* Card 2 - Talent Attraction */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#E94848] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              <h3 className="text-lg font-bold text-[#991E1E] mb-3">
                {t('programs.executiveMbaPage.programPurpose.cards.talentAttraction.title')}
              </h3>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.programPurpose.cards.talentAttraction.description')}
              </p>
              </div>

            {/* Card 3 - Competitiveness */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#E94848] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
          </div>
              <h3 className="text-lg font-bold text-[#991E1E] mb-3">
                {t('programs.executiveMbaPage.programPurpose.cards.competitiveness.title')}
              </h3>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.programPurpose.cards.competitiveness.description')}
              </p>
                </div>

            {/* Card 4 - Flexibility */}
            <div className="bg-[#F2F2F2] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#E94848] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12h4l3-9 4 18 3-9h4"/>
                  </svg>
                    </div>
              <h3 className="text-lg font-bold text-[#991E1E] mb-3">
                {t('programs.executiveMbaPage.programPurpose.cards.flexibility.title')}
              </h3>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.programPurpose.cards.flexibility.description')}
              </p>
                  </div>
                </div>
        </div>
      </div>

      {/* Особенности программы */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12" style={{ color: '#991E1E' }}>{t('programs.executiveMbaPage.programFeatures.title')}</h2>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="text-sm text-[#991E1E] mb-2">{t('programs.executiveMbaPage.programFeatures.features.workStudy.number')}</div>
                  <h3 className="text-xl font-bold text-red-800 mb-4">
                    {t('programs.executiveMbaPage.programFeatures.features.workStudy.title')}
                  </h3>
                  <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                    {t('programs.executiveMbaPage.programFeatures.features.workStudy.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-3 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
            </div>
                <div className="w-52 flex-shrink-0">
                  <img
                    src="/images/BlokMba1.png"
                    alt="Обучение без отрыва от работы"
                    className="w-full h-auto object-contain"
                  />
          </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-6">
                  <div className="flex-1">
                  <div className="text-sm text-[#991E1E] mb-2">{t('programs.executiveMbaPage.programFeatures.features.peerEducation.number')}</div>
                  <h3 className="text-xl font-bold text-red-800 mb-4">{t('programs.executiveMbaPage.programFeatures.features.peerEducation.title')}</h3>
                  <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                    {t('programs.executiveMbaPage.programFeatures.features.peerEducation.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-3 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  </div>
                <div className="w-52 flex-shrink-0">
                  <img
                    src="/images/BlokMba2.png"
                    alt="Peer to Peer education"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="text-sm text-[#991E1E] mb-2">{t('programs.executiveMbaPage.programFeatures.features.practicalImmersion.number')}</div>
                  <h3 className="text-xl font-bold text-red-800 mb-4">{t('programs.executiveMbaPage.programFeatures.features.practicalImmersion.title')}</h3>
                  <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                    {t('programs.executiveMbaPage.programFeatures.features.practicalImmersion.points', { returnObjects: true }).map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-3 mt-1">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                </ul>
                  </div>
                <div className="w-52 flex-shrink-0">
                  <img
                    src="/images/BlokMba3.png"
                    alt="Practical Immersion"
                    className="w-full h-auto object-contain"
                  />
                    </div>
                  </div>
                </div>
          </div>
        </div>
      </div>

      {/* Professional Profile Section */}
      <div className="relative bg-cover bg-center bg-no-repeat text-white py-24 px-8 min-h-screen flex items-end" style={{ backgroundImage: 'url(/images/KtoObuchaet.png)' }}>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Title Block */}
            <div className="lg:col-span-2 bg-[#F2F2F2] rounded-2xl p-8 text-black">
              {/* Tagline */}
              <div className="mb-6">
                <span className="inline-block bg-[#F2F2F2] border border-gray-300 text-[#991E1E] px-3 py-1 rounded-full text-sm font-medium">
                  {t('programs.executiveMbaPage.professionalProfile.label')}
                </span>
          </div>

              {/* Main Title */}
              <h2 className="text-3xl font-bold leading-tight">
                <span className="text-[#E94848]">{t('programs.executiveMbaPage.professionalProfile.title')}</span> <span className="text-[#991E1E]">{t('programs.executiveMbaPage.professionalProfile.titleHighlight')}</span>
              </h2>
                  </div>

            {/* Statistics Cards */}
            {/* Card 1 */}
            <div className="bg-[#F2F2F2] rounded-2xl p-6 text-black">
              <div className="text-3xl font-normal text-[#E94848] mb-5">{t('programs.executiveMbaPage.professionalProfile.statistics.topManagers.percentage')}</div>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.professionalProfile.statistics.topManagers.description')}
              </p>
                </div>

            {/* Card 2 */}
            <div className="bg-[#F2F2F2] rounded-2xl p-6 text-black">
              <div className="text-3xl font-normal text-[#E94848] mb-5">{t('programs.executiveMbaPage.professionalProfile.statistics.businessOwners.percentage')}</div>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.professionalProfile.statistics.businessOwners.description')}
              </p>
                  </div>

            {/* Card 3 */}
            <div className="bg-[#F2F2F2] rounded-2xl p-6 text-black">
              <div className="text-3xl font-normal text-[#E94848] mb-5">{t('programs.executiveMbaPage.professionalProfile.statistics.departmentHeads.percentage')}</div>
              <p className="text-[#6E767D] text-sm leading-relaxed">
                {t('programs.executiveMbaPage.professionalProfile.statistics.departmentHeads.description')}
              </p>
                </div>
                    </div>
                  </div>
                </div>

      {/* Обязательные дисциплины Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('programs.executiveMbaPage.curriculum.required.label')}
            </span>
                  </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#E94848]">{t('programs.executiveMbaPage.curriculum.required.title')}</span>
              <span className="text-[#991E1E]">{t('programs.executiveMbaPage.curriculum.required.titleHighlight')}</span>
            </h2>
                </div>

          {/* Сетка дисциплин - 2 колонки, 3 ряда */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Дисциплина 1 */}
            {t('programs.executiveMbaPage.curriculum.required.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="text-gray-400 text-sm mb-2">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-normal text-[#991E1E]">{discipline}</h3>
              </div>
            ))}
                  </div>
                    </div>
                  </div>

      {/* Дисциплины по выбору Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('programs.executiveMbaPage.curriculum.elective.label')}
            </span>
                </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#991E1E]">{t('programs.executiveMbaPage.curriculum.elective.title')}</span>
              <span className="text-[#E94848]">{t('programs.executiveMbaPage.curriculum.elective.titleHighlight')}</span>
            </h2>
                  </div>

          {/* Сетка дисциплин - 2 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t('programs.executiveMbaPage.curriculum.elective.disciplines', { returnObjects: true }).map((discipline, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="text-gray-400 text-sm mb-2">{(index + 1).toString().padStart(2, '0')}</div>
                <h3 className="text-xl font-normal text-[#991E1E]">{discipline}</h3>
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
              {t('programs.executiveMbaPage.specializations.label')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-6">
            <h2 className="text-5xl font-normal mb-4">
              <span className="text-[#E94848]">{t('programs.executiveMbaPage.specializations.title')}</span>
              <span className="text-[#991E1E]">{t('programs.executiveMbaPage.specializations.titleHighlight')}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-4xl mx-auto">
              {t('programs.executiveMbaPage.specializations.subtitle')}
            </p>
          </div>

          {/* Сетка специализаций - 2 колонки */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Специализация 1 - Стратегическое управление */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/BlockMbaF4.jpg" 
                  alt="Стратегическое управление" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
                </div>
              <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-gray-500 text-sm mb-2">{t('programs.executiveMbaPage.specializations.specializationLabel')}</div>
                <h3 className="text-2xl font-normal text-[#E94848] mb-6">{t('programs.executiveMbaPage.specializations.items.strategicManagement.title')}</h3>
                <ul className="space-y-3">
                  {t('programs.executiveMbaPage.specializations.items.strategicManagement.points', { returnObjects: true }).map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Специализация 2 - Стратегический HR */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/BMba2.png" 
                  alt="Стратегический HR" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-gray-500 text-sm mb-2">{t('programs.executiveMbaPage.specializations.specializationLabel')}</div>
                <h3 className="text-2xl font-normal text-[#E94848] mb-6">{t('programs.executiveMbaPage.specializations.items.strategicHR.title')}</h3>
                <ul className="space-y-3">
                  {t('programs.executiveMbaPage.specializations.items.strategicHR.points', { returnObjects: true }).map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Специализация 3 - ИИ в бизнесе */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/BMba3.jpg" 
                  alt="ИИ в бизнесе" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-gray-500 text-sm mb-2">{t('programs.executiveMbaPage.specializations.specializationLabel')}</div>
                <h3 className="text-2xl font-normal text-[#E94848] mb-6">{t('programs.executiveMbaPage.specializations.items.aiInBusiness.title')}</h3>
                <ul className="space-y-3">
                  {t('programs.executiveMbaPage.specializations.items.aiInBusiness.points', { returnObjects: true }).map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Специализация 4 - Финансовые технологии */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/BMba4.jpg" 
                  alt="Финансовые технологии" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
              <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-gray-500 text-sm mb-2">{t('programs.executiveMbaPage.specializations.specializationLabel')}</div>
                <h3 className="text-2xl font-normal text-[#E94848] mb-6">{t('programs.executiveMbaPage.specializations.items.fintech.title')}</h3>
                <ul className="space-y-3">
                  {t('programs.executiveMbaPage.specializations.items.fintech.points', { returnObjects: true }).map((point, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-[#E94848] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              </div>

            {/* Специализация 5 - Финансы */}
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
              <div className="h-64 overflow-hidden rounded-t-2xl">
                <img 
                  src="/images/FinanceBl.jpg" 
                  alt="Финансы" 
                  className="w-full h-full object-cover rounded-t-2xl rounded-b-2xl"
                />
              </div>
              <div className="p-8 rounded-t-2xl rounded-b-2xl" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="text-gray-500 text-sm mb-2">{t('programs.executiveMbaPage.specializations.specializationLabel')}</div>
                <h3 className="text-2xl font-normal text-[#E94848] mb-6">{t('programs.executiveMbaPage.specializations.items.finance.title')}</h3>
                <ul className="space-y-3">
                  {t('programs.executiveMbaPage.specializations.items.finance.points', { returnObjects: true }).map((point, index) => (
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
      <div className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-left mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#991E1E]">{t('programs.executiveMbaPage.fieldModules.title')}</span>
              <span className="text-[#E94848]">{t('programs.executiveMbaPage.fieldModules.titleHighlight')}</span>
            </h2>
          </div>

                    {/* Карусель университетов */}
          <div className="relative min-h-[600px]">
                        {/* Стрелка влево - фиксированная позиция */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className={`absolute left-4 top-[250px] z-10 bg-white rounded-full p-3 border border-gray-200 transition-all duration-300 ease-out ${
                isTransitioning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 hover:scale-110 hover:shadow-lg active:scale-95'
              }`}
            >
              <svg className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                isTransitioning ? 'scale-90' : 'group-hover:scale-110'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
            </button>

            {/* Стрелка вправо - фиксированная позиция */}
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className={`absolute right-4 top-[250px] z-10 bg-white rounded-full p-3 border border-gray-200 transition-all duration-300 ease-out ${
                isTransitioning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-50 hover:scale-110 hover:shadow-lg active:scale-95'
              }`}
            >
              <svg className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
                isTransitioning ? 'scale-90' : 'group-hover:scale-110'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
            </button>

                                    {/* Сетка университетов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
              {getCurrentUniversities().map((university, index) => (
                <div 
                  key={`${university.id}-${currentSlide}`} 
                  className={`bg-white rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                    isTransitioning 
                      ? 'opacity-0 transform scale-90 translate-y-8 rotate-1' 
                      : 'opacity-100 transform scale-100 translate-y-0 rotate-0'
                  }`}
                  style={{ 
                    transitionDelay: `${isTransitioning ? 0 : index * 150}ms`,
                    transformOrigin: 'center bottom'
                  }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={university.image} 
                      alt={university.title} 
                      className={`w-full h-full object-cover rounded-t-2xl rounded-b-2xl transition-all duration-500 ${
                        isTransitioning 
                          ? 'transform scale-110 blur-sm' 
                          : 'transform scale-100 blur-0'
                      }`}
                    />
              </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-normal text-[#991E1E] mb-4 transition-all duration-500 ${
                      isTransitioning 
                        ? 'opacity-0 transform translate-y-4' 
                        : 'opacity-100 transform translate-y-0'
                    }`}
                    style={{ transitionDelay: `${isTransitioning ? 0 : index * 150 + 100}ms` }}
                    >
                      {university.title}
                    </h3>
                    <p className={`text-[#6E767D] text-sm mb-6 leading-relaxed transition-all duration-500 ${
                      isTransitioning 
                        ? 'opacity-0 transform translate-y-4' 
                        : 'opacity-100 transform translate-y-0'
                    }`}
                    style={{ transitionDelay: `${isTransitioning ? 0 : index * 150 + 200}ms` }}
                    >
                      {university.description}
                    </p>
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`inline-block bg-[#E94848] text-white py-3 px-6 rounded-full font-medium hover:bg-[#D13A3A] transition-all duration-500 ${
                        isTransitioning 
                          ? 'opacity-0 transform translate-y-4 scale-95' 
                          : 'opacity-100 transform translate-y-0 scale-100'
                      }`}
                      style={{ transitionDelay: `${isTransitioning ? 0 : index * 150 + 300}ms` }}
                    >
                      {university.websiteText}
                    </a>
                </div>
              </div>
            ))}
            </div>

            {/* Индикаторы пагинации */}
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isTransitioning) return;
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setTimeout(() => setIsTransitioning(false), 50);
                    }, 400);
                  }}
                  className={`relative w-4 h-4 rounded-full transition-all duration-500 ease-out ${
                    index === currentSlide 
                      ? 'bg-[#E94848] scale-125 shadow-lg shadow-[#E94848]/30' 
                      : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                  }`}
                >
                  {index === currentSlide && (
                    <div className="absolute inset-0 rounded-full bg-[#E94848] animate-ping opacity-20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
              </div>
            </div>

      {/* Международное признание диплома Section */}
      <div className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#E94848]">{t('programs.executiveMbaPage.diplomaRecognition.title')}</span>
              <span className="text-[#991E1E]">{t('programs.executiveMbaPage.diplomaRecognition.titleHighlight')}</span>
            </h2>
          </div>

          {/* Сетка карточек - 3 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Карточка 1 - Глобальное признание */}
            <div className="bg-[#F2F2F2] rounded-2xl overflow-hidden">
              <div className="h-80 overflow-hidden p-5">
                <img 
                  src="/images/globalpo.jpg" 
                  alt="Глобальное признание" 
                  className="w-full h-full object-cover rounded-xl"
              />
            </div>
              <div className="p-6">
                <h3 className="text-xl font-normal text-[#991E1E] mb-4">{t('programs.executiveMbaPage.diplomaRecognition.cards.globalRecognition.title')}</h3>
                <p className="text-[#6E767D] text-sm leading-relaxed">
                  {t('programs.executiveMbaPage.diplomaRecognition.cards.globalRecognition.description')}
              </p>
            </div>
          </div>

            {/* Карточка 2 - Надёжный диплом */}
            <div className="bg-[#991E1E] rounded-2xl overflow-hidden">
              <div className="h-80 overflow-hidden p-5">
                <img 
                  src="/images/Krasnays.png" 
                  alt="Надёжный диплом" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-normal text-white mb-4">{t('programs.executiveMbaPage.diplomaRecognition.cards.reliableDiploma.title')}</h3>
                <p className="text-white text-sm leading-relaxed">
                  {t('programs.executiveMbaPage.diplomaRecognition.cards.reliableDiploma.description')}
                </p>
        </div>
      </div>

            {/* Карточка 3 - Аккредитации Narxoz */}
            <div className="bg-[#F2F2F2] rounded-2xl overflow-hidden">
              <div className="h-80 overflow-hidden p-5">
                <img 
                  src="/images/accreblock.jpg" 
                  alt="Аккредитации Narxoz" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-normal text-[#991E1E] mb-4">{t('programs.executiveMbaPage.diplomaRecognition.cards.narxozAccreditations.title')}</h3>
                <p className="text-[#6E767D] text-sm leading-relaxed" 
                   dangerouslySetInnerHTML={{ 
                     __html: t('programs.executiveMbaPage.diplomaRecognition.cards.narxozAccreditations.description') 
                   }}>
                </p>
              </div>
            </div>
          </div>
        </div>
            </div>

      {/* Отзывы выпускников Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Block - Title */}
            <div>
              <h2 className="text-5xl font-normal leading-tight">
                <span className="text-[#991E1E]">{t('programs.executiveMbaPage.graduateReviews.title')}</span>
                <br />
                <span className="text-[#991E1E]">{t('programs.executiveMbaPage.graduateReviews.titleHighlight')}</span>
                <br />
                <span className="text-[#991E1E]">{t('programs.executiveMbaPage.graduateReviews.groupText')}</span>
                <br />
                <span className="text-[#E94848]">{t('programs.executiveMbaPage.graduateReviews.companyText')}</span>
              </h2>
              </div>

                         {/* Right Block - Review Card */}
             <div className="bg-white rounded-2xl p-6 relative">
              {/* Review Navigation */}
              <div className="flex gap-4 mb-4">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`text-sm font-semibold transition-colors ${
                      currentReview === index 
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

              {/* Review Text with Animation */}
              <div className="relative h-24 mb-6 overflow-hidden">
                {reviews.map((review, index) => (
                  <blockquote 
                    key={index}
                    className={`text-lg text-gray-800 leading-relaxed absolute w-full transition-all duration-500 ease-in-out ${
                      currentReview === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    {review.text}
                  </blockquote>
                ))}
          </div>

              {/* Author Info with Animation */}
              <div className="relative h-12 overflow-hidden">
                {reviews.map((review, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 absolute w-full transition-all duration-500 ease-in-out ${
                      currentReview === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={review.image} 
                        alt={review.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
            <div>
                      <div className="font-bold text-[#E94848] text-base">
                        {review.author}
              </div>
                      <div className="text-gray-600 text-sm">
                        {review.position}
                      </div>
                    </div>
                  </div>
                ))}
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
              {t('programs.executiveMbaPage.contactSection.title')}
            </h2>
            <p className="text-[#6E767D] text-lg max-w-3xl mx-auto">
              {t('programs.executiveMbaPage.contactSection.subtitle')}
            </p>
          </div>

          {/* Форма заявки */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('programs.executiveMbaPage.contactSection.form.firstName.label')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('programs.executiveMbaPage.contactSection.form.firstName.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('programs.executiveMbaPage.contactSection.form.lastName.label')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={(e) => handleContactInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('programs.executiveMbaPage.contactSection.form.lastName.placeholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('programs.executiveMbaPage.contactSection.form.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('programs.executiveMbaPage.contactSection.form.email.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('programs.executiveMbaPage.contactSection.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
                      placeholder={t('programs.executiveMbaPage.contactSection.form.phone.placeholder')}
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
                    {t('programs.executiveMbaPage.contactSection.form.privacyPolicy')}
                  </label>
            </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-lg"
              >
                {t('programs.executiveMbaPage.contactSection.form.submitButton')}
                </button>
              </form>
      </div>

            {/* Контактная информация */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('programs.executiveMbaPage.contactSection.contactInfo.title')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('programs.executiveMbaPage.contactSection.contactInfo.phone.title')}</h4>
                  <p className="text-[#6E767D]">{t('programs.executiveMbaPage.contactSection.contactInfo.phone.value')}</p>
            </div>
            <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('programs.executiveMbaPage.contactSection.contactInfo.email.title')}</h4>
                  <p className="text-[#6E767D]">{t('programs.executiveMbaPage.contactSection.contactInfo.email.value')}</p>
            </div>
            <div>
                  <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('programs.executiveMbaPage.contactSection.contactInfo.address.title')}</h4>
                  <p className="text-[#6E767D]">{t('programs.executiveMbaPage.contactSection.contactInfo.address.value')}</p>
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
        programName="Executive MBA (Executive Master of Business Administration)"
        programType={PROGRAM_TYPES.EXECUTIVE_MBA}
      />

    </div>
  );
};

export default ExecutiveMBA;
