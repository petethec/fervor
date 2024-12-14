import React from 'react';
import { Award } from 'lucide-react';

export default function LeaderboardEmpty() {
  return (
    <div 
      className="text-center py-12 bg-gray-50 rounded-lg"
      role="status"
      aria-label="No leaderboard entries"
    >
      <Award className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No entries yet</h3>
      <p className="mt-1 text-sm text-gray-500">Be the first to contribute!</p>
    </div>
  );
}