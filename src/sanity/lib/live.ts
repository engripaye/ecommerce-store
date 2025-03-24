// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN;
if(!token){
  throw new Error('SANITY_API_TOKEN is not set');
}

export const { sanityFetch, SanityLive } = defineLive({ 
  client,
  serverToken: token,
  browserToken: token,
});