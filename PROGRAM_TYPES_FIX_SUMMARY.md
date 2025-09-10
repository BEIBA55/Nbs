# Исправление типов программ в CSV системе

## 🐛 Проблема
После заполнения форм во всех программах сохранялся одинаковый тип "executive-mba-ngo" вместо правильного типа программы.

## ✅ Исправления

### 1. Обновлены все программы, использующие PresentationModal:

| Программа | Файл | Добавлен programType |
|-----------|------|---------------------|
| **Trainings** | `src/pages/ProgramPage/Trainings/index.jsx` | `PROGRAM_TYPES.TRAININGS` |
| **Corporate Clients** | `src/pages/ProgramPage/CorporateClients/index.jsx` | `PROGRAM_TYPES.CORPORATE_CLIENTS` |
| **Executive Sessions** | `src/pages/ProgramPage/ExecutiveSessions/index.jsx` | `PROGRAM_TYPES.EXECUTIVE_SESSIONS` |
| **Executive Education** | `src/pages/ProgramPage/ExecutiveEducation/index.jsx` | `PROGRAM_TYPES.EXECUTIVE_EDUCATION` |
| **Executive MBA** | `src/pages/ProgramPage/ExecutiveMBA/index.jsx` | `PROGRAM_TYPES.EXECUTIVE_MBA` |
| **DBA** | `src/pages/ProgramPage/DBA/index.jsx` | `PROGRAM_TYPES.DBA` |
| **MBA** | `src/pages/ProgramPage/MBA/index.jsx` | `PROGRAM_TYPES.MBA` |
| **Mini MBA** | `src/pages/ProgramPage/MiniMBA/index.jsx` | `PROGRAM_TYPES.MINI_MBA` |

### 2. Изменения в каждом файле:

1. **Добавлен импорт**:
   ```javascript
   import { PROGRAM_TYPES } from '../../../services/api';
   ```

2. **Обновлен PresentationModal**:
   ```javascript
   <PresentationModal
     isOpen={showPresentationModal}
     onClose={() => setShowPresentationModal(false)}
     onDownload={handleDownloadPresentation}
     programName={t('programName')}
     programType={PROGRAM_TYPES.PROGRAM_NAME} // ← Добавлено
   />
   ```

## 📊 Результат

Теперь каждая программа сохраняет свой правильный тип:

| Программа | Тип в CSV |
|-----------|-----------|
| MBA | `mba` |
| Executive MBA | `executive-mba` |
| Executive MBA для CIO | `executive-mba-cio` |
| Executive MBA для NGO/NPO | `executive-mba-ngo` |
| DBA | `dba` |
| Mini MBA | `mini-mba` |
| Executive Education | `executive-education` |
| Executive Sessions | `executive-sessions` |
| Тренинги | `trainings` |
| Корпоративные клиенты | `corporate-clients` |

## 🔍 Проверка

Для проверки исправления:
1. Заполните форму на любой странице программы
2. Перейдите в менеджер-панель (`/manager`)
3. Проверьте, что в колонке "Программа" отображается правильное название
4. Используйте фильтр по типу программы для проверки

## 📁 Измененные файлы

- `src/pages/ProgramPage/Trainings/index.jsx`
- `src/pages/ProgramPage/CorporateClients/index.jsx`
- `src/pages/ProgramPage/ExecutiveSessions/index.jsx`
- `src/pages/ProgramPage/ExecutiveEducation/index.jsx`
- `src/pages/ProgramPage/ExecutiveMBA/index.jsx`
- `src/pages/ProgramPage/DBA/index.jsx`
- `src/pages/ProgramPage/MBA/index.jsx`
- `src/pages/ProgramPage/MiniMBA/index.jsx`

## ✨ Итог

Проблема с одинаковыми типами программ исправлена. Теперь каждая программа корректно сохраняет свой уникальный тип в CSV данных.
