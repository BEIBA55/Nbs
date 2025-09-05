import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import SupportModal from '../../components/ui/SupportModal';

const SupportNBS = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = React.useState(false);
  const sectionRef = React.useRef(null);

  // CSS анимации
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
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
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Intersection Observer для анимации
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Анимация запускается когда 30% секции видно
        rootMargin: '0px 0px -100px 0px' // Небольшая задержка
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const advantages = [
    {
      title: t('supportNBS.advantages.community.title'),
      description: t('supportNBS.advantages.community.description'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 9H14V4H5V21H19V9ZM16 13C16 11.9 15.1 11 14 11C12.9 11 12 11.9 12 13C12 14.1 12.9 15 14 15C15.1 15 16 14.1 16 13ZM18 19H10V17C10 15.9 10.9 15 12 15C13.1 15 14 15.9 14 17V19H18Z"/>
        </svg>
      ),
      highlighted: false
    },
    {
      title: t('supportNBS.advantages.internationalStatus.title'),
      description: t('supportNBS.advantages.internationalStatus.description'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"/>
        </svg>
      ),
      highlighted: false
    },
    {
      title: t('supportNBS.advantages.newLevelKnowledge.title'),
      description: t('supportNBS.advantages.newLevelKnowledge.description'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7V10C2 16.08 6.38 21.55 12 23C17.62 21.55 22 16.08 22 10V7L12 2ZM12 20C7.58 18.95 4 15.05 4 10V8.5L12 4L20 8.5V10C20 15.05 16.42 18.95 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6ZM12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14Z"/>
        </svg>
      ),
      highlighted: false
    },
    {
      title: t('supportNBS.advantages.projectSupport.title'),
      description: t('supportNBS.advantages.projectSupport.description'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7V10C2 16.08 6.38 21.55 12 23C17.62 21.55 22 16.08 22 10V7L12 2ZM12 20C7.58 18.95 4 15.05 4 10V8.5L12 4L20 8.5V10C20 15.05 16.42 18.95 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.76 9.24 16 12 16C14.76 16 17 13.76 17 11C17 8.24 14.76 6 12 6ZM12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14Z"/>
        </svg>
      ),
      highlighted: false
    }
  ];

  const programDirections = [
    {
      title: t('supportNBS.programDirections.npo.title'),
      description: t('supportNBS.programDirections.npo.description'),
      points: t('supportNBS.programDirections.npo.points', { returnObjects: true })
    },
    {
      title: t('supportNBS.programDirections.education.title'),
      description: t('supportNBS.programDirections.education.description'),
      points: t('supportNBS.programDirections.education.points', { returnObjects: true })
    }
  ];

  const initiators = [
    {
      title: t('supportNBS.initiators.dosCommunity.title'),
      description: t('supportNBS.initiators.dosCommunity.description'),
      fullDescription: t('supportNBS.initiators.dosCommunity.fullDescription'),
      image: '/images/dos.png',
      bgColor: 'bg-[#A4AADA]'
    },
    {
      title: t('supportNBS.initiators.narxozBusinessSchool.title'),
      description: t('supportNBS.initiators.narxozBusinessSchool.description'),
      fullDescription: t('supportNBS.initiators.narxozBusinessSchool.fullDescription'),
      image: '/images/NBS.png',
      bgColor: 'bg-red-800'
    }
  ];

  const handleSupport = () => {
    setIsSupportModalOpen(true);
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации
    const link = document.createElement('a');
    link.href = '/presentations/probono-presentation.pdf';
    link.download = 'probono-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ProBono Hero Section */}
      <div className="bg-white pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-red-600 font-bold">{t('supportNBS.hero.title')}</span>
              <span className="text-black"> {t('supportNBS.hero.subtitle')}</span>
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
                <Button
                  onClick={handleSupport}
                  className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t('supportNBS.hero.supportButton')}
                </Button>
                         <Button
           onClick={handleDownloadPresentation}
           className="bg-[#991E1E] text-white px-8 py-3 rounded-lg hover:bg-[#7A1818] transition-colors"
         >
           {t('supportNBS.hero.downloadPresentation')}
         </Button>
              </div>
          </div>
          
          <div className="w-full h-[600px] rounded-lg overflow-hidden">
            <img
              src="/images/probro.png"
              alt={t('supportNBS.hero.title')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* About Project Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-block bg-white border border-gray-300 rounded-full px-4 py-2 text-sm" style={{ color: '#991E1E' }}>
                {t('supportNBS.aboutProject.title')}
              </div>
              <h2 className="text-3xl font-bold leading-tight" style={{ color: '#991E1E' }}>
                {t('supportNBS.aboutProject.mainTitle')}
              </h2>
            </div>

            <div className="space-y-6 text-gray-700">
              <p>
                <strong style={{ color: '#991E1E' }}>Pro Bono Narxoz Business School</strong> {t('supportNBS.aboutProject.description1')}
              </p>
              <p>
                {t('supportNBS.aboutProject.description2')}
              </p>
              <p>
                {t('supportNBS.aboutProject.description3')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lecture Image Section */}
      <div className="w-full relative">
        <div className="w-full h-screen relative">
          <img
            src="/images/opis.png"
            alt={t('supportNBS.lectureSection.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-8">
              <p className="text-3xl font-bold">
                <span className="text-red-400">Pro Bono Narxoz Business School</span> {t('supportNBS.lectureSection.title')}
              </p>
            </div>
          </div>
        </div>
      </div>

            {/* Advantages Section */}
      <div className="bg-gray-50 py-20 px-8" ref={sectionRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white border border-red-600 rounded-full px-6 py-2 mb-6">
              <span className="text-black font-medium">{t('supportNBS.advantages.title')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className={`border-2 border-[#991E1E] rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group shadow-lg ${
                  advantage.highlighted 
                    ? 'bg-[#991E1E] text-white shadow-2xl' 
                    : 'bg-white hover:bg-[#991E1E] hover:text-white hover:shadow-2xl'
                }`}
                style={{
                  animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <div className={`p-8 text-center transition-all duration-300 relative ${
                  advantage.highlighted ? 'bg-[#991E1E]' : 'bg-[#991E1E]'
                }`}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 transform transition-all duration-300 hover:scale-110 shadow-md">
                    <div className="text-[#991E1E]">
                      {advantage.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
                </div>
                <div className={`p-8 transition-all duration-300 ${
                  advantage.highlighted ? 'bg-[#991E1E]' : 'bg-white group-hover:bg-[#991E1E]'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${
                    advantage.highlighted ? 'text-white' : 'text-[#991E1E] group-hover:text-white'
                  }`}>
                    {advantage.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    advantage.highlighted ? 'text-white opacity-90' : 'text-gray-600 group-hover:text-white group-hover:opacity-90'
                  }`}>
                    {advantage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

            {/* Program Directions Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#991E1E] leading-tight">
              {t('supportNBS.programDirections.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {programDirections.map((direction, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
                style={{
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.2}s both` : 'none',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                <div className="w-full h-56 rounded-lg mb-8 relative overflow-hidden shadow-lg">
                  <img
                    src={direction.title === t('supportNBS.programDirections.npo.title') ? '/images/ProBornNPO.png' : '/images/ProBornObrz.png'}
                    alt={direction.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-3xl font-bold text-[#991E1E] mb-6 group-hover:text-[#B91C1C] transition-colors duration-300">
                  {direction.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  {direction.description}
                </p>
                <ul className="space-y-3">
                  {direction.points.map((point, pointIndex) => (
                    <li 
                      key={pointIndex} 
                      className="text-gray-700 flex items-start group/item hover:text-[#991E1E] transition-colors duration-300"
                      style={{
                        animation: isVisible ? `fadeInLeft 0.6s ease-out ${(index * 0.2) + (pointIndex * 0.1) + 0.4}s both` : 'none',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)'
                      }}
                    >
                      <span className="text-[#991E1E] mr-3 text-lg group-hover/item:scale-110 transition-transform duration-300">•</span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

            {/* Initiators Section */}
      <div className="bg-gray-50 py-20">
        <div className="w-full">
          <div className="text-center mb-12 px-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('supportNBS.initiators.title')}</h2>
          </div>
          
          <div className="space-y-12">
            {initiators.map((initiator, index) => (
              <div
                key={index}
                className={`${initiator.bgColor} rounded-3xl p-16 flex flex-col lg:flex-row items-center gap-16 shadow-xl mx-8`}
              >
                <div className="w-96 h-80 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                  <img
                    src={initiator.image}
                    alt={initiator.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`flex-1 text-left ${initiator.bgColor === 'bg-red-800' || initiator.bgColor === 'bg-[#A4AADA]' ? 'text-white' : 'text-gray-800'}`}>
                  <h3 className="text-4xl font-bold mb-8">{initiator.title}</h3>
                  <p className="text-2xl mb-8 leading-relaxed">{initiator.description}</p>
                  <p className="text-xl opacity-90 leading-relaxed">{initiator.fullDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Modal */}
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default SupportNBS;
