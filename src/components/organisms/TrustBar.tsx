import type { Accent, TrustUSP as TrustUSPType } from "@/types/lp";
import { TrustUSP } from "@/components/molecules/TrustUSP";

type TrustBarProps = {
  accent: Accent;
  items: TrustUSPType[];
};

export function TrustBar({ accent, items }: TrustBarProps) {
  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="border-y border-gray-3 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-16">
        <h2 id="trust-bar-heading" className="sr-only">
          What you get with every project
        </h2>
        <ul
          role="list"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {items.map((item) => (
            <TrustUSP key={item.title} item={item} accent={accent} />
          ))}
        </ul>
      </div>
    </section>
  );
}
