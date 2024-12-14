import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from './CampaignCard';
import { useCampaigns } from '../../hooks/useCampaigns';
import { Loader } from 'lucide-react';

export default function CampaignList() {
  const navigate = useNavigate();
  const { campaigns, loading, error } = useCampaigns();

  const handleRequireAuth = () => {
    // Handle authentication requirement
    console.log('Authentication required');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No campaigns found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onRequireAuth={handleRequireAuth}
        />
      ))}
    </div>
  );
}