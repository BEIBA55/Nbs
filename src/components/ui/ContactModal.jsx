import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import EditText from './EditText';
import { useToast } from '../../hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';
import { partnershipAPI } from '../../services/api';

const ContactModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { showPartnershipSuccess, showError } = useToast();
  const { validatePartnershipForm, showValidationErrors } = useFormValidation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    partnershipType: 'corporate'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validatePartnershipForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await partnershipAPI.submitPartnershipRequest(formData);
      
      if (response.success) {
        showPartnershipSuccess();
        setShowSuccess(true);
        
        // Через 3 секунды закрываем модальное окно
        setTimeout(() => {
          onClose();
          setShowSuccess(false);
          // Очищаем форму
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
            partnershipType: 'corporate'
          });
        }, 3000);
      } else {
        showError(t('main.notifications.error.submission'));
      }
    } catch (error) {
      showError(t('main.notifications.error.submission'));
    } finally {
      setIsSubmitting(false);
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
                 {t('contactModal.success.title')}
               </h2>
               <p className="text-gray-600 mb-4">
                 {t('contactModal.success.message')}
               </p>
               <p className="text-sm text-gray-500">
                 {t('contactModal.success.subtitle')}
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
                 {t('contactModal.title')}
               </h2>
               <p className="text-gray-600">
                 {t('contactModal.subtitle')}
               </p>
             </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                             <EditText
                 placeholder={t('forms.namePlaceholder') + ' *'}
                 value={formData.name}
                 onChange={(value) => handleInputChange('name', value)}
                 className="h-12"
                 required
               />
               <EditText
                 placeholder={t('forms.emailPlaceholder') + ' *'}
                 type="email"
                 value={formData.email}
                 onChange={(value) => handleInputChange('email', value)}
                 className="h-12"
                 required
               />
               <EditText
                 placeholder={t('forms.phonePlaceholder') + ' *'}
                 value={formData.phone}
                 onChange={(value) => handleInputChange('phone', value)}
                 className="h-12"
                 required
               />
               <EditText
                 placeholder={t('forms.companyPlaceholder') + ' *'}
                 value={formData.company}
                 onChange={(value) => handleInputChange('company', value)}
                 className="h-12"
                 required
               />

                             <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700">
                   {t('contactModal.partnershipType')} *
                 </label>
                 <select
                   value={formData.partnershipType}
                   onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                   className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#991E1E] focus:border-transparent"
                   required
                 >
                   <option value="corporate">{t('contactModal.partnershipTypes.corporate')}</option>
                   <option value="academic">{t('contactModal.partnershipTypes.academic')}</option>
                   <option value="strategic">{t('contactModal.partnershipTypes.strategic')}</option>
                 </select>
               </div>

                             <div className="space-y-2">
                 <label className="block text-sm font-medium text-gray-700">
                   {t('contactModal.messageLabel')} *
                 </label>
                 <textarea
                   value={formData.message}
                   onChange={(e) => handleInputChange('message', e.target.value)}
                   placeholder={t('contactModal.messagePlaceholder')}
                   className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#991E1E] focus:border-transparent resize-none"
                   required
                 />
               </div>

                             <div className="flex gap-3 pt-4">
                 <Button
                   type="button"
                   onClick={onClose}
                   className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                   disabled={isSubmitting}
                 >
                   {t('contactModal.cancel')}
                 </Button>
                 <Button
                   type="submit"
                   className="flex-1 bg-[#991E1E] text-white px-6 py-3 rounded-lg hover:bg-[#7A1818] transition-colors disabled:opacity-50"
                   disabled={isSubmitting}
                 >
                   {isSubmitting ? t('contactModal.submitting') : t('contactModal.submit')}
                 </Button>
               </div>
            </form>

                         <p className="text-xs text-gray-500 text-center mt-4">
               {t('contactModal.privacyText')}
             </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
