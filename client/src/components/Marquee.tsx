import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  reverse,
  speed = 30,
  sep = "✺",
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
  sep?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-4 sm:px-6">{t}</span>
          <span aria-hidden className="opacity-70">
            {sep}
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className={cn("marquee flex w-max", reverse && "marquee-rev")}
        style={{ ["--speed" as string]: `${speed}s` }}
      >
        {row}
        <div aria-hidden className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}
