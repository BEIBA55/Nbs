import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Schedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // Июль 2025
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('calendar'); // calendar | list
  const [filters, setFilters] = useState({
    eventType: 'all',
    dateRange: 'upcoming', // upcoming, past, all
    searchQuery: ''
  });

  // Обработка перехода с параметрами из страницы тренингов
  useEffect(() => {
    if (location.state?.openRegistration && location.state?.trainingTitle) {
      // Находим соответствующий ивент по названию
      const matchingEvent = events.find(event => 
        event.title.toLowerCase().includes(location.state.trainingTitle.toLowerCase()) ||
        location.state.trainingTitle.toLowerCase().includes(event.title.toLowerCase())
      );
      
      if (matchingEvent) {
        setSelectedEvent(matchingEvent);
        // Переключаемся на режим списка для лучшего отображения
        setViewMode('list');
        // Очищаем state после обработки
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.state, navigate, location.pathname]);

  // Функция для форматирования даты с учетом локализации
  const formatLocalizedDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Проверяем, является ли дата сегодняшней, вчерашней или завтрашней
    if (date.toDateString() === today.toDateString()) {
      return t('eventRegistration.dateFormat.today');
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t('eventRegistration.dateFormat.yesterday');
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return t('eventRegistration.dateFormat.tomorrow');
    }

    // Иначе форматируем дату в соответствии с текущей локалью
    const locale = i18n.language === 'ru' ? 'ru-RU' : i18n.language === 'kk' ? 'kk-KZ' : 'en-US';
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // Функция для получения переведенных данных о мероприятии
  const getLocalizedEventData = (eventId) => {
    try {
      return {
        title: t(`eventRegistration.events.${eventId}.title`),
        description: t(`eventRegistration.events.${eventId}.description`),
        speaker: t(`eventRegistration.events.${eventId}.speaker`),
        location: t(`eventRegistration.events.${eventId}.location`),
        cost: t(`eventRegistration.events.${eventId}.cost`)
      };
    } catch (error) {
      // Если перевод не найден, возвращаем оригинальные данные
      const originalEvent = events.find(e => e.id === eventId);
      return originalEvent ? {
        title: originalEvent.title,
        description: originalEvent.description,
        speaker: originalEvent.speaker,
        location: originalEvent.location,
        cost: originalEvent.cost
      } : {
        title: 'Event not found',
        description: 'Event description not available',
        speaker: 'Speaker not specified',
        location: 'Location not specified',
        cost: 'Cost not specified'
      };
    }
  };

  // Мероприятия июля-августа 2025
  const events = [
    // Июль 2025
    {
      id: 1,
      title: 'Группы ЕМВА занятия - экскурсия по новому зданию и welcome break',
      date: '2025-07-11',
      time: '10:00-14:00',
      type: 'emba',
      speaker: 'Администрация ЕМВА',
      location: 'Новое здание NBS',
      description: 'Экскурсия по новому зданию и welcome break. Розыгрыш мерча за посты в соц сетях и больше всего лайков.',
      cost: 'в бюджете программ ЕМВА',
    },
    {
      id: 2,
      title: 'Курс-подарок компаниям: Инвестиционный анализ проектов',
      date: '2025-07-15',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Инвестиционный анализ проектов - курс-подарок для компаний',
      cost: '0 тенге',
    },
    {
      id: 3,
      title: 'Мастер-класс: The AI Matrix: AI and You',
      date: '2025-07-16',
      time: '10:00-12:00',
      type: 'masterclass',
      speaker: 'Ewan Simpson, профессор NBS',
      location: 'Аудитория NBS',
      description: 'The AI Matrix: AI and You - мастер-класс по искусственному интеллекту',
      cost: '0 тенге',
    },
    {
      id: 4,
      title: 'Коллаборация постов в соц сетях с narxoz.kz',
      date: '2025-07-16',
      time: '15:00-17:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с официальным аккаунтом narxoz.kz',
      cost: '0 тенге',
    },
    {
      id: 5,
      title: 'Мастер-класс "7 ошибок руководителя"',
      date: '2025-07-16',
      time: '18:00-20:00',
      type: 'masterclass',
      speaker: 'Олег Алферов, эксперт NBS',
      location: 'Аудитория NBS',
      description: 'Мастер-класс "7 ошибок руководителя" от эксперта NBS',
      cost: '0 тенге',
    },
    {
      id: 6,
      title: 'Встреча выпускников программ Мини-МВА',
      date: '2025-07-17',
      time: '14:00-17:00',
      type: 'alumni',
      speaker: 'Олег Алферов, эксперт NBS',
      location: 'Главный зал NBS',
      description: 'Встреча выпускников программ Мини-МВА - Форте, Халык, Алагуем. Мастер-класс от эксперта NBS',
      cost: '0 тенге',
    },
    {
      id: 7,
      title: 'Мастер-класс для закрытого бизнес-клуба Титаны',
      date: '2025-07-17',
      time: '19:00-21:00',
      type: 'masterclass',
      speaker: 'Эксперты NBS',
      location: 'Закрытый клуб',
      description: 'Эксклюзивный мастер-класс для закрытого бизнес-клуба Титаны',
      cost: '0 тенге',
    },
    {
      id: 8,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-07-18',
      time: '10:00-12:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 9,
      title: 'Graduation программ МВА "Прикладные финансы"',
      date: '2025-07-18',
      time: '15:00-18:00',
      type: 'graduation',
      speaker: 'НБРК, АРРФР и ФГСВ',
      location: 'Актовый зал NBS',
      description: 'Graduation программ МВА "Прикладные финансы" с НБРК, АРРФР и ФГСВ - встреча выпускников ППФ',
      cost: 'в бюджете программ',
    },
    {
      id: 10,
      title: 'Группы ЕМВА занятия - экскурсия по новому зданию',
      date: '2025-07-18',
      time: '19:00-21:00',
      type: 'emba',
      speaker: 'Администрация ЕМВА',
      location: 'Новое здание NBS',
      description: 'Группы ЕМВА занятия - экскурсия по новому зданию и welcome break',
      cost: 'в бюджете программ ЕМВА',
    },
    {
      id: 11,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-07-19',
      time: '14:00-16:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 12,
      title: 'Курс-подарок компаниям: Инвестиционный анализ проектов',
      date: '2025-07-21',
      time: '10:00-13:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, профессор NBS, CFA',
      location: 'Аудитория NBS',
      description: 'Инвестиционный анализ проектов - курс-подарок для компаний',
      cost: '0 тенге',
    },
    {
      id: 13,
      title: 'Курс-подарок: Сложности оценки стоимости компании в Казахстане',
      date: '2025-07-22',
      time: '10:00-12:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Сложности оценки стоимости компании в Казахстане (CFA, Private equity)',
      cost: '0 тенге',
    },
    {
      id: 14,
      title: 'Мастер-класс: HR Brand: Инсайты на миллион',
      date: '2025-07-22',
      time: '15:00-17:00',
      type: 'masterclass',
      speaker: 'Данияр Косназаров, советник президента Narxoz',
      location: 'Аудитория NBS',
      description: 'HR Brand: Инсайты на миллион - мастер-класс от советника президента Narxoz',
      cost: '0 тенге',
    },
    {
      id: 15,
      title: 'Мастер-класс: The AI Matrix: AI and Organizations',
      date: '2025-07-24',
      time: '14:00-16:00',
      type: 'masterclass',
      speaker: 'Ewan Simpson, профессор NBS',
      location: 'Аудитория NBS',
      description: 'The AI Matrix: AI and Organizations - мастер-класс по ИИ в организациях',
      cost: '0 тенге',
    },
    {
      id: 16,
      title: 'NBS Open Day - день открытых дверей программ NBS',
      date: '2025-07-25',
      time: '10:00-17:00',
      type: 'openday',
      speaker: 'Администрация NBS',
      location: 'Главный зал NBS',
      description: 'День открытых дверей программ NBS - презентация всех программ бизнес-школы',
      cost: '0 тенге',
    },
    {
      id: 17,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-07-26',
      time: '14:00-16:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 18,
      title: 'Курс-подарок: Стратегический Контроль Затрат',
      date: '2025-07-28',
      time: '10:00-13:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Стратегический Контроль Затрат: Основа Эффективных Решений - курс-подарок для компаний',
      cost: '0 тенге',
    },

    // Август 2025
    {
      id: 19,
      title: 'NBS Alumni Day - встреча выпускников NBS',
      date: '2025-08-01',
      time: '15:00-19:00',
      type: 'alumni',
      speaker: 'Alumni Association',
      location: 'Главный зал NBS',
      description: 'NBS Alumni Day - встреча выпускников NBS - New Big Step - новые возможности',
      cost: 'в рамках бюджета маркетинга',
    },
    {
      id: 20,
      title: 'Курс-подарок: Инвестиционный анализ проектов',
      date: '2025-08-04',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Инвестиционный анализ проектов с розыгрышем мерча за посты в соц сетях и больше всего лайков',
      cost: '0 тенге',
    },
    {
      id: 21,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-08-05',
      time: '10:00-12:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 22,
      title: 'Мастер-класс: The AI Matrix: AI and Organizations',
      date: '2025-08-05',
      time: '15:00-17:00',
      type: 'masterclass',
      speaker: 'Ewan Simpson, профессор NBS',
      location: 'Аудитория NBS',
      description: 'The AI Matrix: AI and Organizations - мастер-класс по ИИ в организациях',
      cost: '0 тенге',
    },
    {
      id: 23,
      title: 'Мастер-класс: HR тема (уточняется)',
      date: '2025-08-06',
      time: '14:00-16:00',
      type: 'masterclass',
      speaker: 'Елена Сокол HRD',
      location: 'Аудитория NBS',
      description: 'Мастер-класс от Елены Сокол HRD, тема уточняется',
      cost: '0 тенге',
    },
    {
      id: 24,
      title: 'Курс-подарок: Сложности оценки стоимости компании',
      date: '2025-08-07',
      time: '10:00-13:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Сложности оценки стоимости компании в Казахстане (CFA, Private equity)',
      cost: '0 тенге',
    },
    {
      id: 25,
      title: 'Мастер-класс: The AI Matrix: AI and You',
      date: '2025-08-08',
      time: '14:00-16:00',
      type: 'masterclass',
      speaker: 'Ewan Simpson, профессор NBS',
      location: 'Аудитория NBS',
      description: 'The AI Matrix: AI and You - мастер-класс по искусственному интеллекту',
      cost: '0 тенге',
    },
    {
      id: 26,
      title: 'Мастер-класс: Маркетинг в кризис',
      date: '2025-08-11',
      time: '15:00-17:00',
      type: 'masterclass',
      speaker: 'Данияр Косназаров, NBS Marketing Lab',
      location: 'Аудитория NBS',
      description: 'Маркетинг в кризис: Как пересобрать ваш оффер клиенту?',
      cost: '0 тенге',
    },
    {
      id: 27,
      title: 'Мастер-класс: Зумеры и Альфа: Как они меняют бизнес',
      date: '2025-08-12',
      time: '14:00-16:00',
      type: 'masterclass',
      speaker: 'Данияр Косназаров, NBS Marketing Lab',
      location: 'Аудитория NBS',
      description: 'Зумеры и Альфа: Как они меняют бизнес, труд и менеджмент?',
      cost: '0 тенге',
    },
    {
      id: 28,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-08-13',
      time: '10:00-12:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 29,
      title: 'Курс-подарок: Стратегический Контроль Затрат',
      date: '2025-08-14',
      time: '10:00-13:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, CFA',
      location: 'Аудитория NBS',
      description: 'Стратегический Контроль Затрат: Основа Эффективных Решений с розыгрышем мерча за посты в соц сетях',
      cost: '0 тенге',
    },
    {
      id: 30,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-08-15',
      time: '14:00-16:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 31,
      title: 'Курс-подарок: Инвестиционный анализ проектов',
      date: '2025-08-18',
      time: '10:00-13:00',
      type: 'course',
      speaker: 'Елжас Аубакиров, профессор NBS, CFA',
      location: 'Аудитория NBS',
      description: 'Инвестиционный анализ проектов - курс-подарок для компаний',
      cost: '0 тенге',
    },
    {
      id: 32,
      title: 'Kazakhstan Insurance Forum',
      date: '2025-08-18',
      time: '15:00-18:00',
      type: 'forum',
      speaker: 'ФГСВ',
      location: 'Конференц-зал NBS',
      description: 'Kazakhstan Insurance Forum - партнерский форум ФГСВ',
      cost: '0 тенге',
    },
    {
      id: 33,
      title: 'Курс-подарок для компаний',
      date: '2025-08-19',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Эксперты NBS',
      location: 'Аудитория NBS',
      description: 'Курс-подарок для компаний - тема уточняется',
      cost: '0 тенге',
    },
    {
      id: 34,
      title: 'NBS Open Day - день открытых дверей программ NBS',
      date: '2025-08-20',
      time: '10:00-17:00',
      type: 'openday',
      speaker: 'Администрация NBS',
      location: 'Главный зал NBS',
      description: 'День открытых дверей программ NBS - презентация всех программ бизнес-школы',
      cost: '0 тенге',
    },
    {
      id: 35,
      title: 'Курс-подарок для компаний',
      date: '2025-08-21',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Эксперты NBS',
      location: 'Аудитория NBS',
      description: 'Курс-подарок для компаний - тема уточняется',
      cost: '0 тенге',
    },
    {
      id: 36,
      title: 'HR Human Capital Forum',
      date: '2025-08-22',
      time: '09:00-18:00',
      type: 'forum',
      speaker: 'HR Association',
      location: 'Конференц-зал NBS',
      description: 'HR Human Capital - NBS партнер форума, PR новой NBS и программы EMBA для HRD. Участие принимают порядка 200 HRD',
      cost: '0 тенге',
    },
    {
      id: 37,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-08-25',
      time: '14:00-16:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 38,
      title: 'Курс-подарок для компаний',
      date: '2025-08-26',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Эксперты NBS',
      location: 'Аудитория NBS',
      description: 'Курс-подарок для компаний - тема уточняется',
      cost: '0 тенге',
    },
    {
      id: 39,
      title: 'Курс-подарок для компаний',
      date: '2025-08-27',
      time: '14:00-17:00',
      type: 'course',
      speaker: 'Эксперты NBS',
      location: 'Аудитория NBS',
      description: 'Курс-подарок для компаний - тема уточняется',
      cost: '0 тенге',
    },
    {
      id: 40,
      title: 'NBS Alumni Day',
      date: '2025-08-28',
      time: '15:00-19:00',
      type: 'alumni',
      speaker: 'Alumni Association',
      location: 'Главный зал NBS',
      description: 'NBS Alumni Day - встреча выпускников бизнес-школы',
      cost: '0 тенге',
    },
    {
      id: 41,
      title: 'Коллаборация постов в соц сетях с партнерами',
      date: '2025-08-29',
      time: '10:00-12:00',
      type: 'collaboration',
      speaker: 'Маркетинг команда',
      location: 'Онлайн',
      description: 'Коллаборация постов в социальных сетях с партнерами, грантодателями, слушателями',
      cost: '0 тенге',
    },
    {
      id: 42,
      title: 'Мероприятие для Грантодателей - pre-Opening',
      date: '2025-08-29',
      time: '18:00-21:00',
      type: 'event',
      speaker: 'Администрация NBS',
      location: 'Главный зал NBS',
      description: 'Мероприятие для Грантодателей - pre-Opening',
      cost: '0 тенге',
    },
    {
      id: 43,
      title: 'Розыгрыш гранта на МВА',
      date: '2025-08-01',
      time: '10:00-18:00',
      type: 'event',
      speaker: 'Администрация NBS',
      location: 'Онлайн',
      description: 'Розыгрыш гранта на МВА на англоязычную программу и на русскоязычную',
      cost: '300 000 тенге на таргет',
    },
    {
      id: 44,
      title: 'Партнерство с YPO',
      date: '2025-07-01',
      time: '10:00-17:00',
      type: 'event',
      speaker: 'YPO Kazakhstan',
      location: 'Конференц-зал NBS',
      description: 'YPO Kazakhstan Business case book, презентация в сентябре 2025',
      cost: '0 тенге',
    }
  ];

  const eventTypes = {
    lecture: { color: 'bg-blue-500', name: t('schedule.eventTypesNames.lecture') },
    event: { color: 'bg-red-500', name: t('schedule.eventTypesNames.event') },
    seminar: { color: 'bg-green-500', name: t('schedule.eventTypesNames.seminar') },
    masterclass: { color: 'bg-purple-500', name: t('schedule.eventTypesNames.masterclass') },
    conference: { color: 'bg-orange-500', name: t('schedule.eventTypesNames.conference') },
    networking: { color: 'bg-pink-500', name: t('schedule.eventTypesNames.networking') },
    workshop: { color: 'bg-indigo-500', name: t('schedule.eventTypesNames.workshop') },
    graduation: { color: 'bg-yellow-500', name: t('schedule.eventTypesNames.graduation') },
    course: { color: 'bg-teal-500', name: t('schedule.eventTypesNames.course') },
    collaboration: { color: 'bg-cyan-500', name: t('schedule.eventTypesNames.collaboration') },
    alumni: { color: 'bg-amber-500', name: t('schedule.eventTypesNames.alumni') },
    emba: { color: 'bg-emerald-500', name: t('schedule.eventTypesNames.emba') },
    openday: { color: 'bg-rose-500', name: t('schedule.eventTypesNames.openday') },
    forum: { color: 'bg-violet-500', name: t('schedule.eventTypesNames.forum') },
  };

  // Функции для работы с календарем
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Понедельник = 0
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (dateStr) => {
    return events.filter((event) => event.date === dateStr);
  };

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const monthNames = [
    t('schedule.months.january'), t('schedule.months.february'), t('schedule.months.march'), 
    t('schedule.months.april'), t('schedule.months.may'), t('schedule.months.june'),
    t('schedule.months.july'), t('schedule.months.august'), t('schedule.months.september'), 
    t('schedule.months.october'), t('schedule.months.november'), t('schedule.months.december'),
  ];

  const weekDays = [
    t('schedule.weekdays.monday'), t('schedule.weekdays.tuesday'), t('schedule.weekdays.wednesday'),
    t('schedule.weekdays.thursday'), t('schedule.weekdays.friday'), t('schedule.weekdays.saturday'),
    t('schedule.weekdays.sunday')
  ];

  // Функция для определения статуса мероприятия
  const getEventStatus = (eventDate) => {
    const today = new Date();
    const eventDateTime = new Date(eventDate + 'T00:00:00');
    return eventDateTime < today ? 'past' : 'upcoming';
  };

  // Функция для фильтрации событий
  const getFilteredEvents = () => {
    let filtered = events;

    // Фильтр по типу мероприятия
    if (filters.eventType !== 'all') {
      filtered = filtered.filter(event => event.type === filters.eventType);
    }

    // Фильтр по дате
    if (filters.dateRange === 'upcoming') {
      filtered = filtered.filter(event => getEventStatus(event.date) === 'upcoming');
    } else if (filters.dateRange === 'past') {
      filtered = filtered.filter(event => getEventStatus(event.date) === 'past');
    }

    // Фильтр по поиску
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(event => {
        const localizedData = getLocalizedEventData(event.id);
        return (localizedData.title && localizedData.title.toLowerCase().includes(query)) ||
          (localizedData.description && localizedData.description.toLowerCase().includes(query)) ||
          (localizedData.speaker && localizedData.speaker.toLowerCase().includes(query));
      });
    }

    return filtered;
  };

  // Функция для группировки событий по дате
  const filteredEvents = getFilteredEvents();
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEvents).sort();

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Пустые ячейки для начала месяца
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateStr);
      const isToday = dateStr === formatDate(new Date());

      days.push(
        <div
          key={day}
          className={`h-16 sm:h-20 md:h-24 border border-gray-200 p-1 overflow-hidden hover:bg-gray-50 cursor-pointer ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
        >
          <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            {dayEvents.slice(0, 2).map((event) => {
              const eventStatus = getEventStatus(event.date);
              return (
                <div
                  key={event.id}
                  className={`text-xs p-0.5 sm:p-1 rounded text-white cursor-pointer hover:opacity-80 ${eventStatus === 'past' ? 'opacity-60' : ''} ${eventTypes[event.type].color}`}
                  onClick={() => setSelectedEvent(event)}
                  title={getLocalizedEventData(event.id).title}
                >
                  <div className="truncate font-medium text-xs">{event.time}</div>
                  <div className="truncate text-xs">{getLocalizedEventData(event.id).title}</div>
                  {eventStatus === 'past' && (
                    <div className="truncate text-xs opacity-75">{t('schedule.event.completed')}</div>
                  )}
                </div>
              );
            })}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500 pl-1">{t('schedule.calendar.moreEvents', { count: dayEvents.length - 2 })}</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="bg-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('schedule.hero.title')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('schedule.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Переключатель режимов - Enhanced Mobile Optimization */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8 mb-3 sm:mb-4 px-3 sm:px-4">
        <button
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold border transition-colors text-sm sm:text-base ${viewMode === 'calendar' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          onClick={() => setViewMode('calendar')}
        >
          {t('schedule.viewMode.calendar')}
        </button>
        <button
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold border transition-colors text-sm sm:text-base ${viewMode === 'list' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          onClick={() => setViewMode('list')}
        >
          {t('schedule.viewMode.list')}
        </button>
      </div>

      {/* Фильтры для списка - Enhanced Mobile Optimization */}
      {viewMode === 'list' && (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mb-4 sm:mb-6">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
              <h3 className="text-base sm:text-lg font-bold text-gray-900">{t('schedule.filters.title')}</h3>
              <div className="text-xs sm:text-sm text-gray-600">
                {t('schedule.filters.foundEvents', { count: filteredEvents.length })}
                {filters.dateRange === 'upcoming' && (
                  <span className="ml-2 text-green-600">
                    {t('schedule.filters.upcomingEvents', { count: filteredEvents.filter(e => getEventStatus(e.date) === 'upcoming').length })}
                  </span>
                )}
                {filters.dateRange === 'past' && (
                  <span className="ml-2 text-gray-600">
                    {t('schedule.filters.pastEvents', { count: filteredEvents.filter(e => getEventStatus(e.date) === 'past').length })}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Поиск */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('schedule.filters.search')}
                </label>
                <input
                  type="text"
                  placeholder={t('schedule.filters.searchPlaceholder')}
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Тип мероприятия */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('schedule.filters.eventType')}
                </label>
                <select
                  value={filters.eventType}
                  onChange={(e) => setFilters(prev => ({ ...prev, eventType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="all">{t('schedule.eventTypes.all')}</option>
                  {Object.entries(eventTypes).map(([type, config]) => (
                    <option key={type} value={type}>{config.name}</option>
                  ))}
                </select>
              </div>

              {/* Период */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('schedule.filters.dateRange')}
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="upcoming">{t('schedule.upcoming')}</option>
                  <option value="past">{t('schedule.past')}</option>
                  <option value="all">{t('schedule.all')}</option>
                </select>
              </div>

              {/* Сброс фильтров */}
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({
                    eventType: 'all',
                    dateRange: 'upcoming',
                    searchQuery: ''
                  })}
                  className="w-full px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                >
                  {t('schedule.filters.resetFilters')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar/List Section - Enhanced Mobile Optimization */}
      <div className="py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {viewMode === 'calendar' ? (
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
            {/* Calendar Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  {t('schedule.today')}
                </button>
              </div>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-0 mb-1 sm:mb-2">
              {weekDays.map((day) => (
                <div key={day} className="p-2 sm:p-3 text-center font-medium text-gray-600 bg-gray-100 border border-gray-200 text-xs sm:text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0">{renderCalendar()}</div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  {t('schedule.list.noEventsFound')}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-4">
                  {t('schedule.list.noEventsFoundDescription')}
                </p>
                <button
                  onClick={() => setFilters({
                    eventType: 'all',
                    dateRange: 'upcoming',
                    searchQuery: ''
                  })}
                  className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  {t('schedule.list.resetFilters')}
                </button>
              </div>
            ) : (
              sortedDates.map((date) => (
                <div key={date} className="mb-6 sm:mb-8">
                  <div className="text-base sm:text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="uppercase text-gray-400 text-sm sm:text-base font-semibold">
                      {formatLocalizedDate(date)}
                    </span>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    {groupedEvents[date].map((event) => {
                      const eventStatus = getEventStatus(event.date);
                      return (
                        <div 
                          key={event.id} 
                          className={`flex flex-col gap-3 sm:gap-4 border-b pb-4 sm:pb-6 cursor-pointer hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-colors ${eventStatus === 'past' ? 'opacity-75' : ''}`}
                          onClick={() => setSelectedEvent(event)}
                        >
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-xs font-bold uppercase tracking-wider ${eventTypes[event.type]?.color || 'bg-gray-300'} text-white px-2 py-1 rounded`}>
                                {eventTypes[event.type]?.name || event.type}
                              </span>
                              <span className="text-xs text-gray-500">{event.time}</span>
                              {eventStatus === 'past' && (
                                <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                                  {t('schedule.status.completed')}
                                </span>
                              )}
                            </div>
                            <div className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{getLocalizedEventData(event.id).title}</div>
                            <div className="text-sm sm:text-base text-gray-700 mb-2">{getLocalizedEventData(event.id).description}</div>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                              <span><b>{t('eventRegistration.eventDetails.speaker')}:</b> {getLocalizedEventData(event.id).speaker}</span>
                              <span><b>{t('eventRegistration.eventDetails.location')}:</b> {getLocalizedEventData(event.id).location}</span>
                              <span><b>{t('eventRegistration.eventDetails.cost')}:</b> {getLocalizedEventData(event.id).cost}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Event Types Legend - Enhanced Mobile Optimization */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">{t('schedule.filters.title')}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {Object.entries(eventTypes).map(([type, config]) => (
              <div key={type} className="flex items-center space-x-2">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${config.color}`}></div>
                <span className="text-xs sm:text-sm text-gray-700">{config.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Detail Modal - Enhanced Mobile Optimization */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm ${eventTypes[selectedEvent.type].color}`}>
                {eventTypes[selectedEvent.type].name}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
                title={t('schedule.modal.close')}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">{getLocalizedEventData(selectedEvent.id).title}</h3>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.date')}:</strong> {selectedEvent.date}</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.time')}:</strong> {selectedEvent.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.location')}:</strong> {getLocalizedEventData(selectedEvent.id).location}</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.speaker')}:</strong> {getLocalizedEventData(selectedEvent.id).speaker}</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.cost')}:</strong> {getLocalizedEventData(selectedEvent.id).cost}</span>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <p className="text-sm sm:text-base text-gray-700">{getLocalizedEventData(selectedEvent.id).description}</p>
            </div>

            <div className="mt-4 sm:mt-6">
              {getEventStatus(selectedEvent.date) === 'past' ? (
                <div className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg text-center text-sm sm:text-base">
                  {t('schedule.modal.eventCompleted')}
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setSelectedEvent(null);
                    navigate(`/events/register/${selectedEvent.id}`);
                  }}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  {t('schedule.modal.register')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Schedule; 