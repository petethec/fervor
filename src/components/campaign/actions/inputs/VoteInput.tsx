import React from 'react';
import { Heart } from 'lucide-react';

interface VoteInputProps {
  value: number;
  onChange: (value: number) => void;
  onSubmit: () => void;
  disabled?: boolean;
  isVoting?: boolean;
  maxVotes?: number;
}

export default function VoteInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isVoting = false,
  maxVotes
}: VoteInputProps) {
  return (
    <div className="flex space-x-2">
      <div className="relative flex-1">
        <input
          type="number"
          min="1"
          max={maxVotes}
          value={value}
          onChange={(e) => onChange(Math.max(1, Math.min(Number(e.target.value), maxVotes || Infinity)))}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md 
            focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100 
            disabled:cursor-not-allowed transition-all duration-200"
          placeholder="Enter Fervor Bucks"
          disabled={disabled || isVoting}
          aria-label="Vote amount"
        />
        {maxVotes && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            / {maxVotes}
          </div>
        )}
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled || isVoting || value < 1}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm 
          font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        <Heart className={`h-4 w-4 mr-2 ${isVoting ? 'animate-pulse' : ''}`} />
        {isVoting ? 'Voting...' : 'Vote'}
      </button>
    </div>
  );
}