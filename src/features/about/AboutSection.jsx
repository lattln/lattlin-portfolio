import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import { ABOUT_CONTENT } from "../../constants";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(Array.from(gridRef.current.children), {
        opacity: 0,
        y: 16,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="scroll-mt-24 flex min-h-dvh items-center bg-surface-secondary py-16 md:py-20">
      <Container className="w-full">
        <SectionHeading
          eyebrow="About"
          title="Building a miniature digital world with real business outcomes"
          subtitle="Playful visuals, reliable architecture, and product decisions grounded in user behavior."
        />
        <div ref={gridRef} className="grid gap-6 md:grid-cols-2">
          {ABOUT_CONTENT.paragraphs.map((paragraph) => (
            <article
              key={paragraph}
              className="rounded-3xl border border-border-subtle/80 bg-background-primary p-7 shadow-sm"
            >
              <p className="text-base leading-relaxed text-text-secondary">{paragraph}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
