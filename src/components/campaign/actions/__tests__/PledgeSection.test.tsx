import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import PledgeSection from '../sections/PledgeSection';
import type { Campaign } from '../../../../types';

const mockCampaign: Campaign = {
  id: '1',
  title: 'Test Campaign',
  description: 'Test Description',
  creatorId: '1',
  creator: {
    id: '1',
    name: 'Test Creator',
    email: 'test@example.com',
    avatar: 'https://example.com/avatar.jpg',
    fervorBucks: 1000,
    badges: []
  },
  goal: 10000,
  currentAmount: 5000,
  category: 'Technology',
  endDate: '2024-12-31',
  rewardTiers: [],
  votes: 100,
  flexibleFunding: false
};

describe('PledgeSection', () => {
  const onBack = vi.fn();
  const onRequireAuth = vi.fn();
  const onError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pledge input and button', () => {
    render(
      <PledgeSection
        campaign={mockCampaign}
        onBack={onBack}
        isAuthenticated={true}
        isSubmitting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    expect(screen.getByPlaceholderText(/enter pledge amount/i)).toBeInTheDocument();
    expect(screen.getByText(/back now/i)).toBeInTheDocument();
  });

  it('shows impact message when entering valid amount', () => {
    render(
      <PledgeSection
        campaign={mockCampaign}
        onBack={onBack}
        isAuthenticated={true}
        isSubmitting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const input = screen.getByPlaceholderText(/enter pledge amount/i);
    fireEvent.change(input, { target: { value: '1000' } });

    expect(screen.getByText(/your pledge will raise the campaign to/i)).toBeInTheDocument();
  });

  it('disables input and button when submitting', () => {
    render(
      <PledgeSection
        campaign={mockCampaign}
        onBack={onBack}
        isAuthenticated={true}
        isSubmitting={true}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const input = screen.getByPlaceholderText(/enter pledge amount/i);
    const button = screen.getByText(/back now/i);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('calls onRequireAuth when unauthenticated user tries to pledge', () => {
    render(
      <PledgeSection
        campaign={mockCampaign}
        onBack={onBack}
        isAuthenticated={false}
        isSubmitting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const button = screen.getByText(/back now/i);
    fireEvent.click(button);

    expect(onRequireAuth).toHaveBeenCalled();
  });

  it('shows error for invalid pledge amount', async () => {
    render(
      <PledgeSection
        campaign={mockCampaign}
        onBack={onBack}
        isAuthenticated={true}
        isSubmitting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const input = screen.getByPlaceholderText(/enter pledge amount/i);
    const button = screen.getByText(/back now/i);

    fireEvent.change(input, { target: { value: '0' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Minimum pledge amount is $1');
    });
  });
});