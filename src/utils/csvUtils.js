// Утилиты для работы с CSV файлами

/**
 * Создает CSV контент из массива объектов
 * @param {Array} data - массив объектов для конвертации
 * @param {string|Array} dataType - тип данных ('presentationForms' или 'contactApplications') или заголовки колонок
 * @param {Object} options - опции форматирования
 * @returns {string} CSV контент
 */
export const createCSVContent = (data, dataType = [], options = {}) => {
  const {
    delimiter = ',',
    includeHeaders = true,
    dateFormat = 'ru-RU'
  } = options;

  if (!data || data.length === 0) {
    return '';
  }

  // Определяем заголовки в зависимости от типа данных
  let csvHeaders;
  if (Array.isArray(dataType)) {
    // Если передан массив заголовков
    csvHeaders = dataType;
  } else if (dataType === 'contactApplications') {
    // Заголовки для контактных заявок
    csvHeaders = ['ID', 'Имя', 'Фамилия', 'Email', 'Телефон', 'Программа', 'Дата подачи', 'IP адрес', 'Источник'];
  } else if (dataType === 'consultationRequests') {
    // Заголовки для заявок на консультации
    csvHeaders = ['ID', 'Имя', 'Email', 'Телефон', 'Источник страницы', 'Дата подачи', 'IP адрес', 'Источник'];
  } else {
    // Заголовки для форм презентаций (по умолчанию)
    csvHeaders = ['ID', 'Имя', 'Email', 'Телефон', 'Компания', 'Программа', 'Дата подачи', 'IP адрес', 'Источник'];
  }
  
  // Функция для экранирования значений
  const escapeValue = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    
    const stringValue = String(value);
    
    // Если значение содержит запятую, кавычки или перенос строки, оборачиваем в кавычки
    if (stringValue.includes(delimiter) || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    
    return stringValue;
  };

  // Создаем строки CSV
  const csvRows = [];
  
  // Добавляем заголовки
  if (includeHeaders) {
    csvRows.push(csvHeaders.map(header => escapeValue(header)).join(delimiter));
  }
  
  // Добавляем данные
  data.forEach(item => {
    const row = csvHeaders.map(header => {
      let value;
      
      // Маппинг полей в зависимости от типа данных
      if (dataType === 'contactApplications') {
        switch (header) {
          case 'ID': value = item.id; break;
          case 'Имя': value = item.firstName; break;
          case 'Фамилия': value = item.lastName; break;
          case 'Email': value = item.email; break;
          case 'Телефон': value = item.phone; break;
          case 'Программа': value = item.programType; break;
          case 'Дата подачи': value = item.timestamp; break;
          case 'IP адрес': value = item.userAgent; break;
          case 'Источник': value = item.referrer; break;
          default: value = item[header];
        }
      } else if (dataType === 'consultationRequests') {
        switch (header) {
          case 'ID': value = item.id; break;
          case 'Имя': value = item.name; break;
          case 'Email': value = item.email; break;
          case 'Телефон': value = item.phone; break;
          case 'Источник страницы': value = item.source; break;
          case 'Дата подачи': value = item.timestamp; break;
          case 'IP адрес': value = item.userAgent; break;
          case 'Источник': value = item.referrer; break;
          default: value = item[header];
        }
      } else {
        // Для форм презентаций
        switch (header) {
          case 'ID': value = item.id; break;
          case 'Имя': value = item.name; break;
          case 'Email': value = item.email; break;
          case 'Телефон': value = item.phone; break;
          case 'Компания': value = item.company; break;
          case 'Программа': value = item.programType; break;
          case 'Дата подачи': value = item.timestamp; break;
          case 'IP адрес': value = item.userAgent; break;
          case 'Источник': value = item.referrer; break;
          default: value = item[header];
        }
      }
      
      // Форматируем даты
      if (value && (header.toLowerCase().includes('date') || header.toLowerCase().includes('time'))) {
        try {
          value = new Date(value).toLocaleString(dateFormat);
        } catch (e) {
          // Если не удается распарсить дату, оставляем как есть
        }
      }
      
      return escapeValue(value);
    });
    
    csvRows.push(row.join(delimiter));
  });

  return csvRows.join('\n');
};

/**
 * Скачивает CSV файл
 * @param {string} csvContent - содержимое CSV
 * @param {string} filename - имя файла
 */
export const downloadCSV = (csvContent, filename = 'export.csv') => {
  // Добавляем BOM для корректного отображения кириллицы в Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { 
    type: 'text/csv;charset=utf-8;' 
  });
  
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Освобождаем память
  URL.revokeObjectURL(url);
};

/**
 * Парсит CSV строку в массив объектов
 * @param {string} csvContent - содержимое CSV
 * @param {Object} options - опции парсинга
 * @returns {Array} массив объектов
 */
export const parseCSV = (csvContent, options = {}) => {
  const {
    delimiter = ',',
    hasHeaders = true
  } = options;

  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  
  if (lines.length === 0) {
    return [];
  }

  // Функция для парсинга CSV строки с учетом кавычек
  const parseCSVLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Экранированная кавычка
          current += '"';
          i++; // Пропускаем следующую кавычку
        } else {
          // Переключаем состояние кавычек
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        // Разделитель вне кавычек
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    // Добавляем последнее значение
    result.push(current.trim());
    
    return result;
  };

  const parsedLines = lines.map(line => parseCSVLine(line));
  
  if (!hasHeaders || parsedLines.length === 0) {
    return parsedLines;
  }

  // Первая строка - заголовки
  const headers = parsedLines[0];
  const data = parsedLines.slice(1);

  // Преобразуем в массив объектов
  return data.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj;
  });
};

/**
 * Валидирует CSV данные
 * @param {Array} data - данные для валидации
 * @param {Array} requiredFields - обязательные поля
 * @returns {Object} результат валидации
 */
export const validateCSVData = (data, requiredFields = []) => {
  const errors = [];
  const warnings = [];

  if (!data || data.length === 0) {
    errors.push('Нет данных для валидации');
    return { isValid: false, errors, warnings };
  }

  // Проверяем обязательные поля
  requiredFields.forEach(field => {
    const missingRows = [];
    data.forEach((row, index) => {
      if (!row[field] || row[field].trim() === '') {
        missingRows.push(index + 1);
      }
    });
    
    if (missingRows.length > 0) {
      errors.push(`Поле "${field}" отсутствует в строках: ${missingRows.join(', ')}`);
    }
  });

  // Проверяем дубликаты email (если есть)
  const emailField = 'email';
  if (data.some(row => row[emailField])) {
    const emails = data.map(row => row[emailField]).filter(email => email);
    const uniqueEmails = new Set(emails);
    
    if (emails.length !== uniqueEmails.size) {
      warnings.push('Обнаружены дублирующиеся email адреса');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Форматирует данные для экспорта в CSV
 * @param {Array} formData - данные форм
 * @returns {Array} отформатированные данные
 */
export const formatFormDataForCSV = (formData) => {
  return formData.map(item => ({
    'ID': item.id,
    'Имя': item.name || '',
    'Email': item.email || '',
    'Телефон': item.phone || '',
    'Компания': item.company || '',
    'Программа': item.programType || '',
    'Дата подачи': item.timestamp,
    'IP адрес': item.userAgent || '',
    'Источник': item.referrer || ''
  }));
};

/**
 * Создает статистику по данным форм
 * @param {Array} formData - данные форм
 * @returns {Object} статистика
 */
export const generateFormDataStats = (formData) => {
  if (!formData || formData.length === 0) {
    return {
      total: 0,
      byProgram: {},
      byDate: {},
      byCompany: {}
    };
  }

  const stats = {
    total: formData.length,
    byProgram: {},
    byDate: {},
    byCompany: {}
  };

  formData.forEach(item => {
    // Статистика по программам
    const program = item.programType || 'Не указано';
    stats.byProgram[program] = (stats.byProgram[program] || 0) + 1;

    // Статистика по датам (группируем по дням)
    const date = new Date(item.timestamp).toDateString();
    stats.byDate[date] = (stats.byDate[date] || 0) + 1;

    // Статистика по компаниям
    const company = item.company || 'Не указано';
    stats.byCompany[company] = (stats.byCompany[company] || 0) + 1;
  });

  return stats;
};
