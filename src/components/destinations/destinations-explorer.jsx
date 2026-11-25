"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  getDestinationPrice,
  getDestinationRating,
} from "@/helpers/destination-helpers";
import { DestinationCard } from "./destination-card";
import {
  DestinationsFilterBar,
  PRICE_RANGE_OPTIONS,
} from "./destinations-filter-bar";

function matchesPriceRange(price, range) {
  if (range === "all" || !range) return true;

  const bucket = PRICE_RANGE_OPTIONS.find((option) => option.value === range);
  if (!bucket) return true;

  return price >= bucket.min && price < bucket.max;
}

function applyFilters(destinations, { category, priceRange, sort }) {
  const filtered = destinations.filter((destination) => {
    const matchesCategory =
      !category ||
      category === "all" ||
      destination.category === category;

    return (
      matchesCategory && matchesPriceRange(getDestinationPrice(destination), priceRange)
    );
  });

  switch (sort) {
    case "price-asc":
      return filtered.sort(
        (a, b) => getDestinationPrice(a) - getDestinationPrice(b),
      );
    case "price-desc":
      return filtered.sort(
        (a, b) => getDestinationPrice(b) - getDestinationPrice(a),
      );
    case "rating-desc":
      return filtered.sort(
        (a, b) => getDestinationRating(b) - getDestinationRating(a),
      );
    case "name-asc":
      return filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    default:
      return filtered;
  }
}

export function DestinationsExplorer({ destinations = [] }) {
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [sort, setSort] = useState(null);

  const categories = useMemo(
    () =>
      [...new Set(destinations.map((d) => d.category).filter(Boolean))].sort(),
    [destinations],
  );

  const visibleDestinations = useMemo(
    () => applyFilters(destinations, { category, priceRange, sort }),
    [destinations, category, priceRange, sort],
  );

  const hasActiveFilters = Boolean(
    (category && category !== "all") ||
      (priceRange && priceRange !== "all") ||
      (sort && sort !== "featured"),
  );

  function resetFilters() {
    setCategory(null);
    setPriceRange(null);
    setSort(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <DestinationsFilterBar
        categories={categories}
        category={category}
        priceRange={priceRange}
        sort={sort}
        onCategoryChange={setCategory}
        onPriceRangeChange={setPriceRange}
        onSortChange={setSort}
      />

      <p className="text-sm text-muted-foreground" aria-live="polite">
        Showing {visibleDestinations.length}{" "}
        {visibleDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {visibleDestinations.length === 0 ? (
        <Empty className="border border-border py-16">
          <EmptyMedia variant="icon">
            <SearchX />
          </EmptyMedia>

          <EmptyHeader>
            <EmptyTitle className="text-base">No destinations found</EmptyTitle>
            <EmptyDescription>
              No trips match your current filters. Try widening your search.
            </EmptyDescription>
          </EmptyHeader>

          {hasActiveFilters ? (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Clear filters
            </Button>
          ) : null}
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination, index) => {
            const id = destination._id || destination.id || destination.slug || index;

            return (
              <DestinationCard
                key={id}
                destination={destination}
                priority={index < 3}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
