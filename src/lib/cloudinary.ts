/**
 * Add f_auto,q_auto transformations to a Cloudinary URL.
 * Serves WebP/AVIF automatically, compressed at optimal quality.
 * Falls back to original URL if not a Cloudinary URL.
 * Idempotent: strips existing f_auto,q_auto before adding to prevent doubling.
 */
export function optimizeImage(url: string, width?: number): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  // Strip any existing f_auto,q_auto transform to prevent doubling
  let clean = url.replace(/\/f_auto,q_auto(?:,w_\d+)?\//, '/');

  const transforms = width
    ? `f_auto,q_auto,w_${width}`
    : 'f_auto,q_auto';

  return clean.replace(
    '/image/upload/',
    `/image/upload/${transforms}/`
  );
}
