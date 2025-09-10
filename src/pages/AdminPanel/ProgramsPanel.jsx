import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { formDataAPI, PROGRAM_TYPES, PROGRAM_NAMES } from '../../services/api';

const ProgramsPanel = () => {
  const navigate = useNavigate();
  
  // Данные программ
  const [programs, setPrograms] = useState([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  
  // Форма для добавления/редактирования программы
  const [programForm, setProgramForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    type: '',
    isActive: true
  });

  // Загружаем программы при монтировании компонента
  useEffect(() => {
    loadPrograms();
  }, []);

  const handleLogout = () => {
    // Просто перенаправляем на главную панель без сброса аутентификации
    navigate('/manager');
  };

  const loadPrograms = async () => {
    setIsLoadingPrograms(true);
    try {
      // В реальном проекте здесь был бы API запрос
      // Пока используем моковые данные
      const mockPrograms = Object.entries(PROGRAM_NAMES).map(([key, name], index) => ({
        id: `program-${key}`,
        name: name,
        type: key,
        description: `Описание программы ${name}`,
        duration: '12 месяцев',
        price: '500000 тенге',
        isActive: true,
        applicationsCount: Math.floor(Math.random() * 50) + 10,
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      }));
      
      setPrograms(mockPrograms);
    } catch (error) {
      console.error('Ошибка загрузки программ:', error);
    } finally {
      setIsLoadingPrograms(false);
    }
  };

  const handleAddProgram = () => {
    setEditingProgram(null);
    setProgramForm({
      name: '',
      description: '',
      duration: '',
      price: '',
      type: '',
      isActive: true
    });
    setShowAddProgram(true);
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setProgramForm({
      name: program.name,
      description: program.description,
      duration: program.duration,
      price: program.price,
      type: program.type,
      isActive: program.isActive
    });
    setShowAddProgram(true);
  };

  const handleSaveProgram = () => {
    // В реальном проекте здесь был бы API запрос
    if (editingProgram) {
      // Редактирование существующей программы
      setPrograms(prev => prev.map(p => 
        p.id === editingProgram.id 
          ? { ...p, ...programForm }
          : p
      ));
    } else {
      // Добавление новой программы
      const newProgram = {
        id: `program-${Date.now()}`,
        ...programForm,
        applicationsCount: 0,
        createdAt: new Date().toISOString()
      };
      setPrograms(prev => [...prev, newProgram]);
    }
    
    setShowAddProgram(false);
    setEditingProgram(null);
  };

  const handleDeleteProgram = (programId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту программу?')) {
      setPrograms(prev => prev.filter(p => p.id !== programId));
    }
  };

  const toggleProgramStatus = (programId) => {
    setPrograms(prev => prev.map(p => 
      p.id === programId 
        ? { ...p, isActive: !p.isActive }
        : p
    ));
  };


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
              Управление программами
            </h1>
            <p className="text-gray-600">
              Создание, редактирование и настройка образовательных программ
            </p>
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={handleAddProgram}
              className="!bg-green-600 !text-white hover:!bg-green-700"
            >
              Добавить программу
            </Button>
            <Button
              onClick={handleLogout}
              className="!bg-gray-500 !text-white hover:!bg-gray-600"
            >
              К выбору разделов
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего программ</h3>
            <p className="text-3xl font-bold text-[#4C1C6F]">{programs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Активные</h3>
            <p className="text-3xl font-bold text-green-600">
              {programs.filter(p => p.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Неактивные</h3>
            <p className="text-3xl font-bold text-red-600">
              {programs.filter(p => !p.isActive).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Всего заявок</h3>
            <p className="text-3xl font-bold text-blue-600">
              {programs.reduce((sum, p) => sum + p.applicationsCount, 0)}
            </p>
          </div>
        </div>

        {/* Таблица программ */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Список программ</h3>
          </div>
          
          {isLoadingPrograms ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#4C1C6F]"></div>
              <p className="mt-2 text-gray-600">Загрузка программ...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Нет программ для отображения</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Длительность
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Цена
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Заявки
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {program.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {program.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {program.applicationsCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          program.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {program.isActive ? 'Активна' : 'Неактивна'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProgram(program)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Редактировать"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => toggleProgramStatus(program.id)}
                            className={`${program.isActive ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'}`}
                            title={program.isActive ? 'Деактивировать' : 'Активировать'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProgram(program.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Удалить"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно добавления/редактирования программы */}
      {showAddProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProgram ? 'Редактировать программу' : 'Добавить программу'}
              </h3>
              <button
                onClick={() => setShowAddProgram(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название программы
                </label>
                <EditText
                  placeholder="Введите название программы"
                  value={programForm.name}
                  onChange={(value) => setProgramForm(prev => ({ ...prev, name: value }))}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  placeholder="Введите описание программы"
                  value={programForm.description}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Длительность
                  </label>
                  <EditText
                    placeholder="Например: 12 месяцев"
                    value={programForm.duration}
                    onChange={(value) => setProgramForm(prev => ({ ...prev, duration: value }))}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена
                  </label>
                  <EditText
                    placeholder="Например: 500000 тенге"
                    value={programForm.price}
                    onChange={(value) => setProgramForm(prev => ({ ...prev, price: value }))}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип программы
                </label>
                <select
                  value={programForm.type}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4C1C6F] focus:border-transparent"
                >
                  <option value="">Выберите тип программы</option>
                  {Object.entries(PROGRAM_TYPES).map(([key, value]) => (
                    <option key={key} value={value}>{PROGRAM_NAMES[value]}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={programForm.isActive}
                  onChange={(e) => setProgramForm(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="h-4 w-4 text-[#4C1C6F] focus:ring-[#4C1C6F] border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Программа активна
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                onClick={() => setShowAddProgram(false)}
                className="flex-1 !bg-gray-300 !text-gray-700 hover:!bg-gray-400"
              >
                Отмена
              </Button>
              <Button
                onClick={handleSaveProgram}
                className="flex-1 !bg-[#4C1C6F] !text-white hover:!bg-purple-700"
              >
                {editingProgram ? 'Сохранить изменения' : 'Добавить программу'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPanel;
