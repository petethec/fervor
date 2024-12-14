export const DEFAULT_PLACEHOLDER = 'https://source.unsplash.com/800x600/?startup';
export const DEFAULT_AVATAR = 'https://source.unsplash.com/100x100/?portrait';

export function getUnsplashImage(category: string, width = 800, height = 600): string {
  const sanitizedCategory = encodeURIComponent(category.toLowerCase());
  return `https://source.unsplash.com/${width}x${height}/?${sanitizedCategory}`;
}

export function getImageErrorFallback(category: string): string {
  return `/images/placeholders/${category.toLowerCase()}.jpg`;
}