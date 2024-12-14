import React from 'react';
import { Filter, Search } from 'lucide-react';
import type { SortOption, FundingStatus } from '../../../hooks/useCampaignFilters';

interface CampaignFiltersProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  fundingStatus: FundingStatus;
  onFundingStatusChange: (status: FundingStatus) => void;
  onSearchChange: (search: string) => void;
}

export default function CampaignFilters({
  categories,
  selectedCategories,
  onCategoryChange,
  sortBy,
  onSortChange,
  fundingStatus,
  onFundingStatusChange,
  onSearchChange,
}: CampaignFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search campaigns..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e) => onCategoryChange(category, e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Funding Status</h3>
        <select
          value={fundingStatus}
          onChange={(e) => onFundingStatusChange(e.target.value as FundingStatus)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="all">All Campaigns</option>
          <option value="fully-funded">Fully Funded</option>
          <option value="near-goal">Near Goal</option>
          <option value="recently-added">Recently Added</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="most-recent">Most Recent</option>
          <option value="most-funded">Most Funded</option>
          <option value="most-votes">Most Votes</option>
        </select>
      </div>
    </div>
  );
}