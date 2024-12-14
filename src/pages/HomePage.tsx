import React from 'react';
import Hero from '../components/Hero';
import CampaignList from '../components/campaign/CampaignList';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />
      <CampaignList />
    </div>
  );
}