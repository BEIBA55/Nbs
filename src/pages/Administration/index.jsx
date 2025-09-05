import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

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

const Administration = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const { t } = useTranslation();

  // Получаем данные администрации из переводов
  const administrationMembers = t('administration.members', { returnObjects: true });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900">
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-ping"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute bottom-20 right-1/3 w-20 h-20 bg-white/8 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-1 h-32 bg-gradient-to-b from-white/20 to-transparent animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-1 h-24 bg-gradient-to-b from-white/15 to-transparent animate-bounce"
            style={{ animationDelay: '1.5s' }}
          ></div>

          {/* Additional decorative elements */}
          <div
            className="absolute top-1/3 left-20 w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{ animationDelay: '3s' }}
          ></div>
          <div
            className="absolute bottom-1/3 right-32 w-3 h-3 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: '2.5s' }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center px-8">
          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

          {/* Main heading with animation */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-2 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
              {t('administration.title')}
            </h1>
          </div>

          {/* Subtitle with enhanced styling */}
          <div className="mb-6">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-white">
              {t('administration.subtitle')}
            </p>
            <div className="w-20 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          {/* Description with better typography */}
          <div className="mb-12 max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 font-light">
              {t('administration.description')}
            </p>
          </div>

          {/* Enhanced stats section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 px-4">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={7} />
                </div>
                <div className="text-base lg:text-lg font-medium text-white/90">
                  {t('administration.stats.members')}
                </div>
                <div className="text-xs lg:text-sm text-white/70 mt-1">
                  {t('administration.stats.members_description')}
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={20} suffix="+" />
                </div>
                <div className="text-base lg:text-lg font-medium text-white/90">
                  {t('administration.stats.experience')}
                </div>
                <div className="text-xs lg:text-sm text-white/70 mt-1">
                  {t('administration.stats.experience_description')}
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-50"></div>
              <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-4xl lg:text-5xl font-black mb-2 text-white group-hover:text-red-100 transition-colors">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-base lg:text-lg font-medium text-white/90">
                  {t('administration.stats.effectiveness')}
                </div>
                <div className="text-xs lg:text-sm text-white/70 mt-1">
                  {t('administration.stats.effectiveness_description')}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('administration.leadership.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('administration.leadership.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {administrationMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 relative overflow-hidden">
                    <img
                      src={member.image || `/images/img_rectangle_${1178 + index}.png`}
                      alt={member.name}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="md:col-span-2 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-xl text-red-800 font-semibold mb-2">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.department}</p>
                    <p className="text-sm text-gray-500 mb-4">{member.education}</p>
                    <p className="text-sm text-gray-500 mb-6">{member.experience}</p>

                    <div className="flex items-center justify-between">
                      <button className="text-red-800 text-sm font-medium hover:text-red-900">
                        {t('administration.leadership.more_details')}
                      </button>
                      <div className="text-xs text-gray-400">
                        {t('administration.leadership.click_for_details')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Member Details */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 z-10"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-1 relative">
                  <img
                    src={selectedMember.image || '/images/img_rectangle_1178.png'}
                    alt={selectedMember.name}
                    className="w-full h-96 lg:h-full object-cover"
                  />
                </div>

                <div className="lg:col-span-2 p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h2>
                  <p className="text-xl text-red-800 font-semibold mb-2">
                    {selectedMember.position}
                  </p>
                  <p className="text-gray-600 mb-6">{selectedMember.department}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('administration.modal.education')}
                      </h3>
                      <p className="text-gray-600 mb-4">{selectedMember.education}</p>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('administration.modal.experience')}
                      </h3>
                      <p className="text-gray-600 mb-4">{selectedMember.experience}</p>


                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('administration.modal.responsibilities')}
                      </h3>
                      <ul className="space-y-1 mb-6">
                        {selectedMember.responsibilities.map((resp, index) => (
                          <li key={index} className="text-gray-600 flex items-start gap-2">
                            <span className="text-red-800 mt-1">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {t('administration.modal.achievements')}
                      </h3>
                      <ul className="space-y-1">
                        {selectedMember.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-600 flex items-start gap-2">
                            <span className="text-red-800 mt-1">•</span>
                            {achievement}
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
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('administration.achievements.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('administration.achievements.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={7} />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {t('administration.achievements.members')}
              </div>
              <div className="text-gray-600">
                {t('administration.achievements.members_description')}
              </div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={20} suffix="+" />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {t('administration.achievements.experience')}
              </div>
              <div className="text-gray-600">
                {t('administration.achievements.experience_description')}
              </div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={50} suffix="+" />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {t('administration.achievements.projects')}
              </div>
              <div className="text-gray-600">
                {t('administration.achievements.projects_description')}
              </div>
            </div>

            <div className="text-center group">
              <div className="text-5xl font-bold text-red-800 mb-4 group-hover:text-red-900 transition-colors duration-300">
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {t('administration.achievements.effectiveness')}
              </div>
              <div className="text-gray-600">
                {t('administration.achievements.effectiveness_description')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {t('administration.contact.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('administration.contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('administration.contact.email')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('administration.contact.email_description')}
              </p>
              <a
                href="mailto:gsb@narxoz.kz"
                className="text-red-800 hover:text-red-900 font-medium"
              >
                gsb@narxoz.kz
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('administration.contact.phone')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('administration.contact.phone_description')}
              </p>
              <a href="tel:+77767083636" className="text-red-800 hover:text-red-900 font-medium">
              +7 776 708 3636
              </a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('administration.contact.address')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('administration.contact.address_description')}
              </p>
              <p className="text-red-800 font-medium">{t('administration.contact.address_value')}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Administration;

