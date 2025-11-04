import type { APIRoute } from 'astro';
import { buildSearchIndex } from '../lib/searchIndex';

export const GET: APIRoute = async () => {
  const searchIndex = await buildSearchIndex();

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const prerender = true;
