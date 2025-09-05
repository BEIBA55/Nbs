import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Если есть хэш в URL (якорь), прокручиваем к нему
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Мгновенная прокрутка к якорю
        element.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
        return;
      }
    }

    // Иначе прокручиваем к началу страницы мгновенно
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname, hash]);

  return null; // Компонент не рендерит ничего
};

export default ScrollToTop;
