import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const RankingSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Функция для получения правильного изображения в зависимости от языка
  const getN1Image = () => {
    switch (i18n.language) {
      case 'en':
        return '/images/n1en.png';
      case 'kk':
        return '/images/n1kz.png';
      default:
        return '/images/n1.png';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#F2F2F2] relative overflow-hidden pb-16">
      {/* Точечный паттерн карты мира */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #999 1px, transparent 1px),
                           radial-gradient(circle at 80% 70%, #999 1px, transparent 1px),
                           radial-gradient(circle at 40% 60%, #999 1px, transparent 1px),
                           radial-gradient(circle at 60% 40%, #999 1px, transparent 1px),
                           radial-gradient(circle at 30% 80%, #999 1px, transparent 1px),
                           radial-gradient(circle at 70% 20%, #999 1px, transparent 1px)`,
          backgroundSize: '200px 200px, 150px 150px, 180px 180px, 120px 120px, 160px 160px, 140px 140px',
          backgroundPosition: '0 0, 50px 50px, 100px 100px, 25px 75px, 75px 25px, 125px 125px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 pt-0">
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Центральное изображение с рейтингом */}
          <div className="flex justify-center -mt-32">
            <div className="w-[1200px] h-[900px] flex items-center justify-center">
              <img
                src={getN1Image()}
                alt="№1 в Центральной Азии"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Описательный текст внизу */}
          <div className="max-w-5xl mx-auto -mt-48 relative z-20">
            <div className="space-y-6">
              <p className="text-[#6E767D] text-base leading-relaxed text-center">
                {t('homepage.statsSection.ranking.description1')}
              </p>
              <p className="text-[#6E767D] text-base leading-relaxed text-center">
                {t('homepage.statsSection.ranking.description2')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingSection;


