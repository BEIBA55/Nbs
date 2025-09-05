import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';

export const useFormValidation = () => {
  const { t } = useTranslation();
  const { showValidationError, showMultipleValidationErrors } = useToast();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Убираем все нецифровые символы для проверки
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const validateConsultationForm = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push(t('forms.fieldNames.name'));
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push(t('forms.fieldNames.email'));
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.push(t('forms.fieldNames.phone'));
    }

    return errors;
  };

  const validateContactForm = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push(t('forms.fieldNames.name'));
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push(t('forms.fieldNames.email'));
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.push(t('forms.fieldNames.phone'));
    }

    return errors;
  };

  const validateApplicationForm = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push(t('forms.fieldNames.name'));
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push(t('forms.fieldNames.email'));
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.push(t('forms.fieldNames.phone'));
    }

    if (!formData.company || formData.company.trim().length < 2) {
      errors.push(t('forms.fieldNames.company'));
    }

    return errors;
  };

  const validatePartnershipForm = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push(t('forms.fieldNames.name'));
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push(t('forms.fieldNames.email'));
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.push(t('forms.fieldNames.phone'));
    }

    if (!formData.company || formData.company.trim().length < 2) {
      errors.push(t('forms.fieldNames.company'));
    }

    if (!formData.message || formData.message.trim().length < 10) {
      errors.push(t('forms.fieldNames.message'));
    }

    return errors;
  };

  const validateSupportForm = (formData) => {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
      errors.push(t('forms.fieldNames.name'));
    }

    if (!formData.email || !validateEmail(formData.email)) {
      errors.push(t('forms.fieldNames.email'));
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      errors.push(t('forms.fieldNames.phone'));
    }

    // Проверяем сумму только для пожертвований
    if (formData.supportType === 'donation' && (!formData.amount || parseFloat(formData.amount) <= 0)) {
      errors.push(t('supportModal.form.amount'));
    }

    return errors;
  };

  const showValidationErrors = (errors) => {
    if (errors.length === 1) {
      showValidationError(errors[0]);
    } else if (errors.length > 1) {
      showMultipleValidationErrors(errors);
    }
  };

  return {
    validateEmail,
    validatePhone,
    validateConsultationForm,
    validateContactForm,
    validateApplicationForm,
    validatePartnershipForm,
    validateSupportForm,
    showValidationErrors
  };
};
