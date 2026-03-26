import { createClient } from '@sanity/client';

// Waxyaabaha Sirta ah (Token) waxaa laga keenayaa 'private'
import { SANITY_API_TOKEN } from '$env/static/private';

// Waxyaabaha Dadweynaha (Project ID, Dataset) waxaa laga keenayaa 'public'
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

export const serverClient = createClient({
  projectId: PUBLIC_SANITY_PROJECT_ID,
  dataset: PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: SANITY_API_TOKEN,
  apiVersion: '2025-12-09',
});