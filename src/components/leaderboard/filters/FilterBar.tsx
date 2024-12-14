import React from 'react';
import TimeFilterSelect from './TimeFilterSelect';
import CategoryFilterSelect from './CategoryFilterSelect';
import type { TimeFilter } from '../../../types/leaderboard';

interface FilterBarProps {
  timeFilter: TimeFilter;
  onTimeFilterChange: (filter: TimeFilter) => void;
  categoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
  categories?: Array<{ id: string; name: string; }>;
}

export default function FilterBar({
  timeFilter,
  onTimeFilterChange,
  categoryId,
  onCategoryChange,
  categories
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
      <TimeFilterSelect
        value={timeFilter}
        onChange={onTimeFilterChange}
      />
      {categories && onCategoryChange && (
        <CategoryFilterSelect
          categories={categories}
          value={categoryId || ''}
          onChange={onCategoryChange}
        />
      )}
    </div>
  );
}