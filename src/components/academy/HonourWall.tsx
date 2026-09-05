import { useCallback, useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";

import { honourWall } from "@/data/content";
import { Reveal, SectionHeading } from "./shared";

/**
 * The achievers banner from the academy's wall, shown whole. The rail before
 * it tells eighteen stories one at a time; this is everyone at once, the way a
 * parent sees it walking in, and it is where "Skip results" lands. Tapping it
 * opens the large version: on a phone the banner renders wider than the screen
 * and pans sideways so the names stay legible; larger screens fit it whole.
 */
export function HonourWall() {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    openerRef.current?.focus();
  }, []);

  // Escape closes; Tab cycles between the pannable banner and the close button.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>('button, [tabindex="0"]');
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <section
      id="honour-wall"
      className="scroll-mt-28 bg-sand px-5 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10"
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="The Honour Wall"
          title="Every Name"
          highlight="On The Wall"
          intro="The achievers banner as it hangs in the academy: the five who topped it, then every student across the classes. Tap it to read the names."
        />

        <Reveal delay={120}>
          <button
            ref={openerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open the honour wall at full size"
            className="focus-ring group relative mt-10 block w-full overflow-hidden rounded-2xl border border-gold/30 bg-panel elevate-lg transition-transform duration-300 hover:-translate-y-1"
          >
            <img
              src={honourWall.src}
              srcSet={`${honourWall.src} 1200w, ${honourWall.srcLarge} 2400w`}
              sizes="(min-width: 1280px) 1200px, calc(100vw - 2.5rem)"
              alt={honourWall.alt}
              loading="lazy"
              decoding="async"
              width={honourWall.width}
              height={honourWall.height}
              className="block w-full"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-page/85 px-3 py-1.5 font-utility text-[10px] font-semibold uppercase tracking-wider text-gold backdrop-blur sm:bottom-4 sm:right-4">
              <Expand className="size-3.5" aria-hidden="true" />
              Tap to read the names
            </span>
          </button>
        </Reveal>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-page/95 p-3 backdrop-blur-md sm:p-8"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="The honour wall, full size"
            className="relative flex w-full max-w-[1800px] flex-col items-center pt-12"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Phones: the banner is wider than the screen and pans sideways.
                sm and up: it fits the viewport whole. */}
            <div
              tabIndex={0}
              role="region"
              aria-label="Honour wall banner; scroll sideways to see everyone"
              className="focus-ring no-scrollbar w-full overflow-x-auto rounded-xl"
            >
              <img
                src={honourWall.srcLarge}
                alt={honourWall.alt}
                width={honourWall.width}
                height={honourWall.height}
                className="mx-auto block h-auto w-[1100px] max-w-none rounded-xl border border-gold/30 sm:w-auto sm:max-h-[84vh] sm:max-w-full"
              />
            </div>
            <p className="mt-3 font-utility text-[10px] uppercase tracking-widest text-gold sm:hidden">
              Swipe sideways to see everyone
            </p>

            <button
              type="button"
              onClick={close}
              aria-label="Close the honour wall"
              className="focus-ring absolute right-0 top-0 grid size-10 place-items-center rounded-full bg-page/80 text-heading transition-colors hover:bg-gold-fill hover:text-on-gold"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
