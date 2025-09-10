import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { formDataAPI, PROGRAM_TYPES, PROGRAM_NAMES } from '../../services/api';
import { downloadCSV } from '../../utils/csvUtils';
import '../../styles/adminTable.css';

const ApplicationsPanel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Данные форм
  const [formData, setFormData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  // Фильтры для экспорта
  const [exportFilters, setExportFilters] = useState({
    programType: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const [isExporting, setIsExporting] = useState(false);
  
  // Состояние для удаления
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  // Фильтры для таблицы
  const [tableFilters, setTableFilters] = useState({
    programType: 'all',
    searchTerm: ''
  });

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    loadFormData();
  }, []);

  // Добавляем обработчик скролла колесиком мыши
  useEffect(() => {
    const handleWheel = (e) => {
      const tableContainer = document.querySelector('.admin-table-container');
      if (tableContainer && tableContainer.contains(e.target)) {
        // Если скролл по горизонтали, предотвращаем вертикальный скролл страницы
        if (e.deltaX !== 0) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleLogout = () => {
    // Просто перенаправляем на главную панель без сброса аутентификации
    navigate('/manager');
  };

  const loadFormData = async (page = 1) => {
    setIsLoadingData(true);
    try {
      const result = await formDataAPI.getAllFormData(page, 20);
      
      if (result.success) {
        // Применяем фильтры к данным
        let filteredData = result.data;
        
        // Фильтр по типу программы
        if (tableFilters.programType !== 'all') {
          filteredData = filteredData.filter(item => item.programType === tableFilters.programType);
        }
        
        // Фильтр по поисковому запросу
        if (tableFilters.searchTerm) {
          const searchLower = tableFilters.searchTerm.toLowerCase();
          filteredData = filteredData.filter(item => 
            (item.name && item.name.toLowerCase().includes(searchLower)) ||
            (item.email && item.email.toLowerCase().includes(searchLower)) ||
            (item.phone && item.phone.toLowerCase().includes(searchLower)) ||
            (item.company && item.company.toLowerCase().includes(searchLower))
          );
        }
        
        setFormData(filteredData);
        setCurrentPage(result.page);
        setTotalPages(result.totalPages);
        setTotalRecords(filteredData.length);
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

  // Функции для удаления
  const handleDeleteItem = (itemId) => {
    setDeleteTarget(itemId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteMultiple = () => {
    if (selectedItems.length === 0) return;
    setDeleteTarget(selectedItems);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (Array.isArray(deleteTarget)) {
        // Массовое удаление
        const result = await formDataAPI.deleteMultipleFormData(deleteTarget);
        if (result.success) {
          setSelectedItems([]);
          loadFormData(currentPage);
          alert(result.message);
        }
      } else {
        // Удаление одной записи
        const result = await formDataAPI.deleteFormData(deleteTarget);
        if (result.success) {
          loadFormData(currentPage);
          alert(result.message);
        }
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      alert('Ошибка при удалении записей');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
    }
  };

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === formData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(formData.map(item => item.id));
    }
  };

  // Функции для фильтрации
  const handleFilterChange = (filterType, value) => {
    setTableFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearchChange = (value) => {
    setTableFilters(prev => ({
      ...prev,
      searchTerm: value
    }));
  };

  const resetFilters = () => {
    setTableFilters({
      programType: 'all',
      searchTerm: ''
    });
  };

  // Применяем фильтры при их изменении
  useEffect(() => {
    loadFormData(1);
  }, [tableFilters]);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <button
                onClick={() => navigate('/manager')}
                className="text-[#4C1C6F] hover:text-purple-700 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Назад к панели</span>
              </button>
            </div>
            <h1 className="text-3xl font-bold text-[#4C1C6F] mb-2">
              Управление заявками
            </h1>
            <p className="text-gray-600">
              Просмотр, фильтрация, экспорт и удаление заявок на программы
            </p>
          </div>
          <Button
            onClick={handleLogout}
            className="!bg-gray-500 !text-white hover:!bg-gray-600"
          >
            К выбору разделов
          </Button>
        </div>

         {/* Статистика */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего записей</h3>
             <p className="text-3xl font-bold text-[#4C1C6F]">{totalRecords}</p>
             {(tableFilters.programType !== 'all' || tableFilters.searchTerm) && (
               <p className="text-sm text-gray-500 mt-1">отфильтровано</p>
             )}
           </div>
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Текущая страница</h3>
             <p className="text-3xl font-bold text-[#4C1C6F]">{currentPage} / {totalPages}</p>
           </div>
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Программы</h3>
             <p className="text-lg font-medium text-[#4C1C6F]">
               {Object.keys(PROGRAM_NAMES).length} типов программ
             </p>
           </div>
           <div className="bg-white rounded-lg shadow p-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-2">Активные фильтры</h3>
             <p className="text-lg font-medium text-[#4C1C6F]">
               {tableFilters.programType !== 'all' ? 'Программа' : ''}
               {tableFilters.programType !== 'all' && tableFilters.searchTerm ? ', ' : ''}
               {tableFilters.searchTerm ? 'Поиск' : ''}
               {tableFilters.programType === 'all' && !tableFilters.searchTerm ? 'Нет' : ''}
             </p>
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
                <option value="all">Все программы</option>
                {Object.entries(PROGRAM_NAMES).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
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

         {/* Фильтры для таблицы */}
         <div className="bg-white rounded-lg shadow p-6 mb-6">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-lg font-semibold text-gray-900">Фильтры и поиск</h3>
             {(tableFilters.programType !== 'all' || tableFilters.searchTerm) && (
               <div className="flex items-center space-x-2">
                 <span className="text-sm text-gray-600">Активные фильтры:</span>
                 {tableFilters.programType !== 'all' && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4C1C6F] text-white">
                     {PROGRAM_NAMES[tableFilters.programType]}
                   </span>
                 )}
                 {tableFilters.searchTerm && (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                     Поиск: "{tableFilters.searchTerm}"
                   </span>
                 )}
               </div>
             )}
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Программа
               </label>
               <select
                 value={tableFilters.programType}
                 onChange={(e) => handleFilterChange('programType', e.target.value)}
                 className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent"
               >
                 <option value="all">Все программы</option>
                 {Object.entries(PROGRAM_NAMES).map(([key, name]) => (
                   <option key={key} value={key}>{name}</option>
                 ))}
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Поиск
               </label>
               <EditText
                 placeholder="Поиск по имени, email, телефону, компании..."
                 value={tableFilters.searchTerm}
                 onChange={handleSearchChange}
                 className="h-10"
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Действия
               </label>
               <Button
                 onClick={resetFilters}
                 className="w-full !bg-gray-500 !text-white hover:!bg-gray-600 h-10"
               >
                 Сбросить фильтры
               </Button>
             </div>
           </div>
         </div>

         {/* Таблица данных */}
         <div className="bg-white rounded-lg shadow overflow-hidden">
           <div className="px-6 py-4 border-b border-gray-200">
             <div className="flex justify-between items-center">
               <h3 className="text-lg font-semibold text-gray-900">
                 Данные форм
                 {(tableFilters.programType !== 'all' || tableFilters.searchTerm) && (
                   <span className="ml-2 text-sm font-normal text-gray-500">
                     (отфильтровано: {formData.length} записей)
                   </span>
                 )}
               </h3>
               {selectedItems.length > 0 && (
                 <div className="flex items-center space-x-3">
                   <span className="text-sm text-gray-600">
                     Выбрано: {selectedItems.length}
                   </span>
                   <Button
                     onClick={handleDeleteMultiple}
                     disabled={isDeleting}
                     className="!bg-red-600 !text-white hover:!bg-red-700 text-sm px-4 py-2"
                   >
                     {isDeleting ? 'Удаление...' : 'Удалить выбранные'}
                   </Button>
                 </div>
               )}
             </div>
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
               <div className="admin-table-container">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="admin-table-header">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedItems.length === formData.length && formData.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-[#4C1C6F] focus:ring-[#4C1C6F]"
                        />
                      </th>
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
                        Программа
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата подачи
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                     {formData.map((item) => (
                       <tr key={item.id} className="admin-table-row hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleSelectItem(item.id)}
                            className="rounded border-gray-300 text-[#4C1C6F] focus:ring-[#4C1C6F]"
                          />
                        </td>
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
                          {PROGRAM_NAMES[item.programType] || item.programType || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(item.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            disabled={isDeleting}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title="Удалить запись"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
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

      {/* Модальное окно подтверждения удаления */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Подтверждение удаления
              </h3>
              <p className="text-gray-600 mb-6">
                {Array.isArray(deleteTarget) 
                  ? `Вы уверены, что хотите удалить ${deleteTarget.length} записей? Это действие нельзя отменить.`
                  : 'Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.'
                }
              </p>
              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteTarget(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 !bg-gray-300 !text-gray-700 hover:!bg-gray-400"
                >
                  Отмена
                </Button>
                <Button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 !bg-red-600 !text-white hover:!bg-red-700"
                >
                  {isDeleting ? 'Удаление...' : 'Удалить'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPanel;
