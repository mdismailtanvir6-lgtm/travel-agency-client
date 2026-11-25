import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";

import {
  formatDestinationPrice,
  getDestinationDuration,
  getDestinationHref,
  getDestinationImage,
  getDestinationLocation,
  getDestinationRating,
} from "@/helpers/destination-helpers";

const DEFAULT_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px";

export function DestinationCard({
  destination,
  priority = false,
  sizes = DEFAULT_SIZES,
}) {
  const image = getDestinationImage(destination);
  const location = getDestinationLocation(destination);
  const duration = getDestinationDuration(destination);
  const price = formatDestinationPrice(destination);
  const rating = getDestinationRating(destination);
  const href = getDestinationHref(destination);

  return (
    <article className="group h-full">
      {/* Image */}
      <div className="relative aspect-[1.57] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={destination.name || "Travel destination"}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/90 px-2.5 py-1.5 text-xs font-semibold text-foreground shadow-sm">
          {rating.toFixed(1)}
          <Star size={13} fill="currentColor" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        <div className="mt-1.5 flex items-start justify-between gap-3">
          <h3 className="text-xl font-medium tracking-tight text-foreground">
            {destination.name}
          </h3>

          <div className="shrink-0 text-right">
            <span className="text-xl font-medium text-foreground">
              {price}
            </span>
            <span className="text-[10px] italic text-muted-foreground">
              /Person
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays size={13} />
          <span>{duration}</span>
        </div>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-brand uppercase underline underline-offset-4 transition hover:text-brand/80"
        >
          Book Now
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}
