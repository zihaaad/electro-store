import {createClient} from "next-sanity";

import {apiVersion, dataset, projectId} from "../env";

// Validate API token availability
if (!process.env.SANITY_API_TOKEN) {
  console.warn(
    "Warning: SANITY_API_TOKEN is not set in the environment variables."
  );
}

export const backendClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_API_TOKEN,
  perspective: "published", // Ensure we always get published content
});
