import React from 'react';
import type { Campaign } from '../../../../types';

interface ActionSectionProps {
  campaign: Campaign;
  children: React.ReactNode;
  showBorder?: boolean;
}

export default function ActionSection({ campaign, children, showBorder = true }: ActionSectionProps) {
  return (
    <div className={`${showBorder ? 'border-t border-gray-100' : ''} pt-6`}>
      {children}
    </div>
  );
}