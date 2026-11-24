import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Image
        src="/images/Banner.png"
        alt="Turquoise cove surrounded by lush green coastal cliffs"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/40 via-black/25 to-black/55" />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pt-16 pb-14 text-center sm:px-6 lg:pb-24">
        <h1 className="text-balance text-5xl font-light leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
          Discover Your
          <span className="block">Next Adventure</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-white/85 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/destinations"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 w-full rounded-none bg-brand px-7 text-xs font-semibold tracking-[0.14em] text-brand-foreground uppercase hover:bg-brand/90 sm:w-auto"
            )}
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>

          <Link
            href="/destinations"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 w-full rounded-none border-white/30 bg-white/15 px-7 text-xs font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-md hover:bg-white/25 hover:text-white sm:w-auto dark:border-white/30 dark:bg-white/15 dark:hover:bg-white/25"
            )}
          >
            View Destination
          </Link>
        </div>
      </div>

      <div className="relative z-10 grid w-full grid-cols-1 gap-px border-t border-border bg-border/70 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="flex flex-col justify-center bg-background/90 px-5 py-3.5 backdrop-blur-md lg:px-6"
          >
            <span className="text-sm font-semibold text-foreground">
              {field.label}
            </span>
            <span className="text-xs text-muted-foreground">
              {field.value}
            </span>
          </div>
        ))}

        <Button className="h-full min-h-14 w-full rounded-none bg-brand px-12 text-base font-semibold text-brand-foreground hover:bg-brand/90 sm:col-span-2 lg:col-span-1 lg:w-auto">
          Search
        </Button>
      </div>
    </section>
  );
}
