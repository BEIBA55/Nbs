import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';



const facultyMembers = [
  {
    id: 1,
    memberKey: 'yelzhasAubakirov',
    specializationKey: 'financeAndInvestments',
    image: '/images/Yelzhas.png',
    email: 'yelzhas.aubakirov@narxoz.kz',
  },
  {
    id: 2,
    memberKey: 'olegAlfyorov',
    specializationKey: 'businessDevelopment',
    image: '/images/Oleg.png',
    email: 'oleg.alfyorov@narxoz.kz',
  },
  {
    id: 3,
    memberKey: 'yuliaDmitrieva',
    specializationKey: 'marketingAndAnalytics',
    image: '/images/Ulia.png',
    email: 'yulia.dmitrieva@narxoz.kz',
  },
  {
    id: 4,
    memberKey: 'irinaVigovskaya',
    specializationKey: 'mediationAndCorporateGovernance',
    image: '/images/Irina.png',
    email: 'irina.vigovskaya@narxoz.kz',
  },
  {
    id: 5,
    memberKey: 'liliyaBisengali',
    specializationKey: 'corporateLaw',
    image: '/images/Lilya.png',
    email: 'liliya.bisengali@narxoz.kz',
  },
  {
    id: 6,
    memberKey: 'zeviraToleutaeva',
    specializationKey: 'financialReporting',
    image: '/images/Zevira.png',
    email: 'zevira.toleutaeva@narxoz.kz',
  },
  {
    id: 7,
    memberKey: 'kaisarMakan',
    specializationKey: 'leadershipAndCoaching',
    image: '/images/Kaisar.png',
    email: 'kaisar.makan@narxoz.kz',
  },
  {
    id: 8,
    memberKey: 'marinaNovotochina',
    specializationKey: 'hrManagement',
    image: '/images/Marina.png',
    email: 'marina.novotochina@narxoz.kz',
  },
  {
    id: 9,
    memberKey: 'aleksandrChmel',
    specializationKey: 'corporateFinance',
    image: '/images/Aleksandr.png',
    email: 'aleksandr.chmel@narxoz.kz',
  },
  {
    id: 10,
    memberKey: 'maratAtnashev',
    specializationKey: 'academicDevelopment',
    image: '/images/Marat.png',
    email: 'marat.atnashev@narxoz.kz',
  },
  {
    id: 11,
    memberKey: 'andreiLevchenko',
    specializationKey: 'organizationalDevelopment',
    image: '/images/Andrei.png',
    email: 'andrei.levchenko@narxoz.kz',
  },
  {
    id: 12,
    memberKey: 'nikolaiVerkhovsky',
    specializationKey: 'strategicConsulting',
    image: '/images/Nikolai.png',
    email: 'nikolai.verkhovsky@narxoz.kz',
  },
  {
    id: 13,
    memberKey: 'maksimKiselev',
    specializationKey: 'managementPsychology',
    image: '/images/Maksim.png',
    email: 'maksim.kiselev@narxoz.kz',
  },
  {
    id: 14,
    memberKey: 'bulatMukushev',
    specializationKey: 'investmentAnalysis',
    image: '/images/Bulat.png',
    email: 'bulat.mukushev@narxoz.kz',
  },
  {
    id: 15,
    memberKey: 'farhadManteev',
    specializationKey: 'changeManagement',
    image: '/images/Farhad.png',
    email: 'farhad.manteev@narxoz.kz',
  },
  {
    id: 16,
    memberKey: 'gulmiraMukanova',
    specializationKey: 'organizationalChanges',
    image: '/images/GulmiraMuk.png',
    email: 'gulmira.mukanova@narxoz.kz',
  },
  {
    id: 17,
    memberKey: 'akzharkynKnykova',
    specializationKey: 'actuarialScience',
    image: '/images/Akzharkyn.jpg',
    email: 'akzharkyn.knykova@narxoz.kz',
  },
];

// Компонент для анимированного счетчика
const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Используем easeOutQuart для более естественной анимации
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * end);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const Faculty = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [filter, setFilter] = useState('all');
  const { t } = useTranslation();

  const specializations = [
    { key: 'all', label: t('faculty.specializations.allSpecializations') },
    { key: 'financeAndInvestments', label: t('faculty.specializations.financeAndInvestments') },
    { key: 'businessDevelopment', label: t('faculty.specializations.businessDevelopment') },
    { key: 'marketingAndAnalytics', label: t('faculty.specializations.marketingAndAnalytics') },
    { key: 'mediationAndCorporateGovernance', label: t('faculty.specializations.mediationAndCorporateGovernance') },
    { key: 'corporateLaw', label: t('faculty.specializations.corporateLaw') },
    { key: 'financialReporting', label: t('faculty.specializations.financialReporting') },
    { key: 'leadershipAndCoaching', label: t('faculty.specializations.leadershipAndCoaching') },
    { key: 'hrManagement', label: t('faculty.specializations.hrManagement') },
    { key: 'corporateFinance', label: t('faculty.specializations.corporateFinance') },
    { key: 'academicDevelopment', label: t('faculty.specializations.academicDevelopment') },
    { key: 'organizationalDevelopment', label: t('faculty.specializations.organizationalDevelopment') },
    { key: 'strategicConsulting', label: t('faculty.specializations.strategicConsulting') },
    { key: 'managementPsychology', label: t('faculty.specializations.managementPsychology') },
    { key: 'investmentAnalysis', label: t('faculty.specializations.investmentAnalysis') },
    { key: 'changeManagement', label: t('faculty.specializations.changeManagement') },
    { key: 'organizationalChanges', label: t('faculty.specializations.organizationalChanges') },
    { key: 'actuarialScience', label: t('faculty.specializations.actuarialScience') },
  ];

  const filteredMembers =
    filter === 'all'
      ? facultyMembers
      : facultyMembers.filter((member) => member.specializationKey === filter);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-700">
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Animated geometric shapes - Mobile optimized */}
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div
            className="absolute top-20 sm:top-40 right-4 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-16 sm:bottom-32 left-1/4 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-white/5 rounded-full animate-ping"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-1/3 w-10 sm:w-16 md:w-20 h-10 sm:h-16 md:h-20 bg-white/8 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>

          {/* Floating elements - Mobile optimized */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-16 sm:h-24 md:h-32 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1 h-12 sm:h-18 md:h-24 bg-gradient-to-b from-white/15 to-transparent animate-bounce"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        {/* Main Content - Mobile optimized */}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Main heading with animation - Mobile optimized */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight mb-2 bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent animate-pulse">
              {t('faculty.hero.title')}
            </h1>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
              {t('faculty.hero.subtitle')}
            </h1>
          </div>

          {/* Subtitle with enhanced styling - Mobile optimized */}
          <div className="mb-4 sm:mb-6">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 text-white">
              {t('faculty.hero.description')}
            </p>
            <div className="w-12 sm:w-16 md:w-20 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          {/* Description with better typography - Mobile optimized */}
          <div className="mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto px-2 sm:px-4">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-white/90 font-light"
               dangerouslySetInnerHTML={{ __html: t('faculty.hero.mainDescription') }}
            />
          </div>

          {/* Enhanced stats section - Mobile optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 px-2 sm:px-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={10} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90">{t('faculty.stats.instructors')}</div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">{t('faculty.stats.withInternationalExperience')}</div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={15} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90">{t('faculty.stats.yearsOfExperience')}</div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">
                  {t('faculty.stats.averagePerInstructor')}
                </div>
              </div>
            </div>

            <div className="group relative sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl sm:rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white/90">{t('faculty.stats.publications')}</div>
                <div className="text-xs sm:text-sm text-white/70 mt-1">{t('faculty.stats.inLeadingJournals')}</div>
              </div>
            </div>
          </div>

          {/* Scroll indicator - Mobile optimized */}
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section - Enhanced Mobile Optimization */}
      <div className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('faculty.specializations.title')}</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {specializations.map((spec) => (
              <button
                key={spec.key}
                onClick={() => setFilter(spec.key)}
                className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
                  filter === spec.key
                    ? 'bg-red-800 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-red-50 border border-gray-200'
                }`}
              >
                {spec.label}
              </button>
            ))}
          </div>
        </div>
      </div>

             {/* Faculty Members Grid - Enhanced Mobile Optimization */}
       <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-3 sm:px-4 md:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
             {filteredMembers.map((member, index) => (
               <div
                 key={member.id}
                 className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
                 style={{ animationDelay: `${index * 0.1}s` }}
                 onClick={() => setSelectedMember(member)}
               >
                 {/* Image section */}
                 <div className="relative overflow-hidden">
                   <img
                     src={member.image}
                     alt={member.name}
                     className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                   />
                   
                   {/* Gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                   
                   {/* Name overlay */}
                   <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                     <h3 className="text-lg sm:text-xl font-bold">
                       {t(`faculty.members.${member.memberKey}.name`)}
                     </h3>
                   </div>
                 </div>

                 {/* Content section */}
                 <div className="relative p-4 sm:p-5 md:p-6 bg-white">
                   {/* Specialization badge */}
                   <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full mb-3 sm:mb-4">
                     {t(`faculty.specializations.${member.specializationKey}`)}
                   </div>
                   
                   {/* Education */}
                   <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                     {t(`faculty.members.${member.memberKey}.education`)}
                   </p>
                   
                   {/* Experience */}
                   <p className="text-xs text-gray-500 mb-3 sm:mb-4 leading-relaxed">
                     {t(`faculty.members.${member.memberKey}.experience`)}
                   </p>
                   
                   {/* Bottom section */}
                   <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                     <span className="text-xs text-gray-400 hidden sm:inline">
                       {t('faculty.memberCard.clickForDetails')}
                     </span>
                     
                     <button className="flex items-center space-x-1 text-red-800 text-xs sm:text-sm font-medium hover:text-red-900 transition-all duration-300">
                       <span>{t('faculty.memberCard.readMore')}</span>
                       <svg 
                         className="w-3 h-3 sm:w-4 sm:h-4" 
                         fill="none" 
                         stroke="currentColor" 
                         viewBox="0 0 24 24"
                       >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                       </svg>
                     </button>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>

             {/* Modal for Member Details - Enhanced Mobile Optimization */}
       {selectedMember && (
         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
           <div className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden shadow-2xl">
             <div className="relative">
               {/* Close button */}
               <button
                 onClick={() => setSelectedMember(null)}
                 className="absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 z-20 transition-all duration-300 shadow-lg"
               >
                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>

               <div className="grid grid-cols-1 lg:grid-cols-2">
                 {/* Image section */}
                 <div className="relative overflow-hidden">
                   <img
                     src={selectedMember.image}
                     alt={selectedMember.name}
                     className="w-full h-80 sm:h-96 md:h-[32rem] lg:h-full object-cover"
                   />
                   
                   {/* Gradient overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                   
                   {/* Specialization badge */}
                   <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                     <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-lg">
                       {t(`faculty.specializations.${selectedMember.specializationKey}`)}
                     </div>
                   </div>
                 </div>

                 {/* Content section */}
                 <div className="p-4 sm:p-5 md:p-6 lg:p-8 bg-white max-h-[50vh] sm:max-h-none overflow-y-auto">
                   {/* Header section */}
                   <div className="mb-4 sm:mb-6">
                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                       {t(`faculty.members.${selectedMember.memberKey}.name`)}
                     </h2>
                     <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-red-600 to-red-700 rounded-full"></div>
                   </div>

                   {/* Information sections */}
                   <div className="space-y-4 sm:space-y-6">
                     <div>
                       <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                         <span>{t('faculty.modal.education')}</span>
                       </h3>
                       <p className="text-gray-700 leading-relaxed pl-3 sm:pl-4 border-l-2 border-gray-200 text-xs sm:text-sm">
                         {t(`faculty.members.${selectedMember.memberKey}.education`)}
                       </p>
                     </div>

                     <div>
                       <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                         <span>{t('faculty.modal.workExperience')}</span>
                       </h3>
                       <p className="text-gray-700 leading-relaxed pl-3 sm:pl-4 border-l-2 border-gray-200 text-xs sm:text-sm">
                         {t(`faculty.members.${selectedMember.memberKey}.experience`)}
                       </p>
                     </div>

                     <div>
                       <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                         <span>{t('faculty.modal.researchInterests')}</span>
                       </h3>
                       <p className="text-gray-700 leading-relaxed pl-3 sm:pl-4 border-l-2 border-gray-200 text-xs sm:text-sm">
                         {t(`faculty.members.${selectedMember.memberKey}.research`)}
                       </p>
                     </div>

                     <div>
                       <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 flex items-center space-x-2">
                         <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                         <span>{t('faculty.modal.achievements')}</span>
                       </h3>
                       <ul className="space-y-2 pl-3 sm:pl-4">
                         {t(`faculty.members.${selectedMember.memberKey}.achievements`, { returnObjects: true }).map((achievement, index) => (
                           <li key={index} className="text-gray-700 flex items-start gap-2 sm:gap-3 text-xs sm:text-sm">
                             <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                             <span className="leading-relaxed">{achievement}</span>
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}

      {/* Stats Section */}
      <div className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
                         <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('faculty.achievements.title')}</h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               {t('faculty.achievements.subtitle')}
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={20} suffix="+" />
              </div>
                             <div className="text-lg font-semibold text-gray-900 mb-2">{t('faculty.achievements.instructorsWithExperience')}</div>
               <div className="text-gray-600">{t('faculty.achievements.withInternationalExperience')}</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={150} suffix="+" />
              </div>
                             <div className="text-lg font-semibold text-gray-900 mb-2">{t('faculty.achievements.scientificPublications')}</div>
               <div className="text-gray-600">{t('faculty.achievements.inLeadingJournals')}</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={50} suffix="+" />
              </div>
                             <div className="text-lg font-semibold text-gray-900 mb-2">
                 {t('faculty.achievements.consultingProjects')}
               </div>
               <div className="text-gray-600">{t('faculty.achievements.annually')}</div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={95} suffix="%" />
              </div>
                             <div className="text-lg font-semibold text-gray-900 mb-2">{t('faculty.achievements.satisfiedStudents')}</div>
               <div className="text-gray-600">{t('faculty.achievements.basedOnSurveys')}</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Faculty;
