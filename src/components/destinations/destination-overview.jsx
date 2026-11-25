export function DestinationOverview({ overview }) {
  if (!overview) return null;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-medium tracking-tight text-foreground">
        Overview
      </h2>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {overview}
      </p>
    </section>
  );
}
