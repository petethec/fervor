import React from 'react';
import { Loader } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function ActionButton({
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
  children,
  className = '',
  ariaLabel
}: ActionButtonProps) {
  const baseStyles = `
    inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 
    disabled:cursor-not-allowed transition-all duration-200
  `;
  
  const variantStyles = {
    primary: `
      border-transparent text-white bg-indigo-600 hover:bg-indigo-700 
      focus:ring-indigo-500
    `,
    secondary: `
      border-transparent text-white bg-pink-600 hover:bg-pink-700 
      focus:ring-pink-500
    `
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <Loader className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
      ) : icon ? (
        <span className={`h-4 w-4 mr-2 ${loading ? 'animate-pulse' : ''}`} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {loading ? 'Processing...' : children}
    </button>
  );
}