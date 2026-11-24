import { getDestinations } from "@/lib/destinations";
import FeaturedDestinationsCarousel from "./FeaturedDestinationsCarousel";

export default async function FeaturedDestinations() {
  const destinations = await getDestinations();

  return <FeaturedDestinationsCarousel destinations={destinations} />;
}
