import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import Slider from '../../components/ui/Slider';
import PagerIndicator from '../../components/ui/PagerIndicator';
import BusinessSchoolGrid from './BusinessSchoolGrid';
import ExecutiveSessionsSection from './ExecutiveSessionsSection';
import ExecutiveEducationGrid from './ExecutiveEducationGrid';
import StatsNumbers from './StatsNumbers';
import RankingSection from './RankingSection';
import { useToast } from '../../hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useTranslatedNews } from '../../data/translatedNewsData';
import { formDataAPI } from '../../services/api';


const Homepage = () => {
  const { t } = useTranslation();
  const { showConsultationSuccess, showContactSuccess } = useToast();
  const { validateConsultationForm, validateContactForm, showValidationErrors } = useFormValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [currentGraduatesPage, setCurrentGraduatesPage] = useState(0);
  const [currentFacultyIndex, setCurrentFacultyIndex] = useState(0);
  const [currentAdminIndex, setCurrentAdminIndex] = useState(0);
  const [currentNewsPage, setCurrentNewsPage] = useState(0);
  const [expandedFacultyCards, setExpandedFacultyCards] = useState({});
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Обработчик клавиши Escape для закрытия модального окна
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsContactModalOpen(false);
      }
    };

    if (isContactModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокируем скролл
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset'; // Возвращаем скролл
    };
  }, [isContactModalOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContactFormChange = (field, value) => {
    setContactFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleConsultationSubmit = async () => {
    const errors = validateConsultationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    try {
      // Сохраняем данные консультации
      await formDataAPI.saveConsultationRequest(formData, 'homepage');
      showConsultationSuccess();
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Ошибка сохранения консультации:', error);
      showConsultationSuccess(); // Показываем успех пользователю даже при ошибке
      setFormData({ name: '', phone: '', email: '' });
    }
  };

  const handleContactSubmit = async () => {
    const errors = validateContactForm(contactFormData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }
    
    try {
      // Сохраняем данные контактной формы
      await formDataAPI.saveConsultationRequest(contactFormData, 'contact-form');
      showContactSuccess();
      setContactFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Ошибка сохранения контактной формы:', error);
      showContactSuccess(); // Показываем успех пользователю даже при ошибке
      setContactFormData({ name: '', email: '', phone: '' });
    }
  };

  const handleFacultyNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentFacultyIndex(Math.min(faculty.length - 4, currentFacultyIndex + 1));
    } else {
      setCurrentFacultyIndex(Math.max(0, currentFacultyIndex - 1));
    }
    // Сбрасываем состояние развернутых карточек при смене страницы
    setExpandedFacultyCards({});
  };

  const handleAdminNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentAdminIndex(Math.min(administration.length - 4, currentAdminIndex + 1));
    } else {
      setCurrentAdminIndex(Math.max(0, currentAdminIndex - 1));
    }
  };

  const toggleFacultyCard = (index) => {
    setExpandedFacultyCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };





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
    {
      src: '/images/img_image_15.png',
      name: 'British Chamber of Commerce in Kazakhstan',
      url: 'https://www.bcck.kz',
    },
    { src: '/images/img_image_25.png', name: 'AmCham', url: 'https://www.amcham.kz' },
  ];

  const accreditationItems = [
    {
      image: '/images/FIbaa.png',
      text: '2% of universities in central asia',
    },
    {
      image: '/images/Fibaa2.png',
      text: '7% of universities in central asia',
    },
    {
      image: '/images/img_channels4profile_1.png',
      text: '7% of universities in central asia',
    },
    {
      image: '/images/CEEMAN.png',
      text: 'MBA QS',
    },
    {
      image: '/images/mbaqs.png',
      text: 'In the process of accreditation',
    },
    {
      image: '/images/img_cimalogo1280x647_1.png',
      text: 'Chartered institute of management accountants',
    },
    {
      image: '/images/ACCA_logo.png',
      text: 'Accreditation & test center',
    },
    {
      image: '/images/img_images_1.png',
      text: 'Ranked in ui greenmetric',
    },
    {
      image: '/images/cim.png',
      text: 'Chartered institute of marketing',
    },
    {
      image: '/images/img_thelogoimpactrank_1.png',
      text: 'Quality of education (600-800)',
    },
    {
      image: '/images/img_images_2.png',
      text: '451-500 range together with top universities in asia',
    },
    {
      image: '/images/img_qsworlduniversityrankingslogo_1.png',
      text: 'Listed in the world top university rankings',
    },
    {
      image: '/images/img_qsworlduniversityrankingslogo_2.png',
      text: 'Governance (top 25% globally)',
    },
    {
      image: '/images/img_qs5starspkusratingsystem_1.png',
      text: 'Rated for excellence by qs stars',
    },
    {
      image: '/images/img_nppatameken_1.png',
      text: 'Top-3 universities in Kazakhstan',
    },
  ];



  const graduates = [
    { name: 'Ляззат Альжанова', description: 'Про Executive MBA для руководителей НПО НКО' },
    { name: 'Айнаш Касенова', description: 'Про Executive MBA для руководителей НПО НКО' },
    { name: 'Ляззат Альжанова', description: 'Про Executive MBA для руководителей НПО НКО' },
    { name: 'Ляззат Альжанова', description: 'Про Executive MBA для руководителей НПО НКО' },
  ];

  const faculty = [
    {
      image: '/images/Yelzhas.png',
      name: t('homepage.faculty.0.name'),
      description: t('homepage.faculty.0.description'),
    },
    {
      image: '/images/Oleg.png',
      name: t('homepage.faculty.1.name'),
      description: t('homepage.faculty.1.description'),
    },
    {
      image: '/images/Ulia.png',
      name: t('homepage.faculty.2.name'),
      description: t('homepage.faculty.2.description'),
    },
    {
      image: '/images/Irina.png',
      name: t('homepage.faculty.3.name'),
      description: t('homepage.faculty.3.description'),
    },
    {
      image: '/images/Lilya.png',
      name: t('homepage.faculty.4.name'),
      description: t('homepage.faculty.4.description'),
    },
    {
      image: '/images/Zevira.png',
      name: t('homepage.faculty.5.name'),
      description: t('homepage.faculty.5.description'),
    },
    {
      image: '/images/Kaisar.png',
      name: t('homepage.faculty.6.name'),
      description: t('homepage.faculty.6.description'),
    },
    {
      image: '/images/Marina.png',
      name: t('homepage.faculty.7.name'),
      description: t('homepage.faculty.7.description'),
    },
    {
      image: '/images/Aleksandr.png',
      name: t('homepage.faculty.8.name'),
      description: t('homepage.faculty.8.description'),
    },
    {
      image: '/images/Marat.png',
      name: t('homepage.faculty.9.name'),
      description: t('homepage.faculty.9.description'),
    },
    {
      image: '/images/Andrei.png',
      name: t('homepage.faculty.10.name'),
      description: t('homepage.faculty.10.description'),
    },
    {
      image: '/images/Nikolai.png',
      name: t('homepage.faculty.11.name'),
      description: t('homepage.faculty.11.description'),
    },
    {
      image: '/images/Maksim.png',
      name: t('homepage.faculty.12.name'),
      description: t('homepage.faculty.12.description'),
    },
    {
      image: '/images/Bulat.png',
      name: t('homepage.faculty.13.name'),
      description: t('homepage.faculty.13.description'),
    },
    {
      image: '/images/Farhad.png',
      name: t('homepage.faculty.14.name'),
      description: t('homepage.faculty.14.description'),
    },
    {
      image: '/images/GulmiraMuk.png',
      name: t('homepage.faculty.15.name'),
      description: t('homepage.faculty.15.description'),
    },
    {
      image: '/images/Akzharkyn.jpg',
      name: t('homepage.faculty.16.name'),
      description: t('homepage.faculty.16.description'),
    },
  ];

  const administration = [
    {
      image: '/images/img_rectangle_1178.png',
      name: t('homepage.administration.0.name'),
      position: t('homepage.administration.0.position'),
      email: 'marina.obraztsova@narxoz.kz',
    },
    {
      image: '/images/img_rectangle_1205.png',
      name: t('homepage.administration.1.name'),
      position: t('homepage.administration.1.position'),
      email: 'ewan.simpson@narxoz.kz',
    },
    {
      image: '/images/img_rectangle_1206.png',
      name: t('homepage.administration.2.name'),
      position: t('homepage.administration.2.position'),
      email: 'aikerim.myrzatayeva@narxoz.kz',
    },
    {
      image: '/images/img_rectangle_1207.png',
      name: t('homepage.administration.3.name'),
      position: t('homepage.administration.3.position'),
      email: 'agipa.monobaeva@narxoz.kz',
    },
    {
      image: '/images/Anna.png',
      name: t('homepage.administration.4.name'),
      position: t('homepage.administration.4.position'),
      email: 'anna.anissimova@narxoz.kz',
    },
    {
      image: '/images/Gulnar.png',
      name: t('homepage.administration.5.name'),
      position: t('homepage.administration.5.position'),
      email: 'gulnar.zhumanova@narxoz.kz',
    },
    {
      image: '/images/Saltanat.png',
      name: t('homepage.administration.6.name'),
      position: t('homepage.administration.6.position'),
      email: 'saltanat.abdelinova@narxoz.kz',
    },
  ];

  // Используем переведенные новости
  const newsItems = useTranslatedNews();



  // --- ОБНОВЛЁННЫЙ массив с видео выпускников ---
  const graduateVideos = [
    {
      url: 'https://www.youtube.com/embed/r5SVVe8ZOFo',
      description: t('homepage.graduates.videos.9.description'),
    },
    {
      url: 'https://www.youtube.com/embed/mv8ghkwGsUg',
      description: t('homepage.graduates.videos.10.description'),
    },
    {
      url: 'https://www.youtube.com/embed/WS3lCOtGg4s',
      description: t('homepage.graduates.videos.2.description'),
    },
    {
      url: 'https://www.youtube.com/embed/1XPx8iKbS-Y',
      description: t('homepage.graduates.videos.4.description'),
    },
    {
      url: 'https://www.youtube.com/embed/p3vTgMVvWdk',
      description: t('homepage.graduates.videos.0.description'),
    },
    {
      url: 'https://www.youtube.com/embed/U6mHH-kGQfU',
      description: t('homepage.graduates.videos.1.description'),
    },
    
    {
      url: 'https://www.youtube.com/embed/FL0H0I3rgcI',
      description: t('homepage.graduates.videos.3.description'),
    },
    
    {
      url: 'https://www.youtube.com/embed/UizMWwVKLOw',
      description: t('homepage.graduates.videos.5.description'),
    },
    {
      url: 'https://www.youtube.com/embed/l4IePhpXz8Y',
      description: t('homepage.graduates.videos.6.description'),
    },
    {
      url: 'https://www.youtube.com/embed/MPXMNiH6j5o',
      description: t('homepage.graduates.videos.7.description'),
    },
    {
      url: 'https://www.youtube.com/embed/m9--bfum4CU',
      description: t('homepage.graduates.videos.8.description'),
    },
    
  ];

  // --- СТЕЙТ для пагинации видео выпускников ---
  const [graduateVideoPage, setGraduateVideoPage] = useState(0);
  const videosPerPage = 3;
  const totalGraduatePages = Math.ceil(graduateVideos.length / videosPerPage);
  const pagedGraduateVideos = graduateVideos.slice(
    graduateVideoPage * videosPerPage,
    graduateVideoPage * videosPerPage + videosPerPage
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
          {/* Fallback image if video doesn't load */}
          <img src="/images/img_.png" alt="Background" className="w-full h-full object-cover" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-40 sm:bg-opacity-50"></div>

        {/* Title Section - Enhanced Mobile Optimization */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-10 flex flex-col items-center px-3 sm:px-6 lg:px-8">
          <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight drop-shadow-lg text-center animate-fade-in-up max-w-6xl">
            {t('homepage.hero.title')}
          </h1>
        </div>

        {/* Contact Form - Enhanced Mobile Optimization */}
        <div className="absolute bottom-2 sm:bottom-4 md:bottom-8 lg:bottom-20 left-0 right-0 z-10 flex flex-col items-center w-full px-3 sm:px-6 lg:px-8">
          <h2 className="text-white text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium leading-tight mb-3 sm:mb-4 md:mb-6 drop-shadow-lg text-center animate-fade-in-up max-w-4xl">
            {t('homepage.hero.subtitle')}
          </h2>
          <form
            className="flex flex-col gap-2 sm:gap-3 w-full max-w-4xl mx-auto lg:flex-row lg:gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleConsultationSubmit();
            }}
          >
            <EditText
              placeholder={t('forms.namePlaceholder')}
              value={formData.name}
              onChange={(value) => handleInputChange('name', value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[40px] sm:h-[44px] lg:h-[42px] mb-0 [&>input]:px-3 sm:[&>input]:px-4 [&>input]:py-2 [&>input]:flex [&>input]:items-center [&>input]:text-sm sm:[&>input]:text-base"
            />
            <EditText
              placeholder={t('forms.emailPlaceholder')}
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[40px] sm:h-[44px] lg:h-[42px] mb-0 [&>input]:px-3 sm:[&>input]:px-4 [&>input]:py-2 [&>input]:flex [&>input]:items-center [&>input]:text-sm sm:[&>input]:text-base"
            />
            <EditText
              placeholder={t('forms.phonePlaceholder')}
              value={formData.phone}
              onChange={(value) => handleInputChange('phone', value)}
              className="flex-1 min-w-0 shadow-sm rounded-md bg-white h-[40px] sm:h-[44px] lg:h-[42px] mb-0 [&>input]:px-3 sm:[&>input]:px-4 [&>input]:py-2 [&>input]:flex [&>input]:items-center [&>input]:text-sm sm:[&>input]:text-base"
            />
            <button
              type="submit"
              className="flex-1 lg:flex-none lg:min-w-[180px] xl:min-w-[200px] bg-[#991E1E] text-white px-3 sm:px-4 py-2 font-medium rounded-md shadow-sm hover:bg-[#7a1818] active:bg-[#660c0c] transition-colors flex items-center justify-center h-[40px] sm:h-[44px] lg:h-[42px] text-sm sm:text-base touch-manipulation"
            >
              {t('homepage.hero.consultationTitle')}
            </button>
          </form>
        </div>
      </div>

      {/* New About Section - Enhanced Mobile Optimization */}
      <div className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-[#F9F8F6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
            {/* Левая колонка с заголовком */}
            <div className="animate-fade-in-up text-center lg:text-left">
              <h2 className="text-[#991E1E] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {t('homepage.newAboutSection.title')}
              </h2>
              {/* Кнопка Contact Us */}
              <div className="mt-6 sm:mt-8">
                <button 
                  onClick={() => setIsContactModalOpen(true)}
                  className="bg-[#991E1E] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-medium hover:bg-[#7a1818] transition-colors text-sm sm:text-base w-full sm:w-auto"
                >
                  {t('homepage.newAboutSection.contactButton')}
                </button>
              </div>
            </div>
            
            {/* Правая колонка с описанием */}
            <div className="animate-fade-in-up">
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left">
                {t('homepage.newAboutSection.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Numbers Section */}
      <StatsNumbers />

      {/* Визуальный переход к программам */}
      <div className="relative py-20 bg-gradient-to-b from-[#F9F8F6] to-white overflow-hidden">
        {/* Анимированные декоративные элементы */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-red-100 rounded-full opacity-10 -translate-x-16 -translate-y-16 animate-pulse"></div>
        <div className="absolute top-8 right-1/3 w-24 h-24 bg-blue-100 rounded-full opacity-10 translate-x-12 -translate-y-12 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-4 left-1/3 w-20 h-20 bg-gray-200 rounded-full opacity-10 -translate-x-10 translate-y-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Дополнительные геометрические элементы */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-red-200 to-red-300 opacity-20 rotate-45 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-200 to-blue-300 opacity-20 rotate-12 animate-bounce" style={{animationDelay: '1.5s'}}></div>
        
        {/* Центральный декоративный элемент с анимацией */}
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-12">
              {/* Левая линия с градиентом */}
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-[#991E1E] animate-pulse"></div>
              
              {/* Центральный элемент с анимацией */}
              <div className="relative group cursor-pointer">
                {/* Внешний круг */}
                <div className="w-12 h-12 border-2 border-[#991E1E] border-opacity-30 rounded-full animate-spin" style={{animationDuration: '8s'}}></div>
                
                {/* Средний круг */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[#991E1E] border-opacity-50 rounded-full animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}></div>
                
                {/* Центральная точка */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#991E1E] rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
                
                {/* Дополнительные точки */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
              
              {/* Правая линия с градиентом */}
              <div className="w-24 h-0.5 bg-gradient-to-l from-transparent via-gray-300 to-[#991E1E] animate-pulse"></div>
            </div>
          </div>
          
          {/* Дополнительная декоративная линия */}
          <div className="mt-8 flex justify-center">
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#991E1E] to-transparent opacity-30"></div>
          </div>
        </div>
        
        {/* Плавающие элементы */}
        <div className="absolute top-1/2 left-10 w-6 h-6 bg-red-300 opacity-20 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-16 w-4 h-4 bg-blue-300 opacity-20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-20 w-5 h-5 bg-gray-300 opacity-20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Business School Grid Section */}
      <div className="relative">
        <BusinessSchoolGrid />
      </div>

      {/* Executive Sessions Section */}
      <div className="relative">
        <ExecutiveSessionsSection />
      </div>

      {/* Executive Education Grid Section */}
      <div className="relative">
        <ExecutiveEducationGrid />
      </div>

      {/* Отступ между ExecutiveEducationGrid и новой секцией аккредитации */}
      <div className="py-8"></div>

      {/* Новая секция аккредитации */}
      <div className="relative w-full h-[550px] md:h-[650px] lg:h-[750px] overflow-hidden">
        {/* Фоновое изображение без текста */}
        <img
          src="/images/ReitingAccreddd.png"
          alt={t('accreditations.title')}
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          style={{ objectPosition: 'center 5%' }}
          loading="eager"
          decoding="async"
        />
        
        {/* Полупрозрачный оверлей для лучшей читаемости текста */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Тексты со звездами в нижней части */}
        <div className="absolute bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-center">
          <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 drop-shadow-lg">
            {t('accreditations.title')}
          </h2>
          
          {/* Три рейтинга с звездами */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 justify-center items-center">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-base md:text-lg lg:text-xl font-medium">
                {t('accreditations.ratings.inclusivity')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-base md:text-lg lg:text-xl font-medium">
                {t('accreditations.ratings.teachingQuality')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-base md:text-lg lg:text-xl font-medium">
                {t('accreditations.ratings.employability')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Секция с логотипами аккредитаций */}
      <div className="py-16 px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {accreditationItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={t('accreditations.accreditation')}
                  className="w-28 h-28 md:w-36 md:h-36 mb-4 object-contain"
                />
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t(`accreditations.items.${index}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Ranking Section */}
      <RankingSection />

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>



      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Graduate Stories Section */}
      <div className="py-10 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6 slide-in-up">
          <h2 className="text-dark text-4xl font-bold">{t('homepage.sections.graduates')}</h2>
          <div className="flex items-center space-x-3">
            {/* Улучшенная кнопка "Предыдущая" */}
            <button
              onClick={() => setGraduateVideoPage(Math.max(0, graduateVideoPage - 1))}
              disabled={graduateVideoPage === 0}
              className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                graduateVideoPage === 0
                  ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                  : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
              }`}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${
                  graduateVideoPage === 0
                    ? 'text-gray-400'
                    : 'text-[#991E1E] group-hover:text-white group-hover:-translate-x-0.5'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {/* Эффект пульсации при hover */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                graduateVideoPage === 0
                  ? 'opacity-0'
                  : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
              }`}></div>
            </button>

            {/* Улучшенная кнопка "Следующая" */}
            <button
              onClick={() => setGraduateVideoPage(Math.min(totalGraduatePages - 1, graduateVideoPage + 1))}
              disabled={graduateVideoPage === totalGraduatePages - 1}
              className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                graduateVideoPage === totalGraduatePages - 1
                  ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                  : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
              }`}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${
                  graduateVideoPage === totalGraduatePages - 1
                    ? 'text-gray-400'
                    : 'text-[#991E1E] group-hover:text-white group-hover:translate-x-0.5'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {/* Эффект пульсации при hover */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                graduateVideoPage === totalGraduatePages - 1
                  ? 'opacity-0'
                  : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Новая сетка с видео и пагинацией */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pagedGraduateVideos.map((video, idx) => (
            <div
              key={idx}
              className="graduate-video-card-simple bg-white rounded-2xl p-6 flex flex-col items-center min-h-[340px] transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-xl group"
              style={{ 
                minWidth: '340px'
              }}
            >
              <div className="w-full mb-4" style={{ aspectRatio: '16/9', maxWidth: 420 }}>
                <iframe
                  width="100%"
                  height="220"
                  src={video.url}
                  title={`${t('homepage.sections.graduates')} ${graduateVideoPage * videosPerPage + idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                  style={{ minHeight: 160 }}
                ></iframe>
              </div>
              <div className="text-xl font-bold text-center mt-2 text-gray-800 leading-snug">
                {video.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Trust Section */}
      <div className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-full opacity-20 translate-x-12 translate-y-12"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8 slide-in-up">
            <h2 className="text-dark text-4xl font-bold">{t('homepage.sections.partners')}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {trustPartners.map((partner, index) => (
              <a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white h-32 rounded-lg slide-in-up hover-scale smooth-animate flex items-center justify-center p-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain transition-all duration-300 hover:scale-105"
                  title={partner.name}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Support Section */}
      <div className="py-16 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="slide-in-left">
            <h2 className="text-dark text-4xl font-bold mb-6">{t('homepage.support.title')}</h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              {t('homepage.support.description')}
            </p>
            <Link to="/support">
              <Button className="bg-[#991E1E] text-white px-6 py-0 rounded-md hover:bg-[#7a1818] transition-colors h-[38px] flex items-center justify-center">
                {t('homepage.support.button')}
              </Button>
            </Link>
          </div>

          <div className="slide-in-right">
            <img
              src="/images/support_section_phto.png"
              alt={t('homepage.support.title')}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Faculty Section */}
      <div className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-full opacity-20 translate-x-12 translate-y-12"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8 slide-in-up">
            <h2 className="text-dark text-4xl font-bold">{t('homepage.sections.faculty')}</h2>
            <div className="flex items-center space-x-3">
              {/* Улучшенная кнопка "Предыдущая" */}
              <button
                onClick={() => handleFacultyNavigation('prev')}
                disabled={currentFacultyIndex === 0}
                className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                  currentFacultyIndex === 0
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    currentFacultyIndex === 0
                      ? 'text-gray-400'
                      : 'text-[#991E1E] group-hover:text-white group-hover:-translate-x-0.5'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {/* Эффект пульсации при hover */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentFacultyIndex === 0
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
                }`}></div>
              </button>

              {/* Улучшенная кнопка "Следующая" */}
              <button
                onClick={() => handleFacultyNavigation('next')}
                disabled={currentFacultyIndex >= faculty.length - 4}
                className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                  currentFacultyIndex >= faculty.length - 4
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    currentFacultyIndex >= faculty.length - 4
                      ? 'text-gray-400'
                      : 'text-[#991E1E] group-hover:text-white group-hover:translate-x-0.5'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {/* Эффект пульсации при hover */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentFacultyIndex >= faculty.length - 4
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
                }`}></div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.slice(currentFacultyIndex, currentFacultyIndex + 4).map((member, index) => {
              const globalIndex = currentFacultyIndex + index;
              const isExpanded = expandedFacultyCards[globalIndex];

              return (
                <div
                  key={`faculty-${globalIndex}`}
                  className="faculty-card-simple group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 group-hover:border-red-200 transform group-hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                        <h3 className="text-dark text-xl font-bold group-hover:text-red-600 transition-colors duration-300">
                          {member.name}
                        </h3>
                      </div>

                      <div className="relative">
                        <p
                          className={`text-gray-600 text-sm leading-relaxed transition-all duration-500 ease-out ${
                            isExpanded ? 'line-clamp-none' : 'line-clamp-3'
                          }`}
                        >
                          {member.description}
                        </p>

                        {/* Градиент для скрытия текста */}
                        {!isExpanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0"></div>
                        )}
                      </div>

                      {/* Кнопка "Читать дальше" */}
                      <button
                        onClick={() => toggleFacultyCard(globalIndex)}
                        className="mt-4 text-red-600 hover:text-red-700 font-medium text-sm transition-all duration-300 flex items-center space-x-1 group/btn hover:space-x-2"
                      >
                        <span>
                          {isExpanded
                            ? t('homepage.programCards.collapse')
                            : t('homepage.programCards.more')}
                        </span>
                        <svg
                          className={`w-4 h-4 transition-all duration-300 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* News Section */}
      <div className="py-16 px-12 max-w-8xl mx-auto">
        <div className="flex justify-between items-center mb-12 slide-in-up">
          <h2 className="text-dark text-4xl font-bold">{t('homepage.sections.news')}</h2>
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
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
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

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Administration Section */}
      <div className="py-20 px-8 bg-gradient-to-br from-gray-50 via-white to-red-50 relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-100 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-100 rounded-full opacity-20 translate-x-12 translate-y-12"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-center mb-8 slide-in-up">
            <h2 className="text-dark text-4xl font-bold">
              {t('homepage.sections.administration')}
            </h2>
            <div className="flex items-center space-x-3">
              {/* Улучшенная кнопка "Предыдущая" */}
              <button
                onClick={() => handleAdminNavigation('prev')}
                disabled={currentAdminIndex === 0}
                className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                  currentAdminIndex === 0
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    currentAdminIndex === 0
                      ? 'text-gray-400'
                      : 'text-[#991E1E] group-hover:text-white group-hover:-translate-x-0.5'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {/* Эффект пульсации при hover */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentAdminIndex === 0
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
                }`}></div>
              </button>

              {/* Улучшенная кнопка "Следующая" */}
              <button
                onClick={() => handleAdminNavigation('next')}
                disabled={currentAdminIndex >= administration.length - 4}
                className={`group relative w-12 h-12 rounded-full border-2 transition-all duration-300 ease-out flex items-center justify-center ${
                  currentAdminIndex >= administration.length - 4
                    ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                    : 'border-[#991E1E] bg-white hover:bg-[#991E1E] hover:scale-110 hover:shadow-lg cursor-pointer'
                }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${
                    currentAdminIndex >= administration.length - 4
                      ? 'text-gray-400'
                      : 'text-[#991E1E] group-hover:text-white group-hover:translate-x-0.5'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {/* Эффект пульсации при hover */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  currentAdminIndex >= administration.length - 4
                    ? 'opacity-0'
                    : 'opacity-0 group-hover:opacity-20 group-hover:scale-125 bg-[#991E1E]'
                }`}></div>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
            {administration.slice(currentAdminIndex, currentAdminIndex + 4).map((admin, index) => {
              const globalIndex = currentAdminIndex + index;

              return (
                <div
                  key={`admin-${globalIndex}`}
                  className="admin-card-simple group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden border border-gray-100 group-hover:border-red-200 h-full flex flex-col transform group-hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={admin.image}
                        alt={admin.name}
                        className="w-full h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full transition-all duration-300 group-hover:scale-125"></div>
                        <h3 className="text-dark text-xl font-bold group-hover:text-red-600 transition-colors duration-300">
                          {admin.name}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1">
                        {admin.position}
                      </p>

                      <p className="text-red-600 text-sm font-medium hover:text-red-700 transition-colors duration-300 mt-auto group-hover:underline">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

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
              onChange={(value) => handleContactFormChange('name', value)}
              className="h-[38px]"
            />
            <EditText
              placeholder={t('homepage.contactForm.emailPlaceholder')}
              value={contactFormData.email}
              onChange={(value) => handleContactFormChange('email', value)}
              className="h-[38px]"
            />
            <EditText
              placeholder={t('homepage.contactForm.phonePlaceholder')}
              value={contactFormData.phone}
              onChange={(value) => handleContactFormChange('phone', value)}
              className="h-[38px]"
            />
            <Button
              onClick={handleContactSubmit}
              className="w-full bg-[#991E1E] text-white py-0 font-medium hover:bg-[#7a1818] transition-colors h-[38px] flex items-center justify-center"
            >
              {t('homepage.contactForm.submitButton')}
            </Button>
            <p className="text-white text-sm text-center leading-relaxed">
              {t('homepage.contactForm.privacyText')}
            </p>
          </div>
        </div>
      </div>

      <Footer />

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#991E1E] mb-6">
                {t('homepage.contactModal.title')}
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('homepage.contactModal.phone')}</p>
                    <p className="text-lg font-semibold text-gray-800">+7 (727) 377-11-11</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('homepage.contactModal.email')}</p>
                    <p className="text-lg font-semibold text-gray-800">info@narxoz.kz</p>
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
                    <p className="text-sm text-gray-600 font-medium">{t('homepage.contactModal.address')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('homepage.contactModal.addressValue')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#E94848] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{t('homepage.contactModal.workingHours')}</p>
                    <p className="text-lg font-semibold text-gray-800">{t('homepage.contactModal.workingHoursValue')}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsContactModalOpen(false)}
                className="mt-6 w-full bg-[#991E1E] text-white py-3 rounded-md font-medium hover:bg-[#7a1818] transition-colors"
              >
                {t('homepage.contactModal.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
