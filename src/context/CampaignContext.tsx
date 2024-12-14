import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Campaign } from '../types';
import { mockCampaigns } from '../data/mockData';

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  getCampaign: (id: string) => Campaign | undefined;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
}

const CampaignContext = createContext<CampaignContextType | null>(null);

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    const savedCampaigns = localStorage.getItem('campaigns');
    return savedCampaigns ? JSON.parse(savedCampaigns) : mockCampaigns;
  });

  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const addCampaign = useCallback((campaign: Campaign) => {
    setCampaigns(prev => [...prev, campaign]);
  }, []);

  const getCampaign = useCallback((id: string) => {
    return campaigns.find(c => c.id === id);
  }, [campaigns]);

  const updateCampaign = useCallback((id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  }, []);

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, getCampaign, updateCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaigns must be used within a CampaignProvider');
  }
  return context;
}