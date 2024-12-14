import { useState, useCallback, useMemo } from 'react';
import type { Campaign } from '../types';

export type SortOption = 'most-funded' | 'most-recent' | 'most-votes';
export type FundingStatus = 'all' | 'fully-funded' | 'near-goal' | 'recently-added';

interface FilterState {
  categories: string[];
  fundingStatus: FundingStatus;
  sortBy: SortOption;
  search: string;
}

export function useCampaignFilters(campaigns: Campaign[]) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    fundingStatus: 'all',
    sortBy: 'most-recent',
    search: '',
  });

  const setCategory = useCallback((category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, category]
        : prev.categories.filter((c) => c !== category),
    }));
  }, []);

  const setSortBy = useCallback((sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const setFundingStatus = useCallback((fundingStatus: FundingStatus) => {
    setFilters((prev) => ({ ...prev, fundingStatus }));
  }, []);

  const setSearch = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((campaign) => {
        // Category filter
        if (filters.categories.length > 0 && !filters.categories.includes(campaign.category)) {
          return false;
        }

        // Search filter
        if (filters.search && !campaign.title.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }

        // Funding status filter
        const progress = (campaign.currentAmount / campaign.goal) * 100;
        switch (filters.fundingStatus) {
          case 'fully-funded':
            return progress >= 100;
          case 'near-goal':
            return progress >= 75 && progress < 100;
          case 'recently-added':
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return new Date(campaign.endDate) > thirtyDaysAgo;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'most-funded':
            return b.currentAmount - a.currentAmount;
          case 'most-votes':
            return b.votes - a.votes;
          case 'most-recent':
            return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
          default:
            return 0;
        }
      });
  }, [campaigns, filters]);

  return {
    filters,
    setCategory,
    setSortBy,
    setFundingStatus,
    setSearch,
    filteredCampaigns,
  };
}