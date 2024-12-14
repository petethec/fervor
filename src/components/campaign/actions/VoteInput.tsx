import React from 'react';
import { Heart } from 'lucide-react';

interface VoteInputProps {
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isVoting?: boolean;
}

export default function VoteInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isVoting = false
}: VoteInputProps) {
  return (
    <div className="flex space-x-2">
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
        className="block w-full sm:text-sm border-gray-300 rounded-md 
          focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 
          disabled:cursor-not-allowed"
        placeholder="Enter Fervor Bucks"
        disabled={disabled}
      />
      <button
        onClick={onSubmit}
        disabled={disabled || value < 1}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm 
          font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 
          disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <Heart className={`h-4 w-4 mr-2 ${isVoting ? 'animate-pulse' : ''}`} />
        Vote
      </button>
    </div>
  );
}