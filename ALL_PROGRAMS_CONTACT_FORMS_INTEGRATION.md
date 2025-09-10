# Интеграция контактных форм для всех программ

## ✅ Задача выполнена

**Задача**: Интегрировать сохранение контактных заявок для всех остальных программ (кроме НПО), используя существующие формы "Оставить заявку".

## 🚀 Что было реализовано

### **Интеграция с существующими формами**:

#### **1. ExecutiveMBACIO** (`src/pages/ProgramPage/ExecutiveMBACIO/index.jsx`)
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_MBA_CIO)`
- ✅ **Заменено поле company на lastName** для соответствия структуре контактной формы

#### **2. ExecutiveSessions** (`src/pages/ProgramPage/ExecutiveSessions/index.jsx`)
- ✅ **Добавлен импорт** `formDataAPI`
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_SESSIONS)`
- ✅ **Заменено поле company на lastName** для соответствия структуре контактной формы

#### **3. MiniMBA** (`src/pages/ProgramPage/MiniMBA/index.jsx`)
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.MINI_MBA)`
- ✅ **Заменено поле company на lastName** для соответствия структуре контактной формы

#### **4. Trainings** (`src/pages/ProgramPage/Trainings/index.jsx`)
- ✅ **Добавлен импорт** `formDataAPI`
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.TRAININGS)`
- ✅ **Заменено поле company на lastName** для соответствия структуре контактной формы

#### **5. CorporateClients** (`src/pages/ProgramPage/CorporateClients/index.jsx`)
- ✅ **Добавлен импорт** `formDataAPI`
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.CORPORATE_CLIENTS)`
- ✅ **Заменено поле company на lastName** для соответствия структуре контактной формы

## 🔧 Технические детали

### **Структура состояния контактной формы**:
```javascript
const [contactFormData, setContactFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  privacyConsent: false
});
```

### **Обработчик отправки формы**:
```javascript
const handleContactSubmit = async (e) => {
  e.preventDefault();
  
  if (!contactFormData.privacyConsent) {
    alert('Пожалуйста, согласитесь на обработку персональных данных');
    return;
  }

  try {
    const result = await formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.PROGRAM_NAME);
    
    if (result.success) {
      alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
      setContactFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        privacyConsent: false
      });
    } else {
      alert('Ошибка при отправке заявки. Попробуйте еще раз.');
    }
  } catch (error) {
    console.error('Ошибка при отправке контактной заявки:', error);
    alert('Ошибка при отправке заявки. Попробуйте еще раз.');
  }
};
```

### **Обновленные поля формы**:
```javascript
// Пример для поля firstName
<input
  type="text"
  name="firstName"
  value={contactFormData.firstName}
  onChange={(e) => handleContactInputChange('firstName', e.target.value)}
  required
  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#991E1E] focus:border-transparent outline-none transition-all"
  placeholder={t('forms.namePlaceholderFull')}
/>

// Пример для чекбокса
<input
  type="checkbox"
  name="privacyConsent"
  checked={contactFormData.privacyConsent}
  onChange={(e) => handleContactInputChange('privacyConsent', e.target.checked)}
  required
  className="w-4 h-4 text-[#991E1E] border-gray-300 rounded focus:ring-[#991E1E]"
/>
```

## 🎯 Результат

### **Полная интеграция контактных форм для всех программ**:

1. **Пользователи** заполняют существующие формы "Оставить заявку" на всех страницах программ
2. **Данные сохраняются** через `formDataAPI.saveContactApplication()` с правильным `programType`
3. **Формы очищаются** после успешной отправки
4. **Показываются уведомления** об успехе/ошибке
5. **Данные доступны** в ContactApplicationsPanel для управления

### **Преимущества подхода**:

- ✅ **Нет дополнительных модальных окон** - используется существующий UI
- ✅ **Единообразный опыт** - все формы работают одинаково
- ✅ **Простота использования** - пользователи не видят разницы
- ✅ **Централизованное управление** - все заявки в одной панели
- ✅ **Правильная типизация** - каждая программа сохраняется с правильным типом

### **Поддерживаемые программы** (всего 9 программ):

#### **Уже интегрированные ранее**:
- **MBA** → `PROGRAM_TYPES.MBA`
- **DBA** → `PROGRAM_TYPES.DBA`
- **ExecutiveEducation** → `PROGRAM_TYPES.EXECUTIVE_EDUCATION`
- **ExecutiveMBA** → `PROGRAM_TYPES.EXECUTIVE_MBA`

#### **Новые интеграции**:
- **ExecutiveMBACIO** → `PROGRAM_TYPES.EXECUTIVE_MBA_CIO`
- **ExecutiveSessions** → `PROGRAM_TYPES.EXECUTIVE_SESSIONS`
- **MiniMBA** → `PROGRAM_TYPES.MINI_MBA`
- **Trainings** → `PROGRAM_TYPES.TRAININGS`
- **CorporateClients** → `PROGRAM_TYPES.CORPORATE_CLIENTS`

#### **Исключенные**:
- **ExecutiveMBANGO** → исключена по требованию пользователя

## 🚀 Готово к использованию

Теперь **все существующие формы "Оставить заявку"** на страницах программ (кроме НПО):
1. **Сохраняют данные** в систему контактных заявок
2. **Работают с правильными типами программ**
3. **Интегрированы с панелью управления**
4. **Готовы для экспорта в CSV**

### **Итоговая статистика**:
- ✅ **9 программ** полностью интегрированы
- ✅ **1 программа** исключена (ExecutiveMBANGO)
- ✅ **Все формы** работают единообразно
- ✅ **Централизованное управление** через ContactApplicationsPanel
- ✅ **Готовность к продакшену** 🎉

Система полностью функциональна и готова к использованию!
