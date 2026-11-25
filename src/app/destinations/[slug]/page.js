import { notFound } from "next/navigation";

import { getDestinationBySlug } from "@/lib/destinations";
import { DestinationBookingCard } from "@/components/destinations/destination-booking-card";
import { DestinationDetailHeader } from "@/components/destinations/destination-detail-header";
import { DestinationDetailHero } from "@/components/destinations/destination-detail-hero";
import { DestinationDetailInfo } from "@/components/destinations/destination-detail-info";
import { DestinationHighlights } from "@/components/destinations/destination-highlights";
import { DestinationOverview } from "@/components/destinations/destination-overview";
import {
  getDestinationImage,
  getDestinationLocation,
} from "@/helpers/destination-helpers";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination Not Found | Wanderlast" };
  }

  return {
    title: `${destination.name} | Wanderlast`,
    description: destination.description,
  };
}

export default async function DestinationDetailPage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) notFound();

  const image = getDestinationImage(destination);
  const location = getDestinationLocation(destination);
  const overview = destination.overview || destination.description;
  const highlights = Array.isArray(destination.highlights)
    ? destination.highlights
    : [];
  const reviewCount =
    destination.reviewsCount ?? destination.ratingCount ?? destination.reviewCount;

  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-10">
        <DestinationDetailHeader />

        <DestinationDetailHero
          image={image}
          alt={destination.name || location || "Travel destination"}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <DestinationDetailInfo
              destination={destination}
              reviewCount={reviewCount}
            />
            <DestinationOverview overview={overview} />
            <DestinationHighlights
              highlights={highlights}
              intro={destination.highlightsIntro || overview}
            />
          </div>

          <div>
            <DestinationBookingCard destination={destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
