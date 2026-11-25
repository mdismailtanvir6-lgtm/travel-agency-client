import { Skeleton } from "@/components/ui/skeleton";

export function TravelerReviewsSkeleton() {
  return (
    <section className="bg-background pt-14 md:pt-20">
      <div className="container mx-auto px-5">
        {/* Section heading */}
        <div className="mb-9">
          <Skeleton className="h-9 w-64 max-w-full" />
          <Skeleton className="mt-3 h-4 w-72 max-w-full" />
        </div>

        {/* Review cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="rounded-md border border-border p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-5/6" />
              <Skeleton className="mt-6 h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
