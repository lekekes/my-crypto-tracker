import { FC } from 'react';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; // Vordefinierte Styles
  className?: string; // Zusätzliche benutzerdefinierte Klassen
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  // Basierend auf der Variant-Prop Styles zuweisen
  const baseStyles = `rounded px-4 py-2 transition font-semibold focus:outline-none focus:ring-2 ${
    disabled ? 'cursor-not-allowed' : 'hover:scale-105'
  }`;

  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
