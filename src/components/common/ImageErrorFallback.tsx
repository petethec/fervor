import React from 'react';
import { ImageOff } from 'lucide-react';

interface ImageErrorFallbackProps {
  category: string;
}

export default function ImageErrorFallback({ category }: ImageErrorFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <div className="text-center text-gray-400">
        <ImageOff className="h-8 w-8 mx-auto mb-2" />
        <p className="text-sm">{category}</p>
      </div>
    </div>
  );
}