import React from 'react';

const EditText = ({
  label = '',
  placeholder = '',
  value = '',
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  multiline = false,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`mb-6 ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
      {multiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          rows={4}
          className="w-full px-4 py-3 text-gray-700 font-normal bg-white border border-gray-300 outline-none rounded-lg focus:border-[#991E1E] focus:ring-1 focus:ring-[#991E1E] transition-colors"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="w-full px-4 py-3 text-gray-700 font-normal bg-white border border-gray-300 outline-none rounded-lg focus:border-[#991E1E] focus:ring-1 focus:ring-[#991E1E] transition-colors"
        />
      )}
    </div>
  );
};

export default EditText;
