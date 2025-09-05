import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useFormAnimation = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startSubmission = () => {
    setIsSubmitting(true);
  };

  const endSubmission = () => {
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const getButtonClasses = (baseClasses) => {
    return `${baseClasses} ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`;
  };

  const getButtonText = (defaultText, loadingText = null) => {
    const defaultLoadingText = t('main.buttons.loading');
    return isSubmitting ? (loadingText || defaultLoadingText) : defaultText;
  };

  return {
    isSubmitting,
    startSubmission,
    endSubmission,
    getButtonClasses,
    getButtonText
  };
};
