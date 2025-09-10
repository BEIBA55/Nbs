# Система сохранения данных форм в CSV формате

## Описание

Реализована система для автоматического сохранения данных форм при скачивании презентаций в CSV формате с приватным админ-интерфейсом для просмотра и экспорта данных.

## Функциональность

### 1. Автоматическое сохранение данных форм
- При заполнении формы на всех страницах программ данные автоматически сохраняются
- Поддерживаемые программы:
  - MBA
  - Executive MBA
  - Executive MBA для CIO
  - Executive MBA для NGO/NPO
  - DBA
  - Mini MBA
  - Executive Education
  - Executive Sessions
  - Тренинги
  - Корпоративные клиенты
- Сохраняются следующие поля: имя, email, телефон, компания, тип программы, дата подачи, IP адрес
- Данные сохраняются в localStorage (для демонстрации) или на сервере (в продакшене)

### 2. Приватная менеджер-панель
- Доступ по адресу: `/manager`
- Аутентификация: логин `admin`, пароль `admin123`
- Просмотр всех данных форм в табличном виде
- Пагинация данных (20 записей на страницу)
- Фильтрация по типу программы и датам
- Поддержка всех типов программ
- Экспорт данных в CSV формат

### 3. CSV экспорт
- Поддержка кириллицы (BOM для Excel)
- Фильтрация данных перед экспортом
- Автоматическое именование файлов с датой
- Валидация данных

## Технические детали

### API Endpoints (formDataAPI)

```javascript
// Сохранение данных формы
formDataAPI.savePresentationFormData(formData, programType)

// Получение всех данных с пагинацией
formDataAPI.getAllFormData(page, limit)

// Экспорт в CSV
formDataAPI.exportToCSV(filters)

// Аутентификация админа
formDataAPI.authenticateAdmin(credentials)

// Проверка аутентификации
formDataAPI.checkAuth()

// Выход из системы
formDataAPI.logout()
```

### Утилиты CSV (csvUtils.js)

```javascript
// Создание CSV контента
createCSVContent(data, headers, options)

// Скачивание CSV файла
downloadCSV(csvContent, filename)

// Парсинг CSV
parseCSV(csvContent, options)

// Валидация данных
validateCSVData(data, requiredFields)

// Форматирование данных форм
formatFormDataForCSV(formData)

// Генерация статистики
generateFormDataStats(formData)
```

## Структура данных

### Формат сохранения в localStorage
```javascript
{
  id: "FORM-1234567890",
  name: "Иван Иванов",
  email: "ivan@example.com",
  phone: "+7 777 123 45 67",
  company: "ООО Компания",
  programType: "executive-mba-ngo",
  timestamp: "2024-01-15T10:30:00.000Z",
  userAgent: "Mozilla/5.0...",
  referrer: "https://example.com"
}
```

### CSV формат экспорта
```csv
ID,Имя,Email,Телефон,Компания,Программа,Дата подачи,IP адрес,Источник
FORM-1234567890,"Иван Иванов","ivan@example.com","+7 777 123 45 67","ООО Компания","executive-mba-ngo","15.01.2024, 13:30:00","Mozilla/5.0...","https://example.com"
```

## Безопасность

### Аутентификация
- Простая аутентификация по логину/паролю
- Токен сохраняется в localStorage
- Автоматическая проверка аутентификации при загрузке

### Приватность
- Админ-панель доступна только авторизованным пользователям
- Данные форм не отображаются публично
- CSV экспорт только для администраторов

## Интеграция с backend

Для интеграции с реальным backend сервером необходимо:

1. **Заменить localStorage на API вызовы:**
```javascript
// Вместо localStorage
const response = await fetch('https://api.extraspace.kz/forms/presentation-data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    ...formData,
    programType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer
  })
});
```

2. **Настроить CORS и withCredentials:**
```javascript
// В axios или fetch
withCredentials: true
```

3. **Реализовать серверные endpoints:**
- `POST /forms/presentation-data` - сохранение данных формы
- `GET /admin/forms-data` - получение данных с пагинацией
- `GET /admin/forms-data/export-csv` - экспорт в CSV
- `POST /admin/auth` - аутентификация
- `GET /admin/check-auth` - проверка аутентификации

## Использование

### Для пользователей
1. Перейти на любую страницу программы (MBA, Executive MBA, DBA, Mini MBA и т.д.)
2. Нажать кнопку "Скачать презентацию"
3. Заполнить форму
4. Данные автоматически сохранятся при скачивании

### Для менеджеров
1. Перейти на `/manager`
2. Войти с учетными данными: `admin` / `admin123`
3. Просматривать данные всех программ в таблице
4. Использовать фильтры по типу программы и датам
5. Скачивать CSV файлы с данными

## Расширение функциональности

### Добавление новых программ
1. Обновить `programType` в форме
2. Добавить новый тип в фильтры админ-панели
3. Обновить статистику

### Дополнительные поля
1. Добавить поля в форму
2. Обновить `formatFormDataForCSV`
3. Добавить колонки в таблицу админ-панели

### Улучшение безопасности
1. Реализовать JWT токены
2. Добавить роли пользователей
3. Настроить HTTPS
4. Добавить логирование действий

## Файлы проекта

- `src/services/api.js` - API для работы с данными форм
- `src/utils/csvUtils.js` - утилиты для работы с CSV
- `src/pages/AdminPanel/index.jsx` - админ-панель
- `src/pages/ProgramPage/ExecutiveMBANGO/index.jsx` - обновленная форма
- `src/Routes.jsx` - маршрут для админ-панели
