import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import PresentationModal from '../../../components/ui/PresentationModal';
import { formDataAPI, PROGRAM_TYPES } from '../../../services/api';

// CSS анимации для карточек
const fadeInUpAnimation = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;

// Добавляем стили в head
if (typeof document !== 'undefined' && !document.getElementById('dba-animations')) {
  const style = document.createElement('style');
  style.id = 'dba-animations';
  style.textContent = fadeInUpAnimation;
  document.head.appendChild(style);
}

const features = [
  {
    number: '01',
    title: 'Исследовательская направленность',
    stats: '100% диссертаций защищены успешно',
    points: [
      'Глубокие теоретические знания в области бизнес-администрирования',
      'Практические исследования с применением современных методологий',
    ],
  },
  {
    number: '02',
    title: 'Международные стандарты',
    stats: 'Соответствие международным стандартам PhD',
    points: [
      'Программа разработана в соответствии с международными стандартами',
      'Возможность публикаций в международных научных журналах',
    ],
  },
  {
    number: '03',
    title: 'Экспертный уровень',
    stats: 'Подготовка к академической карьере',
    points: [
      'Возможность преподавания в университетах',
      'Консультационная деятельность в области бизнеса',
    ],
  },
  {
    number: '04',
    title: 'Индивидуальный подход',
    stats: 'Персональный научный руководитель',
    points: [
      'Индивидуальный план обучения и исследований',
      'Гибкий график работы над диссертацией',
    ],
  },
];

const modules = [
  {
    title: 'Методология научных исследований',
    subtitle: 'Обязательный модуль',
    description: 'Изучение методологии научных исследований в области бизнес-администрирования',
    topics: [
      'Философия науки и методология',
      'Количественные и качественные методы',
      'Статистический анализ данных',
      'Научное письмо и публикации',
    ],
  },
  {
    title: 'Теория организации и управления',
    subtitle: 'Обязательный модуль',
    description: 'Углубленное изучение теорий организации и управления',
    topics: [
      'Классические и современные теории организации',
      'Стратегическое управление',
      'Организационное поведение',
      'Теория принятия решений',
    ],
  },
  {
    title: 'Экономическая теория',
    subtitle: 'Обязательный модуль',
    description: 'Продвинутые концепции экономической теории',
    topics: [
      'Микроэкономика и макроэкономика',
      'Экономика организации',
      'Институциональная экономика',
      'Экономика развития',
    ],
  },
  {
    title: 'Финансовые рынки и институты',
    subtitle: 'Обязательный модуль',
    description: 'Изучение финансовых рынков и институтов',
    topics: [
      'Теория финансов',
      'Финансовые рынки и инструменты',
      'Корпоративные финансы',
      'Международные финансы',
    ],
  },
  {
    title: 'Маркетинг и потребительское поведение',
    subtitle: 'Обязательный модуль',
    description: 'Теоретические основы маркетинга и поведения потребителей',
    topics: [
      'Теория маркетинга',
      'Поведение потребителей',
      'Стратегический маркетинг',
      'Международный маркетинг',
    ],
  },
  {
    title: 'Инновации и предпринимательство',
    subtitle: 'Обязательный модуль',
    description: 'Изучение инноваций и предпринимательской деятельности',
    topics: [
      'Теория инноваций',
      'Предпринимательство и стартапы',
      'Управление инновациями',
      'Технологическое предпринимательство',
    ],
  },
];









const DBA = () => {
  const { t } = useTranslation();
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentMoreThanLearningPage, setCurrentMoreThanLearningPage] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

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
      const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.DBA);
      
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
    try {
      // Сохраняем данные формы в CSV формате
      const saveResult = await formDataAPI.savePresentationFormData(formData, PROGRAM_TYPES.DBA);
      
      if (saveResult.success) {
        console.log('Данные формы сохранены:', saveResult.data);
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
      } else {
        console.error('Ошибка при сохранении данных формы');
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных формы:', error);
      alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
    }
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации DBA
    const link = document.createElement('a');
    link.href = '/presentations/DBA доктор дел. админ.pdf';
    link.download = 'DBA-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Карусель университетов
  const slidesToShow = 3;
  const totalSlides = Math.ceil(t('dbaPage.fieldModules.universities', { returnObjects: true }).length / slidesToShow);

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
    const universitiesData = t('dbaPage.fieldModules.universities', { returnObjects: true });
    return universitiesData.slice(startIndex, startIndex + slidesToShow);
  };

  const nextMoreThanLearningPage = () => {
    setCurrentMoreThanLearningPage(1);
  };

  const prevMoreThanLearningPage = () => {
    setCurrentMoreThanLearningPage(0);
  };

  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(faculty);
    setShowFacultyModal(true);
  };

  const closeFacultyModal = () => {
    setShowFacultyModal(false);
    setSelectedFaculty(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen flex items-end justify-center overflow-hidden pb-12 sm:pb-16 md:pb-20 pt-24 sm:pt-28 md:pt-32">
        {/* Background Image */}
        <img 
          src="/images/DBA/Hero.JPG" 
          alt="DBA программа - Выпускники" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-3 sm:px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">{t('dbaPage.hero.title')}</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-medium mb-6 sm:mb-8 opacity-90">
            {t('dbaPage.hero.subtitle')}
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
              <div className="font-semibold text-sm sm:text-base md:text-lg">{t('dbaPage.hero.downloadPresentation')}</div>
              <div className="text-xs sm:text-sm opacity-90 uppercase">
                {t('dbaPage.hero.downloadDescription')}
              </div>
          </div>
          </button>
        </div>

      </div>

      {/* Testimonial Section - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left Block - Title */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                <span className="text-[#991E1E]">{t('dbaPage.testimonial.welcome.line1')}</span>
                <br />
                <span className="text-[#991E1E]">{t('dbaPage.testimonial.welcome.line2')}</span>
                <br />
                <span className="text-[#E94848]">{t('dbaPage.testimonial.welcome.line3')}</span>
              </h2>
              <div className="pt-8 sm:pt-12 md:pt-48">
                <button
                  onClick={() => setShowContactInfo(true)}
                  className="bg-[#991E1E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base"
                >
                  {t('dbaPage.testimonial.contactButton')}
                </button>
              </div>
            </div>

            {/* Right Block - Review Card */}
            <div className="bg-[#F2F2F2] rounded-2xl p-4 sm:p-6 md:p-8 relative order-1 lg:order-2">

              {/* Quote Mark */}
              <div className="text-[#991E1E] text-4xl sm:text-5xl md:text-6xl font-bold">"</div>

              {/* Review Text with Animation */}
              <div className="relative h-64 sm:h-72 md:h-80 mb-6 sm:mb-8 overflow-hidden">
                {t('dbaPage.testimonial.testimonials', { returnObjects: true }).map((testimonial, index) => (
                  <blockquote 
                    key={index}
                    className={`text-sm sm:text-base text-[#6E767D] leading-relaxed absolute w-full transition-all duration-500 ease-in-out ${
                      currentTestimonial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    {testimonial.text}
                  </blockquote>
                ))}
              </div>

              {/* Author Info with Animation */}
              <div className="relative h-12 sm:h-14 md:h-16 overflow-hidden">
                {t('dbaPage.testimonial.testimonials', { returnObjects: true }).map((testimonial, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 sm:gap-4 absolute w-full transition-all duration-500 ease-in-out ${
                      currentTestimonial === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden">
                      <img 
                        src="/images/DBA/Marina reviews.png" 
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

      {/* Purpose Section - Программа для стремящихся - Enhanced Mobile Optimization */}
      <div className="px-3 sm:px-4 md:px-8">
        <div className="max-w-full mx-auto">
          <div className="bg-[#991E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-left mb-8 sm:mb-12 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
                  {t('dbaPage.purpose.title')}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {t('dbaPage.purpose.cards', { returnObjects: true }).map((card, index) => (
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
                          src={`/images/DBA/${index + 1}.jpg`}
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

      {/* Why Now Section - Почему именно сейчас? - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('dbaPage.whyNow.tag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#E94848]">{t('dbaPage.whyNow.title')}</span>
            </h2>
          </div>

          {/* Сетка 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {t('dbaPage.whyNow.cards', { returnObjects: true }).map((card, index) => (
              <div key={index} className="rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300" style={{ backgroundColor: '#F2F2F2' }}>
                <div className="flex flex-col md:flex-row h-auto md:h-80">
                  {/* Изображение */}
                  <div className="md:w-1/2 h-48 sm:h-56 md:h-full p-4 sm:p-6 md:p-8">
                    <img 
                      src={`/images/DBA/Why${index + 1}.${index === 0 ? 'png' : 'jpg'}`}
                      alt={card.title}
                      className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                    />
                  </div>
                  
                  {/* Текст */}
                  <div className="md:w-1/2 p-4 sm:p-6 flex items-center">
                    <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Modules Section - Ключевые учебные модули - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('dbaPage.keyModules.tag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#E94848]">{t('dbaPage.keyModules.title.part1')}</span> <span className="text-[#991E1E]">{t('dbaPage.keyModules.title.part2')}</span>
            </h2>
          </div>

          {/* Сетка модулей */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {t('dbaPage.keyModules.modules', { returnObjects: true }).map((module, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="mb-3 sm:mb-4">
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{module.number}</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-[#991E1E] leading-relaxed">
                  {module.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bonus Sessions Section - Дополнительные (бонусные) сессии - Enhanced Mobile Optimization */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
          <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('dbaPage.bonusSessions.tag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#E94848]">{t('dbaPage.bonusSessions.title.part1')}</span> <span className="text-[#991E1E]">{t('dbaPage.bonusSessions.title.part2')}</span>
            </h2>
          </div>

          {/* Сетка бонусных сессий */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {t('dbaPage.bonusSessions.sessions', { returnObjects: true }).map((session, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="mb-3 sm:mb-4">
                  <span className="text-gray-400 text-xs sm:text-sm font-semibold">{session.number}</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-[#991E1E] leading-relaxed">
                  {session.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
            </div>

      {/* Field Modules Section - Возможные выездные модули - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-12 px-3 sm:px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-left mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">
              <span className="text-[#991E1E]">{t('dbaPage.fieldModules.title.part1')}</span>
              <span className="text-[#E94848]"> {t('dbaPage.fieldModules.title.part2')}</span>
            </h2>
          </div>

          {/* Карусель университетов */}
          <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
            {/* Стрелка влево - улучшенная для мобильных */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className={`absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 md:p-3 border border-gray-200 shadow-lg transition-all duration-300 ease-out touch-manipulation ${
                isTransitioning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95 active:bg-gray-50'
              }`}
            >
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-gray-700 transition-transform duration-300 ${
                isTransitioning ? 'scale-90' : 'group-hover:scale-110'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Стрелка вправо - улучшенная для мобильных */}
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className={`absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-3 sm:p-4 md:p-3 border border-gray-200 shadow-lg transition-all duration-300 ease-out touch-manipulation ${
                isTransitioning 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white hover:scale-110 hover:shadow-xl active:scale-95 active:bg-gray-50'
              }`}
            >
              <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-gray-700 transition-transform duration-300 ${
                isTransitioning ? 'scale-90' : 'group-hover:scale-110'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Сетка университетов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-8 sm:px-12">
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

      {/* More Than Learning Section - Больше, чем просто обучение */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#991E1E] text-[#991E1E] px-4 py-2 rounded-full text-sm font-medium">
              {t('dbaPage.moreThanLearning.tag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal">
              <span className="text-[#E94848]">{t('dbaPage.moreThanLearning.title.part1')}</span> <span className="text-[#991E1E]">{t('dbaPage.moreThanLearning.title.part2')}</span>
            </h2>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t('dbaPage.moreThanLearning.cards', { returnObjects: true }).slice(currentMoreThanLearningPage * 3, (currentMoreThanLearningPage + 1) * 3).map((card, index) => (
                <div 
                  key={`${card.id}-${currentMoreThanLearningPage}`} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group h-[500px] opacity-0 transform translate-y-8 animate-fade-in-up"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                {/* Изображение с иконкой */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Иконка в левом верхнем углу */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {card.icon === 'star' && (
                      <svg className="w-6 h-6 text-[#E94848]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    )}
                    {card.icon === 'graduation' && (
                      <svg className="w-6 h-6 text-[#E94848]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    )}
                    {card.icon === 'headset' && (
                      <svg className="w-6 h-6 text-[#E94848]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
                      </svg>
                    )}
                    {card.icon === 'lightbulb' && (
                      <svg className="w-6 h-6 text-[#E94848]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                        <path d="M11 19h2v2h-2z"/>
                      </svg>
                    )}
                    {card.icon === 'gear' && (
                      <svg className="w-6 h-6 text-[#E94848]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#991E1E] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={prevMoreThanLearningPage}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentMoreThanLearningPage === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#991E1E] text-white hover:bg-[#7A1818]'
              }`}
              disabled={currentMoreThanLearningPage === 0}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="mx-8 flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${currentMoreThanLearningPage === 0 ? 'bg-[#991E1E]' : 'bg-gray-300'}`}></div>
              <div className={`w-3 h-3 rounded-full ${currentMoreThanLearningPage === 1 ? 'bg-[#991E1E]' : 'bg-gray-300'}`}></div>
            </div>
            
            <button
              onClick={nextMoreThanLearningPage}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentMoreThanLearningPage === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#991E1E] text-white hover:bg-[#7A1818]'
              }`}
              disabled={currentMoreThanLearningPage === 1}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Faculty Section - Наши Преподаватели */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Text Block */}
            <div className="bg-[#991E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              {/* Diagonal accent shape */}
              <div className="absolute top-0 left-0 w-64 sm:w-96 lg:w-128 h-64 sm:h-96 lg:h-128 bg-[#E94848] transform rotate-45 -translate-x-10 sm:-translate-x-16 lg:-translate-x-20 -translate-y-10 sm:-translate-y-16 lg:-translate-y-20 opacity-80 rounded-2xl sm:rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Top tag */}
                <div className="inline-block bg-[#E94848] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                  {t('dbaPage.faculty.tag')}
                </div>
                
                {/* Main text */}
                <div className="text-white space-y-1 sm:space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                    {t('dbaPage.faculty.title')}
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('dbaPage.faculty.subtitle.line1')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('dbaPage.faculty.subtitle.line2')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('dbaPage.faculty.subtitle.line3')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('dbaPage.faculty.subtitle.line4')}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Block */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/нпо/PreAks.PNG" 
                alt="Преподаватель" 
                className="w-full h-auto rounded-2xl sm:rounded-3xl object-cover"
              />
            </div>
          </div>
          
          {/* Faculty Grid - продолжение секции */}
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {t('dbaPage.faculty.members', { returnObjects: true }).map((member) => (
                <div key={member.id} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    {/* Circular profile image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Black line separator after photo */}
                    <div className="w-full h-px bg-black mx-auto mb-3 sm:mb-4"></div>
                    
                    {/* Name and title */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-normal text-[#991E1E] mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed flex-1">
                      {member.title}
                    </p>
                    
                    {/* Action button - aligned at bottom */}
                    <button 
                      onClick={() => handleFacultyClick(member)}
                      className="w-full bg-[#E94848] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#D13A3A] transition-colors mt-auto"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Контактная секция */}
      <div className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#991E1E] mb-4 sm:mb-6">
              {t('dbaPage.contact.title')}
            </h2>
            <p className="text-[#6E767D] text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
              {t('dbaPage.contact.subtitle')}
            </p>
          </div>

          {/* Форма заявки */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('dbaPage.contact.form.firstName.label')}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={(e) => handleContactInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('dbaPage.contact.form.firstName.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('dbaPage.contact.form.lastName.label')}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={(e) => handleContactInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('dbaPage.contact.form.lastName.placeholder')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('dbaPage.contact.form.email.label')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactFormData.email}
                      onChange={(e) => handleContactInputChange('email', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('dbaPage.contact.form.email.placeholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                      {t('dbaPage.contact.form.phone.label')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactFormData.phone}
                      onChange={(e) => handleContactInputChange('phone', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all text-sm sm:text-base"
                      placeholder={t('dbaPage.contact.form.phone.placeholder')}
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
                    {t('dbaPage.contact.form.agreement')}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#991E1E] text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium hover:bg-[#7A1818] transition-colors text-sm sm:text-base md:text-lg"
                >
                  {t('dbaPage.contact.form.submitButton')}
                </button>
              </form>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
              {t('dbaPage.contact.contactInfo.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('dbaPage.contact.contactInfo.phone.label')}</h4>
                <p className="text-[#6E767D]">{t('dbaPage.contact.contactInfo.phone.value')}</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('dbaPage.contact.contactInfo.email.label')}</h4>
                <p className="text-[#6E767D]">{t('dbaPage.contact.contactInfo.email.value')}</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#991E1E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{t('dbaPage.contact.contactInfo.address.label')}</h4>
                <p className="text-[#6E767D]">{t('dbaPage.contact.contactInfo.address.value')}</p>
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
                {t('dbaPage.testimonial.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dbaPage.testimonial.contactModal.phone')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('dbaPage.testimonial.contactModal.phoneNumber')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dbaPage.testimonial.contactModal.email')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('dbaPage.testimonial.contactModal.emailAddress')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('dbaPage.testimonial.contactModal.address')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('dbaPage.testimonial.contactModal.fullAddress')}</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowContactInfo(false)}
                className="mt-6 bg-[#991E1E] text-white px-6 py-2 rounded-full hover:bg-[#7A1818] transition-colors"
              >
                {t('dbaPage.testimonial.contactModal.closeButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Modal */}
      {showFacultyModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-12 w-[95vw] sm:w-[90vw] lg:w-[80vw] h-[95vh] sm:h-[90vh] lg:h-[80vh] max-w-6xl overflow-hidden relative">
            {/* Close button */}
            <button 
              onClick={closeFacultyModal}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 h-full overflow-y-auto">
              {/* Left Column - Faculty Image */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-sm sm:max-w-md lg:w-96 h-64 sm:h-80 lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden">
                  <img 
                    src={selectedFaculty.image} 
                    alt={selectedFaculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Right Column - Faculty Info */}
              <div className="flex flex-col justify-center">
                {/* Specialization */}
                <div className="mb-3 sm:mb-4">
                  <span className="bg-[#991E1E] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium uppercase">
                    {selectedFaculty.specialization}
                  </span>
      </div>
                
                {/* Faculty Name */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#991E1E] mb-3 sm:mb-4">
                  {selectedFaculty.name}
                </h2>
                
                {/* Faculty Title */}
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {selectedFaculty.title}
                </p>
                
                {/* Faculty Description */}
                <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                  <p>{selectedFaculty.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <PresentationModal
        isOpen={showPresentationModal}
        onClose={() => setShowPresentationModal(false)}
        onDownload={handleDownloadPresentation}
        programName="DBA (Doctor of Business Administration)"
        programType={PROGRAM_TYPES.DBA}
      />
    </div>
  );
};

export default DBA;
