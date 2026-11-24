import { ShieldCheck, Map, Headset } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseWanderlust() {
  return (
    <section className="bg-muted/40 py-16 md:py-20">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Why Choose Wanderlust
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="rounded-sm border-border bg-card shadow-none transition-colors hover:border-primary/40"
              >
                <CardContent className="p-6">
                  <div className="mb-5 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-2 font-serif text-lg font-medium text-card-foreground">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
