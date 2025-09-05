import React from 'react';
import { useToast } from '../../hooks/useToast';
import { useTranslation } from 'react-i18next';

const NotificationDemo = () => {
  const { t } = useTranslation();
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    showConsultationSuccess,
    showApplicationSuccess,
    showContactSuccess,
    showDownloadSuccess,
    showValidationError,
    showMultipleValidationErrors
  } = useToast();

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Демонстрация уведомлений</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={() => showSuccess(t('main.notifications.success.consultation'))}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Успех
        </button>
        <button
          onClick={() => showError(t('main.notifications.error.validation'))}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Ошибка
        </button>
        <button
          onClick={() => showWarning(t('main.notifications.warning.incompleteForm'))}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Предупреждение
        </button>
        <button
          onClick={() => showInfo(t('main.notifications.info.processing'))}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Информация
        </button>
        <button
          onClick={() => showConsultationSuccess()}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Консультация
        </button>
        <button
          onClick={() => showApplicationSuccess()}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          Заявка
        </button>
        <button
          onClick={() => showContactSuccess()}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
        >
          Контакт
        </button>
        <button
          onClick={() => showDownloadSuccess()}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Скачивание
        </button>
        <button
          onClick={() => showValidationError(t('forms.fieldNames.name'))}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
        >
          Валидация
        </button>
        <button
          onClick={() => showMultipleValidationErrors([t('forms.fieldNames.name'), t('forms.fieldNames.email')])}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Множественные ошибки
        </button>
      </div>
    </div>
  );
};

export default NotificationDemo;
