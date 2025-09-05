import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      id: 'programs',
      title: t('homepage.footer.programs'),
      links: [
        { to: '/programs/mba', text: t('homepage.footer.links.mba') },
        { to: '/programs/executive-mba', text: t('homepage.footer.links.executiveMba') },
        { to: '/programs/dba', text: t('homepage.footer.links.dba') },
        { to: '/programs/exec', text: t('homepage.footer.links.executiveEducation') },
      ],
    },
    {
      id: 'about',
      title: t('homepage.footer.aboutSchool'),
      links: [
        { to: '/about', text: t('homepage.footer.links.about') },
        { to: '/faculty', text: t('homepage.footer.links.faculty') },
        { to: '/accreditations', text: t('homepage.footer.links.accreditations') },
        { to: '/partners', text: t('homepage.footer.links.partners') },
        { to: '/graduates', text: t('homepage.footer.links.graduates') },
      ],
    },
    {
      id: 'students',
      title: t('homepage.footer.students'),
      links: [
        { to: '/events', text: t('homepage.footer.links.events') },
        { to: '/news', text: t('homepage.footer.links.news') },
        { to: '/library', text: t('homepage.footer.links.library') },
        { to: '/support', text: t('homepage.footer.links.support') },
      ],
    },
  ];

  return (
    <footer className="bg-light py-8 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8 lg:space-y-12">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <Link to="/">
              <img
                src="/images/img_footerlogo.svg"
                alt="NARXOZ Business School Footer Logo"
                className="h-8 lg:h-10 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Mobile Accordion Footer / Desktop Grid */}
          <div className="block lg:hidden space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between py-3 text-left"
                >
                  <h3 className="text-gray-900 font-semibold text-lg">{section.title}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                      expandedSections[section.id] ? 'rotate-180' : ''
                    }`}
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

                {expandedSections[section.id] && (
                  <div className="space-y-3 pb-2">
                    {section.links.map((link, index) => (
                      <Link
                        key={index}
                        to={link.to}
                        className="block text-gray-600 hover:text-red-600 transition-colors py-1"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Contacts Section */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('contacts')}
                className="w-full flex items-center justify-between py-3 text-left"
              >
                <h3 className="text-gray-900 font-semibold text-lg">
                  {t('homepage.footer.contacts')}
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
                    expandedSections.contacts ? 'rotate-180' : ''
                  }`}
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

              {expandedSections.contacts && (
                <div className="space-y-4 pb-2">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 mt-1 flex-shrink-0 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {t('homepage.footer.address')}
                      <br />
                      {t('homepage.footer.country')}
                    </div>
                  </div>
                  <a
                    href="tel:+77767083636"
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-sm">+ 7 776 708 3636</span>
                  </a>
                  <a
                    href="mailto:gsb@narxoz.kz"
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm">gsb@narxoz.kz</span>
                  </a>
                  <a
                    href="https://narxoz.edu.kz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">narxoz.edu.kz</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Footer Navigation Grid */}
          <div className="hidden lg:grid grid-cols-4 gap-8">
            {/* Программы */}
            <div>
              <h3 className="text-muted font-bold text-xl mb-4 cursor-pointer hover:text-gray-700 transition-colors">
                {t('homepage.footer.programs')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/programs/mba"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.mba')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/executive-mba"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.executiveMba')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/dba"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.dba')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs/exec"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.executiveEducation')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* О школе */}
            <div>
              <h3 className="text-muted font-bold text-xl mb-4 cursor-pointer hover:text-gray-700 transition-colors">
                {t('homepage.footer.aboutSchool')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faculty"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.faculty')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accreditations"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.accreditations')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.partners')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/graduates"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.graduates')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Студентам */}
            <div>
              <h3 className="text-muted font-bold text-xl mb-4 cursor-pointer hover:text-gray-700 transition-colors">
                {t('homepage.footer.students')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/events"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.events')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.news')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/library"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.library')}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/support"
                    className="text-gray-600 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {t('homepage.footer.links.support')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Контакты */}
            <div>
              <h3 className="text-muted font-bold text-xl mb-4 cursor-pointer hover:text-gray-700 transition-colors">
                {t('homepage.footer.contacts')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <div className="flex items-start space-x-2">
                    <svg
                      className="w-4 h-4 mt-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed">
                      {t('homepage.footer.address')}
                      <br />
                      {t('homepage.footer.country')}
                    </span>
                  </div>
                </li>
                <li>
                  <a
                    href="tel:+77767083636"
                    className="flex items-center space-x-2 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span className="text-sm">+ 7 776 708 3636</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:gsb@narxoz.kz"
                    className="flex items-center space-x-2 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="text-sm">gsb@narxoz.kz</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://narxoz.edu.kz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">narxoz.edu.kz</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="border-t border-gray-300 pt-6 lg:pt-8">
            <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
              <div className="text-center lg:text-left">
                <h3 className="text-muted font-bold text-lg mb-3">
                  {t('homepage.footer.socialMedia')}
                </h3>
                <div className="flex items-center justify-center lg:justify-start space-x-6">
                  <a
                    href="https://wa.me/87767083636"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <img src="/images/img_vector.svg" alt="WhatsApp" className="w-7 h-7" />
                  </a>
                  <a
                    href="https://t.me/narxoz_business_school"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <img src="/images/img_vector_gray_600.svg" alt="Telegram" className="w-7 h-7" />
                  </a>
                  <a
                    href="https://instagram.com/narxoz_business_school"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                  >
                    <img
                      src="/images/img_vector_gray_600_25x25.svg"
                      alt="Instagram"
                      className="w-7 h-7"
                    />
                  </a>
                  <a
                    href="https://linkedin.com/school/narxoz-business-school"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/narxoz.business.school"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="text-sm text-gray-500 text-center lg:text-right">
                <p className="mb-2">{t('homepage.footer.copyright')}</p>
                <div className="flex justify-center lg:justify-end space-x-4">
                  <span className="text-gray-500">
                    {t('homepage.footer.privacy')}
                  </span>
                  <span className="text-gray-500">
                    {t('homepage.footer.terms')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
