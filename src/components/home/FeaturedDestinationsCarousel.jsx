"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900";

function getImage(destination) {
  return (
    destination.image ||
    destination.imageUrl ||
    destination.coverImage ||
    destination.bannerImage ||
    destination.images?.[0] ||
    FALLBACK_IMAGE
  );
}

function getDuration(destination) {
  if (destination.duration) return destination.duration;

  const days = destination.durationDays || 7;
  const nights = destination.durationNights ?? Math.max(days - 1, 0);

  return `${days} Days/${nights} Nights`;
}

function formatPrice(destination) {
  const price =
    destination.averageCost ??
    destination.price ??
    destination.startingPrice ??
    0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: destination.currency || "USD",
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export default function FeaturedDestinationsCarousel({ destinations = [] }) {
  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCarousel = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    const updateSnaps = () => {
      setSnapCount(api.scrollSnapList().length);
    };

    updateCarousel();
    updateSnaps();

    api.on("select", updateCarousel);
    api.on("reInit", updateSnaps);

    return () => {
      api.off("select", updateCarousel);
      api.off("reInit", updateSnaps);
    };
  }, [api]);

  if (!destinations.length) {
    return null;
  }

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section heading */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Featured Destinations
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="hidden shrink-0 items-center gap-3 border border-sky-400 px-4 py-3 text-xs font-medium uppercase tracking-wide text-sky-600 transition hover:bg-sky-500 hover:text-white sm:flex"
          >
            All Destinations
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Destination carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {destinations.map((destination, index) => {
              const id =
                destination._id || destination.id || destination.slug || index;

              const location = [destination.city, destination.country]
                .filter(Boolean)
                .join(", ");

              const rating = Number(
                destination.rating || destination.averageRating || 4.5,
              );

              return (
                <CarouselItem
                  key={id}
                  className="basis-[85%] pl-3 sm:basis-[48%] lg:basis-[382px]"
                >
                  <article className="group h-full">
                    {/* Image */}
                    <div className="relative aspect-[1.57] overflow-hidden bg-muted">
                      <Image
                        src={getImage(destination)}
                        alt={destination.name || "Travel destination"}
                        fill
                        priority={index < 2}
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 48vw, 382px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Rating */}
                      <div className="absolute right-3 top-3 flex items-center gap-1 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-black shadow-sm">
                        {rating.toFixed(1)}
                        <Star
                          size={13}
                          fill="currentColor"
                          className="text-black"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-4">
                      {/* Location and price */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin size={14} className="shrink-0" />
                          <span className="truncate">
                            {location || destination.name}
                          </span>
                        </div>

                        <div className="shrink-0 text-right">
                          <span className="text-xl font-medium text-foreground">
                            {formatPrice(destination)}
                          </span>
                          <span className="text-[10px] italic text-muted-foreground">
                            /Person
                          </span>
                        </div>
                      </div>

                      {/* Destination title */}
                      <h3 className="mt-1 text-xl font-medium tracking-tight text-foreground">
                        {destination.name}
                      </h3>

                      {/* Duration */}
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays size={13} />
                        <span>{getDuration(destination)}</span>
                      </div>

                      {/* Booking link */}
                      <Link
                        href={`/destinations/${destination.slug || destination._id || destination.id}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-sky-600 underline underline-offset-4 transition hover:text-sky-800"
                      >
                        Book Now
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Carousel footer */}
        <div className="mt-7 flex items-center gap-5">
          <span className="shrink-0 text-base font-medium tabular-nums">
            {selectedIndex + 1}/{snapCount}
          </span>

          <div className="h-px flex-1 bg-border" />

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous destinations"
              onClick={() => api?.scrollPrev()}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              aria-label="Next destinations"
              onClick={() => api?.scrollNext()}
              className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-sky-500 hover:bg-sky-500 hover:text-white"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Mobile all destinations link */}
        <Link
          href="/destinations"
          className="mt-6 flex items-center justify-center gap-2 border border-sky-400 px-4 py-3 text-xs font-medium uppercase text-sky-600 sm:hidden"
        >
          All Destinations
          <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
