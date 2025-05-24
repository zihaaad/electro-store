// Environment variables with validation for domain configuration

/**
 * Environment variables used by the application
 * @description These are public environment variables that can be exposed to the browser
 */
export const env = {
  /**
   * The domain name without protocol (e.g., "electro-store.com")
   */
  DOMAIN: process.env.NEXT_PUBLIC_DOMAIN || "electro-store.com",

  /**
   * The full URL with protocol (e.g., "https://electro-store.com")
   */
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://electro-store.com",

  /**
   * The current environment
   */
  NODE_ENV: process.env.NODE_ENV || "development",

  /**
   * Whether the app is running in production
   */
  IS_PRODUCTION: process.env.NODE_ENV === "production",
};

/**
 * Get the base URL for the site
 * @returns The base URL with protocol
 */
export function getBaseUrl(): string {
  if (env.SITE_URL) return env.SITE_URL;

  // Fallback to constructing URL from domain
  if (env.DOMAIN) {
    return `https://${env.DOMAIN}`;
  }

  // Local development fallback
  if (env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return "https://electro-store.com";
}
