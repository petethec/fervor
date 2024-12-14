import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import VoteSection from '../sections/VoteSection';
import { AuthProvider } from '../../../../context/AuthContext';
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

const renderWithAuth = (ui: React.ReactElement) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  );
};

describe('VoteSection', () => {
  const onVote = vi.fn();
  const onRequireAuth = vi.fn();
  const onError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders vote input and button', () => {
    renderWithAuth(
      <VoteSection
        campaign={mockCampaign}
        onVote={onVote}
        isAuthenticated={true}
        isVoting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    expect(screen.getByPlaceholderText(/enter fervor bucks/i)).toBeInTheDocument();
    expect(screen.getByText(/vote/i)).toBeInTheDocument();
  });

  it('shows available Fervor Bucks when authenticated', () => {
    renderWithAuth(
      <VoteSection
        campaign={mockCampaign}
        onVote={onVote}
        isAuthenticated={true}
        isVoting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    expect(screen.getByText(/fervor bucks available/i)).toBeInTheDocument();
  });

  it('disables input and button when voting', () => {
    renderWithAuth(
      <VoteSection
        campaign={mockCampaign}
        onVote={onVote}
        isAuthenticated={true}
        isVoting={true}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const input = screen.getByPlaceholderText(/enter fervor bucks/i);
    const button = screen.getByText(/vote/i);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('calls onRequireAuth when unauthenticated user tries to vote', () => {
    renderWithAuth(
      <VoteSection
        campaign={mockCampaign}
        onVote={onVote}
        isAuthenticated={false}
        isVoting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const button = screen.getByText(/vote/i);
    fireEvent.click(button);

    expect(onRequireAuth).toHaveBeenCalled();
  });

  it('shows error when trying to vote with more than available Fervor Bucks', async () => {
    renderWithAuth(
      <VoteSection
        campaign={mockCampaign}
        onVote={onVote}
        isAuthenticated={true}
        isVoting={false}
        onRequireAuth={onRequireAuth}
        onError={onError}
      />
    );

    const input = screen.getByPlaceholderText(/enter fervor bucks/i);
    const button = screen.getByText(/vote/i);

    fireEvent.change(input, { target: { value: '2000' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Not enough Fervor Bucks');
    });
  });
});