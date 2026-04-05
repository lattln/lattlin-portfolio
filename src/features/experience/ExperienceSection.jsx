import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { EXPERIENCES } from "../../constants";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 flex min-h-dvh items-center bg-background-primary py-16 md:py-20">
      <Container className="w-full">
        <SectionHeading
          eyebrow="Experience"
          title="Recent roles and impact"
          subtitle="Hands-on delivery across healthcare, infrastructure support, and product operations."
        />
        <div className="space-y-5">
          {EXPERIENCES.map((experience) => (
            <article
              key={`${experience.title}-${experience.yearRange}`}
              className="rounded-2xl border border-border-subtle bg-background-primary/80 p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-text-primary">{experience.title}</h3>
                <p className="text-sm font-medium text-accent-active">{experience.yearRange}</p>
              </div>
              <p className="mt-1 text-sm text-text-secondary">{experience.location}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">
                {experience.description.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}