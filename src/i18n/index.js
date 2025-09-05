import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Импорт переводов
import ru from './locales/ru.json';
import en from './locales/en.json';
import kk from './locales/kk.json';

const resources = {
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
  kk: {
    translation: kk,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: false,
    load: 'languageOnly',
    preload: ['ru', 'en', 'kk'],

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
