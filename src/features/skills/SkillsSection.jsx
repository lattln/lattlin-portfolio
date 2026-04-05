import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { skills } from "./skills.data";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current.querySelectorAll("li"), {
        opacity: 0,
        y: 14,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="scroll-mt-24 flex min-h-dvh items-center bg-background-primary py-16 md:py-20">
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
