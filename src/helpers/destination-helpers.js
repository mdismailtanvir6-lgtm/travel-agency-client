// Pure display helpers for destination data.
// Kept in a separate file (no "use cache" directive) so both Server and
// Client Components can import them.

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900";

export function getDestinationImage(destination = {}) {
  return (
    destination.image ||
    destination.imageUrl ||
    destination.coverImage ||
    destination.bannerImage ||
    destination.images?.[0] ||
    FALLBACK_IMAGE
  );
}

export function getDestinationLocation(destination = {}) {
  const location = [destination.city, destination.country]
    .filter(Boolean)
    .join(", ");

  return location || destination.name || "";
}

export function getDestinationDuration(destination = {}) {
  if (destination.duration) return destination.duration;

  const days = destination.durationDays || 7;
  const nights = destination.durationNights ?? Math.max(days - 1, 0);

  return `${days} Days/${nights} Nights`;
}

export function getDestinationPrice(destination = {}) {
  return Number(
    destination.averageCost ??
      destination.price ??
      destination.startingPrice ??
      0,
  );
}

export function formatDestinationPrice(destination = {}) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: destination.currency || "USD",
    maximumFractionDigits: 0,
  }).format(getDestinationPrice(destination));
}

export function getDestinationRating(destination = {}) {
  return Number(destination.rating || destination.averageRating || 4.5);
}

export function getDestinationHref(destination = {}) {
  return `/destinations/${destination.slug || destination._id || destination.id || ""}`;
}
