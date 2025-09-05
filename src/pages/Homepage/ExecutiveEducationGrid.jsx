import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ExecutiveEducationGrid = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto">
             <div className="grid grid-cols-4 grid-rows-2 gap-0 w-full h-[540px]">
                 {/* Ряд 1, Колонка 1-2: Корпоративным клиентам */}
         <Link
           to="/corporate-clients"
           className="bg-[#991E1E] text-white flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6 col-span-2"
         >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
            {t('homepage.executiveEducationGrid.corporate.title')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.executiveEducationGrid.more')}</span>
            </div>
            <div className="flex items-center border-2 border-white rounded-full w-7 h-7 ml-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

                 {/* Ряд 1, Колонка 3: Mini-MBA */}
         <Link
           to="/programs/mini-mba"
           className="bg-[#E94848] text-white flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
         >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
            {t('homepage.executiveEducationGrid.miniMba.title')}
          </span>
          <span className="text-sm font-normal mt-2 opacity-80 text-center">
            {t('homepage.executiveEducationGrid.miniMba.description')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.executiveEducationGrid.more')}</span>
            </div>
            <div className="flex items-center border-2 border-white rounded-full w-7 h-7 ml-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

                 {/* Ряд 1, Колонка 4: Фото выпускников */}
         <div className="bg-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full overflow-hidden p-0">
          <img
            src="/images/treningiphoto.png"
            alt="Graduates"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Ряд 2, Колонка 1-2: Executive MBA для лидеров НПО/НКО */}
        <Link
          to="/programs/executive-mba-ngo"
          className="bg-white text-[#991E1E] flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6 col-span-2"
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
            {t('homepage.executiveEducationGrid.executiveMbaNgo.title')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-[#991E1E] rounded-full px-4 py-1">
              <span className="text-[#991E1E] font-medium text-sm">{t('homepage.executiveEducationGrid.more')}</span>
            </div>
            <div className="flex items-center border-2 border-[#991E1E] rounded-full w-7 h-7 ml-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path d="M6 12L10 8L6 4" stroke="#991E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Ряд 2, Колонка 3: Executive MBA для СІО */}
        <Link
          to="/programs/executive-mba-cio"
          className="bg-[#991E1E] text-white flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
        >
          <span className={`font-medium leading-tight text-center ${
            i18n.language === 'kk' 
              ? 'text-2xl md:text-3xl' 
              : 'text-4xl md:text-5xl'
          }`}>
            {t('homepage.executiveEducationGrid.executiveMbaCio.title')}
          </span>
          <span className="text-sm font-normal mt-2 opacity-80 text-center">
            {t('homepage.executiveEducationGrid.executiveMbaCio.description')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.executiveEducationGrid.more')}</span>
            </div>
            <div className="flex items-center border-2 border-white rounded-full w-7 h-7 ml-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Ряд 2, Колонка 4: Тренинги */}
        <Link
          to="/programs/trainings"
          className="bg-[#E94848] text-white flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
            {t('homepage.executiveEducationGrid.trainings.title')}
          </span>
          <span className="text-sm font-normal mt-2 opacity-80 text-center">
            {t('homepage.executiveEducationGrid.trainings.description')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.executiveEducationGrid.more')}</span>
            </div>
            <div className="flex items-center border-2 border-white rounded-full w-7 h-7 ml-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path d="M6 12L10 8L6 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ExecutiveEducationGrid;
