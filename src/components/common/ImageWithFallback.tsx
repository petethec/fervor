import React, { useState } from 'react';
import ImageErrorFallback from './ImageErrorFallback';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackCategory,
  className = '',
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error && fallbackCategory) {
    return <ImageErrorFallback category={fallbackCategory} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover`}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
}