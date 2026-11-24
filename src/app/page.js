import { HeroSection } from "@/components/home/hero-section";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import WhyChooseWanderlust from "@/components/home/WhyChooseWanderlust";
import TravelerReviewsSection from "@/components/home/TravelerReviewsSection";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-neutral-950">
      <HeroSection />

      <div className="p-2 sm:p-3">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col overflow-hidden rounded-2xl bg-background">
          <FeaturedDestinations />
          <WhyChooseWanderlust />
          <TravelerReviewsSection />
        </div>
      </div>
    </div>
  );
}
