import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName="!bg-white !text-gray-800 !border !border-gray-200 !shadow-lg !rounded-lg !font-medium"
      progressClassName="!bg-[#991E1E]"
      closeButton={({ closeToast }) => (
        <button
          onClick={closeToast}
          className="!text-gray-400 hover:!text-gray-600 transition-colors"
        >
          ✕
        </button>
      )}
    />
  );
};

export default ToastContainer;
