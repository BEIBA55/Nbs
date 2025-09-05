import { useTranslation } from 'react-i18next';

// Функция для получения переведенных новостей
export const useTranslatedNews = () => {
  const { t } = useTranslation();
  
  // Получаем новости из переводов
  const translatedNews = t('homepage.news', { returnObjects: true });
  
  return translatedNews;
};

// Функция для получения новости по ID из переводов
export const getTranslatedNewsById = (id) => {
  // Эта функция будет использоваться в компонентах с useTranslation
  return null; // Будет реализована в компонентах
};

// Функция для получения всех переведенных новостей
export const getAllTranslatedNews = () => {
  // Эта функция будет использоваться в компонентах с useTranslation
  return null; // Будет реализована в компонентах
};
