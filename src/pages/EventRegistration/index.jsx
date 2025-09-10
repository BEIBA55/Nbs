import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { eventRegistrationAPI } from '../../services/api';

const EventRegistration = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    dietaryRestrictions: '',
    specialRequests: ''
  });

  useEffect(() => {
    loadEventDetails();
  }, [eventId]);

  const loadEventDetails = async () => {
    try {
      setLoading(true);
      const details = await eventRegistrationAPI.getEventDetails(eventId);
      setEventDetails(details);
    } catch (error) {
      toast.error(t('eventRegistration.errors.loadingError'));
      console.error('Error loading event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push(t('eventRegistration.validation.firstNameRequired'));
    if (!formData.lastName.trim()) errors.push(t('eventRegistration.validation.lastNameRequired'));
    if (!formData.email.trim()) errors.push(t('eventRegistration.validation.emailRequired'));
    if (!formData.phone.trim()) errors.push(t('eventRegistration.validation.phoneRequired'));
    
    // Простая валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push(t('eventRegistration.validation.emailInvalid'));
    }
    
    // Простая валидация телефона
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push(t('eventRegistration.validation.phoneInvalid'));
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    try {
      setSubmitting(true);
      const result = await eventRegistrationAPI.register(eventId, formData);
      
      if (result.success) {
        toast.success(result.message);
        // Перенаправляем на страницу подтверждения или обратно к расписанию
        setTimeout(() => {
          navigate('/schedule');
        }, 2000);
      } else {
        toast.error(t('eventRegistration.errors.registrationError'));
      }
    } catch (error) {
      toast.error(t('eventRegistration.errors.submissionError'));
      console.error('Registration error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!eventDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('eventRegistration.errors.eventNotFound')}</h2>
            <button
              onClick={() => navigate('/schedule')}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('eventRegistration.buttons.backToSchedule')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Enhanced Mobile Optimization */}
      <div className="bg-white pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-14 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('eventRegistration.hero.title')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {t('eventRegistration.hero.subtitle')}
          </p>
        </div>
      </div>

      {/* Registration Form - Enhanced Mobile Optimization */}
      <div className="py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          {/* Event Details */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">{t('eventRegistration.eventDetails.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.date')}:</strong> {eventDetails.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.time')}:</strong> {eventDetails.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.location')}:</strong> {eventDetails.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span><strong>{t('eventRegistration.eventDetails.speaker')}:</strong> {eventDetails.speaker}</span>
              </div>
            </div>
          </div>

          {/* Registration Form - Enhanced Mobile Optimization */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Имя */}
              <div>
                <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.firstName')} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder={t('eventRegistration.form.firstNamePlaceholder')}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              {/* Фамилия */}
              <div>
                <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.lastName')} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder={t('eventRegistration.form.lastNamePlaceholder')}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('eventRegistration.form.emailPlaceholder')}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              {/* Телефон */}
              <div>
                <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                  placeholder={t('eventRegistration.form.phonePlaceholder')}
                  required
                />
              </div>

              {/* Компания */}
              <div>
                <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.company')}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t('eventRegistration.form.companyPlaceholder')}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Должность */}
              <div>
                <label htmlFor="position" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  {t('eventRegistration.form.position')}
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder={t('eventRegistration.form.positionPlaceholder')}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Диетические ограничения */}
            <div>
              <label htmlFor="dietaryRestrictions" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('eventRegistration.form.dietaryRestrictions')}
              </label>
              <textarea
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                placeholder={t('eventRegistration.form.dietaryRestrictionsPlaceholder')}
              />
            </div>

            {/* Особые пожелания */}
            <div>
              <label htmlFor="specialRequests" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                {t('eventRegistration.form.specialRequests')}
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                placeholder={t('eventRegistration.form.specialRequestsPlaceholder')}
              />
            </div>

            {/* Submit Button - Enhanced Mobile Optimization */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
              <button
                type="button"
                onClick={() => navigate('/schedule')}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                {t('eventRegistration.buttons.cancel')}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {submitting ? t('eventRegistration.buttons.submitting') : t('eventRegistration.buttons.register')}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventRegistration; 