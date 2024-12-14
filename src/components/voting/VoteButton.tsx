import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface VoteButtonProps {
  campaignId: string;
  votes: number;
  onVote: (campaignId: string) => void;
}

export default function VoteButton({ campaignId, votes, onVote }: VoteButtonProps) {
  const { user } = useAuth();

  const handleVote = () => {
    if (!user) {
      // Handle unauthenticated user
      return;
    }
    onVote(campaignId);
  };

  return (
    <button
      onClick={handleVote}
      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <ThumbsUp className="h-4 w-4 mr-1" />
      <span>{votes} votes</span>
    </button>
  );
}