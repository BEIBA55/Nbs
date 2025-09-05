import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const useToast = () => {
  const { t } = useTranslation();

  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "✅"
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-red-50 !border-red-200 !text-red-800",
      bodyClassName: "!font-medium",
      icon: "❌"
    });
  };

  const showWarning = (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-yellow-50 !border-yellow-200 !text-yellow-800",
      bodyClassName: "!font-medium",
      icon: "⚠️"
    });
  };

  const showInfo = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-blue-50 !border-blue-200 !text-blue-800",
      bodyClassName: "!font-medium",
      icon: "ℹ️"
    });
  };

  const showConsultationSuccess = () => {
    toast.success(t('main.notifications.success.consultation'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "🎓"
    });
  };

  const showApplicationSuccess = () => {
    toast.success(t('main.notifications.success.application'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "📋"
    });
  };

  const showContactSuccess = () => {
    toast.success(t('main.notifications.success.contact'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "📞"
    });
  };

  const showDownloadSuccess = () => {
    toast.success(t('main.notifications.success.download'), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "📥"
    });
  };

  const showValidationError = (fieldName) => {
    toast.error(t('main.notifications.error.fieldRequired', { field: fieldName }), {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-red-50 !border-red-200 !text-red-800",
      bodyClassName: "!font-medium",
      icon: "📝"
    });
  };

  const showMultipleValidationErrors = (fields) => {
    toast.error(t('main.notifications.error.multipleFieldsRequired', { fields: fields.join(', ') }), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-red-50 !border-red-200 !text-red-800",
      bodyClassName: "!font-medium",
      icon: "📝"
    });
  };

  const showPartnershipSuccess = () => {
    toast.success(t('main.notifications.success.partnership'), {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: "!bg-green-50 !border-green-200 !text-green-800",
      bodyClassName: "!font-medium",
      icon: "🤝"
    });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConsultationSuccess,
    showApplicationSuccess,
    showContactSuccess,
    showDownloadSuccess,
    showValidationError,
    showMultipleValidationErrors,
    showPartnershipSuccess
  };
};
