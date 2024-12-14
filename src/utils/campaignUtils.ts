import type { RewardTier } from '../types';

export function calculateDaysLeft(endDate: string): number {
  return Math.max(0, Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));
}

export function calculateBackersCount(rewardTiers: RewardTier[]): number {
  return rewardTiers.reduce((acc, tier) => acc + tier.currentBackers, 0);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function calculateProgress(currentAmount: number, goal: number): number {
  return Math.min((currentAmount / goal) * 100, 100);
}

export function getTimeRemainingText(daysLeft: number): string {
  if (daysLeft === 0) return 'Campaign Ended';
  if (daysLeft === 1) return '1 day remaining';
  return `${daysLeft} days remaining`;
}