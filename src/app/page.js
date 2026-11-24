import { HeroSection } from "@/components/home/hero-section";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-neutral-950 p-2 sm:p-3">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col overflow-hidden rounded-2xl bg-background">
        <HeroSection />
        <FeaturedDestinations />
      </div>
    </div>
  );
}
