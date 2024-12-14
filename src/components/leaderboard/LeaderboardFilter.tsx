import React from 'react';
import { Filter } from 'lucide-react';
import type { TimeFilter } from '../../types/leaderboard';

interface LeaderboardFilterProps {
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  categoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
  categories?: { id: string; name: string; }[];
}

export default function LeaderboardFilter({
  timeFilter,
  onTimeFilterChange,
  categoryId,
  onCategoryChange,
  categories
}: LeaderboardFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-gray-400" />
        <select
          value={timeFilter}
          onChange={(e) => onTimeFilterChange(e.target.value as TimeFilter)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
            focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all-time">All Time</option>
          <option value="this-month">This Month</option>
          <option value="this-week">This Week</option>
        </select>
      </div>

      {categories && onCategoryChange && (
        <div className="flex items-center space-x-2">
          <select
            value={categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 
              focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}