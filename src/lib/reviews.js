const API_URL = "https://travel-agency-server-iota.vercel.app/reviews";

// Uncached on purpose: every render reads the freshest reviews.
export async function getReviews() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
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
    // Prerendering aborts uncached fetches once the shell is complete —
    // let React handle that instead of falling back to no reviews.
    if (error?.digest === "HANGING_PROMISE_REJECTION") throw error;

    console.error("Reviews fetching error:", error);
    return [];
  }
}
