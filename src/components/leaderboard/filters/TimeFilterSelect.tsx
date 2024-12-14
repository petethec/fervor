import React from 'react';
import { Clock } from 'lucide-react';
import type { TimeFilter } from '../../../types/leaderboard';

interface TimeFilterSelectProps {
  value: TimeFilter;
  onChange: (value: TimeFilter) => void;
}

export default function TimeFilterSelect({ value, onChange }: TimeFilterSelectProps) {
  return (
    <div className="flex items-center space-x-2">
      <Clock className="h-5 w-5 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TimeFilter)}
        className="block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        aria-label="Time period filter"
      >
        <option value="all-time">All Time</option>
        <option value="this-month">This Month</option>
        <option value="this-week">This Week</option>
      </select>
    </div>
  );
}