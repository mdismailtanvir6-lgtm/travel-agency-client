import { CalendarDays, MapPin, Star } from "lucide-react";

import {
  getDestinationDuration,
  getDestinationLocation,
  getDestinationRating,
} from "@/helpers/destination-helpers";

export function DestinationDetailInfo({ destination, reviewCount }) {
  const location = getDestinationLocation(destination);
  const duration = getDestinationDuration(destination);
  const rating = getDestinationRating(destination);

  return (
    <div>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin size={15} className="shrink-0" />
        <span>{location}</span>
      </p>

      <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
        {destination.name}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Star
            size={15}
            className="text-emerald-600 dark:text-emerald-400"
            fill="currentColor"
          />
          <span className="font-semibold text-foreground">
            {rating.toFixed(1)}
          </span>
          {reviewCount ? <span>({reviewCount} reviews)</span> : null}
        </span>

        <span className="flex items-center gap-1.5">
          <CalendarDays size={15} className="shrink-0" />
          <span>{duration}</span>
        </span>
      </div>
    </div>
  );
}
