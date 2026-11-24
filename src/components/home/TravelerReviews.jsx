"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";

import { Star } from "lucide-react";

export default function TravelerReviews({ reviews = [] }) {
  return (
    <section className="bg-background pt-14 md:pt-20">
      <div className="container mx-auto px-5">
        <div className="mb-9">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            What Travelers Say
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Real experiences from our happy travelers
          </p>
        </div>

        {reviews.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: reviews.length > 2,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => {
                const name = review.name || review.userName || "Traveler";

                const message =
                  review.review ||
                  review.comment ||
                  review.message ||
                  review.description ||
                  "";

                const image =
                  review.image || review.photo || review.avatar || "";

                const location = review.location || review.city || "Traveler";

                const rating = Math.min(
                  5,
                  Math.max(0, Number(review.rating) || 0),
                );

                return (
                  <CarouselItem
                    key={review._id || review.id || index}
                    className="pl-4 md:basis-1/2"
                  >
                    <Card className="h-full rounded-sm border-border bg-card shadow-none transition-colors hover:border-primary/40">
                      <CardContent className="flex h-full min-h-44 items-center justify-between gap-4 p-5">
                        <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch">
                          {/* Rating */}
                          <div className="mb-3 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3.5 ${
                                  i < rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>

                          {/* Review */}
                          <p className="line-clamp-5 text-sm leading-relaxed text-card-foreground">
                            {message}
                          </p>

                          {/* User Information */}
                          <div className="mt-5">
                            <h4 className="text-sm font-semibold text-primary">
                              — {name}
                            </h4>

                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {location}
                            </p>
                          </div>
                        </div>

                        {/* User Image */}
                        <Avatar className="size-20 shrink-0 rounded-sm sm:size-24">
                          <AvatarImage
                            src={image}
                            alt={name}
                            className="rounded-sm object-cover"
                          />

                          <AvatarFallback className="rounded-sm bg-primary/10 text-primary">
                            {name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="mt-6 flex justify-end gap-3">
              <CarouselPrevious className="static size-9 translate-y-0 cursor-pointer border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground" />

              <CarouselNext className="static size-9 translate-y-0 cursor-pointer border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground" />
            </div>
          </Carousel>
        ) : (
          <div className="rounded-md border border-dashed border-border py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No customer reviews available yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
