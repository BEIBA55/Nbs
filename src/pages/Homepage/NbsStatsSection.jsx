import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Статистика будет загружаться из переводов

// Компонент для анимированного счетчика
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numericValue = parseInt(value.replace(/\s/g, ''));
    const increment = numericValue / (duration / 16);
    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
    return num.toString();
  };

  return <span ref={ref}>{formatNumber(count)}</span>;
};

const NbsStatsSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Получаем статистику из переводов
  const stats = t('homepage.statsSection.stats', { returnObjects: true });

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
    <section ref={sectionRef} className="w-full bg-[#F9F8F6] relative overflow-hidden py-8">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="px-6 md:px-12 pt-2 md:pt-4">
          <div
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h2 className="text-dark text-4xl md:text-5xl font-bold mb-4 text-left">
              {t('homepage.statsSection.title')}
            </h2>
          </div>
        </div>

        <div className="px-6 md:px-12 py-4 md:py-6">
          {/* Подзаголовок */}
          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <h3 className="text-gray-900 text-2xl md:text-3xl font-semibold mb-12 md:mb-16 text-center">
              {t('homepage.statsSection.subtitle')}
            </h3>
          </div>

          {/* Статистические карточки */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-2">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`group transition-all duration-500 delay-${idx * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="text-center">
                  {/* Число */}
                  <div className="mb-6">
                    <div className="text-lg text-[#991E1E] font-medium mb-2">{item.prefix}</div>
                    <div className="text-4xl md:text-5xl font-bold text-[#991E1E] leading-none mb-2">
                      <AnimatedCounter value={item.value} />
                    </div>
                    <div className="text-lg text-gray-500 font-medium">{item.label}</div>
                  </div>

                  {/* Описание */}
                  {item.description && (
                    <div className="text-gray-500 text-sm mt-3">{item.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Изображение №1 в Центральной Азии */}
          <div
            className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex flex-col items-center justify-center gap-1 md:gap-2 mb-4">
              {/* Изображение сверху */}
              <div className="flex justify-center">
                <div className="w-[500px] md:w-[700px] lg:w-[800px] h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center">
                  <img
                    src={getN1Image()}
                    alt="№1 в Центральной Азии"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Описание под изображением */}
              <div className="max-w-6xl w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Изображение слева */}
                  <div className="group hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/Ranked.png"
                      alt="QS Ranked"
                      className="w-40 md:w-48 h-auto rounded-xl"
                    />
                  </div>

                  {/* Описание в центре */}
                  <div className="flex-1 max-w-4xl text-center px-2">
                    <div className="space-y-3">
                      <p className="text-gray-900 text-base leading-relaxed text-center">
                        {t('homepage.statsSection.ranking.description1')}
                      </p>
                      <p className="text-gray-900 text-base leading-relaxed text-center">
                        {t('homepage.statsSection.ranking.description2')}
                      </p>
                    </div>
                  </div>

                  {/* Изображение справа */}
                  <div className="group hover:scale-105 transition-transform duration-300">
                    <img
                      src="/images/42.png"
                      alt="QS 42 Asia"
                      className="w-40 md:w-48 h-auto rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Убираем старый блок с QS изображениями */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NbsStatsSection;
