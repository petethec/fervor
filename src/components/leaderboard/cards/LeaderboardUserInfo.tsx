import React from 'react';
import UserAvatar from '../../user/UserAvatar';

interface LeaderboardUserInfoProps {
  name: string;
  avatar: string;
  contribution: number;
  votes: number;
}

export default function LeaderboardUserInfo({ 
  name, 
  avatar, 
  contribution, 
  votes 
}: LeaderboardUserInfoProps) {
  return (
    <div className="flex items-center space-x-3">
      <UserAvatar src={avatar} alt={name} size="md" />
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">
          {contribution > 0 && (
            <span>${contribution.toLocaleString()} contributed</span>
          )}
          {votes > 0 && (
            <>
              {contribution > 0 && ' • '}
              <span>{votes} votes</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}