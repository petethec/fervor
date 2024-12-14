import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import CampaignActions from '../CampaignActions';
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

describe('CampaignActions', () => {
  const onRequireAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pledge and vote sections', () => {
    renderWithAuth(
      <CampaignActions
        campaign={mockCampaign}
        onRequireAuth={onRequireAuth}
      />
    );

    expect(screen.getByPlaceholderText(/enter pledge amount/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter fervor bucks/i)).toBeInTheDocument();
    expect(screen.getByText(/back now/i)).toBeInTheDocument();
    expect(screen.getByText(/vote/i)).toBeInTheDocument();
  });

  it('calls onRequireAuth when unauthenticated user tries to pledge', async () => {
    renderWithAuth(
      <CampaignActions
        campaign={mockCampaign}
        onRequireAuth={onRequireAuth}
      />
    );

    const pledgeInput = screen.getByPlaceholderText(/enter pledge amount/i);
    const backButton = screen.getByText(/back now/i);

    fireEvent.change(pledgeInput, { target: { value: '100' } });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(onRequireAuth).toHaveBeenCalled();
    });
  });

  it('shows error message for invalid pledge amount', async () => {
    renderWithAuth(
      <CampaignActions
        campaign={mockCampaign}
        onRequireAuth={onRequireAuth}
      />
    );

    const pledgeInput = screen.getByPlaceholderText(/enter pledge amount/i);
    const backButton = screen.getByText(/back now/i);

    fireEvent.change(pledgeInput, { target: { value: '0' } });
    fireEvent.click(backButton);

    await waitFor(() => {
      expect(screen.getByText(/minimum pledge amount is \$1/i)).toBeInTheDocument();
    });
  });

  it('disables buttons during submission', async () => {
    renderWithAuth(
      <CampaignActions
        campaign={mockCampaign}
        onRequireAuth={onRequireAuth}
      />
    );

    const backButton = screen.getByText(/back now/i);
    const voteButton = screen.getByText(/vote/i);

    expect(backButton).toBeDisabled();
    expect(voteButton).toBeDisabled();
  });

  it('shows success message after copying share link', async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined)
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    renderWithAuth(
      <CampaignActions
        campaign={mockCampaign}
        onRequireAuth={onRequireAuth}
      />
    );

    const shareButton = screen.getByText(/share campaign/i);
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    });
  });
});