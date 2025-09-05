import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺', short: 'RU' },
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'kk', name: 'Қазақша', flag: '🇰🇿', short: 'KZ' },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  // Показываем только неактивные языки
  const inactiveLanguages = languages.filter((language) => language.code !== i18n.language);

  return (
    <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20">
      {inactiveLanguages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageChange(language.code)}
          className="
            relative flex items-center justify-center px-3 py-2 rounded-full
            transition-all duration-300 ease-out transform
            text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 hover:scale-102
            focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-1
            active:scale-95
            group
            min-w-[3rem]
          "
          title={language.name}
          aria-label={`Переключить на ${language.name}`}
        >
          {/* Текст кода языка */}
          <span className="text-sm font-medium text-gray-600 relative z-10">
            {language.short}
          </span>
          
          {/* Hover эффект */}
          <div className="
            absolute inset-0 rounded-full opacity-0 transition-opacity duration-200
            bg-gray-200/50
            group-hover:opacity-100
          " />
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
