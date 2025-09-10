# Интеграция контактных форм с существующими страницами программ

## ✅ Задача выполнена

**Задача**: Интегрировать сохранение контактных заявок прямо в существующие формы "Оставить заявку" на страницах программ, без создания дополнительных модальных окон.

## 🚀 Что было реализовано

### **Интеграция с существующими формами**:

#### **1. MBA** (`src/pages/ProgramPage/MBA/index.jsx`)
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.MBA)`

#### **2. DBA** (`src/pages/ProgramPage/DBA/index.jsx`)
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.DBA)`

#### **3. ExecutiveEducation** (`src/pages/ProgramPage/ExecutiveEducation/index.jsx`)
- ✅ **Добавлен импорт** `formDataAPI`
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_EDUCATION)`

#### **4. ExecutiveMBA** (`src/pages/ProgramPage/ExecutiveMBA/index.jsx`)
- ✅ **Добавлен импорт** `formDataAPI`
- ✅ **Добавлено состояние** `contactFormData` для контактной формы
- ✅ **Добавлены обработчики** `handleContactInputChange` и `handleContactSubmit`
- ✅ **Обновлена форма** с `onSubmit={handleContactSubmit}`
- ✅ **Привязаны поля** к состоянию: firstName, lastName, email, phone, privacyConsent
- ✅ **Интеграция с API** `formDataAPI.saveContactApplication(contactFormData, PROGRAM_TYPES.EXECUTIVE_MBA)`

### **Удален ненужный компонент**:
- ✅ **Удален** `ContactFormModal.jsx` - больше не нужен
- ✅ **Очищены импорты** и состояния в ExecutiveMBA

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

### **Полная интеграция контактных форм**:

1. **Пользователи** заполняют существующие формы "Оставить заявку" на страницах программ
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

### **Поддерживаемые программы**:
- **MBA** → `PROGRAM_TYPES.MBA`
- **DBA** → `PROGRAM_TYPES.DBA`
- **ExecutiveEducation** → `PROGRAM_TYPES.EXECUTIVE_EDUCATION`
- **ExecutiveMBA** → `PROGRAM_TYPES.EXECUTIVE_MBA`

## 🚀 Готово к использованию

Теперь все существующие формы "Оставить заявку" на страницах программ:
1. **Сохраняют данные** в систему контактных заявок
2. **Работают с правильными типами программ**
3. **Интегрированы с панелью управления**
4. **Готовы для экспорта в CSV**

Система полностью функциональна и готова к продакшену! 🎉
