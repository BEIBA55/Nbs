import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { formDataAPI } from '../../../services/api';

const ExecutiveMBANGO = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess, showDownloadSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [activeTab, setActiveTab] = useState('mandatory');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentAdvantageIndex, setCurrentAdvantageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    try {
      // Сохраняем данные формы в CSV формате
      const saveResult = await formDataAPI.savePresentationFormData(formData, 'executive-mba-ngo');
      
      if (saveResult.success) {
        console.log('Данные формы сохранены:', saveResult.data);
    
    showDownloadSuccess();
    setShowSuccess(true);
    
    setTimeout(() => {
      handleDownloadPresentation();
      setShowPresentationModal(false);
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
      });
      setError('');
    }, 3000);
      } else {
        setError('Ошибка при сохранении данных. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных формы:', error);
      setError('Произошла ошибка. Попробуйте еще раз.');
    }
  };

  const handleDownloadPresentation = () => {
    const link = document.createElement('a');
    link.href = '/presentations/EMBA управление в сфере НПО и НКО (2).pdf';
    link.download = 'Executive-MBA-NPO-NKO-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Данные для карточек "Для кого эта программа"
  const programCards = [
    {
      id: 1,
      image: '/images/нпо/Block1.jpg',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      title: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.ngoSpecialists.title'),
      description: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.ngoSpecialists.description')
    },
    {
      id: 2,
      image: '/images/нпо/Block2.png',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      title: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.corporateManagers.title'),
      description: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.corporateManagers.description')
    },
    {
      id: 3,
      image: '/images/нпо/Block3.png',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.socialEntrepreneurs.title'),
      description: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.socialEntrepreneurs.description')
    },
    {
      id: 4,
      image: '/images/нпо/Block4.jpg',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      title: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.charityExperts.title'),
      description: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.charityExperts.description')
    },
    {
      id: 5,
      image: '/images/нпо/Block5.jpg',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.governmentRepresentatives.title'),
      description: t('executiveMbaNgoPage.whoIsThisProgramFor.cards.governmentRepresentatives.description')
    }
  ];

  // Адаптивное количество карточек в зависимости от размера экрана
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // мобильные
      if (window.innerWidth < 1024) return 2; // планшеты
      return 3; // десктоп
    }
    return 3; // по умолчанию
  };

  const [cardsPerView, setCardsPerView] = useState(3);
  const totalSlides = Math.ceil(programCards.length / cardsPerView);

  // Обновляем количество карточек при изменении размера экрана
  React.useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    handleResize(); // устанавливаем начальное значение
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentCardIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentCardIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentCardIndex(index);
  };

  const handleFacultyClick = (faculty) => {
    setSelectedFaculty(faculty);
    setShowFacultyModal(true);
  };

  const closeFacultyModal = () => {
    setShowFacultyModal(false);
    setSelectedFaculty(null);
  };

  // Данные для видео отзывов
  const videoReviews = t('executiveMbaNgoPage.studentReviews.students', { returnObjects: true }).map((student, index) => ({
    id: index + 1,
    src: [
      "https://www.youtube.com/embed/SDEi4OQHnYE",
      "https://www.youtube.com/embed/irqJPLRGxf0",
      "https://www.youtube.com/embed/ri0ruCtLHRM",
      "https://www.youtube.com/embed/V-h0TnK-otU",
      "https://www.youtube.com/embed/bsyDjcIr6TQ",
      "https://www.youtube.com/embed/Ln6MhjLhwkw",
      "https://www.youtube.com/embed/kZMHfkTlumg"
    ][index],
    title: student.name
  }));

  // Адаптивное количество видео в зависимости от размера экрана
  const getVideosPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // мобильные
      if (window.innerWidth < 1024) return 2; // планшеты
      return 3; // десктоп
    }
    return 3; // по умолчанию
  };

  const [videosPerView, setVideosPerView] = useState(3);
  const totalVideoSlides = Math.ceil(videoReviews.length / videosPerView);

  // Обновляем количество видео при изменении размера экрана
  React.useEffect(() => {
    const handleResize = () => {
      setVideosPerView(getVideosPerView());
    };

    handleResize(); // устанавливаем начальное значение
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextVideoSlide = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % totalVideoSlides);
  };

  const prevVideoSlide = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + totalVideoSlides) % totalVideoSlides);
  };

  const goToVideoSlide = (index) => {
    setCurrentVideoIndex(index);
  };

  // Данные для преимуществ программы
  const advantagesData = t('executiveMbaNgoPage.programAdvantages.advantages', { returnObjects: true }).map((page, pageIndex) => 
    page.map((advantage, advantageIndex) => ({
      id: pageIndex * 3 + advantageIndex + 1,
      image: [
        ["/images/нпо/Prei1.png", null, "/images/нпо/Prei2.png"],
        ["/images/нпо/Prei3.PNG", null, "/images/нпо/Block3.png"]
      ][pageIndex][advantageIndex],
      title: advantage.title,
      description: advantage.description,
      isSpecial: advantageIndex === 1 // Второй элемент на каждой странице - специальный
    }))
  );

  const nextAdvantageSlide = () => {
    setCurrentAdvantageIndex((prev) => (prev + 1) % advantagesData.length);
  };

  const prevAdvantageSlide = () => {
    setCurrentAdvantageIndex((prev) => (prev - 1 + advantagesData.length) % advantagesData.length);
  };

  // Данные для полезных ссылок
  const usefulLinks = t('executiveMbaNgoPage.usefulLinks.links', { returnObjects: true });

  // Данные дисциплин
  const disciplines = {
    mandatory: t('executiveMbaNgoPage.curriculum.disciplines.mandatory', { returnObjects: true }).map((item, index) => ({
      id: index + 1,
      title: item.title
    })),
    elective: t('executiveMbaNgoPage.curriculum.disciplines.elective', { returnObjects: true }).map((item, index) => ({
      id: index + 1,
      title: item.title
    })),
    specializations: t('executiveMbaNgoPage.curriculum.disciplines.specializations', { returnObjects: true }).map((item, index) => ({
      id: index + 1,
      title: item.title
    }))
  };

  // Данные преподавателей
  const facultyMembers = [
    {
      id: 1,
      name: t('executiveMbaNgoPage.experts.faculty.anastasiaLozhkina.name'),
      title: t('executiveMbaNgoPage.experts.faculty.anastasiaLozhkina.title'),
      image: '/images/нпо/Эксперты/Анастасия ложкина.png',
      category: t('executiveMbaNgoPage.experts.faculty.anastasiaLozhkina.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.anastasiaLozhkina.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.anastasiaLozhkina.description')
    },
    {
      id: 2,
      name: t('executiveMbaNgoPage.experts.faculty.evgeniaBelotelova.name'),
      title: t('executiveMbaNgoPage.experts.faculty.evgeniaBelotelova.title'),
      image: '/images/нпо/Эксперты/Evgenya.png',
      category: t('executiveMbaNgoPage.experts.faculty.evgeniaBelotelova.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.evgeniaBelotelova.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.evgeniaBelotelova.description')
    },
    {
      id: 3,
      name: t('executiveMbaNgoPage.experts.faculty.tatianaZadirako.name'),
      title: t('executiveMbaNgoPage.experts.faculty.tatianaZadirako.title'),
      image: '/images/нпо/Эксперты/Tatanya.png',
      category: t('executiveMbaNgoPage.experts.faculty.tatianaZadirako.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.tatianaZadirako.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.tatianaZadirako.description')
    },
    {
      id: 4,
      name: t('executiveMbaNgoPage.experts.faculty.toleutaevaZevira.name'),
      title: t('executiveMbaNgoPage.experts.faculty.toleutaevaZevira.title'),
      image: '/images/нпо/Эксперты/Zevira.png',
      category: t('executiveMbaNgoPage.experts.faculty.toleutaevaZevira.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.toleutaevaZevira.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.toleutaevaZevira.description')
    },
    {
      id: 5,
      name: t('executiveMbaNgoPage.experts.faculty.zhanyaKurmanova.name'),
      title: t('executiveMbaNgoPage.experts.faculty.zhanyaKurmanova.title'),
      image: '/images/нпо/Эксперты/Zhanya.png',
      category: t('executiveMbaNgoPage.experts.faculty.zhanyaKurmanova.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.zhanyaKurmanova.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.zhanyaKurmanova.description')
    },
    {
      id: 6,
      name: t('executiveMbaNgoPage.experts.faculty.olegAlferov.name'),
      title: t('executiveMbaNgoPage.experts.faculty.olegAlferov.title'),
      image: '/images/нпо/Эксперты/Oleg.png',
      category: t('executiveMbaNgoPage.experts.faculty.olegAlferov.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.olegAlferov.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.olegAlferov.description')
    },
    {
      id: 7,
      name: t('executiveMbaNgoPage.experts.faculty.aleksandraZamyakina.name'),
      title: t('executiveMbaNgoPage.experts.faculty.aleksandraZamyakina.title'),
      image: '/images/нпо/Эксперты/Aleksanra.png',
      category: t('executiveMbaNgoPage.experts.faculty.aleksandraZamyakina.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.aleksandraZamyakina.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.aleksandraZamyakina.description')
    },
    {
      id: 8,
      name: t('executiveMbaNgoPage.experts.faculty.marinaNovotochina.name'),
      title: t('executiveMbaNgoPage.experts.faculty.marinaNovotochina.title'),
      image: '/images/нпо/Эксперты/Marina.png',
      category: t('executiveMbaNgoPage.experts.faculty.marinaNovotochina.category'),
      specialization: t('executiveMbaNgoPage.experts.faculty.marinaNovotochina.specialization'),
      description: t('executiveMbaNgoPage.experts.faculty.marinaNovotochina.description')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 sm:py-48 lg:py-64 px-4 sm:px-8 min-h-screen flex items-end pb-16 sm:pb-24 lg:pb-32"
        style={{ backgroundImage: 'url(/images/НпоНко/Hiro.png)' }}
      >

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            {t('executiveMbaNgoPage.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 font-medium">
            {t('executiveMbaNgoPage.hero.subtitle')}
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12">
            {t('executiveMbaNgoPage.hero.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              {t('executiveMbaNgoPage.hero.weekendFormat')}
            </div>
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              {t('executiveMbaNgoPage.hero.teachers')}
            </div>
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              {t('executiveMbaNgoPage.hero.duration')}
            </div>
            <div
              onClick={() => setShowPresentationModal(true)}
              className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span className="hidden sm:inline">{t('executiveMbaNgoPage.hero.downloadPresentation')}</span>
              <span className="sm:hidden">{t('executiveMbaNgoPage.hero.downloadShort')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Program Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left side - Title and Button */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-tight">
                <span className="text-[#4C1C6F]">{t('executiveMbaNgoPage.aboutProgram.title')}</span>
                 <br />
                <span className="text-[#7C3EA9]">{t('executiveMbaNgoPage.aboutProgram.titleHighlight')}</span>
               </h2>
                             <button 
                 onClick={() => setShowContactModal(true)}
                 className="bg-[#4C1C6F] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-[#5A2A8A] transition-colors transform hover:scale-105"
               >
                 {t('executiveMbaNgoPage.aboutProgram.contactButton')}
               </button>
             </div>
            
            {/* Right side - Description */}
            <div className="text-[#6E767D] space-y-4 text-base sm:text-lg lg:text-xl leading-relaxed">
              <p>
                {t('executiveMbaNgoPage.aboutProgram.description1')}
              </p>
              <p>
                {t('executiveMbaNgoPage.aboutProgram.description2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="relative w-full max-w-7xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/jIg1T4aZizk"
                title="Executive MBA для НПО/НКО - О программе"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-2xl sm:rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Image and Stats */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F4F4F4]/85 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 items-center">
               {/* Left side - Image */}
               <div className="flex justify-center lg:justify-start h-full">
                 <img 
                   src="/images/NBS.png" 
                   alt="Narxoz Business School" 
                  className="rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-sm h-full object-cover"
                 />
               </div>
               
               {/* Right side - White container with stats */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12 lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                   {/* Column 1 */}
                   <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4C1C6F] mb-2">
                      {t('executiveMbaNgoPage.features.stats.daysPerMonth.number')}
                     </div>
                    <div className="text-base sm:text-lg text-[#6E767D] mb-3">
                      {t('executiveMbaNgoPage.features.stats.daysPerMonth.label')}
                     </div>
                    <div className="text-xs sm:text-sm text-[#6E767D] leading-relaxed">
                      {t('executiveMbaNgoPage.features.stats.daysPerMonth.description')}
                     </div>
                   </div>
                   
                   {/* Column 2 */}
                   <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4C1C6F] mb-2">
                      {t('executiveMbaNgoPage.features.stats.groupSize.number')}
                     </div>
                    <div className="text-base sm:text-lg text-[#6E767D] mb-3">
                      {t('executiveMbaNgoPage.features.stats.groupSize.label')}
                     </div>
                    <div className="text-xs sm:text-sm text-[#6E767D] leading-relaxed">
                      {t('executiveMbaNgoPage.features.stats.groupSize.description')}
                     </div>
                   </div>
                   
                   {/* Column 3 */}
                   <div className="text-center">
                    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#4C1C6F] mb-2">
                      {t('executiveMbaNgoPage.features.stats.experts.number')}
                     </div>
                    <div className="text-base sm:text-lg text-[#6E767D] mb-3">
                      {t('executiveMbaNgoPage.features.stats.experts.label')}
                     </div>
                    <div className="text-xs sm:text-sm text-[#6E767D] leading-relaxed">
                      {t('executiveMbaNgoPage.features.stats.experts.description')}
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this program for Section */}
      <div className="px-4 sm:px-8">
        <div className="max-w-full mx-auto">
          <div className="bg-[#4C1C6F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              {/* Top button */}
              <div className="text-center mb-6 sm:mb-8">
                <button className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors">
                  {t('executiveMbaNgoPage.whoIsThisProgramFor.topButton')}
                </button>
              </div>
              
              {/* Main heading */}
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  {t('executiveMbaNgoPage.whoIsThisProgramFor.title')}
                </h2>
                <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                  {t('executiveMbaNgoPage.whoIsThisProgramFor.subtitle')}
                </p>
              </div>
              
              {/* Cards with navigation */}
              <div className="relative">
                {/* Left arrow - hidden on mobile, visible on larger screens */}
                <button 
                  onClick={prevSlide}
                  className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Right arrow - hidden on mobile, visible on larger screens */}
                <button 
                  onClick={nextSlide}
                  className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Cards container */}
                <div className="flex gap-4 sm:gap-6 justify-center pb-4 px-4 md:ml-6">
                  {programCards
                    .slice(currentCardIndex * cardsPerView, (currentCardIndex + 1) * cardsPerView)
                    .map((card, index) => (
                      <div 
                        key={card.id} 
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-sm sm:w-96 h-auto sm:h-112 flex-shrink-0 relative group hover:shadow-xl transition-all duration-300 animate-fadeIn"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeIn 0.5s ease-in-out forwards'
                        }}
                      >
                    {/* Image with icon overlay */}
                    <div className="relative mb-4">
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-40 sm:h-48 object-cover rounded-lg sm:rounded-xl"
                          />
                      {/* Icon in top left corner of image */}
                          <div className="absolute top-2 left-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title and description below image */}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-[#4C1C6F] mb-3">
                          {card.title}
                    </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    ))}
                    </div>
                
                {/* Mobile navigation buttons */}
                <div className="flex md:hidden justify-center mt-6 space-x-4">
                  <button 
                    onClick={prevSlide}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                  >
                    ← Предыдущие
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                  >
                    Следующие →
                  </button>
                </div>
                    
                {/* Pagination dots */}
                <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                        index === currentCardIndex 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experts Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Text Block */}
            <div className="bg-[#7C3EA9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden">
              {/* Diagonal accent shape */}
              <div className="absolute top-0 left-0 w-64 sm:w-96 lg:w-128 h-64 sm:h-96 lg:h-128 bg-[#4C1C6F] transform rotate-45 -translate-x-10 sm:-translate-x-16 lg:-translate-x-20 -translate-y-10 sm:-translate-y-16 lg:-translate-y-20 opacity-80 rounded-2xl sm:rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Top tag */}
                <div className="inline-block bg-[#4C1C6F] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8">
                  {t('executiveMbaNgoPage.experts.topTag')}
                </div>
                
                {/* Main text */}
                <div className="text-white space-y-1 sm:space-y-2">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                    {t('executiveMbaNgoPage.experts.title')}
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('executiveMbaNgoPage.experts.subtitle1')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('executiveMbaNgoPage.experts.subtitle2')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('executiveMbaNgoPage.experts.subtitle3')}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium">
                    {t('executiveMbaNgoPage.experts.subtitle4')}
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
              {facultyMembers.map((member) => (
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
                    <h3 className="text-sm sm:text-base lg:text-lg font-normal text-[#4C1C6F] mb-2">
                      {member.name}
                  </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed flex-1">
                      {member.title}
                    </p>
                    
                    {/* Action button - aligned at bottom */}
                    <button 
                      onClick={() => handleFacultyClick(member)}
                      className="w-full bg-[#7C3EA9] text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#8B4FBA] transition-colors mt-auto"
                    >
                      {t('executiveMbaNgoPage.experts.moreButton')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Программа обучения Section */}
      <div className="py-12 sm:py-16 lg:py-24 px-4 sm:px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#4C1C6F] text-[#4C1C6F] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
              {t('executiveMbaNgoPage.curriculum.topTag')}
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#7C3EA9]">
              {t('executiveMbaNgoPage.curriculum.title')}
            </h2>
          </div>

          {/* Табы навигации */}
          <div className="mb-8 sm:mb-12">
            {/* Мобильная версия - горизонтальная прокрутка */}
            <div className="sm:hidden">
              <div className="flex overflow-x-auto gap-3 px-4 pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveTab('mandatory')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'mandatory'
                      ? 'bg-[#4C1C6F] text-white shadow-lg'
                      : 'bg-[#7C3EA9] text-white border border-white/30 hover:bg-[#8B4FBA]'
                  }`}
                >
                  {t('executiveMbaNgoPage.curriculum.tabs.mandatory.short')}
                </button>
                <button
                  onClick={() => setActiveTab('elective')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'elective'
                      ? 'bg-[#4C1C6F] text-white shadow-lg'
                      : 'bg-[#7C3EA9] text-white border border-white/30 hover:bg-[#8B4FBA]'
                  }`}
                >
                  {t('executiveMbaNgoPage.curriculum.tabs.elective.short')}
                </button>
                <button
                  onClick={() => setActiveTab('specializations')}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'specializations'
                      ? 'bg-[#4C1C6F] text-white shadow-lg'
                      : 'bg-[#7C3EA9] text-white border border-white/30 hover:bg-[#8B4FBA]'
                  }`}
                >
                  {t('executiveMbaNgoPage.curriculum.tabs.specializations')}
                </button>
              </div>
            </div>

            {/* Десктопная версия */}
            <div className="hidden sm:flex justify-center">
              <div className="bg-[#7C3EA9] rounded-full px-8 lg:px-24 py-2 flex gap-4 lg:gap-8">
                <button
                  onClick={() => setActiveTab('mandatory')}
                  className={`px-8 lg:px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'mandatory'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                  {t('executiveMbaNgoPage.curriculum.tabs.mandatory.full')}
              </button>
              <button
                onClick={() => setActiveTab('elective')}
                  className={`px-8 lg:px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'elective'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                  {t('executiveMbaNgoPage.curriculum.tabs.elective.full')}
              </button>
              <button
                onClick={() => setActiveTab('specializations')}
                  className={`px-8 lg:px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'specializations'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                  {t('executiveMbaNgoPage.curriculum.tabs.specializations')}
              </button>
              </div>
            </div>
          </div>

          {/* Контент дисциплин */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {disciplines[activeTab].map((discipline, index) => (
              <div key={discipline.id} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="text-gray-400 text-xs sm:text-sm mb-2">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-normal text-[#4C1C6F]">
                  {discipline.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Reviews Section */}
      <div className="px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-full mx-auto">
          <div className="bg-[#4C1C6F] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 items-center gap-8 lg:gap-0">
                {/* Left side - Title and Button */}
                <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                  {/* Top button */}
                  <div className="inline-block bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium border border-white/30">
                    {t('executiveMbaNgoPage.studentReviews.topButton')}
                  </div>
                  
                  {/* Main title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {t('executiveMbaNgoPage.studentReviews.title')}
                  </h2>
                </div>
                
                {/* Right side - Video Slider */}
                <div className="relative lg:col-span-2">
                  {/* Navigation arrows - скрыты на мобильных */}
                  <button 
                    onClick={prevVideoSlide}
                    className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-8 h-8 bg-white/30 rounded-full items-center justify-center hover:bg-white/40 transition-colors z-10"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextVideoSlide}
                    className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-8 h-8 bg-white/30 rounded-full items-center justify-center hover:bg-white/40 transition-colors z-10"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Video Grid - адаптивная сетка */}
                  <div className={`grid gap-3 sm:gap-4 justify-center ${
                    videosPerView === 1 ? 'grid-cols-1' : 
                    videosPerView === 2 ? 'grid-cols-2' : 
                    'grid-cols-3'
                  }`}>
                    {videoReviews
                      .slice(currentVideoIndex * videosPerView, (currentVideoIndex + 1) * videosPerView)
                      .map((video, index) => (
                        <div 
                          key={video.id} 
                          className="w-full"
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeIn 0.5s ease-in-out forwards'
                          }}
                        >
                          <div className="relative w-full aspect-[2/4] rounded-xl sm:rounded-2xl overflow-hidden">
                            {video.isExternal ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <div className="text-center p-4">
                                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0v16a1 1 0 001 1h6a1 1 0 001-1V4H7z" />
                                  </svg>
                                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{t('executiveMbaNgoPage.studentReviews.additionalVideo')}</p>
                                  <a 
                                    href={video.src} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#4C1C6F] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-[#5A2A8A] transition-colors"
                                  >
                                    {t('executiveMbaNgoPage.studentReviews.openButton')}
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <iframe
                                src={video.src}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                              ></iframe>
                            )}
                          </div>
                          {/* Название видео внизу с темным фоном */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 sm:p-3 rounded-b-xl sm:rounded-b-2xl">
                            <h3 className="text-xs sm:text-sm font-medium text-center">{video.title}</h3>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Mobile navigation buttons */}
                  <div className="flex md:hidden justify-center mt-4 sm:mt-6 space-x-3 sm:space-x-4">
                    <button 
                      onClick={prevVideoSlide}
                      className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      ← Предыдущие
                    </button>
                    <button 
                      onClick={nextVideoSlide}
                      className="bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      Следующие →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Advantages Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1C6F] leading-tight">
              {t('executiveMbaNgoPage.programAdvantages.title')}
            </h2>
          </div>
          
          {/* Advantages Grid with Navigation */}
          <div className="relative">
            {/* Navigation arrows - скрыты на мобильных */}
            <button 
              onClick={prevAdvantageSlide}
              className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 lg:-translate-x-12 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-[#6E767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextAdvantageSlide}
              className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 lg:translate-x-12 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-[#6E767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Advantages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {advantagesData[currentAdvantageIndex].map((advantage, index) => (
                <div 
                  key={`${currentAdvantageIndex}-${advantage.id}`}
                  className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform animate-fadeInUp ${
                    advantage.isSpecial 
                      ? 'bg-[#4C1C6F] relative overflow-hidden' 
                      : 'bg-white'
                  }`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  {advantage.isSpecial && (
                    /* Background diamond pattern */
                    <div className="absolute bottom-0 -right-4 sm:-right-8 w-48 sm:w-96 h-48 sm:h-96 opacity-20">
                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M50 5L95 50L50 95L5 50Z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                  
                  <div className={`relative z-10 ${advantage.isSpecial ? 'flex flex-col h-full' : ''}`}>
                    {advantage.image && (
                      <div className="mb-4 sm:mb-6">
                        <img 
                          src={advantage.image} 
                          alt={advantage.title} 
                          className="w-full h-48 sm:h-64 object-cover rounded-lg sm:rounded-xl"
                        />
                      </div>
                    )}
                    
                    <div className={advantage.isSpecial ? 'flex-1' : ''}>
                      <h3 className={`text-lg sm:text-xl lg:text-2xl font-normal mb-3 sm:mb-4 ${
                        advantage.isSpecial ? 'text-white font-bold' : 'text-[#4C1C6F]'
                      }`}>
                        {advantage.title}
                      </h3>
                      <p className={`text-sm sm:text-base leading-relaxed ${
                        advantage.isSpecial ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {advantage.description}
                      </p>
                    </div>
                    
                    {advantage.isSpecial && (
                      <div className="mt-4 sm:mt-6">
                        <div className="bg-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-center">
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            {t('executiveMbaNgoPage.programAdvantages.specialBadge')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile navigation buttons */}
            <div className="flex md:hidden justify-center mt-6 sm:mt-8 space-x-3 sm:space-x-4">
              <button 
                onClick={prevAdvantageSlide}
                className="bg-[#4C1C6F] text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#5A2A8A] transition-colors"
              >
                {t('executiveMbaNgoPage.programAdvantages.navigation.previous')}
              </button>
              <button 
                onClick={nextAdvantageSlide}
                className="bg-[#4C1C6F] text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-[#5A2A8A] transition-colors"
              >
                {t('executiveMbaNgoPage.programAdvantages.navigation.next')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            {/* Top button */}
            <div className="inline-block bg-[#4C1C6F]/10 text-[#4C1C6F] px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium border border-[#4C1C6F]/20 mb-6 sm:mb-8">
              {t('executiveMbaNgoPage.usefulLinks.topButton')}
            </div>
            
            {/* Main title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1C6F] leading-tight">
              {t('executiveMbaNgoPage.usefulLinks.title')}
            </h2>
          </div>
          
          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {usefulLinks.map((link, index) => (
              <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              {/* Content section - all elements on same level */}
              <div className="flex flex-col h-full px-6 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4C1C6F] mb-3 sm:mb-4">
                    {link.title}
                </h3>
                  <p 
                    className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6 flex-1"
                    dangerouslySetInnerHTML={{ __html: link.description }}
                  />
                <div className="flex items-center mt-auto">
                    {link.url ? (
                      <>
                  <a 
                          href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#7C3EA9] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#8B4FBA] transition-colors"
                  >
                          {t('executiveMbaNgoPage.usefulLinks.moreButton')}
                  </a>
                  <a 
                          href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7C3EA9] rounded-full flex items-center justify-center hover:bg-[#8B4FBA] transition-colors ml-2 sm:ml-3"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                      </>
                    ) : (
                      <>
                  <button 
                    onClick={() => setShowPresentationModal(true)}
                    className="bg-[#7C3EA9] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#8B4FBA] transition-colors"
                  >
                          {t('executiveMbaNgoPage.usefulLinks.moreButton')}
                  </button>
                  <button 
                    onClick={() => setShowPresentationModal(true)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7C3EA9] rounded-full flex items-center justify-center hover:bg-[#8B4FBA] transition-colors ml-2 sm:ml-3"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                      </>
                    )}
                </div>
              </div>
              {/* Image section - rounded top corners only */}
              <div className="mt-auto px-6 sm:px-8">
                <img 
                    src={link.image} 
                    alt={link.title} 
                  className="w-full h-48 sm:h-64 object-cover rounded-t-lg sm:rounded-t-xl"
                />
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              {/* Close button */}
              <button 
                onClick={() => setShowContactModal(false)}
                className="absolute top-3 right-3 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
              </button>

              {/* Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4C1C6F] mb-2">
                  {t('executiveMbaNgoPage.modals.contact.title')}
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  {t('executiveMbaNgoPage.modals.contact.subtitle')}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 sm:space-y-6">
                {/* Address */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500">{t('executiveMbaNgoPage.modals.contact.address.label')}</p>
                    <p className="text-sm sm:text-base font-medium text-[#4C1C6F]">
                      {t('executiveMbaNgoPage.modals.contact.address.street')}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t('executiveMbaNgoPage.modals.contact.address.country')}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500">{t('executiveMbaNgoPage.modals.contact.phone.label')}</p>
                    <a href="tel:+77767083636" className="text-sm sm:text-base font-medium text-[#4C1C6F] hover:text-[#5A2A8A] transition-colors">
                      {t('executiveMbaNgoPage.modals.contact.phone.number')}
                  </a>
                </div>
              </div>

                {/* Email */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500">{t('executiveMbaNgoPage.modals.contact.email.label')}</p>
                    <a href="mailto:gsb@narxoz.kz" className="text-sm sm:text-base font-medium text-[#4C1C6F] hover:text-[#5A2A8A] transition-colors">
                      {t('executiveMbaNgoPage.modals.contact.email.address')}
                    </a>
              </div>
            </div>

                {/* Working Hours */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm text-gray-500">{t('executiveMbaNgoPage.modals.contact.workingHours.label')}</p>
                    <p className="text-sm sm:text-base font-medium text-[#4C1C6F]">
                      {t('executiveMbaNgoPage.modals.contact.workingHours.schedule')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-8 space-y-3">
                  <button 
                  onClick={() => setShowContactModal(false)}
                  className="w-full bg-[#4C1C6F] text-white px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[#5A2A8A] transition-colors"
                  >
                  {t('executiveMbaNgoPage.modals.contact.buttons.close')}
                  </button>
                  <button 
                  onClick={() => {
                    setShowContactModal(false);
                    setShowPresentationModal(true);
                  }}
                  className="w-full bg-gray-100 text-[#4C1C6F] px-6 py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-200 transition-colors"
                >
                  {t('executiveMbaNgoPage.modals.contact.buttons.downloadPresentation')}
                  </button>
                </div>
              </div>
              </div>
            </div>
      )}

      {/* Custom Presentation Modal with #4C1C6F color */}
      {showPresentationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="text-center">
                <div className="mb-4 sm:mb-6">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {t('executiveMbaNgoPage.modals.presentation.success.title')}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {t('executiveMbaNgoPage.modals.presentation.success.message')}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {t('executiveMbaNgoPage.modals.presentation.success.note')}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#4C1C6F] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {t('executiveMbaNgoPage.modals.presentation.title')}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {t('executiveMbaNgoPage.modals.presentation.subtitle')}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">
                    {t('executiveMbaNgoPage.modals.presentation.description')}
                  </p>
                </div>

                {error && (
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-700 text-xs sm:text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <EditText
                    placeholder={t('executiveMbaNgoPage.modals.presentation.form.name')}
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    className="h-10 sm:h-12"
                    required
                  />
                  <EditText
                    placeholder={t('executiveMbaNgoPage.modals.presentation.form.email')}
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    className="h-10 sm:h-12"
                    required
                  />
                  <EditText
                    placeholder={t('executiveMbaNgoPage.modals.presentation.form.phone')}
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    className="h-10 sm:h-12"
                    required
                  />
                  <EditText
                    placeholder={t('executiveMbaNgoPage.modals.presentation.form.company')}
                    value={formData.company}
                    onChange={(value) => handleInputChange('company', value)}
                    className="h-10 sm:h-12"
                  />

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowPresentationModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-400 transition-colors text-sm sm:text-base"
                    >
                      {t('executiveMbaNgoPage.modals.presentation.buttons.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 !bg-[#4C1C6F] !text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:!bg-[#5A2A8A] transition-colors text-sm sm:text-base"
                    >
                      {t('executiveMbaNgoPage.modals.presentation.buttons.download')}
                    </Button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                  {t('executiveMbaNgoPage.modals.presentation.privacy')}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Partners Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4C1C6F] leading-tight">
              {t('executiveMbaNgoPage.partners.title')}
            </h2>
          </div>
          
          {/* Partners Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {/* Partner 1 */}
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/нпо/11.png" 
                alt="IDSPORT" 
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            
            {/* Partner 2 */}
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/нпо/22.png" 
                alt="KAZ MINERALS" 
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            
            {/* Partner 3 */}
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/нпо/33.png" 
                alt="тепло" 
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            
            {/* Partner 4 */}
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/нпо/44.png" 
                alt="HALYK BANK" 
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            
            {/* Partner 5 */}
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/нпо/55.png" 
                alt="DARA" 
                className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />

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
                  <span className="bg-[#4C1C6F] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium uppercase">
                    {selectedFaculty.specialization}
                  </span>
                </div>
                
                {/* Faculty Name */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#4C1C6F] mb-3 sm:mb-4">
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
    </div>
  );
};

export default ExecutiveMBANGO;
