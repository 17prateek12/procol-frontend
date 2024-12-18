import React from 'react';

const Button = ({ type, label, onClick }) => {
  // Define a mapping of button types to specific styles
  const typeStyles = {
    add: 'bg-[#3340f2] text-white hover:bg-[#030d91]',
    delete: 'bg-red-500 text-white hover:bg-red-600',
    submit: 'bg-orange-500 text-white hover:bg-orange-600',
    participate:'bg-green-400 text-white hover:bg-green-600',
    view:'bg-green-400 text-white hover:bg-green-600',
    default: 'bg-gray-300 text-black hover:bg-gray-400', // Fallback style
  };

  // Dynamically select styles based on type
  const buttonStyle = typeStyles[type] || typeStyles.default;

  return (
    <button className={`py-2 px-6 rounded-lg transition-all duration-150 ${buttonStyle}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
