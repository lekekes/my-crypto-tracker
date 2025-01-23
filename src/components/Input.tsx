import React from 'react';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-800 placeholder-gray-500 shadow-sm focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-400 ${className}`}
      />
    </div>
  );
};

export default Input;
