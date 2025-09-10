# Исправление навигации при выходе

## ✅ Проблема решена

**Проблема**: При нажатии кнопки "Выйти" в разделах панели админа, пользователь попадал на страницу логина вместо главной страницы выбора разделов.

**Решение**: Обновлена функция `handleLogout` в обоих разделах для перенаправления на главную панель.

## 🔧 Изменения

### 1. **ApplicationsPanel** (`src/pages/AdminPanel/ApplicationsPanel.jsx`)

#### До исправления:
```javascript
const handleLogout = async () => {
  try {
    await formDataAPI.logout();
    setIsAuthenticated(false);
    setFormData([]);
    setCurrentPage(1);
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
```

#### После исправления:
```javascript
const handleLogout = async () => {
  try {
    await formDataAPI.logout();
    navigate('/manager');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    navigate('/manager');
  }
};
```

### 2. **ProgramsPanel** (`src/pages/AdminPanel/ProgramsPanel.jsx`)

#### До исправления:
```javascript
const handleLogout = async () => {
  try {
    await formDataAPI.logout();
    setIsAuthenticated(false);
    setPrograms([]);
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};
```

#### После исправления:
```javascript
const handleLogout = async () => {
  try {
    await formDataAPI.logout();
    navigate('/manager');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
    navigate('/manager');
  }
};
```

## 🎯 Результат

### До исправления:
- ❌ При выходе из раздела → страница логина
- ❌ Нужно снова вводить пароль
- ❌ Плохой UX

### После исправления:
- ✅ При выходе из раздела → главная панель выбора
- ✅ Остается аутентифицированным
- ✅ Может сразу выбрать другой раздел
- ✅ Лучший UX

## 🚀 Логика работы

### Теперь навигация работает так:

1. **Пользователь входит** в систему на `/manager`
2. **Выбирает раздел** (заявки или программы)
3. **Работает в разделе** (просматривает, редактирует, удаляет)
4. **Нажимает "Выйти"** → возвращается на `/manager`
5. **Может выбрать другой раздел** без повторного входа

### Dashboard остается без изменений:
- При выходе с главной панели → форма логина (правильно)
- При входе → показ карточек разделов

## ✨ Преимущества

- **Улучшенный UX** - не нужно повторно входить
- **Логичная навигация** - выход ведет к выбору раздела
- **Быстрое переключение** между разделами
- **Консистентность** - единое поведение во всех разделах
