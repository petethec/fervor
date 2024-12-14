export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatProgress(currentAmount: number, goal: number): string {
  const progress = (currentAmount / goal) * 100;
  return `${progress.toFixed(1)}%`;
}