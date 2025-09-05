import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    console.log('Данные формы:', formData);
    
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
      title: 'Специалисты НПО/НКО',
      description: 'Для получения практических знаний, необходимых для масштабирования инициатив и укрепления управленческих компетенций'
    },
    {
      id: 2,
      image: '/images/нпо/Block2.png',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      title: 'Менеджеры корпоративного сектора',
      description: 'Для реализации стратегии корпоративной социальной ответственности и развития партнёрских инициатив'
    },
    {
      id: 3,
      image: '/images/нпо/Block3.png',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: 'Социальные предприниматели',
      description: 'Для успешного роста, масштабирования и устойчивого управления бизнес-проектами с социальным эффектом'
    },
    {
      id: 4,
      image: '/images/нпо/Block4.jpg',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      title: 'Эксперты в благотворительном секторе',
      description: 'Для оптимизации процессов привлечения ресурсов и повышения эффективности фандрайзинговой деятельности'
    },
    {
      id: 5,
      image: '/images/нпо/Block5.jpg',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      title: 'Представители государственного сектора',
      description: 'Для лучшего понимания НПО/НКО и социального предпринимательства с целью продуктивного партнёрства'
    }
  ];

  // Адаптивное количество карточек в зависимости от размера экрана
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // мобильные
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
      const newCardsPerView = getCardsPerView();
      setCardsPerView(newCardsPerView);
      
      // Сбрасываем индекс при изменении размера экрана
      const newTotalSlides = Math.ceil(programCards.length / newCardsPerView);
      if (currentCardIndex >= newTotalSlides) {
        setCurrentCardIndex(0);
      }
    };

    handleResize(); // устанавливаем начальное значение
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentCardIndex, programCards.length]);

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
  const videoReviews = [
    {
      id: 1,
      src: "https://www.youtube.com/embed/SDEi4OQHnYE",
      title: "Каримова Перизат"
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/irqJPLRGxf0",
      title: "Надежда Вадодария"
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/ri0ruCtLHRM",
      title: "Амреева Елена"
    },
    {
      id: 4,
      src: "https://www.youtube.com/embed/V-h0TnK-otU",
      title: "Карманова Эльмира"
    },
    {
      id: 5,
      src: "https://www.youtube.com/embed/bsyDjcIr6TQ",
      title: "Сайлаубекова Пакизат"
    },
    {
      id: 6,
      src: "https://www.youtube.com/embed/Ln6MhjLhwkw",
      title: "Калдаякова Ботагоз"
    },
    {
      id: 7,
      src: "https://www.youtube.com/embed/kZMHfkTlumg",
      title: "Бегайдаров Тимур"
    },
  ];

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
  const advantagesData = [
    // Первая страница
    [
      {
        id: 1,
        image: "/images/нпо/Prei1.png",
        title: "Знания нового уровня",
        description: "Курс охватывает всё необходимое для системного развития и масштабирования социальных проектов: от фандрайзинга до эмоционального интеллекта",
        isSpecial: false
      },
      {
        id: 2,
        title: "Поддержка ваших проектов",
        description: "Работа над реальными кейсами с использованием ресурсов программы, экспертной помощи преподавателей и приглашённых специалистов",
        isSpecial: true
      },
      {
        id: 3,
        image: "/images/нпо/Prei2.png",
        title: "Международный статус",
        description: "По окончании обучения выпускники получают академический диплом международного образца",
        isSpecial: false
      }
    ],
    // Вторая страница
    [
      {
        id: 4,
        image: "/images/нпо/Prei3.PNG",
        title: "Сильное сообщество",
        description: "Нетворкинг с экспертами рынка, обмен опытом и новые партнёрства",
        isSpecial: false
      },
      {
        id: 5,
        title: "Партнёры среди лидеров",
        description: "Студенты и преподаватели — ведущие специалисты и практики социального предпринимательства в Казахстане и за рубежом",
        isSpecial: true
      },
      {
        id: 6,
        image: "/images/нпо/Block3.png",
        title: "Признание на рынке",
        description: "Выпускники становятся одними из первых обладателей профильного ЕМВА, формируют стандарты индустрии и делятся опытом с рынком",
        isSpecial: false
      }
    ]
  ];

  const nextAdvantageSlide = () => {
    setCurrentAdvantageIndex((prev) => (prev + 1) % advantagesData.length);
  };

  const prevAdvantageSlide = () => {
    setCurrentAdvantageIndex((prev) => (prev - 1 + advantagesData.length) % advantagesData.length);
  };

  // Данные дисциплин
  const disciplines = {
    mandatory: [
      { id: 1, title: 'Стратегический менеджмент' },
      { id: 2, title: 'Бизнес-исследование' },
      { id: 3, title: 'Стратегическое управление человеческим капиталом' },
      { id: 4, title: 'Управление проектами' },
      { id: 5, title: 'Стратегия создания ценностей в маркетинге' },
      { id: 6, title: 'Искусственный интеллект в бизнесе' },
      { id: 7, title: 'Финансовая, управленческая отчетность и анализ' }
    ],
    elective: [
      { id: 1, title: 'Трансформационное лидерство' },
      { id: 2, title: 'Публичные коммуникации для лидеров' },
      { id: 3, title: 'Креативность и дизайн-мышление в управлении' },
      { id: 4, title: 'Эмоциональный интеллект' },
      { id: 5, title: 'Управление репутацией и этическими вызовами' },
      { id: 6, title: 'Переговорная стратегия и проведение сделок в условиях трансформации рынков' },
      { id: 7, title: 'Системное мышление и решение проблем' }
    ],
    specializations: [
      { id: 1, title: 'Основы управления НПО' },
      { id: 2, title: 'Фандрайзинг, лоббирование и агитация' },
      { id: 3, title: 'ESG для НКО: интеграция экологических, социальных и управленческих принципов' }
    ]
  };

  // Данные преподавателей
  const facultyMembers = [
    {
      id: 1,
      name: 'Анастасия Ложкина',
      title: 'Основатель Клуба фандрайзеров',
      image: '/images/нпо/Эксперты/Анастасия ложкина.png',
      category: 'Фандрайзинг',
      specialization: 'Фандрайзинг',
      description: 'Директор: Автономной некоммерческой организации «Институт развития фандрайзинга». Преподаватель: РЭУ им. Г.В.Плеханова. Приглашенный преподаватель Гарвардского университета, МГУ имени М.В. Ломоносова, РГГУ. Создатель и автор: Телеграм-канал Лайфхаки фандрайзинга, курсы для высшей школы по вопросам взаимодействия бизнеса и НКО. Организатор: Регулярная онлайн-конференция Фандрайзинг нового времени.'
    },
    {
      id: 2,
      name: 'Евгения Белотелова',
      title: 'Управляющий партнер группы компаний PHILIN PHILGOOD, Экс-СЕО БФ «ДРУЗЬЯ»',
      image: '/images/нпо/Эксперты/Evgenya.png',
      category: 'Фандрайзинг',
      specialization: 'Фандрайзинг',
      description: 'Эксперт с более 25 лет опыта в некоммерческом секторе, решает социальные проблемы через развитие фандрайзинга. Директор АНО "Институт развития фандрайзинга", преподаватель РЭУ им. Г.В. Плеханова, приглашенный лектор Гарвардского университета, МГУ, РГГУ, создатель и автор Telegram-канала "Фандрайзинг-лайфхаки". Автор курсов для высшего образования по взаимодействию бизнеса и НКО, организатор онлайн-конференции "Фандрайзинг нового времени".'
    },
    {
      id: 3,
      name: 'Татьяна Задирако',
      title: 'Генеральный директор БФ "Социальный навигатор", PhD',
      image: '/images/нпо/Эксперты/Tatanya.png',
      category: 'Социальные проекты',
      specialization: 'Социальные проекты',
      description: 'Эксперт с более 25 лет опыта в некоммерческом секторе, решает социальные проблемы через развитие фандрайзинга. Директор АНО "Институт развития фандрайзинга", преподаватель РЭУ им. Г.В. Плеханова, приглашенный лектор Гарвардского университета, МГУ, РГГУ, создатель и автор Telegram-канала "Фандрайзинг-лайфхаки". Автор курсов для высшего образования по взаимодействию бизнеса и НКО, организатор онлайн-конференции "Фандрайзинг нового времени".'
    },
    {
      id: 4,
      name: 'Толеутаева Зевира',
      title: 'Бизнес-тренер, консультант',
      image: '/images/нпо/Эксперты/Zevira.png',
      category: 'Финансы',
      specialization: 'Финансы',
      description: 'Преподавание программ по международным сертификациям CIMA и ACCA, разработка и проведение корпоративных тренингов по управленческому учету, бюджетированию и финансовому анализу. Консультирование компаний по внедрению систем управленческого учета и бюджетирования. Опыт работы в международных аудиторских компаниях и консалтинге.'
    },
    {
      id: 5,
      name: 'Жания Курманова',
      title: 'Директор образовательных проектов DOS community',
      image: '/images/нпо/Эксперты/Zhanya.png',
      category: 'Публичные коммуникации',
      specialization: 'Публичные коммуникации',
      description: 'Предприниматель и директор образовательных проектов Dos Community. Выпускница HEC Paris Business School, имеет опыт более 20 лет в управлении компаниями в сферах ретейла, HoReCa, производства и образовательных инициатив. Специализируется на развитии лидерских качеств и публичных коммуникациях.'
    },
    {
      id: 6,
      name: 'Олег Алферов',
      title: 'Бизнес-тренер, консультант по развитию бизнеса',
      image: '/images/нпо/Эксперты/Oleg.png',
      category: 'Управление проектами',
      specialization: 'Управление проектами',
      description: 'Проведение тренингов и программ обучения: разработка новых продуктов и решений, управление проектами, управление изменениями, повышение эффективности работы руководителя и сотрудников, лидерство, командообразование, дизайн-мышление, стратегия развития и оптимизация бизнес-модели.'
    },
    {
      id: 7,
      name: 'Александра Замякина',
      title: 'Кофаундер проекта в сфере ESG и устойчивого развития',
      image: '/images/нпо/Эксперты/Aleksanra.png',
      category: 'ESG для НКО',
      specialization: 'ESG для НКО',
      description: 'Эксперт в области ESG и устойчивого развития с опытом создания образовательных и консультационных программ для Центральной Азии. Разрабатывает корпоративные программы повышения осведомленности сотрудников по вопросам ESG и переподготовки экологов. Амбассадор климатической игры «Саммит ООН: сценарий 1,5 градуса» от Climate Interactive (MIT) для Центральной Азии. Консультирует компании по внедрению ESG в управление и разработке отчетности.'
    },
    {
      id: 8,
      name: 'Марина Новоточина',
      title: 'Бизнес-коуч и тренер, DBA',
      image: '/images/нпо/Эксперты/Marina.png',
      category: 'Публичные коммуникации',
      specialization: 'Публичные коммуникации',
      description: 'Бизнес-коуч и тренер, с 2001 года занимается консультациями в области управления человеческими ресурсами и организационным развитием, преподает в рамках программы МВА. Ведет собственное предприятие «СЕО Consult», накопив значительный опыт в управленческом консалтинге и развитии организаций на казахстанском рынке.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-16 sm:py-32 lg:py-64 px-4 sm:px-8 min-h-screen flex items-end pb-16 sm:pb-32"
        style={{ backgroundImage: 'url(/images/НпоНко/Hiro.png)' }}
      >

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
            EXECUTIVE МВА ДЛЯ НПО/НКО
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-4 font-medium">
            Программа для лидеров социальных изменений
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 lg:mb-12">
            правление некоммерческими организациями и социальными проектами
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              Weekend формат обучения
            </div>
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              12 преподавателей
            </div>
            <div className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              14 месяцев
            </div>
            <div
              onClick={() => setShowPresentationModal(true)}
              className="bg-[#4C1C6F] text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors cursor-pointer flex items-center gap-1 sm:gap-2"
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
              <span className="hidden sm:inline">Скачать презентацию</span>
              <span className="sm:hidden">Скачать</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Program Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Title and Button */}
                         <div className="space-y-20">
               <h2 className="text-4xl lg:text-5xl font-normal leading-tight">
                 <span className="text-[#4C1C6F]">Executive MBA для руководителей</span>
                 <br />
                 <span className="text-[#7C3EA9]">НПО/НКО</span>
               </h2>
               <button className="bg-[#4C1C6F] text-white px-4 py-2 rounded-full font-semibold text-base hover:bg-[#5A2A8A] transition-colors transform hover:scale-105">
                 Связаться с нами
               </button>
             </div>
            
            {/* Right side - Description */}
            <div className="text-[#6E767D] space-y-4 text-xl leading-relaxed">
              <p>
                Специализированная программа Executive MBA для лидеров некоммерческих организаций и социальных предприятий, 
                готовящая их к созданию устойчивых социальных изменений и эффективному управлению НПО/НКО.
              </p>
              <p>
                Участники программы изучат стратегическое управление, финансовое планирование, управление проектами, 
                фандрайзинг и лидерство в социальной сфере, сочетая бизнес-подход с социальной миссией.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
      
          
          <div className="flex justify-center">
            <div className="relative w-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/jIg1T4aZizk"
                title="Executive MBA для НПО/НКО - О программе"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Image and Stats */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F4F4F4]/85 rounded-3xl p-12">
                         <div className="grid lg:grid-cols-3 gap-12 items-center">
               {/* Left side - Image */}
               <div className="flex justify-center lg:justify-start h-full">
                 <img 
                   src="/images/NBS.png" 
                   alt="Narxoz Business School" 
                   className="rounded-2xl w-full max-w-sm h-full object-cover"
                 />
               </div>
               
               {/* Right side - White container with stats */}
               <div className="bg-white rounded-2xl p-8 lg:p-12 lg:col-span-2">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Column 1 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       3-4
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       дня в месяц
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Обучение 3-4 дня в месяц в модульном формате без отрыва от работы
                     </div>
                   </div>
                   
                   {/* Column 2 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       20
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       человек
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Только 20 человек в группе из разных регионов страны
                     </div>
                   </div>
                   
                   {/* Column 3 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       12
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       экспертов
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Преподаватели практики и международно признанный диплом
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
                  О программе
                </button>
              </div>
              
              {/* Main heading */}
              <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
                  Для кого эта программа?
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto px-4">
                  Для системного развития и повышения эффективности управления проектами
                </p>
              </div>
              
              {/* Cards with navigation */}
              <div className="relative">
                {/* Desktop navigation arrows */}
                <button 
                  onClick={prevSlide}
                  className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={nextSlide}
                  className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-8 h-8 bg-white rounded-full items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Mobile: Vertical cards layout */}
                <div className="md:hidden space-y-4">
                  {programCards.map((card, index) => (
                    <div 
                      key={card.id} 
                      className="bg-white rounded-xl p-4 w-full relative group hover:shadow-xl transition-all duration-300 animate-fadeIn"
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
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        {/* Icon in top left corner of image */}
                        <div className="absolute top-2 left-2 w-8 h-8 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Title and description below image */}
                      <h3 className="text-lg font-normal text-[#4C1C6F] mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Desktop: Horizontal cards layout */}
                <div className="hidden md:flex gap-4 lg:gap-6 justify-center pb-4 px-4 md:ml-6">
                  {programCards
                    .slice(currentCardIndex * cardsPerView, (currentCardIndex + 1) * cardsPerView)
                    .map((card, index) => (
                      <div 
                        key={card.id} 
                        className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:w-96 h-auto sm:h-112 flex-shrink-0 relative group hover:shadow-xl transition-all duration-300 animate-fadeIn"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeIn 0.5s ease-in-out forwards'
                        }}
                      >
                        {/* Image with icon overlay */}
                        <div className="relative mb-3 sm:mb-4">
                          <img 
                            src={card.image} 
                            alt={card.title}
                            className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg sm:rounded-xl"
                          />
                          {/* Icon in top left corner of image */}
                          <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-8 h-8 sm:w-10 sm:h-10 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Title and description below image */}
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-[#4C1C6F] mb-2 sm:mb-3">
                          {card.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    ))}
                </div>
                    
                {/* Desktop pagination dots */}
                <div className="hidden md:flex justify-center mt-6 sm:mt-8 space-x-2">
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
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Text Block */}
            <div className="bg-[#7C3EA9] rounded-3xl p-12 relative overflow-hidden">
              {/* Diagonal accent shape */}
              <div className="absolute top-0 left-0 w-128 h-128 bg-[#4C1C6F] transform rotate-45 -translate-x-20 -translate-y-20 opacity-80 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Top tag */}
                <div className="inline-block bg-[#4C1C6F] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                  Эксперты
                </div>
                
                {/* Main text */}
                <div className="text-white space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Наши Преподаватели
                  </h2>
                  <p className="text-2xl lg:text-3xl font-medium">
                    — это эксперты,
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    практики, коучи
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    и успешные
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    бизнесмены
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Block */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/нпо/PreAks.PNG" 
                alt="Преподаватель" 
                className="w-full h-auto rounded-3xl object-cover"
              />
            </div>
          </div>
          
          {/* Faculty Grid - продолжение секции */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="text-center flex-1 flex flex-col">
                    {/* Circular profile image */}
                    <div className="w-36 h-36 rounded-full mx-auto mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
              </div>

                    {/* Black line separator after photo */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                    {/* Name and title */}
                    <h3 className="text-lg font-normal text-[#4C1C6F] mb-2">
                      {member.name}
                  </h3>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                      {member.title}
                    </p>
                    
                    {/* Action button - aligned at bottom */}
                    <button 
                      onClick={() => handleFacultyClick(member)}
                      className="w-full bg-[#7C3EA9] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#8B4FBA] transition-colors mt-auto"
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

      {/* Программа обучения Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#4C1C6F] text-[#4C1C6F] px-4 py-2 rounded-full text-sm font-medium">
              Программа обучения
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal text-[#7C3EA9]">
              Программа обучения
            </h2>
          </div>

          {/* Табы навигации */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#7C3EA9] rounded-full px-24 py-2 flex gap-8">
              <button
                onClick={() => setActiveTab('mandatory')}
                className={`px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'mandatory'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                Обязательные дисциплины
              </button>
              <button
                onClick={() => setActiveTab('elective')}
                className={`px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'elective'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                Дисциплины по выбору
              </button>
              <button
                onClick={() => setActiveTab('specializations')}
                className={`px-16 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'specializations'
                    ? 'bg-[#4C1C6F] text-white shadow-lg'
                    : 'text-white border border-white hover:bg-white/10'
                }`}
              >
                Специализации
              </button>
            </div>
          </div>

          {/* Контент дисциплин */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disciplines[activeTab].map((discipline, index) => (
              <div key={discipline.id} className="bg-white rounded-2xl p-8">
                <div className="text-gray-400 text-sm mb-2">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-xl font-normal text-[#4C1C6F]">
                  {discipline.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Reviews Section */}
      <div className="px-8 py-16">
        <div className="max-w-full mx-auto">
          <div className="bg-[#4C1C6F] rounded-3xl p-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-3 items-center">
                {/* Left side - Title and Button */}
                <div className="space-y-6">
                  {/* Top button */}
                  <div className="inline-block bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium border border-white/30">
                    Отзывы
                  </div>
                  
                  {/* Main title */}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Отзывы
                    <br />
                    студентов
                  </h2>
                </div>
                
                {/* Right side - Video Slider */}
                <div className="relative lg:col-span-2">
                  {/* Navigation arrows - более прозрачные и меньше */}
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
                  
                  {/* Video Grid - без белых контейнеров */}
                  <div className="grid grid-cols-3 gap-4 justify-center">
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
                          <div className="relative w-full aspect-[2/4] rounded-2xl overflow-hidden">
                            {video.isExternal ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <div className="text-center">
                                  <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0v16a1 1 0 001 1h6a1 1 0 001-1V4H7z" />
                                  </svg>
                                  <p className="text-sm text-gray-500 mb-2">Дополнительное видео</p>
                                  <a 
                                    href={video.src} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#4C1C6F] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#5A2A8A] transition-colors"
                                  >
                                    Открыть
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
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 rounded-b-2xl">
                            <h3 className="text-sm font-medium text-center">{video.title}</h3>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Mobile navigation buttons */}
                  <div className="flex md:hidden justify-center mt-6 space-x-4">
                    <button 
                      onClick={prevVideoSlide}
                      className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      ← Предыдущие
                    </button>
                    <button 
                      onClick={nextVideoSlide}
                      className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors"
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
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4C1C6F] leading-tight">
              Преимущества программы
            </h2>
          </div>
          
          {/* Advantages Grid with Navigation */}
          <div className="relative">
            {/* Navigation arrows */}
            <button 
              onClick={prevAdvantageSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-[#6E767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextAdvantageSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
              <svg className="w-4 h-4 text-[#6E767D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Advantages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantagesData[currentAdvantageIndex].map((advantage, index) => (
                <div 
                  key={`${currentAdvantageIndex}-${advantage.id}`}
                  className={`rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform animate-fadeInUp ${
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
                    <div className="absolute bottom-0 -right-8 w-96 h-96 opacity-20">
                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M50 5L95 50L50 95L5 50Z" fill="currentColor"/>
                      </svg>
                    </div>
                  )}
                  
                  <div className={`relative z-10 ${advantage.isSpecial ? 'flex flex-col h-full' : ''}`}>
                    {advantage.image && (
                      <div className="mb-6">
                        <img 
                          src={advantage.image} 
                          alt={advantage.title} 
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                    )}
                    
                    <div className={advantage.isSpecial ? 'flex-1' : ''}>
                      <h3 className={`text-2xl font-normal mb-4 ${
                        advantage.isSpecial ? 'text-white font-bold' : 'text-[#4C1C6F]'
                      }`}>
                        {advantage.title}
                      </h3>
                      <p className={`leading-relaxed ${
                        advantage.isSpecial ? 'text-white/90' : 'text-gray-600'
                      }`}>
                        {advantage.description}
                      </p>
                    </div>
                    
                    {advantage.isSpecial && (
                      <div className="mt-6">
                        <div className="bg-white/10 rounded-full px-6 py-3 text-center">
                          <span className="text-white font-semibold text-sm">
                            ИННОВАЦИИ НАЧИНАЮТСЯ ЗДЕСЬ
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Useful Links Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            {/* Top button */}
            <div className="inline-block bg-[#4C1C6F]/10 text-[#4C1C6F] px-6 py-2 rounded-full text-sm font-medium border border-[#4C1C6F]/20 mb-8">
              Полезно
            </div>
            
            {/* Main title */}
            <h2 className="text-4xl lg:text-5xl font-bold text-[#4C1C6F] leading-tight">
              Полезные ссылки
            </h2>
          </div>
          
          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Link 1 - DOS Community */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              {/* Content section - all elements on same level */}
              <div className="flex flex-col h-full px-8 pt-8 pb-6">
                <h3 className="text-2xl font-bold text-[#4C1C6F] mb-4">
                  DOS Community
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  Некоммерческий Фонд<br />
                  интеллектуального волонтёрства.<br />
                  Помогаем помогать.
                </p>
                <div className="flex items-center mt-auto">
                  <a 
                    href="https://dos.community/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#7C3EA9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8B4FBA] transition-colors"
                  >
                    Подробнее
                  </a>
                  <a 
                    href="https://dos.community/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7C3EA9] rounded-full flex items-center justify-center hover:bg-[#8B4FBA] transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Image section - rounded top corners only */}
              <div className="mt-auto px-8">
                <img 
                  src="/images/нпо/OS.jpeg" 
                  alt="DOS Community" 
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </div>
            </div>

            {/* Link 2 - Фандрайзинг */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              {/* Content section - all elements on same level */}
              <div className="flex flex-col h-full px-8 pt-8 pb-6">
                <h3 className="text-2xl font-bold text-[#4C1C6F] mb-4">
                  Фандрайзинг
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  Открытая встреча ЕМВА-программы, посвящённая практическому опыту студентов в сфере фандрайзинга.
                </p>
                <div className="flex items-center mt-auto">
                  <a 
                    href="https://youtu.be/dtpBvaGnL8Q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#7C3EA9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8B4FBA] transition-colors"
                  >
                    Подробнее
                  </a>
                  <a 
                    href="https://youtu.be/dtpBvaGnL8Q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#7C3EA9] rounded-full flex items-center justify-center hover:bg-[#8B4FBA] transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Image section - rounded top corners only */}
              <div className="mt-auto px-8">
                <img 
                  src="/images/нпо/Fanr.jpg" 
                  alt="Фандрайзинг" 
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </div>
            </div>

            {/* Link 3 - Скачать брошюры */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
              {/* Content section - all elements on same level */}
              <div className="flex flex-col h-full px-8 pt-8 pb-6">
                <h3 className="text-2xl font-bold text-[#4C1C6F] mb-4">
                  Скачать брошюры
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                  Получите подробную информацию о программе в удобном формате.
                </p>
                <div className="flex items-center mt-auto">
                  <button 
                    onClick={() => setShowPresentationModal(true)}
                    className="bg-[#7C3EA9] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#8B4FBA] transition-colors"
                  >
                    Подробнее
                  </button>
                  <button 
                    onClick={() => setShowPresentationModal(true)}
                    className="w-12 h-12 bg-[#7C3EA9] rounded-full flex items-center justify-center hover:bg-[#8B4FBA] transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* Image section - rounded top corners only */}
              <div className="mt-auto px-8">
                <img 
                  src="/images/нпо/Brosh.jpg" 
                  alt="Скачать брошюры" 
                  className="w-full h-64 object-cover rounded-t-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Presentation Modal with #4C1C6F color */}
      {showPresentationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {showSuccess ? (
              <div className="text-center">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Презентация готова к скачиванию!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Спасибо за ваш интерес к программе EXECUTIVE MBA ДЛЯ НПО/НКО
                  </p>
                  <p className="text-sm text-gray-500">
                    Файл начнет скачиваться автоматически
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#4C1C6F] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Скачать презентацию
                  </h2>
                  <p className="text-gray-600">
                    EXECUTIVE MBA ДЛЯ НПО/НКО
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Заполните форму для получения презентации программы
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <EditText
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Компания"
                    value={formData.company}
                    onChange={(value) => handleInputChange('company', value)}
                    className="h-12"
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowPresentationModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 !bg-[#4C1C6F] !text-white px-6 py-3 rounded-lg hover:!bg-[#5A2A8A] transition-colors"
                    >
                      Скачать
                    </Button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
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
              Компании, которые нас поддержали
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-12 w-[80vw] h-[80vh] max-w-6xl overflow-hidden relative">
            {/* Close button */}
            <button 
              onClick={closeFacultyModal}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-12 h-full">
              {/* Left Column - Faculty Image */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-96 h-[500px] rounded-3xl overflow-hidden">
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
                <div className="mb-4">
                  <span className="bg-[#4C1C6F] text-white px-4 py-2 rounded-full text-sm font-medium uppercase">
                    {selectedFaculty.specialization}
                  </span>
                </div>
                
                {/* Faculty Name */}
                <h2 className="text-4xl font-bold text-[#4C1C6F] mb-4">
                  {selectedFaculty.name}
                </h2>
                
                {/* Faculty Title */}
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {selectedFaculty.title}
                </p>
                
                {/* Faculty Description */}
                <div className="text-gray-700 leading-relaxed text-lg">
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
