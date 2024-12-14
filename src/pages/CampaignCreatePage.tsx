import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import CampaignForm from '../components/campaign/CampaignForm';
import type { Campaign } from '../types';
import { useAuthContext } from '../context/AuthContext';

export default function CampaignCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (campaignData: Partial<Campaign>) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Mock API call - in production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCampaign: Campaign = {
        id: `campaign-${Date.now()}`,
        creatorId: user.id,
        creator: user,
        currentAmount: 0,
        votes: 0,
        ...campaignData
      } as Campaign;

      // In production, this would be handled by the API
      console.log('Created campaign:', newCampaign);
      
      navigate(`/campaign/${newCampaign.id}`);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">Create a Campaign</h1>
        <p className="mt-2 text-gray-600">
          Share your idea with the world and start raising funds.
        </p>
      </div>

      {isSubmitting ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="h-8 w-8 text-indigo-600 animate-spin" />
          <span className="ml-2 text-gray-600">Creating your campaign...</span>
        </div>
      ) : (
        <CampaignForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}