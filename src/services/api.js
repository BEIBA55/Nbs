// Mock данные для поиска
const searchData = [
  // Программы
  {
    id: 1,
    type: 'program',
    title: 'MBA',
    description: 'Магистерская программа в области бизнес-администрирования',
    url: '/programs/mba',
    category: 'Программы',
    tags: ['MBA', 'магистратура', 'бизнес', 'администрирование']
  },
  {
    id: 2,
    type: 'program',
    title: 'Executive MBA',
    description: 'Программа для топ-менеджеров и руководителей',
    url: '/programs/executive-mba',
    category: 'Программы',
    tags: ['Executive MBA', 'топ-менеджмент', 'руководство']
  },
  {
    id: 3,
    type: 'program',
    title: 'DBA',
    description: 'Докторская программа в области бизнес-администрирования',
    url: '/programs/dba',
    category: 'Программы',
    tags: ['DBA', 'докторантура', 'исследования']
  },
  {
    id: 4,
    type: 'program',
    title: 'Магистратура',
    description: 'Магистерские программы по различным направлениям',
    url: '/programs/magistracy',
    category: 'Программы',
    tags: ['магистратура', 'образование']
  },
  {
    id: 5,
    type: 'program',
    title: 'MBA Finance',
    description: 'Специализированная программа по финансам',
    url: '/programs/mba-finance',
    category: 'Программы',
    tags: ['MBA', 'финансы', 'банкинг']
  },
  {
    id: 6,
    type: 'program',
    title: 'MBA AI',
    description: 'Программа по искусственному интеллекту в бизнесе',
    url: '/programs/mba-ai',
    category: 'Программы',
    tags: ['MBA', 'AI', 'искусственный интеллект', 'технологии']
  },
  {
    id: 7,
    type: 'program',
    title: 'Executive Education',
    description: 'Корпоративные программы обучения',
    url: '/programs/executive-education',
    category: 'Программы',
    tags: ['Executive Education', 'корпоративное обучение']
  },

  // Новости
  {
    id: 8,
    type: 'news',
    title: 'Топовые эксперты',
    description: 'Реальные руководители из реальных компаний на практике внедрявшие инструменты контрактного менеджмента',
    url: '/news/1',
    category: 'Новости',
    tags: ['Конференции', 'Эксперты']
  },
  {
    id: 9,
    type: 'news',
    title: 'Narxoz Business School вошла в топ-50 лучших бизнес-школ Азии по версии QS',
    description: 'Программа MBA Бизнес-школы Университета Нархоз заняла 42-е место в рейтинге QS Global MBA 2025 Asia и стала №1 в Центрально-Азиатском регионе.',
    url: '/news/2',
    category: 'Новости',
    tags: ['Рейтинги', 'QS']
  },
  {
    id: 10,
    type: 'news',
    title: 'Запущена новая программа Executive MBA с фокусом на цифровую трансформацию',
    description: 'Narxoz Business School представила обновленную программу Executive MBA, которая включает модули по искусственному интеллекту и цифровым технологиям.',
    url: '/news/3',
    category: 'Новости',
    tags: ['Executive MBA', 'Цифровизация']
  },

  // Преподаватели
  {
    id: 11,
    type: 'faculty',
    title: 'Доктор Ахметов А.К.',
    description: 'Профессор кафедры финансов и банковского дела',
    url: '/faculty',
    category: 'Преподаватели',
    tags: ['финансы', 'банкинг', 'профессор']
  },
  {
    id: 12,
    type: 'faculty',
    title: 'Профессор Иванова М.П.',
    description: 'Заведующая кафедрой маркетинга и менеджмента',
    url: '/faculty',
    category: 'Преподаватели',
    tags: ['маркетинг', 'менеджмент', 'профессор']
  },

  // Аккредитации
  {
    id: 13,
    type: 'accreditation',
    title: 'AACSB Accreditation',
    description: 'Международная аккредитация AACSB для программ MBA',
    url: '/accreditations',
    category: 'Аккредитации',
    tags: ['AACSB', 'аккредитация', 'международная']
  },
  {
    id: 14,
    type: 'accreditation',
    title: 'EQUIS Accreditation',
    description: 'Европейская аккредитация EQUIS',
    url: '/accreditations',
    category: 'Аккредитации',
    tags: ['EQUIS', 'аккредитация', 'европейская']
  },

  // Партнеры
  {
    id: 15,
    type: 'partner',
    title: 'KPMG Kazakhstan',
    description: 'Стратегический партнер в области консалтинга',
    url: '/partners',
    category: 'Партнеры',
    tags: ['KPMG', 'консалтинг', 'партнерство']
  },
  {
    id: 16,
    type: 'partner',
    title: 'Ernst & Young',
    description: 'Партнер в области аудита и консалтинга',
    url: '/partners',
    category: 'Партнеры',
    tags: ['EY', 'аудит', 'консалтинг']
  },

  // Выпускники
  {
    id: 17,
    type: 'graduate',
    title: 'Алиев А.М.',
    description: 'CEO крупной IT компании, выпускник MBA 2020',
    url: '/graduates',
    category: 'Выпускники',
    tags: ['CEO', 'IT', 'MBA 2020']
  },
  {
    id: 18,
    type: 'graduate',
    title: 'Султанова Г.К.',
    description: 'Финансовый директор банка, выпускница Executive MBA',
    url: '/graduates',
    category: 'Выпускники',
    tags: ['CFO', 'банк', 'Executive MBA']
  },

  // Библиотека
  {
    id: 19,
    type: 'library',
    title: 'Бизнес-кейсы',
    description: 'Коллекция бизнес-кейсов от ведущих компаний',
    url: '/library',
    category: 'Библиотека',
    tags: ['кейсы', 'бизнес', 'обучение']
  },
  {
    id: 20,
    type: 'library',
    title: 'Учебные материалы',
    description: 'Электронные учебники и методические пособия',
    url: '/library',
    category: 'Библиотека',
    tags: ['учебники', 'материалы', 'обучение']
  }
];

// Функция поиска
export const searchAPI = {
  search: async (query, filters = {}) => {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!query || query.trim() === '') {
      return {
        results: [],
        total: 0,
        query: '',
        filters
      };
    }

    const searchQuery = query.toLowerCase().trim();
    
    // Фильтрация результатов
    let filteredResults = searchData.filter(item => {
      const matchesQuery = 
        item.title.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery));

      const matchesType = !filters.type || filters.type === 'all' || item.type === filters.type;
      const matchesCategory = !filters.category || filters.category === 'all' || item.category === filters.category;

      return matchesQuery && matchesType && matchesCategory;
    });

    // Сортировка по релевантности (простая реализация)
    filteredResults.sort((a, b) => {
      const aScore = getRelevanceScore(a, searchQuery);
      const bScore = getRelevanceScore(b, searchQuery);
      return bScore - aScore;
    });

    return {
      results: filteredResults,
      total: filteredResults.length,
      query: searchQuery,
      filters
    };
  },

  getSearchSuggestions: async (query) => {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    const suggestions = new Set();

    searchData.forEach(item => {
      if (item.title.toLowerCase().includes(searchQuery)) {
        suggestions.add(item.title);
      }
      item.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchQuery)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  },

  getCategories: () => {
    const categories = [...new Set(searchData.map(item => item.category))];
    return categories;
  },

  getTypes: () => {
    const types = [...new Set(searchData.map(item => item.type))];
    return types;
  }
};

// Функция для расчета релевантности
function getRelevanceScore(item, query) {
  let score = 0;
  
  // Поиск в заголовке
  if (item.title.toLowerCase().includes(query)) {
    score += 10;
  }
  
  // Поиск в описании
  if (item.description.toLowerCase().includes(query)) {
    score += 5;
  }
  
  // Поиск в тегах
  item.tags.forEach(tag => {
    if (tag.toLowerCase().includes(query)) {
      score += 3;
    }
  });

  return score;
} 

// API для регистрации на мероприятия
export const eventRegistrationAPI = {
  // Регистрация на мероприятие
  register: async (eventId, userData) => {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном проекте здесь был бы POST запрос к серверу
    // const response = await fetch('https://api.extraspace.kz/events/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({ eventId, ...userData })
    // });
    
    // Имитация успешной регистрации
    return {
      success: true,
      message: 'Регистрация успешно завершена!',
      registrationId: `REG-${Date.now()}`,
      eventId,
      userData
    };
  },

  // Получение информации о мероприятии
  getEventDetails: async (eventId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы GET запрос
    // const response = await fetch(`https://api.extraspace.kz/events/${eventId}`, {
    //   credentials: 'include'
    // });
    
    // Мок данные мероприятий (в реальном проекте данные придут с сервера)
    const eventsData = {
      1: {
        id: 1,
        title: 'Группы ЕМВА занятия - экскурсия по новому зданию и welcome break',
        date: '2025-07-11',
        time: '10:00-14:00',
        location: 'Новое здание NBS',
        maxParticipants: 30,
        currentParticipants: 15,
        isRegistrationOpen: true,
        speaker: 'Администрация ЕМВА',
        description: 'Экскурсия по новому зданию и welcome break. Розыгрыш мерча за посты в соц сетях и больше всего лайков.',
        cost: 'в бюджете программ ЕМВА'
      },
      2: {
        id: 2,
        title: 'Курс-подарок компаниям: Инвестиционный анализ проектов',
        date: '2025-07-15',
        time: '14:00-17:00',
        location: 'Аудитория NBS',
        maxParticipants: 50,
        currentParticipants: 25,
        isRegistrationOpen: true,
        speaker: 'Елжас Аубакиров, CFA',
        description: 'Инвестиционный анализ проектов - курс-подарок для компаний',
        cost: '0 тенге'
      },
      3: {
        id: 3,
        title: 'Мастер-класс: The AI Matrix: AI and You',
        date: '2025-07-16',
        time: '10:00-12:00',
        location: 'Аудитория NBS',
        maxParticipants: 40,
        currentParticipants: 30,
        isRegistrationOpen: true,
        speaker: 'Ewan Simpson, профессор NBS',
        description: 'The AI Matrix: AI and You - мастер-класс по искусственному интеллекту',
        cost: '0 тенге'
      },
      4: {
        id: 4,
        title: 'Коллаборация постов в соц сетях с narxoz.kz',
        date: '2025-07-16',
        time: '15:00-17:00',
        location: 'Онлайн',
        maxParticipants: 100,
        currentParticipants: 45,
        isRegistrationOpen: true,
        speaker: 'Маркетинг команда',
        description: 'Коллаборация постов в социальных сетях с официальным аккаунтом narxoz.kz',
        cost: '0 тенге'
      },
      5: {
        id: 5,
        title: 'Мастер-класс "7 ошибок руководителя"',
        date: '2025-07-16',
        time: '18:00-20:00',
        location: 'Аудитория NBS',
        maxParticipants: 35,
        currentParticipants: 20,
        isRegistrationOpen: true,
        speaker: 'Олег Алферов, эксперт NBS',
        description: 'Мастер-класс "7 ошибок руководителя" от эксперта NBS',
        cost: '0 тенге'
      },
      6: {
        id: 6,
        title: 'Встреча выпускников программ Мини-МВА',
        date: '2025-07-17',
        time: '14:00-17:00',
        location: 'Главный зал NBS',
        maxParticipants: 80,
        currentParticipants: 60,
        isRegistrationOpen: true,
        speaker: 'Олег Алферов, эксперт NBS',
        description: 'Встреча выпускников программ Мини-МВА - Форте, Халык, Алагуем. Мастер-класс от эксперта NBS',
        cost: '0 тенге'
      },
      7: {
        id: 7,
        title: 'Мастер-класс для закрытого бизнес-клуба Титаны',
        date: '2025-07-17',
        time: '19:00-21:00',
        location: 'Закрытый клуб',
        maxParticipants: 25,
        currentParticipants: 25,
        isRegistrationOpen: false,
        speaker: 'Эксперты NBS',
        description: 'Эксклюзивный мастер-класс для закрытого бизнес-клуба Титаны',
        cost: '0 тенге'
      },
      8: {
        id: 8,
        title: 'Коллаборация постов в соц сетях с партнерами',
        date: '2025-07-18',
        time: '10:00-12:00',
        location: 'Онлайн',
        maxParticipants: 100,
        currentParticipants: 30,
        isRegistrationOpen: true,
        speaker: 'Маркетинг команда',
        description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
        cost: '0 тенге'
      },
      9: {
        id: 9,
        title: 'Graduation программ МВА "Прикладные финансы"',
        date: '2025-07-18',
        time: '15:00-18:00',
        location: 'Актовый зал NBS',
        maxParticipants: 200,
        currentParticipants: 180,
        isRegistrationOpen: true,
        speaker: 'НБРК, АРРФР и ФГСВ',
        description: 'Graduation программ МВА "Прикладные финансы" с НБРК, АРРФР и ФГСВ - встреча выпускников ППФ',
        cost: 'в бюджете программ'
      },
      10: {
        id: 10,
        title: 'Группы ЕМВА занятия - экскурсия по новому зданию',
        date: '2025-07-18',
        time: '19:00-21:00',
        location: 'Новое здание NBS',
        maxParticipants: 30,
        currentParticipants: 18,
        isRegistrationOpen: true,
        speaker: 'Администрация ЕМВА',
        description: 'Группы ЕМВА занятия - экскурсия по новому зданию и welcome break',
        cost: 'в бюджете программ ЕМВА'
      }
    };
    
    return eventsData[eventId] || {
      id: eventId,
      title: 'Мероприятие',
      date: '2025-07-11',
      time: '10:00-14:00',
      location: 'NBS',
      maxParticipants: 50,
      currentParticipants: 25,
      isRegistrationOpen: true,
      speaker: 'Спикер',
      description: 'Описание мероприятия',
      cost: '0 тенге'
    };
  },

  // Проверка статуса регистрации пользователя
  checkRegistrationStatus: async (eventId, userId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Имитация проверки статуса
    return {
      isRegistered: false,
      registrationDate: null,
      status: 'not_registered' // not_registered, registered, cancelled, waitlist
    };
  }
}; 

// API для партнерства
export const partnershipAPI = {
  // Отправка заявки на партнерство
  submitPartnershipRequest: async (formData) => {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // В реальном проекте здесь был бы POST запрос к серверу
    // const response = await fetch('https://api.extraspace.kz/partnership/request', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify(formData)
    // });
    
    // Имитация успешной отправки
    return {
      success: true,
      message: 'Заявка на партнерство успешно отправлена!',
      requestId: `PART-${Date.now()}`,
      formData
    };
  },

  // Получение информации о партнерских программах
  getPartnershipPrograms: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Мок данные партнерских программ
    return [
      {
        id: 1,
        title: 'Корпоративное партнерство',
        description: 'Совместные программы обучения для сотрудников компаний',
        benefits: ['Скидки на программы', 'Индивидуальные условия', 'Корпоративные тренинги']
      },
      {
        id: 2,
        title: 'Академическое партнерство',
        description: 'Совместные исследовательские проекты и программы обмена',
        benefits: ['Международные стажировки', 'Совместные исследования', 'Программы обмена']
      },
      {
        id: 3,
        title: 'Стратегическое партнерство',
        description: 'Долгосрочное сотрудничество в области развития бизнес-образования',
        benefits: ['Эксклюзивные программы', 'Приоритетное сотрудничество', 'Совместные проекты']
      }
    ];
  }
};

import { createCSVContent, downloadCSV, formatFormDataForCSV, generateFormDataStats } from '../utils/csvUtils';

// API для работы с данными форм (CSV экспорт)
export const formDataAPI = {
  // Сохранение данных формы презентации
  savePresentationFormData: async (formData, programType = 'executive-mba-ngo') => {
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // В реальном проекте здесь был бы POST запрос к серверу
    // const response = await fetch('https://api.extraspace.kz/forms/presentation-data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     ...formData,
    //     programType,
    //     timestamp: new Date().toISOString(),
    //     userAgent: navigator.userAgent,
    //     referrer: document.referrer
    //   })
    // });
    
    // Сохраняем в localStorage для демонстрации (в реальном проекте данные будут на сервере)
    const existingData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    const newEntry = {
      id: `FORM-${Date.now()}`,
      ...formData,
      programType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    existingData.push(newEntry);
    localStorage.setItem('presentationFormData', JSON.stringify(existingData));
    
    return {
      success: true,
      message: 'Данные формы успешно сохранены!',
      formId: newEntry.id,
      data: newEntry
    };
  },

  // Получение всех данных форм (для админ-панели)
  getAllFormData: async (page = 1, limit = 50) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы GET запрос с аутентификацией
    // const response = await fetch(`https://api.extraspace.kz/admin/forms-data?page=${page}&limit=${limit}`, {
    //   method: 'GET',
    //   credentials: 'include'
    // });
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = allData.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedData,
      total: allData.length,
      page,
      limit,
      totalPages: Math.ceil(allData.length / limit)
    };
  },

  // Экспорт данных в CSV формат
  exportToCSV: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // В реальном проекте здесь был бы GET запрос с аутентификацией
    // const response = await fetch('https://api.extraspace.kz/admin/forms-data/export-csv', {
    //   method: 'GET',
    //   credentials: 'include'
    // });
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    
    // Фильтрация данных
    let filteredData = allData;
    if (filters.programType) {
      filteredData = filteredData.filter(item => item.programType === filters.programType);
    }
    if (filters.dateFrom) {
      filteredData = filteredData.filter(item => new Date(item.timestamp) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      filteredData = filteredData.filter(item => new Date(item.timestamp) <= new Date(filters.dateTo));
    }
    
    // Форматируем данные для CSV
    const formattedData = formatFormDataForCSV(filteredData);
    
    // Создаем CSV контент с помощью утилиты
    const csvContent = createCSVContent(formattedData, Object.keys(formattedData[0] || {}), {
      includeHeaders: true,
      dateFormat: 'ru-RU'
    });
    
    return {
      success: true,
      csvContent,
      filename: `presentation-forms-${new Date().toISOString().split('T')[0]}.csv`,
      recordCount: filteredData.length
    };
  },

  // Получение статистики по данным форм
  getFormDataStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const allData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    const stats = generateFormDataStats(allData);
    
    return {
      success: true,
      stats
    };
  },

  // Аутентификация для админ-панели
  authenticateAdmin: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // В реальном проекте здесь была бы проверка на сервере
    // const response = await fetch('https://api.extraspace.kz/admin/auth', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify(credentials)
    // });
    
    // Простая проверка для демонстрации
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const token = `admin-token-${Date.now()}`;
      localStorage.setItem('adminToken', token);
      
      return {
        success: true,
        message: 'Успешная аутентификация',
        token,
        user: {
          id: 1,
          username: 'admin',
          role: 'admin'
        }
      };
    }
    
    return {
      success: false,
      message: 'Неверные учетные данные'
    };
  },

  // Проверка аутентификации
  checkAuth: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const token = localStorage.getItem('adminToken');
    if (token) {
      return {
        success: true,
        authenticated: true,
        user: {
          id: 1,
          username: 'admin',
          role: 'admin'
        }
      };
    }
    
    return {
      success: false,
      authenticated: false
    };
  },

  // Выход из системы
  logout: async () => {
    localStorage.removeItem('adminToken');
    return {
      success: true,
      message: 'Успешный выход из системы'
    };
  }
};