import React from 'react';
import { User } from 'lucide-react';
import ImageWithFallback from '../common/ImageWithFallback';
import { DEFAULT_AVATAR } from '../../utils/imageUtils';

interface UserAvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function UserAvatar({ 
  src = DEFAULT_AVATAR,
  alt,
  size = 'md',
  className = ''
}: UserAvatarProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const sizeClass = sizeClasses[size];
  const iconSizeClass = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-6 w-6';

  return (
    <div className={`${sizeClass} ${className} rounded-full overflow-hidden`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <User className={`${iconSizeClass} text-gray-400`} />
          </div>
        )}
      />
    </div>
  );
}