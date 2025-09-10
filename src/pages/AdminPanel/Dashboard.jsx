import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { formDataAPI } from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Проверка аутентификации при загрузке
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const result = await formDataAPI.checkAuth();
      setIsAuthenticated(result.authenticated);
    } catch (error) {
      console.error('Ошибка проверки аутентификации:', error);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const result = await formDataAPI.authenticateAdmin(loginData);
      
      if (result.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      setLoginError('Произошла ошибка при входе в систему');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await formDataAPI.logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#4C1C6F]"></div>
          <p className="mt-2 text-gray-600">Проверка аутентификации...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#4C1C6F] mb-2">
              Менеджер-панель
            </h1>
            <p className="text-gray-600">
              Войдите в систему для доступа к панели управления
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <EditText
              placeholder="Имя пользователя"
              value={loginData.username}
              onChange={(value) => setLoginData(prev => ({ ...prev, username: value }))}
              className="h-12"
              required
            />
            <EditText
              placeholder="Пароль"
              type="password"
              value={loginData.password}
              onChange={(value) => setLoginData(prev => ({ ...prev, password: value }))}
              className="h-12"
              required
            />
            
            <Button
              type="submit"
              className="w-full !bg-[#4C1C6F] !text-white h-12"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4C1C6F] mb-2">
              Менеджер-панель
            </h1>
            <p className="text-gray-600">
              Выберите раздел для управления
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="!bg-red-600 !text-white hover:!bg-red-700"
          >
            Выйти
          </Button>
        </div>

        {/* Карточки разделов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Заявки */}
          <div 
            onClick={() => navigate('/manager/applications')}
            className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[#4C1C6F]"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4C1C6F] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Заявки
              </h3>
              <p className="text-gray-600 mb-4">
                Управление заявками на программы. Просмотр, фильтрация, экспорт и удаление заявок.
              </p>
              <div className="text-sm text-[#4C1C6F] font-medium">
                Перейти к заявкам →
              </div>
            </div>
          </div>


          {/* Контактные заявки */}
          <div 
            onClick={() => navigate('/manager/contact-applications')}
            className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[#4C1C6F]"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4C1C6F] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Контактные заявки
              </h3>
              <p className="text-gray-600 mb-4">
                Управление контактными заявками. Просмотр, фильтрация, экспорт и удаление заявок.
              </p>
              <div className="text-sm text-[#4C1C6F] font-medium">
                Перейти к заявкам →
              </div>
            </div>
          </div>

          {/* Консультации */}
          <div 
            onClick={() => navigate('/manager/consultations')}
            className="bg-white rounded-lg shadow-lg p-8 cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 border-transparent hover:border-[#4C1C6F]"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4C1C6F] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Консультации
              </h3>
              <p className="text-gray-600 mb-4">
                Управление заявками на консультации. Просмотр, фильтрация, экспорт и удаление заявок.
              </p>
              <div className="text-sm text-[#4C1C6F] font-medium">
                Перейти к консультациям →
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Быстрый доступ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Безопасный доступ</p>
                <p className="text-xs text-gray-500">Защищенная аутентификация</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Быстрая навигация</p>
                <p className="text-xs text-gray-500">Удобный интерфейс</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Аналитика</p>
                <p className="text-xs text-gray-500">Статистика и отчеты</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
