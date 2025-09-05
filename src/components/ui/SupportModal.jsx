import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import EditText from './EditText';
import { useToast } from '../../hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';

const SupportModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const { validateSupportForm, showValidationErrors } = useFormValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    supportType: 'donation',
    amount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateSupportForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном проекте здесь был бы POST запрос к серверу
      // const response = await fetch('https://api.extraspace.kz/support/request', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   credentials: 'include',
      //   body: JSON.stringify(formData)
      // });
      
      showSuccess(t('supportModal.success.message'));
      setShowSuccessMessage(true);
      
      // Через 3 секунды закрываем модальное окно
      setTimeout(() => {
        onClose();
        setShowSuccessMessage(false);
        // Очищаем форму
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          supportType: 'donation',
          amount: ''
        });
      }, 3000);
    } catch (error) {
      showError(t('supportModal.error.submission'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {showSuccessMessage ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('supportModal.success.title')}
              </h2>
              <p className="text-gray-600 mb-4">
                {t('supportModal.success.message')}
              </p>
              <p className="text-sm text-gray-500">
                {t('supportModal.success.subtitle')}
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
                {t('supportModal.title')}
              </h2>
              <p className="text-gray-600">
                {t('supportModal.subtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('supportModal.form.supportType')} *
                </label>
                <select
                  value={formData.supportType}
                  onChange={(e) => handleInputChange('supportType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#991E1E] focus:border-transparent"
                  required
                >
                  <option value="donation">{t('supportModal.form.donation')}</option>
                  <option value="sponsorship">{t('supportModal.form.sponsorship')}</option>
                  <option value="volunteering">{t('supportModal.form.volunteering')}</option>
                  <option value="partnership">{t('supportModal.form.partnership')}</option>
                </select>
              </div>

              {formData.supportType === 'donation' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('supportModal.form.amount')} *
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder={t('supportModal.form.amountPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#991E1E] focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
              )}

              <EditText
                label={t('supportModal.form.name')}
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder={t('supportModal.form.namePlaceholder')}
                required
              />

              <EditText
                label={t('supportModal.form.email')}
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder={t('supportModal.form.emailPlaceholder')}
                type="email"
                required
              />

              <EditText
                label={t('supportModal.form.phone')}
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder={t('supportModal.form.phonePlaceholder')}
                type="tel"
                required
              />

              <EditText
                label={t('supportModal.form.company')}
                value={formData.company}
                onChange={(value) => handleInputChange('company', value)}
                placeholder={t('supportModal.form.companyPlaceholder')}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('supportModal.form.message')}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t('supportModal.form.messagePlaceholder')}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#991E1E] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {t('supportModal.form.cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {t('supportModal.form.submit')}
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SupportModal;
