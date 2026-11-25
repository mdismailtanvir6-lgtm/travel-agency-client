import { getDestinations } from "@/lib/destinations";
import { DestinationsHeader } from "@/components/destinations/destinations-header";
import { DestinationsExplorer } from "@/components/destinations/destinations-explorer";

export const metadata = {
  title: "All Destinations | Wanderlast",
  description:
    "Explore all destinations and find your perfect travel experience from our curated collection.",
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <DestinationsHeader />
        <DestinationsExplorer destinations={destinations} />
      </div>
    </div>
  );
}
