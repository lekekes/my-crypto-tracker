import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  keySelector?: (option: SelectOption, index: number) => string; // Optionale Funktion für Key
}

export default function Select({
  options,
  value,
  onChange,
  placeholder,
  className = 'w-full',
  keySelector, // Prop für benutzerdefinierte Schlüssel
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div
      ref={selectRef}
      className={`relative ${className} text-gray-800 dark:text-gray-300`}
    >
      {/* Trigger */}
      <div
        className={`flex h-[40px] cursor-pointer items-center justify-between rounded-md border px-4 py-2 shadow-sm ${
          isOpen
            ? 'border-yellow-400 ring-2 ring-yellow-300'
            : 'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {options.find((option) => option.value === value)?.label ||
            placeholder}
        </span>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 max-h-[50vh] w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {options.map((option, index) => (
            <div
              key={
                keySelector
                  ? keySelector(option, index) // Benutzerdefinierter Key, falls vorhanden
                  : option.value // Standardmäßig `value` als Key
              }
              className={`cursor-pointer px-4 py-2 hover:bg-yellow-100 dark:hover:bg-gray-700 ${
                option.value === value ? 'bg-yellow-200 dark:bg-gray-700' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
