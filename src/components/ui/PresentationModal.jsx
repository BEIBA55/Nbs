import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import EditText from './EditText';
import { useToast } from '../../hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';
import { formDataAPI } from '../../services/api';

const PresentationModal = ({ isOpen, onClose, onDownload, programName, programType }) => {
  const { t } = useTranslation();
  const { showDownloadSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Очищаем ошибку при вводе
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    try {
      // Сохраняем данные формы в CSV формате
      const saveResult = await formDataAPI.savePresentationFormData(formData, programType);
      
      if (saveResult.success) {
        console.log('Данные формы сохранены:', saveResult.data);
        
        // Показываем уведомление об успехе
        showDownloadSuccess();
        setShowSuccess(true);
        
        // Через 3 секунды закрываем модальное окно и скачиваем файл
        setTimeout(() => {
          onDownload();
          onClose();
          setShowSuccess(false);
          // Очищаем форму и ошибки
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
          });
          setError('');
        }, 3000);
      } else {
        setError('Ошибка при сохранении данных. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при сохранении данных формы:', error);
      setError('Произошла ошибка. Попробуйте еще раз.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('presentationModal.success.title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('presentationModal.success.message')}
              </p>
              <p className="text-sm text-gray-500">
                {t('presentationModal.success.subtitle')}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-[#991E1E] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('presentationModal.title')}
              </h2>
              <p className="text-gray-600">
                {programName}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {t('presentationModal.subtitle')}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <EditText
                placeholder={t('presentationModal.form.namePlaceholder')}
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                className="h-12"
                required
              />
              <EditText
                placeholder={t('presentationModal.form.emailPlaceholder')}
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                className="h-12"
                required
              />
              <EditText
                placeholder={t('presentationModal.form.phonePlaceholder')}
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                className="h-12"
                required
              />
              <EditText
                placeholder={t('presentationModal.form.companyPlaceholder')}
                value={formData.company}
                onChange={(value) => handleInputChange('company', value)}
                className="h-12"
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  {t('presentationModal.form.cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#991E1E] text-white px-6 py-3 rounded-lg hover:bg-[#7A1818] transition-colors"
                >
                  {t('presentationModal.form.download')}
                </Button>
              </div>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              {t('presentationModal.privacyText')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default PresentationModal; 