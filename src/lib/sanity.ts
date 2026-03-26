import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5cpedidv', 
  dataset: 'production',
  useCdn: true, // Si uu u dheereeyo
  apiVersion: '2025-12-09',
});

// Qalabka sawirada u bedelaya Link
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}