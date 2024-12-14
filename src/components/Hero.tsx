import React from 'react';
import { Rocket } from 'lucide-react';
import ImageWithFallback from './common/ImageWithFallback';
import { DEFAULT_PLACEHOLDER } from '../utils/imageUtils';

export default function Hero() {
  return (
    <div className="relative bg-indigo-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          {/* Hero content remains the same */}
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <ImageWithFallback
          src={DEFAULT_PLACEHOLDER}
          alt="Innovation"
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          fallbackCategory="innovation"
        />
      </div>
    </div>
  );
}