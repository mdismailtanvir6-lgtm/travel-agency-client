import { cacheLife } from "next/cache";

const API_URL = "https://travel-agency-server-iota.vercel.app/reviews";

export async function getReviews() {
  "use cache";

  cacheLife("max");

  try {
    const response = await fetch(API_URL, {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch reviews: ${response.status}`);
    }

    const result = await response.json();

    // Supports either an array or an object containing reviews.
    const reviews = Array.isArray(result)
      ? result
      : result.reviews || result.data || [];

    return reviews;
  } catch (error) {
    console.error("Reviews fetching error:", error);
    return [];
  }
}
