/**
 * Add f_auto,q_auto transformations to a Cloudinary URL.
 * Serves WebP/AVIF automatically, compressed at optimal quality.
 * Falls back to original URL if not a Cloudinary URL.
 */
export function optimizeImage(url: string, width?: number): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const transforms = width
    ? `f_auto,q_auto,w_${width}`
    : 'f_auto,q_auto';

  return url.replace(
    '/image/upload/',
    `/image/upload/${transforms}/`
  );
}
