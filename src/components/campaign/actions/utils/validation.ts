export function validatePledgeAmount(amount: number): string | null {
  if (amount <= 0) {
    return 'Minimum pledge amount is $1';
  }
  return null;
}

export function validateVoteAmount(amount: number, availableBucks: number): string | null {
  if (amount <= 0) {
    return 'Minimum vote amount is 1 Fervor Buck';
  }
  if (amount > availableBucks) {
    return 'Insufficient Fervor Bucks';
  }
  return null;
}