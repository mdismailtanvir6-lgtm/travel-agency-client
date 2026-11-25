import { Check } from "lucide-react";

// Accepts plain strings or objects like { title, description }.
function toHighlightText(item) {
  if (typeof item === "string") return item;
  return item?.title || item?.text || item?.description || "";
}

export function DestinationHighlights({ highlights = [], intro }) {
  const items = highlights.map(toHighlightText).filter(Boolean);

  if (items.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-medium tracking-tight text-foreground">
        Highlights
      </h2>

      {intro ? (
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{intro}</p>
      ) : null}

      <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check
              size={15}
              className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
