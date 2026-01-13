/**
 * Cloudinary URL Optimization Utility
 *
 * Optimizes Cloudinary image URLs with transformation parameters
 * to reduce bandwidth and transformation credits usage.
 *
 * Strategy:
 * - 1 transformation per image (hemat credits)
 * - Auto format (WebP/AVIF untuk modern browsers)
 * - Auto quality eco (hemat bandwidth ~70-80%)
 * - Limit crop (hanya resize jika lebih besar dari target)
 */

export interface CloudinaryOptions {
  width?: number;
  quality?: "auto" | "auto:low" | "auto:eco" | "auto:best";
  format?: "auto" | "webp" | "avif" | "jpg" | "png";
  crop?: "limit" | "fill" | "scale" | "fit" | "pad";
}

/**
 * Optimize Cloudinary URL dengan transformation parameters
 *
 * @param url - Original Cloudinary URL
 * @param options - Transformation options
 * @returns Optimized URL dengan transformations
 *
 * @example
 * ```ts
 * // Basic usage
 * const optimized = optimizeCloudinaryUrl(
 *   "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 * );
 * // Result: https://res.cloudinary.com/demo/image/upload/f_auto,q_auto:eco,w_1200,c_limit/sample.jpg
 *
 * // Custom options
 * const hero = optimizeCloudinaryUrl(url, {
 *   width: 1920,
 *   quality: 'auto'
 * });
 * ```
 */
export function optimizeCloudinaryUrl(
  url: string | undefined | null,
  options: CloudinaryOptions = {}
): string {
  // Default options (hemat bandwidth & credits)
  const {
    width = 1200,
    quality = "auto:eco",
    format = "auto",
    crop = "limit",
  } = options;

  // Validate URL
  if (!url || typeof url !== "string") {
    return url || "";
  }

  // Check if it's a Cloudinary URL
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  // Check if already has transformations (avoid double transformation)
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) {
    return url;
  }

  // Check if transformations already exist after /upload/
  const afterUpload = url.substring(uploadIndex + 8); // 8 = length of '/upload/'
  const nextSlash = afterUpload.indexOf("/");

  // If there's content between /upload/ and next /, it might be transformations or version
  if (nextSlash > 0) {
    const segment = afterUpload.substring(0, nextSlash);
    // Check if it's a version (starts with 'v' followed by numbers) or transformations
    if (segment.startsWith("v") && /^v\d+$/.test(segment)) {
      // It's a version, we can add transformations
    } else if (segment.includes("_") || segment.includes(",")) {
      // Already has transformations, return as is
      return url;
    }
  }

  // Build transformation string
  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    `w_${width}`,
    `c_${crop}`,
  ].join(",");

  // Insert transformations after /upload/
  const optimizedUrl = url.replace("/upload/", `/upload/${transformations}/`);

  return optimizedUrl;
}

/**
 * Preset untuk Hero Images
 * Width lebih besar, quality standard
 */
export function optimizeHeroImage(url: string | undefined | null): string {
  return optimizeCloudinaryUrl(url, {
    width: 1920,
    quality: "auto:eco",
    crop: "limit",
  });
}

/**
 * Preset untuk Product Images
 * Width medium, quality eco
 */
export function optimizeProductImage(url: string | undefined | null): string {
  return optimizeCloudinaryUrl(url, {
    width: 800,
    quality: "auto:eco",
    crop: "limit",
  });
}

/**
 * Preset untuk Thumbnails
 * Width kecil, quality low
 */
export function optimizeThumbnail(url: string | undefined | null): string {
  return optimizeCloudinaryUrl(url, {
    width: 400,
    quality: "auto:low",
    crop: "limit",
  });
}

/**
 * Preset untuk Instagram Gallery Images
 * Width medium, quality eco, square crop
 */
export function optimizeInstagramImage(url: string | undefined | null): string {
  return optimizeCloudinaryUrl(url, {
    width: 600,
    quality: "auto:eco",
    crop: "fill", // Square crop untuk consistency
  });
}

/**
 * Extract transformation info dari URL (untuk debugging/preview)
 */
export function getTransformationInfo(url: string): {
  isCloudinary: boolean;
  hasTransformations: boolean;
  transformations?: string;
} {
  if (!url.includes("res.cloudinary.com")) {
    return { isCloudinary: false, hasTransformations: false };
  }

  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) {
    return { isCloudinary: true, hasTransformations: false };
  }

  const afterUpload = url.substring(uploadIndex + 8);
  const nextSlash = afterUpload.indexOf("/");

  if (nextSlash > 0) {
    const segment = afterUpload.substring(0, nextSlash);
    if (
      !segment.startsWith("v") ||
      segment.includes("_") ||
      segment.includes(",")
    ) {
      return {
        isCloudinary: true,
        hasTransformations: true,
        transformations: segment,
      };
    }
  }

  return { isCloudinary: true, hasTransformations: false };
}
