export interface Update {
  id: string;
  title: string;
  content: string;
  date: string;
}

// Update the Campaign interface to include updates
export interface Campaign {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creator: User;
  goal: number;
  currentAmount: number;
  category: string;
  endDate: string;
  rewardTiers: RewardTier[];
  votes: number;
  flexibleFunding: boolean;
  updates: Update[]; // Add this line
}