import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, className, ...rest }) => {
  return (
    <button
      className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${className}`}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;
