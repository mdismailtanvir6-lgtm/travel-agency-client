import Image from "next/image";

const SIZES = "(max-width: 1280px) 100vw, 1280px";

export function DestinationDetailHero({ image, alt }) {
  return (
    <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden bg-muted md:aspect-[2.4/1]">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes={SIZES}
        className="object-cover"
      />
    </div>
  );
}
