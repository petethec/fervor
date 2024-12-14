export type TimeFilter = 'all-time' | 'this-month' | 'this-week';

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  totalContribution: number;
  votes: number;
  badges: string[];
}

export interface LeaderboardFilters {
  timeFilter: TimeFilter;
  campaignId?: string;
  limit?: number;
}