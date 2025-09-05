import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BusinessSchoolGrid = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-4 grid-rows-2 w-full h-[540px] gap-0">
        {/* 1. №1 MBA */}
        <Link
          to="/programs/mba"
          className="bg-[#991E1E] text-white flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight">
            {t('homepage.businessGrid.mba.program')}
          </span>
          <span className="text-base font-normal mt-2 opacity-80">
            {t('homepage.businessGrid.mba.rank')} {t('homepage.businessGrid.mba.region')}
          </span>
          <span className="text-sm font-normal mt-4 text-white/80 text-center">
            {t('homepage.businessGrid.mba.description')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.businessGrid.more')}</span>
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
        {/* 2. Фото здания */}
        <div className="bg-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full overflow-hidden p-0">
          <img
            src="/images/NBSphoto.png"
            alt="Narxoz Building"
            className="object-cover w-full h-full"
          />
        </div>
        {/* 3. DBA */}
        <Link
          to="/programs/dba"
          className="bg-white text-[#991E1E] flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight">
            {t('homepage.businessGrid.dba.program')}
          </span>
          <span className="text-base font-normal mt-2 opacity-80 text-center">
            {t('homepage.businessGrid.dba.description')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-[#991E1E] rounded-full px-4 py-1">
              <span className="text-[#991E1E] font-medium text-sm">{t('homepage.businessGrid.more')}</span>
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
        {/* 4. Фото выпускников (верхний правый) */}
        <div className="bg-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full overflow-hidden p-0">
          <img src="/images/vipus.jpg" alt="Graduates" className="object-cover w-full h-full" />
        </div>
        {/* 5. Фото выпускников (нижний левый) */}
        <div className="bg-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full overflow-hidden p-0">
          <img src="/images/ExecMBA.png" alt="Graduates" className="object-cover w-full h-full" />
        </div>
        {/* 6. Executive MBA (col-span-2) */}
        <Link
          to="/programs/executive-mba"
          className="bg-[#E94848] text-white flex flex-col justify-center items-start relative rounded-[40px] border border-gray-200 h-full w-full col-span-2 p-8"
          style={{ gridColumn: '2 / span 2' }}
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight">
            {t('homepage.businessGrid.executiveMba.program').split(' ')[0]}
            <br />
            {t('homepage.businessGrid.executiveMba.program').split(' ')[1]}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.businessGrid.more')}</span>
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
          <span className="text-base font-normal mt-4 text-white/80">
            {t('homepage.businessGrid.executiveMba.description')}
          </span>
          <span className="text-sm font-normal mt-2 text-white/60">
            {t('homepage.businessGrid.executiveMba.subtitle')}
          </span>
        </Link>
        {/* 7-8. Executive Education (row-span-2, col-start-4) */}
        <Link
          to="/programs/executive-education"
          className="bg-[#991E1E] text-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full row-span-2 col-start-4 p-6"
          style={{ gridRow: '2 / span 1', gridColumn: '4 / span 1' }}
        >
          <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
            Executive
            <br />
            Education
          </span>
          <span className="text-sm font-normal mt-4 text-white/80 text-center">
            {t('homepage.businessGrid.brand.subtitle')}
          </span>
          <div className="flex items-center mt-4">
            <div className="flex items-center border-2 border-white rounded-full px-4 py-1">
              <span className="text-white font-medium text-sm">{t('homepage.businessGrid.more')}</span>
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

export default BusinessSchoolGrid;
