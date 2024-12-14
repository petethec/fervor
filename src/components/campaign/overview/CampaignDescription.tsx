import React from 'react';
import { FileText } from 'lucide-react';

interface CampaignDescriptionProps {
  description: string;
}

export default function CampaignDescription({ description }: CampaignDescriptionProps) {
  if (!description) {
    return (
      <div className="pt-4 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <FileText className="h-8 w-8 mb-2" aria-hidden="true" />
          <p className="text-sm">No description available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 border-t border-gray-100">
      <div className="prose prose-indigo max-w-none">
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}