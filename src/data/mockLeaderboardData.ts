import type { LeaderboardEntry } from '../types/leaderboard';

export const mockLeaderboardData: (LeaderboardEntry & { lastActivityDate: string, campaignId?: string })[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://source.unsplash.com/100x100/?portrait=1',
    totalContribution: 5000,
    votes: 42,
    badges: ['Top Contributor', 'Early Supporter'],
    lastActivityDate: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: 'https://source.unsplash.com/100x100/?portrait=2',
    totalContribution: 3500,
    votes: 28,
    badges: ['Regular Supporter'],
    lastActivityDate: '2024-03-14T15:30:00Z'
  },
  {
    id: '3',
    name: 'Emma Watson',
    avatar: 'https://source.unsplash.com/100x100/?portrait=3',
    totalContribution: 2800,
    votes: 35,
    badges: ['Trendsetter'],
    lastActivityDate: '2024-03-13T09:15:00Z'
  }
];