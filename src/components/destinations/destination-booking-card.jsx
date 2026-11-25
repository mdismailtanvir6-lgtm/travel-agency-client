import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDestinationPrice } from "@/helpers/destination-helpers";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function DestinationBookingCard({ destination }) {
  const price = formatDestinationPrice(destination);

  const today = new Date();
  const defaultDate = new Date(today);
  defaultDate.setDate(defaultDate.getDate() + 14);

  return (
    <div className="border border-border bg-background p-6">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-bold text-brand">{price}</p>
      <p className="text-sm text-muted-foreground">per person</p>

      <label htmlFor="booking-date" className="sr-only">
        Travel date
      </label>
      <input
        id="booking-date"
        type="date"
        min={toDateInputValue(today)}
        defaultValue={toDateInputValue(defaultDate)}
        className="mt-5 h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-brand"
      />

      <Button className="mt-4 h-11 w-full gap-2 bg-brand text-brand-foreground hover:bg-brand/90">
        Book Now
        <ArrowRight size={16} />
      </Button>

      <ul className="mt-6 space-y-3 border-t border-border pt-5">
        {PERKS.map((perk) => (
          <li
            key={perk}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check
              size={15}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
            <span>{perk}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
