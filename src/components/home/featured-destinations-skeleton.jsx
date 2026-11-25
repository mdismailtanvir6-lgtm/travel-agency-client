import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedDestinationsSkeleton() {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section heading */}
        <div className="mb-7 flex items-center justify-between gap-4">
          <div className="w-full max-w-md">
            <Skeleton className="h-9 w-72 max-w-full" />
            <Skeleton className="mt-3 h-4 w-80 max-w-full" />
          </div>
          <Skeleton className="hidden h-12 w-44 sm:block" />
        </div>

        {/* Carousel slides */}
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="min-w-0 flex-1">
              <Skeleton className="aspect-[1.30] w-full" />
              <Skeleton className="mt-4 h-4 w-32" />
              <Skeleton className="mt-2 h-5 w-2/3" />
              <Skeleton className="mt-2 h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
