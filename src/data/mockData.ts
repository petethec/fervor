import type { Campaign } from '../types';

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'EcoTech Solar Backpack',
    description: 'A revolutionary backpack with built-in solar panels to charge your devices on the go.',
    creatorId: '1',
    creator: {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      avatar: 'https://source.unsplash.com/100x100/?portrait',
      fervorBucks: 1000,
      badges: []
    },
    goal: 50000,
    currentAmount: 32500,
    category: 'Technology',
    endDate: '2024-05-01',
    rewardTiers: [],
    votes: 245,
    flexibleFunding: false
  },
  {
    id: '2',
    title: 'Urban Vertical Garden',
    description: 'Smart, space-efficient vertical gardens for urban homes with automated watering system.',
    creatorId: '2',
    creator: {
      id: '2',
      name: 'Michael Rodriguez',
      email: 'michael@example.com',
      avatar: 'https://source.unsplash.com/100x100/?man',
      fervorBucks: 750,
      badges: []
    },
    goal: 25000,
    currentAmount: 18750,
    category: 'Environment',
    endDate: '2024-04-15',
    rewardTiers: [],
    votes: 189,
    flexibleFunding: true
  },
  {
    id: '3',
    title: 'AI Writing Assistant',
    description: 'Advanced AI-powered writing assistant that helps improve your writing style and creativity.',
    creatorId: '3',
    creator: {
      id: '3',
      name: 'Emma Watson',
      email: 'emma@example.com',
      avatar: 'https://source.unsplash.com/100x100/?woman',
      fervorBucks: 1200,
      badges: []
    },
    goal: 75000,
    currentAmount: 45000,
    category: 'Software',
    endDate: '2024-06-01',
    rewardTiers: [],
    votes: 312,
    flexibleFunding: false
  }
];