import React from 'react';
import { MessageSquare, Calendar } from 'lucide-react';
import type { Update } from '../../../types';

interface UpdateListProps {
  updates: Update[];
}

export default function UpdateList({ updates }: UpdateListProps) {
  if (updates.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No updates yet</h3>
        <p className="mt-1 text-sm text-gray-500">Updates will appear here when the creator posts them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {updates.map((update) => (
        <div
          key={update.id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{update.title}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(update.date).toLocaleDateString()}
            </div>
          </div>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 whitespace-pre-line">{update.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}