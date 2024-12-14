import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Update } from '../../../types';
import UpdateList from './UpdateList';
import UpdateForm from './UpdateForm';
import { useAuthContext } from '../../../context/AuthContext';

interface UpdateManagerProps {
  campaignId: string;
  updates: Update[];
  isCreator: boolean;
  onAddUpdate: (update: Omit<Update, 'id' | 'date'>) => Promise<void>;
}

export default function UpdateManager({
  campaignId,
  updates,
  isCreator,
  onAddUpdate
}: UpdateManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Campaign Updates</h2>
        {isCreator && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent 
              text-sm font-medium rounded-md text-white bg-indigo-600 
              hover:bg-indigo-700 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Post Update
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-gray-50 p-6 rounded-lg">
          <UpdateForm
            onSubmit={onAddUpdate}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : (
        <UpdateList updates={updates} />
      )}
    </div>
  );
}