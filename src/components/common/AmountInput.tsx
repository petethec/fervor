import React from 'react';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  showMaxValue?: boolean;
  className?: string;
  ariaLabel?: string;
  error?: string;
}

export default function AmountInput({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  placeholder = "Enter amount",
  icon,
  showMaxValue = false,
  className = '',
  ariaLabel,
  error
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(min, Math.min(Number(e.target.value), max || Infinity));
    onChange(newValue);
  };

  return (
    <div className={`relative flex-1 ${className}`}>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type="number"
        min={min}
        max={max}
        value={value || ''}
        onChange={handleChange}
        className={`
          block w-full py-2 border rounded-md 
          focus:ring-2 focus:ring-offset-2 disabled:bg-gray-100 
          disabled:cursor-not-allowed transition-all duration-200
          ${icon ? 'pl-10' : 'pl-3'} pr-3
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          }
        `}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel || placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'input-error' : undefined}
      />
      {showMaxValue && max && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          / {max}
        </div>
      )}
      {error && (
        <p 
          id="input-error" 
          className="mt-1 text-sm text-red-600 animate-fade-in"
        >
          {error}
        </p>
      )}
    </div>
  );
}