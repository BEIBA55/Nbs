import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ExecutiveSessionsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-7xl mx-auto">
             <div className="grid grid-cols-4 gap-0 w-full h-[540px]">
         {/* Большая картина - занимает 4 колонки */}
         <div className="col-span-3 bg-white flex flex-col justify-center items-center rounded-[40px] border border-gray-200 h-full w-full overflow-hidden p-0">
          <img
            src="/images/ExecSess.png"
            alt="Classroom"
            className="object-cover w-full h-full"
          />
        </div>

                 {/* Executive Sessions for Top Managers - занимает 1 колонку */}
         <Link
           to="/programs/executive-sessions"
           className="bg-white text-[#991E1E] flex flex-col justify-center items-center relative rounded-[40px] border border-gray-200 h-full w-full p-6"
         >
                       <span className="text-4xl md:text-5xl font-medium leading-tight text-center">
              Executive Sessions
              <br />
              for Top
              <br />
              managers
            </span>
            <span className="text-sm font-normal mt-2 opacity-80 text-center">
              {t('homepage.executiveSessionsSection.description')}
            </span>
            <div className="flex items-center mt-4">
                          <div className="flex items-center border-2 border-[#991E1E] rounded-full px-4 py-1">
              <span className="text-[#991E1E] font-medium text-sm">{t('homepage.executiveSessionsSection.more')}</span>
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
      </div>
    </div>
  );
};

export default ExecutiveSessionsSection;
