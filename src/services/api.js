// Функция для получения переведенных данных поиска
const getTranslatedSearchData = (t) => [
  // Программы
  {
    id: 1,
    type: 'program',
    title: t('search.searchData.mba.title'),
    description: t('search.searchData.mba.description'),
    url: '/programs/mba',
    category: 'Программы',
    tags: ['MBA', 'магистратура', 'бизнес', 'администрирование']
  },
  {
    id: 2,
    type: 'program',
    title: t('search.searchData.executiveMba.title'),
    description: t('search.searchData.executiveMba.description'),
    url: '/programs/executive-mba',
    category: 'Программы',
    tags: ['Executive MBA', 'топ-менеджмент', 'руководство']
  },
  {
    id: 3,
    type: 'program',
    title: t('search.searchData.dba.title'),
    description: t('search.searchData.dba.description'),
    url: '/programs/dba',
    category: 'Программы',
    tags: ['DBA', 'докторантура', 'исследования']
  },
  {
    id: 4,
    type: 'program',
    title: t('search.searchData.magistracy.title'),
    description: t('search.searchData.magistracy.description'),
    url: '/programs/magistracy',
    category: 'Программы',
    tags: ['магистратура', 'образование']
  },
  {
    id: 5,
    type: 'program',
    title: t('search.searchData.mbaFinance.title'),
    description: t('search.searchData.mbaFinance.description'),
    url: '/programs/mba-finance',
    category: 'Программы',
    tags: ['MBA', 'финансы', 'банкинг']
  },
  {
    id: 6,
    type: 'program',
    title: t('search.searchData.mbaAi.title'),
    description: t('search.searchData.mbaAi.description'),
    url: '/programs/mba-ai',
    category: 'Программы',
    tags: ['MBA', 'AI', 'искусственный интеллект', 'технологии']
  },
  {
    id: 7,
    type: 'program',
    title: t('search.searchData.executiveEducation.title'),
    description: t('search.searchData.executiveEducation.description'),
    url: '/programs/executive-education',
    category: 'Программы',
    tags: ['Executive Education', 'корпоративное обучение']
  },

  // Новости
  {
    id: 8,
    type: 'news',
    title: t('search.searchData.topExperts.title'),
    description: t('search.searchData.topExperts.description'),
    url: '/news/1',
    category: 'Новости',
    tags: ['Конференции', 'Эксперты']
  },
  {
    id: 9,
    type: 'news',
    title: t('search.searchData.qsRanking.title'),
    description: t('search.searchData.qsRanking.description'),
    url: '/news/2',
    category: 'Новости',
    tags: ['Рейтинги', 'QS']
  },
  {
    id: 10,
    type: 'news',
    title: t('search.searchData.digitalTransformation.title'),
    description: t('search.searchData.digitalTransformation.description'),
    url: '/news/3',
    category: 'Новости',
    tags: ['Executive MBA', 'Цифровизация']
  },

  // Преподаватели
  {
    id: 11,
    type: 'faculty',
    title: t('search.searchData.ahmetov.title'),
    description: t('search.searchData.ahmetov.description'),
    url: '/faculty',
    category: 'Преподаватели',
    tags: ['финансы', 'банкинг', 'профессор']
  },
  {
    id: 12,
    type: 'faculty',
    title: t('search.searchData.ivanova.title'),
    description: t('search.searchData.ivanova.description'),
    url: '/faculty',
    category: 'Преподаватели',
    tags: ['маркетинг', 'менеджмент', 'профессор']
  },

  // Аккредитации
  {
    id: 13,
    type: 'accreditation',
    title: t('search.searchData.aacsb.title'),
    description: t('search.searchData.aacsb.description'),
    url: '/accreditations',
    category: 'Аккредитации',
    tags: ['AACSB', 'аккредитация', 'международная']
  },
  {
    id: 14,
    type: 'accreditation',
    title: t('search.searchData.equis.title'),
    description: t('search.searchData.equis.description'),
    url: '/accreditations',
    category: 'Аккредитации',
    tags: ['EQUIS', 'аккредитация', 'европейская']
  },

  // Партнеры
  {
    id: 15,
    type: 'partner',
    title: t('search.searchData.kpmg.title'),
    description: t('search.searchData.kpmg.description'),
    url: '/partners',
    category: 'Партнеры',
    tags: ['KPMG', 'консалтинг', 'партнерство']
  },
  {
    id: 16,
    type: 'partner',
    title: t('search.searchData.ey.title'),
    description: t('search.searchData.ey.description'),
    url: '/partners',
    category: 'Партнеры',
    tags: ['EY', 'аудит', 'консалтинг']
  },

  // Выпускники
  {
    id: 17,
    type: 'graduate',
    title: t('search.searchData.aliev.title'),
    description: t('search.searchData.aliev.description'),
    url: '/graduates',
    category: 'Выпускники',
    tags: ['CEO', 'IT', 'MBA 2020']
  },
  {
    id: 18,
    type: 'graduate',
    title: t('search.searchData.sultanova.title'),
    description: t('search.searchData.sultanova.description'),
    url: '/graduates',
    category: 'Выпускники',
    tags: ['CFO', 'банк', 'Executive MBA']
  },

  // Библиотека
  {
    id: 19,
    type: 'library',
    title: t('search.searchData.businessCases.title'),
    description: t('search.searchData.businessCases.description'),
    url: '/library',
    category: 'Библиотека',
    tags: ['кейсы', 'бизнес', 'обучение']
  },
  {
    id: 20,
    type: 'library',
    title: t('search.searchData.studyMaterials.title'),
    description: t('search.searchData.studyMaterials.description'),
    url: '/library',
    category: 'Библиотека',
    tags: ['учебники', 'материалы', 'обучение']
  }
];

// Функция поиска
export const searchAPI = {
  search: async (query, filters = {}, t) => {
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
    const searchData = getTranslatedSearchData(t);
    
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

  getSearchSuggestions: async (query, t) => {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchQuery = query.toLowerCase().trim();
    const suggestions = new Set();
    const searchData = getTranslatedSearchData(t);

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

  getCategories: (t) => {
    const searchData = getTranslatedSearchData(t);
    const categories = [...new Set(searchData.map(item => item.category))];
    return categories;
  },

  getTypes: () => {
    // Типы не зависят от языка
    return ['program', 'news', 'faculty', 'accreditation', 'partner', 'graduate', 'library'];
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

// Константы для типов программ
export const PROGRAM_TYPES = {
  MBA: 'mba',
  EXECUTIVE_MBA: 'executive-mba',
  EXECUTIVE_MBA_CIO: 'executive-mba-cio',
  EXECUTIVE_MBA_NGO: 'executive-mba-ngo',
  DBA: 'dba',
  MINI_MBA: 'mini-mba',
  EXECUTIVE_EDUCATION: 'executive-education',
  EXECUTIVE_SESSIONS: 'executive-sessions',
  TRAININGS: 'trainings',
  CORPORATE_CLIENTS: 'corporate-clients'
};

// Названия программ для отображения
export const PROGRAM_NAMES = {
  [PROGRAM_TYPES.MBA]: 'MBA',
  [PROGRAM_TYPES.EXECUTIVE_MBA]: 'Executive MBA',
  [PROGRAM_TYPES.EXECUTIVE_MBA_CIO]: 'Executive MBA для CIO',
  [PROGRAM_TYPES.EXECUTIVE_MBA_NGO]: 'Executive MBA для NGO/NPO',
  [PROGRAM_TYPES.DBA]: 'DBA',
  [PROGRAM_TYPES.MINI_MBA]: 'Mini MBA',
  [PROGRAM_TYPES.EXECUTIVE_EDUCATION]: 'Executive Education',
  [PROGRAM_TYPES.EXECUTIVE_SESSIONS]: 'Executive Sessions',
  [PROGRAM_TYPES.TRAININGS]: 'Тренинги',
  [PROGRAM_TYPES.CORPORATE_CLIENTS]: 'Корпоративные клиенты'
};

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
    
    // Сортируем по дате (новые сверху)
    const sortedData = allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
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
    if (filters.programType && filters.programType !== 'all') {
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

  // Получение списка всех программ
  getProgramTypes: () => {
    return {
      success: true,
      programTypes: PROGRAM_TYPES,
      programNames: PROGRAM_NAMES
    };
  },

  // Удаление записи по ID
  deleteFormData: async (formId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы DELETE запрос с аутентификацией
    // const response = await fetch(`https://api.extraspace.kz/admin/forms-data/${formId}`, {
    //   method: 'DELETE',
    //   credentials: 'include'
    // });
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    const filteredData = allData.filter(item => item.id !== formId);
    
    localStorage.setItem('presentationFormData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: 'Запись успешно удалена',
      deletedId: formId
    };
  },

  // Массовое удаление записей
  deleteMultipleFormData: async (formIds) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('presentationFormData') || '[]');
    const filteredData = allData.filter(item => !formIds.includes(item.id));
    
    localStorage.setItem('presentationFormData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: `Удалено записей: ${formIds.length}`,
      deletedIds: formIds
    };
  },

  // === КОНТАКТНЫЕ ЗАЯВКИ ===

  // Сохранение контактной заявки
  saveContactApplication: async (contactData, programType) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы POST запрос
    // const response = await fetch('https://api.extraspace.kz/contact-applications', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     ...contactData,
    //     programType,
    //     timestamp: new Date().toISOString()
    //   })
    // });
    
    const newContactApplication = {
      id: `CONTACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...contactData,
      programType,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Получаем существующие данные
    const existingData = JSON.parse(localStorage.getItem('contactApplicationsData') || '[]');
    existingData.push(newContactApplication);
    
    // Сохраняем в localStorage для демонстрации
    localStorage.setItem('contactApplicationsData', JSON.stringify(existingData));
    
    return {
      success: true,
      data: newContactApplication,
      message: 'Контактная заявка успешно отправлена'
    };
  },

  // Получение всех контактных заявок с пагинацией
  getAllContactData: async (page = 1, limit = 20) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы GET запрос с аутентификацией
    // const response = await fetch(`https://api.extraspace.kz/admin/contact-applications?page=${page}&limit=${limit}`, {
    //   method: 'GET',
    //   credentials: 'include'
    // });
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('contactApplicationsData') || '[]');
    
    // Сортируем по дате (новые сверху)
    const sortedData = allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedData,
      total: allData.length,
      page: page,
      totalPages: Math.ceil(allData.length / limit)
    };
  },

  // Экспорт контактных заявок в CSV
  exportContactDataToCSV: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем данные из localStorage для демонстрации
    let allData = JSON.parse(localStorage.getItem('contactApplicationsData') || '[]');
    
    // Применяем фильтры
    if (filters.programType && filters.programType !== 'all') {
      allData = allData.filter(item => item.programType === filters.programType);
    }
    
    if (filters.dateFrom) {
      allData = allData.filter(item => new Date(item.timestamp) >= new Date(filters.dateFrom));
    }
    
    if (filters.dateTo) {
      allData = allData.filter(item => new Date(item.timestamp) <= new Date(filters.dateTo));
    }
    
    // Сортируем по дате (новые сверху)
    allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Создаем CSV контент
    const csvContent = createCSVContent(allData, 'contactApplications');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `contact-applications-${timestamp}.csv`;
    
    return {
      success: true,
      csvContent,
      filename,
      recordCount: allData.length
    };
  },

  // Удаление контактной заявки по ID
  deleteContactData: async (contactId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('contactApplicationsData') || '[]');
    const filteredData = allData.filter(item => item.id !== contactId);
    
    localStorage.setItem('contactApplicationsData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: 'Контактная заявка успешно удалена',
      deletedId: contactId
    };
  },

  // Массовое удаление контактных заявок
  deleteMultipleContactData: async (contactIds) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('contactApplicationsData') || '[]');
    const filteredData = allData.filter(item => !contactIds.includes(item.id));
    
    localStorage.setItem('contactApplicationsData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: `Удалено контактных заявок: ${contactIds.length}`,
      deletedIds: contactIds
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
  },

  // === КОНСУЛЬТАЦИИ ===

  // Сохранение заявки на консультацию
  saveConsultationRequest: async (consultationData, source = 'homepage') => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы POST запрос
    // const response = await fetch('https://api.extraspace.kz/consultations', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     ...consultationData,
    //     source,
    //     timestamp: new Date().toISOString()
    //   })
    // });
    
    const newConsultation = {
      id: `CONSULT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...consultationData,
      source, // homepage, main-page, contact-form
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer
    };
    
    // Получаем существующие данные
    const existingData = JSON.parse(localStorage.getItem('consultationRequestsData') || '[]');
    existingData.push(newConsultation);
    
    // Сохраняем в localStorage для демонстрации
    localStorage.setItem('consultationRequestsData', JSON.stringify(existingData));
    
    return {
      success: true,
      data: newConsultation,
      message: 'Заявка на консультацию успешно отправлена'
    };
  },

  // Получение всех заявок на консультации с пагинацией
  getAllConsultationData: async (page = 1, limit = 20) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // В реальном проекте здесь был бы GET запрос с аутентификацией
    // const response = await fetch(`https://api.extraspace.kz/admin/consultations?page=${page}&limit=${limit}`, {
    //   method: 'GET',
    //   credentials: 'include'
    // });
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('consultationRequestsData') || '[]');
    
    // Сортируем по дате (новые сверху)
    const sortedData = allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: paginatedData,
      total: allData.length,
      page: page,
      totalPages: Math.ceil(allData.length / limit)
    };
  },

  // Экспорт заявок на консультации в CSV
  exportConsultationDataToCSV: async (filters = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем данные из localStorage для демонстрации
    let allData = JSON.parse(localStorage.getItem('consultationRequestsData') || '[]');
    
    // Применяем фильтры
    if (filters.source && filters.source !== 'all') {
      allData = allData.filter(item => item.source === filters.source);
    }
    
    if (filters.dateFrom) {
      allData = allData.filter(item => new Date(item.timestamp) >= new Date(filters.dateFrom));
    }
    
    if (filters.dateTo) {
      allData = allData.filter(item => new Date(item.timestamp) <= new Date(filters.dateTo));
    }
    
    // Сортируем по дате (новые сверху)
    allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Создаем CSV контент
    const csvContent = createCSVContent(allData, 'consultationRequests');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `consultation-requests-${timestamp}.csv`;
    
    return {
      success: true,
      csvContent,
      filename,
      recordCount: allData.length
    };
  },

  // Удаление заявки на консультацию по ID
  deleteConsultationData: async (consultationId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('consultationRequestsData') || '[]');
    const filteredData = allData.filter(item => item.id !== consultationId);
    
    localStorage.setItem('consultationRequestsData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: 'Заявка на консультацию успешно удалена',
      deletedId: consultationId
    };
  },

  // Массовое удаление заявок на консультации
  deleteMultipleConsultationData: async (consultationIds) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Получаем данные из localStorage для демонстрации
    const allData = JSON.parse(localStorage.getItem('consultationRequestsData') || '[]');
    const filteredData = allData.filter(item => !consultationIds.includes(item.id));
    
    localStorage.setItem('consultationRequestsData', JSON.stringify(filteredData));
    
    return {
      success: true,
      message: `Удалено заявок на консультации: ${consultationIds.length}`,
      deletedIds: consultationIds
    };
  }
};