import { Link } from "wouter";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-xl flex-col items-center justify-center px-5 pt-28 text-center">
      <Logo className="wobble w-48 opacity-90" />
      <h1 className="font-display mt-6 text-7xl">404</h1>
      <p className="mt-2 text-lg text-cream/70">This page got krushed.</p>
      <Link href="/" className="font-display mt-8 rounded-2xl border-[3px] border-ink bg-sun px-7 py-3.5 text-xl text-ink shadow-[5px_5px_0_#ff2d95]">
        Back home
      </Link>
    </section>
  );
}
