import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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

const StatsNumbers = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Статистика из переводов
  const stats = t('homepage.statsSection.stats', { returnObjects: true });

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
    <section ref={sectionRef} className="w-full bg-[#F9F8F6] relative overflow-hidden py-3 sm:py-4 md:py-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="px-3 sm:px-6 md:px-12 py-2 sm:py-3 md:py-4">
          {/* Сетка со статистикой и изображением */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Изображение stats.png - адаптивный размер */}
            <div className="lg:col-span-1 flex justify-center items-center order-2 lg:order-1">
              <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none h-[200px] sm:h-[240px] lg:h-[260px] flex items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl">
                <img
                  src="/images/stats.png"
                  alt="Statistics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Статистические карточки */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 order-1 lg:order-2">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-sm transition-all duration-500 delay-${idx * 100} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="text-center">
                    {/* Префикс "Более" */}
                    {item.prefix && (
                      <div className="text-xs sm:text-sm text-[#6E767D] font-normal mb-1 sm:mb-2">{item.prefix}</div>
                    )}
                    
                    {/* Число с анимацией */}
                    <div className="text-lg sm:text-xl md:text-2xl font-semibold text-[#991E1E] leading-none mb-2 sm:mb-3">
                      <AnimatedCounter value={item.value} />
                    </div>
                    
                    {/* Лейбл */}
                    <div className="text-xs sm:text-sm font-normal text-[#6E767D] mb-1 sm:mb-2 leading-relaxed">
                      {item.label}
                    </div>
                    
                    {/* Описание */}
                    {item.description && (
                      <div className="text-xs text-[#6E767D] leading-relaxed font-light">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsNumbers;
