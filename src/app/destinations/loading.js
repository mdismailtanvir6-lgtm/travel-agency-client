import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 md:px-8 md:py-16">
        {/* Header */}
        <div className="mb-8">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full" />
        </div>

        {/* Filter bar */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
        </div>

        <Skeleton className="mt-6 h-4 w-40" />

        {/* Card grid */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <Skeleton className="aspect-[1.57] w-full" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
