import React from 'react';
import type { User } from '../../types';
import UserBadges from './UserBadges';
import { Coins } from 'lucide-react';

interface UserProfileProps {
  user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-16 w-16 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center text-lg font-medium text-indigo-600">
          <Coins className="h-5 w-5 mr-2" />
          {user.fervorBucks} Fervor Bucks
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">Badges</h3>
        <div className="mt-2">
          <UserBadges badges={user.badges} />
        </div>
      </div>
    </div>
  );
}