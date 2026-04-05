import { useRef, useEffect } from "react";
import gsap from "gsap";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { skills } from "../../constants";

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const listEl = listRef.current;
    if (!sectionEl || !listEl) return undefined;

    const ctx = gsap.context(() => {
      const animateIn = () => {
        gsap.fromTo(
          listEl,
          { y: 18, scale: 0.985 },
          {
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              animateIn();
            }
          }
        },
        { threshold: 0.45 }
      );

      observer.observe(sectionEl);

      return () => observer.disconnect();
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="scroll-mt-24 flex min-h-dvh items-center bg-background-primary py-16 md:py-20"
    >
      <Container className="w-full">
        <SectionHeading
          eyebrow="Skills"
          title="Technical stack for product-grade delivery"
          subtitle="A focused stack used to build responsive, scalable interfaces and dependable systems."
        />
        <ul ref={listRef} className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border-subtle bg-background-primary px-4 py-2 text-sm font-medium text-text-secondary shadow-sm transition hover:-translate-y-0.5 hover:border-accent"
            >
              {skill}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
