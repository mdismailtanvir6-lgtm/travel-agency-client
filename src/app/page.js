import { Suspense } from "react";

import { HeroSection } from "@/components/home/hero-section";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import { FeaturedDestinationsSkeleton } from "@/components/home/featured-destinations-skeleton";
import WhyChooseWanderlust from "@/components/home/WhyChooseWanderlust";
import TravelerReviewsSection from "@/components/home/TravelerReviewsSection";
import { TravelerReviewsSkeleton } from "@/components/home/traveler-reviews-skeleton";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-neutral-950">
      <HeroSection />

      <div className="p-2 sm:p-3">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col overflow-hidden rounded-2xl bg-background">
          {/* Uncached data streams in behind these boundaries. */}
          <Suspense fallback={<FeaturedDestinationsSkeleton />}>
            <FeaturedDestinations />
          </Suspense>

          <WhyChooseWanderlust />

          <Suspense fallback={<TravelerReviewsSkeleton />}>
            <TravelerReviewsSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
