import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useCampaigns } from '../context/CampaignContext';
import CampaignOverview from '../components/campaign/overview/CampaignOverview';
import CampaignActions from '../components/campaign/actions/CampaignActions';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCampaign } = useCampaigns();
  const campaign = id ? getCampaign(id) : undefined;

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-lg font-semibold text-gray-900">Campaign Not Found</h2>
        <p className="mt-2 text-gray-600">The campaign you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/campaigns/new')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent 
            rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500"
        >
          Create a Campaign
        </button>
      </div>
    );
  }

  const handleRequireAuth = () => {
    navigate('/login', { state: { from: `/campaign/${id}` } });
  };

  return (
    <div className="space-y-8">
      <CampaignOverview campaign={campaign} />
      <CampaignActions
        campaign={campaign}
        onRequireAuth={handleRequireAuth}
      />
    </div>
  );
}