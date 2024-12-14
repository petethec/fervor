import React from 'react';
import { getUnsplashImage } from '../../utils/imageUtils';
import ImageErrorFallback from '../common/ImageErrorFallback';

interface CampaignImageProps {
  category: string;
  title: string;
}

export default function CampaignImage({ category, title }: CampaignImageProps) {
  const [error, setError] = React.useState(false);

  if (error) {
    return <ImageErrorFallback category={category} />;
  }

  return (
    <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
      <img
        src={getUnsplashImage(category)}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}