import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-8 md:py-10">
        {/* Top bar: back link + actions */}
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-4 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>

        {/* Hero image */}
        <Skeleton className="mt-6 aspect-[16/9] w-full md:aspect-[2.4/1]" />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Info + content */}
          <div className="lg:col-span-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-3 h-9 w-64 max-w-full" />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-36" />
            </div>

            <Skeleton className="mt-8 h-6 w-32" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-11/12" />
            <Skeleton className="mt-2 h-4 w-4/5" />

            <Skeleton className="mt-8 h-6 w-36" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-2/3" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>

          {/* Booking card */}
          <div className="border border-border p-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-8 w-28" />
            <Skeleton className="mt-1 h-4 w-20" />
            <Skeleton className="mt-5 h-11 w-full" />
            <Skeleton className="mt-4 h-11 w-full" />
            <Skeleton className="mt-6 h-px w-full" />
            <div className="mt-5 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
