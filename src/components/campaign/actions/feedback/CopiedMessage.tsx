import React from 'react';

export default function CopiedMessage() {
  return (
    <div 
      className="absolute -top-8 right-0 bg-gray-800 text-white px-3 py-1 rounded text-sm 
        animate-fade-in shadow-lg"
      role="alert"
    >
      Link copied!
    </div>
  );
}