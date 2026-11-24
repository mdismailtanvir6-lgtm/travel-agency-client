import { cacheLife } from "next/cache";
import FeaturedDestinationsCarousel from "./FeaturedDestinationsCarousel";

async function getDestinations() {
  "use cache";

  cacheLife("max");

  try {
    const response = await fetch(
      "https://travel-agency-server-iota.vercel.app/destinations",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch destinations: ${response.status}`);
    }

    const result = await response.json();

    // Supports different API response structures.
    const destinations = Array.isArray(result)
      ? result
      : (result.destinations ??
        result.data?.destinations ??
        result.data ??
        result.results ??
        []);

    return Array.isArray(destinations) ? destinations : [];
  } catch (error) {
    console.error("Destination fetching error:", error);
    return [];
  }
}

export default async function FeaturedDestinations() {
  const destinations = await getDestinations();

  return <FeaturedDestinationsCarousel destinations={destinations} />;
}
