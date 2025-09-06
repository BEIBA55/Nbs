import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { formDataAPI } from '../../services/api';
import { downloadCSV } from '../../utils/csvUtils';

const AdminPanel = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // Данные форм
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  // Фильтры для экспорта
  const [exportFilters, setExportFilters] = useState({
    programType: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isExporting, setIsExporting] = useState(false);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const result = await formDataAPI.checkAuth();
      setIsAuthenticated(result.authenticated);
      if (result.authenticated) {
        loadFormData();
      }
    } catch (error) {
      console.error('Ошибка проверки аутентификации:', error);
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
        loadFormData();
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
      setFormData([]);
      setCurrentPage(1);
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  const loadFormData = async (page = 1) => {
    setIsLoadingData(true);
    try {
      const result = await formDataAPI.getAllFormData(page, 20);
      
      if (result.success) {
        setFormData(result.data);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages);
        setTotalRecords(result.total);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadFormData(newPage);
    }
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const result = await formDataAPI.exportToCSV(exportFilters);
      
      if (result.success) {
        // Используем утилиту для скачивания CSV
        downloadCSV(result.csvContent, result.filename);
        
        alert(`CSV файл успешно экспортирован! Записей: ${result.recordCount}`);
      }
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      alert('Ошибка при экспорте данных');
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#4C1C6F] mb-2">
                Админ-панель
              </h1>
              <p className="text-gray-600">
                Войдите в систему для доступа к данным форм
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

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Демо-доступ:</strong><br />
                Логин: admin<br />
                Пароль: admin123
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#4C1C6F] mb-2">
              Админ-панель - Данные форм
            </h1>
            <p className="text-gray-600">
              Управление данными форм презентаций
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="!bg-red-600 !text-white hover:!bg-red-700"
          >
            Выйти
          </Button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего записей</h3>
            <p className="text-3xl font-bold text-[#4C1C6F]">{totalRecords}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Текущая страница</h3>
            <p className="text-3xl font-bold text-[#4C1C6F]">{currentPage} / {totalPages}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Программа</h3>
            <p className="text-lg font-medium text-[#4C1C6F]">Executive MBA NGO/NPO</p>
          </div>
        </div>

        {/* Фильтры для экспорта */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Экспорт в CSV</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип программы
              </label>
              <select
                value={exportFilters.programType}
                onChange={(e) => setExportFilters(prev => ({ ...prev, programType: e.target.value }))}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent"
              >
                <option value="">Все программы</option>
                <option value="executive-mba-ngo">Executive MBA NGO/NPO</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата от
              </label>
              <input
                type="date"
                value={exportFilters.dateFrom}
                onChange={(e) => setExportFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата до
              </label>
              <input
                type="date"
                value={exportFilters.dateTo}
                onChange={(e) => setExportFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleExportCSV}
                disabled={isExporting}
                className="w-full !bg-green-600 !text-white hover:!bg-green-700 h-10"
              >
                {isExporting ? 'Экспорт...' : 'Экспорт CSV'}
              </Button>
            </div>
          </div>
        </div>

        {/* Таблица данных */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Данные форм</h3>
          </div>
          
          {isLoadingData ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#4C1C6F]"></div>
              <p className="mt-2 text-gray-600">Загрузка данных...</p>
            </div>
          ) : formData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Нет данных для отображения</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Имя
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Телефон
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Компания
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата подачи
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.name || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.email || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.phone || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.company || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(item.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Показано {((currentPage - 1) * 20) + 1} - {Math.min(currentPage * 20, totalRecords)} из {totalRecords} записей
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="!bg-gray-300 !text-gray-700 hover:!bg-gray-400 disabled:!bg-gray-200 disabled:!text-gray-400"
                      >
                        Предыдущая
                      </Button>
                      <span className="px-3 py-2 text-sm text-gray-700">
                        Страница {currentPage} из {totalPages}
                      </span>
                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="!bg-gray-300 !text-gray-700 hover:!bg-gray-400 disabled:!bg-gray-200 disabled:!text-gray-400"
                      >
                        Следующая
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
