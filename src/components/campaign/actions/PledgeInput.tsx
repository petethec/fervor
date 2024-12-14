import React from 'react';
import { DollarSign } from 'lucide-react';

interface PledgeInputProps {
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function PledgeInput({
  value,
  onChange,
  onSubmit,
  disabled = false
}: PledgeInputProps) {
  return (
    <div className="flex space-x-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="number"
          min="1"
          value={value || ''}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md 
            focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 
            disabled:cursor-not-allowed"
          placeholder="Enter amount"
          disabled={disabled}
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled || value <= 0}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm 
          font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Back Now
      </button>
    </div>
  );
}