import { optimizeInstagramImage } from "./cloudinary";

/**
 * Helper to convert various Instagram URL formats into a displayable image URL.
 * Uses the /media/?size=l hack for public posts.
 */
export function getInstagramImageUrl(url: string): string {
  if (!url) return "";

  // If it's a Cloudinary URL, optimize it
  if (url.includes("res.cloudinary.com")) {
    return optimizeInstagramImage(url);
  }

  // If it's already an image URL (ends with extension or from trusted domains)
  if (
    url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null ||
    url.includes("images.unsplash.com") ||
    url.includes("scontent")
  ) {
    return url;
  }

  // Handle Instagram Post URLs
  // Format: instagram.com/p/CODE/ or instagram.com/username/p/CODE/
  if (url.includes("instagram.com")) {
    // Try to find the shortcode
    const match = url.match(/\/p\/([^/]+)/);
    if (match && match[1]) {
      const shortcode = match[1];
      // Return the media redirect URL wrapped in wsrv.nl to bypass CORS/Hotlink protection
      // w=600&h=600 forces a square aspect ratio which helps with the grid
      const igUrl = `https://www.instagram.com/p/${shortcode}/media/?size=l`;
      return `https://wsrv.nl/?url=${encodeURIComponent(
        igUrl
      )}&w=600&h=600&output=webp`;
    }
  }

  // Fallback: return original if we can't process it
  return url;
}
