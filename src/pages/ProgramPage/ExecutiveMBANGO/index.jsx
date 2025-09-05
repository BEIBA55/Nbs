import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Button from '../../../components/ui/Button';
import EditText from '../../../components/ui/EditText';
import { useToast } from '../../../hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';

const ExecutiveMBANGO = () => {
  const { t } = useTranslation();
  const { showApplicationSuccess, showDownloadSuccess } = useToast();
  const { validateApplicationForm, showValidationErrors } = useFormValidation();
  
  const [showPresentationModal, setShowPresentationModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateApplicationForm(formData);
    
    if (errors.length > 0) {
      showValidationErrors(errors);
      return;
    }

    console.log('Данные формы:', formData);
    
    showDownloadSuccess();
    setShowSuccess(true);
    
    setTimeout(() => {
      handleDownloadPresentation();
      setShowPresentationModal(false);
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
      });
      setError('');
    }, 3000);
  };

  const handleDownloadPresentation = () => {
    const link = document.createElement('a');
    link.href = '/presentations/EMBA управление в сфере НПО и НКО (2).pdf';
    link.download = 'Executive-MBA-NPO-NKO-presentation.pdf';
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
        className="relative bg-cover bg-center bg-no-repeat text-white py-64 px-8 min-h-screen flex items-end pb-32"
        style={{ backgroundImage: 'url(/images/НпоНко/Hiro.png)' }}
      >

        <div className="relative max-w-7xl mx-auto text-center w-full">
          <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            EXECUTIVE МВА ДЛЯ НПО/НКО
          </h1>
          <p className="text-xl lg:text-2xl mb-4 font-medium">
            Программа для лидеров социальных изменений
          </p>
          <p className="text-xl lg:text-2xl mb-12">
            правление некоммерческими организациями и социальными проектами
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-[#4C1C6F] text-white px-8 py-3 rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              Weekend формат обучения
            </div>
            <div className="bg-[#4C1C6F] text-white px-8 py-3 rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              12 преподавателей
            </div>
            <div className="bg-[#4C1C6F] text-white px-8 py-3 rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors">
              14 месяцев
            </div>
            <div
              onClick={() => setShowPresentationModal(true)}
              className="bg-[#4C1C6F] text-white px-8 py-3 rounded-full font-semibold text-lg border-2 border-white/20 hover:bg-[#5A2A8A] transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              Скачать презентацию
            </div>
          </div>
        </div>
      </div>

      {/* About Program Section */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Title and Button */}
                         <div className="space-y-20">
               <h2 className="text-4xl lg:text-5xl font-normal leading-tight">
                 <span className="text-[#4C1C6F]">Executive MBA для руководителей</span>
                 <br />
                 <span className="text-[#7C3EA9]">НПО/НКО</span>
               </h2>
               <button className="bg-[#4C1C6F] text-white px-4 py-2 rounded-full font-semibold text-base hover:bg-[#5A2A8A] transition-colors transform hover:scale-105">
                 Связаться с нами
               </button>
             </div>
            
            {/* Right side - Description */}
            <div className="text-[#6E767D] space-y-4 text-xl leading-relaxed">
              <p>
                Специализированная программа Executive MBA для лидеров некоммерческих организаций и социальных предприятий, 
                готовящая их к созданию устойчивых социальных изменений и эффективному управлению НПО/НКО.
              </p>
              <p>
                Участники программы изучат стратегическое управление, финансовое планирование, управление проектами, 
                фандрайзинг и лидерство в социальной сфере, сочетая бизнес-подход с социальной миссией.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Image and Stats */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#F4F4F4]/85 rounded-3xl p-12">
                         <div className="grid lg:grid-cols-3 gap-12 items-center">
               {/* Left side - Image */}
               <div className="flex justify-center lg:justify-start h-full">
                 <img 
                   src="/images/NBS.png" 
                   alt="Narxoz Business School" 
                   className="rounded-2xl w-full max-w-sm h-full object-cover"
                 />
               </div>
               
               {/* Right side - White container with stats */}
               <div className="bg-white rounded-2xl p-8 lg:p-12 lg:col-span-2">
                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Column 1 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       3-4
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       дня в месяц
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Обучение 3-4 дня в месяц в модульном формате без отрыва от работы
                     </div>
                   </div>
                   
                   {/* Column 2 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       20
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       человек
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Только 20 человек в группе из разных регионов страны
                     </div>
                   </div>
                   
                   {/* Column 3 */}
                   <div className="text-center">
                     <div className="text-5xl lg:text-6xl font-bold text-[#4C1C6F] mb-2">
                       16
                     </div>
                     <div className="text-lg text-[#6E767D] mb-3">
                       экспертов
                     </div>
                     <div className="text-sm text-[#6E767D] leading-relaxed">
                       Преподаватели практики и международно признанный диплом
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this program for Section */}
      <div className="px-8">
        <div className="max-w-full mx-auto">
          <div className="bg-[#4C1C6F] rounded-3xl p-12">
            <div className="max-w-7xl mx-auto">
              {/* Top button */}
              <div className="text-center mb-8">
                <button className="bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  О программе
                </button>
              </div>
              
              {/* Main heading */}
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white leading-tight mb-4">
                  Для кого эта программа?
                </h2>
                <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                  Для системного развития и повышения эффективности управления проектами
                </p>
              </div>
              
              {/* Three cards */}
              <div className="relative">
                {/* Left arrow - small and positioned on the side */}
                <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Right arrow - small and positioned on the side */}
                <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Cards container */}
                <div className="flex gap-6 overflow-x-auto pb-4 px-4 ml-6">
                  {/* Card 1 */}
                  <div className="bg-white rounded-2xl p-6 w-96 h-112 flex-shrink-0 relative group hover:shadow-xl transition-all duration-300">
                    {/* Image with icon overlay */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                      {/* Icon in top left corner of image */}
                      <div className="absolute top-2 left-2 w-10 h-10 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title and description below image */}
                    <h3 className="text-2xl font-normal text-[#4C1C6F] mb-3">
                      Специалисты
                      <br />
                      НПО/НКО
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Для получения практических знаний, необходимых для масштабирования инициатив и укрепления управленческих компетенций
                    </p>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="bg-white rounded-2xl p-6 w-96 h-112 flex-shrink-0 relative group hover:shadow-xl transition-all duration-300">
                    {/* Image with icon overlay */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                      {/* Icon in top left corner of image */}
                      <div className="absolute top-2 left-2 w-10 h-10 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title and description below image */}
                    <h3 className="text-2xl font-normal text-[#4C1C6F] mb-3">
                      Менеджеры корпоративного сектора
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Для реализации стратегии корпоративной социальной ответственности и развития партнёрских инициатив
                    </p>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="bg-white rounded-2xl p-6 w-96 h-112 flex-shrink-0 relative group hover:shadow-xl transition-all duration-300">
                    {/* Image with icon overlay */}
                    <div className="relative mb-4">
                      <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                      {/* Icon in top left corner of image */}
                      <div className="absolute top-2 left-2 w-10 h-10 bg-[#4C1C6F] rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Title and description below image */}
                    <h3 className="text-2xl font-normal text-[#4C1C6F] mb-3">
                      Социальные предприниматели
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Для успешного роста, масштабирования и устойчивого управления бизнес-проектами с социальным эффектом
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Remove old navigation arrows */}
            </div>
          </div>
        </div>
      </div>

      {/* Experts Section */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Text Block */}
            <div className="bg-[#7C3EA9] rounded-3xl p-12 relative overflow-hidden">
              {/* Diagonal accent shape */}
              <div className="absolute top-0 left-0 w-128 h-128 bg-[#4C1C6F] transform rotate-45 -translate-x-20 -translate-y-20 opacity-80 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Top tag */}
                <div className="inline-block bg-[#4C1C6F] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
                  Эксперты
                </div>
                
                {/* Main text */}
                <div className="text-white space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Наши Преподаватели
                  </h2>
                  <p className="text-2xl lg:text-3xl font-medium">
                    — это эксперты,
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    практики, коучи
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    и успешные
                  </p>
                  <p className="text-2xl lg:text-3xl font-medium">
                    бизнесмены
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image Block */}
            <div className="flex items-center justify-center">
              <img 
                src="/images/НпоНко/SeconBloc.png" 
                alt="Преподаватель" 
                className="w-full h-auto rounded-3xl object-cover"
              />
            </div>
          </div>
          
          {/* Faculty Grid - продолжение секции */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  {/* Circular profile image placeholder */}
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  
                  {/* Name and title */}
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Анастасия Ложкина
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  {/* Action icon */}
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Евгения Белотелова
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Татьяна Задирако
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Толеутаева Зевира
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Жания Курманова
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Олег Алферов
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    DBA
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 7 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Александра Замякина
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    PhD
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 8 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-normal text-gray-900 mb-2">
                    Марина Новоточина
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    д.э.н. профессор
                  </p>
                  
                  {/* Black line separator */}
                  <div className="w-full h-px bg-black mx-auto mb-4"></div>
                  
                  <div className="w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-4 h-4 text-[#4C1C6F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Обязательные дисциплины Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#4C1C6F] text-[#4C1C6F] px-4 py-2 rounded-full text-sm font-medium">
              Программа обучения
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal text-[#4C1C6F]">
              Обязательные дисциплины
            </h2>
          </div>

          {/* Сетка дисциплин - 2 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">01</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Стратегический менеджмент</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">02</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Бизнес-исследование</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">03</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Стратегическое управление человеческим капиталом</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">04</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Управление проектами</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">05</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Стратегия создания ценностей в маркетинге</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">06</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Искусственный интеллект в бизнесе</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">07</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Финансовая, управленческая отчетность и анализ</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Дисциплины по выбору Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#4C1C6F] text-[#4C1C6F] px-4 py-2 rounded-full text-sm font-medium">
              Программа обучения
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal text-[#4C1C6F]">
              Дисциплины по выбору
            </h2>
          </div>

          {/* Сетка дисциплин - 2 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">01</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Трансформационное лидерство</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">02</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Публичные коммуникации для лидеров</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">03</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Креативность и дизайн-мышление в управлении</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">04</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Эмоциональный интеллект</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">05</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Управление репутацией и этическими вызовами</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">06</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Переговорная стратегия и проведение сделок в условиях трансформации рынков</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">07</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Системное мышление и решение проблем</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Специализации Section */}
      <div className="py-24 px-8" style={{ backgroundColor: '#F9FAFB' }}>
        <div className="max-w-7xl mx-auto">
          {/* Тег сверху */}
          <div className="text-center mb-6">
            <span className="inline-block bg-[#F9FAFB] border border-[#4C1C6F] text-[#4C1C6F] px-4 py-2 rounded-full text-sm font-medium">
              Программа обучения
            </span>
          </div>

          {/* Заголовок */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-normal text-[#4C1C6F]">
              Специализации
            </h2>
          </div>

          {/* Сетка специализаций - 2 колонки */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">01</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Основы управления НПО</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">02</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">Фандрайзинг, лоббирование и агитация</h3>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <div className="text-gray-400 text-sm mb-2">03</div>
              <h3 className="text-xl font-normal text-[#4C1C6F]">ESG для НКО: интеграция экологических, социальных и управленческих принципов</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Student Reviews Section */}
      <div className="px-8 py-16">
        <div className="max-w-full mx-auto">
          <div className="bg-[#4C1C6F] rounded-3xl p-12">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left side - Title and Button */}
                <div className="space-y-8">
                  {/* Top button */}
                  <div className="inline-block bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium border border-white/30">
                    Отзывы
                  </div>
                  
                  {/* Main title */}
                  <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Отзывы
                    <br />
                    студентов
                  </h2>
                </div>
                
                {/* Right side - Video placeholder */}
                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-lg aspect-video bg-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium">Видео отзывы</p>
                      <p className="text-sm">Будут добавлены позже</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Presentation Modal with #4C1C6F color */}
      {showPresentationModal && (
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
                    Презентация готова к скачиванию!
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Спасибо за ваш интерес к программе EXECUTIVE MBA ДЛЯ НПО/НКО
                  </p>
                  <p className="text-sm text-gray-500">
                    Файл начнет скачиваться автоматически
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#4C1C6F] h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Скачать презентацию
                  </h2>
                  <p className="text-gray-600">
                    EXECUTIVE MBA ДЛЯ НПО/НКО
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Заполните форму для получения презентации программы
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <EditText
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(value) => handleInputChange('name', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => handleInputChange('email', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Телефон"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    className="h-12"
                    required
                  />
                  <EditText
                    placeholder="Компания"
                    value={formData.company}
                    onChange={(value) => handleInputChange('company', value)}
                    className="h-12"
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowPresentationModal(false)}
                      className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#4C1C6F] text-white px-6 py-3 rounded-lg hover:bg-[#5A2A8A] transition-colors"
                    >
                      Скачать
                    </Button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ExecutiveMBANGO;
