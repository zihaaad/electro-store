/* eslint-disable @typescript-eslint/no-explicit-any */
// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import {client} from "./client";

// Simple fetch function for server components
export const sanityFetch = async ({
  query,
  params = {},
}: {
  query: string;
  params?: any;
}) => {
  try {
    const data = await client.fetch(query, params);
    return {data};
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    return {data: null};
  }
};

// Placeholder for SanityLive component
export const SanityLive = () => null;
