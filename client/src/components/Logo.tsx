import { cn } from "@/lib/utils";

export function Logo({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <img
      src="/brand/krush-logo.webp"
      alt="KRUSH"
      width={900}
      height={707}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-auto select-none", className)}
    />
  );
}
