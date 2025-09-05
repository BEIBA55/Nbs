import React, { useState } from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import PresentationModal from '../../../components/ui/PresentationModal';

const features = [
  {
    number: '01',
    title: 'Исследовательская направленность',
    stats: '100% диссертаций защищены успешно',
    points: [
      'Глубокие теоретические знания в области бизнес-администрирования',
      'Практические исследования с применением современных методологий',
    ],
  },
  {
    number: '02',
    title: 'Международные стандарты',
    stats: 'Соответствие международным стандартам PhD',
    points: [
      'Программа разработана в соответствии с международными стандартами',
      'Возможность публикаций в международных научных журналах',
    ],
  },
  {
    number: '03',
    title: 'Экспертный уровень',
    stats: 'Подготовка к академической карьере',
    points: [
      'Возможность преподавания в университетах',
      'Консультационная деятельность в области бизнеса',
    ],
  },
  {
    number: '04',
    title: 'Индивидуальный подход',
    stats: 'Персональный научный руководитель',
    points: [
      'Индивидуальный план обучения и исследований',
      'Гибкий график работы над диссертацией',
    ],
  },
];

const modules = [
  {
    title: 'Методология научных исследований',
    subtitle: 'Обязательный модуль',
    description: 'Изучение методологии научных исследований в области бизнес-администрирования',
    topics: [
      'Философия науки и методология',
      'Количественные и качественные методы',
      'Статистический анализ данных',
      'Научное письмо и публикации',
    ],
  },
  {
    title: 'Теория организации и управления',
    subtitle: 'Обязательный модуль',
    description: 'Углубленное изучение теорий организации и управления',
    topics: [
      'Классические и современные теории организации',
      'Стратегическое управление',
      'Организационное поведение',
      'Теория принятия решений',
    ],
  },
  {
    title: 'Экономическая теория',
    subtitle: 'Обязательный модуль',
    description: 'Продвинутые концепции экономической теории',
    topics: [
      'Микроэкономика и макроэкономика',
      'Экономика организации',
      'Институциональная экономика',
      'Экономика развития',
    ],
  },
  {
    title: 'Финансовые рынки и институты',
    subtitle: 'Обязательный модуль',
    description: 'Изучение финансовых рынков и институтов',
    topics: [
      'Теория финансов',
      'Финансовые рынки и инструменты',
      'Корпоративные финансы',
      'Международные финансы',
    ],
  },
  {
    title: 'Маркетинг и потребительское поведение',
    subtitle: 'Обязательный модуль',
    description: 'Теоретические основы маркетинга и поведения потребителей',
    topics: [
      'Теория маркетинга',
      'Поведение потребителей',
      'Стратегический маркетинг',
      'Международный маркетинг',
    ],
  },
  {
    title: 'Инновации и предпринимательство',
    subtitle: 'Обязательный модуль',
    description: 'Изучение инноваций и предпринимательской деятельности',
    topics: [
      'Теория инноваций',
      'Предпринимательство и стартапы',
      'Управление инновациями',
      'Технологическое предпринимательство',
    ],
  },
];

const DBA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [showPresentationModal, setShowPresentationModal] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Заявка отправлена:', formData);
    alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
  };

  const handleDownloadPresentation = () => {
    // Создаем ссылку для скачивания презентации DBA
    const link = document.createElement('a');
    link.href = '/presentations/DBA доктор дел. админ.pdf';
    link.download = 'DBA-presentation.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center bg-no-repeat text-white py-48 px-8"
        style={{ backgroundImage: 'url(/images/Fon.png)' }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-7xl lg:text-8xl font-bold mb-8 leading-tight">ПРОГРАММА DBA</h1>
          <p className="text-3xl lg:text-4xl mb-6 font-medium">
            (DOCTOR OF BUSINESS ADMINISTRATION)
          </p>
          <p className="text-2xl mb-3">Докторская программа в области бизнес-администрирования</p>
          <p className="text-xl mb-16 opacity-90">Высший уровень бизнес-образования</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                               <Button
                     onClick={() => setShowPresentationModal(true)}
                     className="bg-[#991E1E] text-white px-8 py-3 rounded-lg hover:bg-[#7A1818] transition-colors"
                   >
                     Скачать презентацию
                   </Button>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-red-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg">
              3 года
            </div>
            <div className="bg-red-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg">
              Исследовательская программа
            </div>
            <div className="bg-red-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg">
              Диссертация
            </div>
          </div>
        </div>
      </div>

      {/* Program Description */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <img src="/images/Krug.png" alt="DBA студенты" className="w-96 h-96" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                DBA (Doctor of Business Administration)
              </h2>
              <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                <p>
                  Программа DBA в Нархоз Business School — это высший уровень бизнес-образования,
                  предназначенный для опытных профессионалов, стремящихся к академической карьере
                  или желающих внести вклад в развитие бизнес-теории и практики.
                </p>
                <p>
                  Программа сочетает в себе глубокие теоретические знания с практическими
                  исследованиями, позволяя слушателям разрабатывать инновационные решения для
                  современных бизнес-вызовов и вносить вклад в научное сообщество.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ключевые особенности программы
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Что делает DBA в Нархоз Business School уникальной программой
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-3xl">
                <div className="flex items-start gap-6">
                  <div className="text-6xl font-black text-red-800 leading-none">
                    {feature.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <div className="text-red-800 font-bold text-lg mb-4">{feature.stats}</div>
                    <ul className="space-y-2">
                      {feature.points.map((point, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start gap-2">
                          <span className="text-red-800 mt-1">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Структура программы</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Основные модули и направления исследований
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <div key={index} className="bg-white p-8 rounded-3xl shadow-lg">
                <div className="mb-4">
                  <span className="text-red-800 text-sm font-semibold">{module.subtitle}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{module.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>
                <ul className="space-y-2">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="text-gray-600 flex items-start gap-2">
                      <span className="text-red-800 mt-1">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Подать заявку на программу DBA
            </h2>
            <p className="text-xl text-gray-600">
              Оставьте заявку, и мы свяжемся с вами для консультации
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <EditText
                label="Имя"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Введите ваше имя"
              />
              <EditText
                label="Email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Введите ваш email"
              />
              <EditText
                label="Телефон"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="Введите ваш телефон"
              />
              <EditText
                label="Компания"
                value={formData.company}
                onChange={(value) => handleInputChange('company', value)}
                placeholder="Введите название компании"
              />
            </div>
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                className="bg-red-800 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-red-900 transition-colors"
              >
                Отправить заявку
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      <PresentationModal
        isOpen={showPresentationModal}
        onClose={() => setShowPresentationModal(false)}
        onDownload={handleDownloadPresentation}
        programName="DBA (Doctor of Business Administration)"
      />
    </div>
  );
};

export default DBA;
