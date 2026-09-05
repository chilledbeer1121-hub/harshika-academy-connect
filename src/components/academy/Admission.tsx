import { admissionSteps } from "@/data/content";
import { Reveal, SectionHeading } from "./shared";

/**
 * A strip, not a stage: two steps do not need a band of their own. The
 * heading sits left, the steps run alongside as numbered notes, each under a
 * hairline that draws in on the step's own view timeline (`.step-rule`), the
 * second a beat after the first.
 */
export function Admission() {
  return (
    <section
      id="admission"
      className="ground-drift scroll-mt-28 bg-sand px-5 py-12 sm:px-6 sm:py-16"
      style={
        {
          "--ground-from": "var(--ground-dusk)",
          "--ground-to": "var(--ground-sand)",
          "--ground-range": "entry 0% entry 100%",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
        <SectionHeading
          chapter="04"
          eyebrow="Getting Started"
          title="Two Steps"
          highlight="to Join"
        />

        <ol className="grid gap-8 sm:grid-cols-2 sm:gap-10">
          {admissionSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 120}
              className="admission-step relative pt-5"
            >
              <span
                aria-hidden="true"
                className="step-rule absolute inset-x-0 top-0 h-px origin-left bg-gold/40"
                style={{ "--step": index } as React.CSSProperties}
              />
              {/* The list is already numbered for assistive tech. */}
              <span aria-hidden="true" className="gold-foil font-display text-4xl leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-utility text-sm font-semibold text-heading">{step.title}</h3>
              <p className="mt-1.5 max-w-xs text-sm leading-[1.65] text-body">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
