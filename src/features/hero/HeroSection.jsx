import { useRef, useEffect } from "react";
import gsap from "gsap";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";
import lattCenterImg from "../../assets/images/latt_center.png";
import { CONTACT_CONTENT, HERO_CONTENT } from "../../constants";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const textColRef = useRef(null);
  const imageColRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        // Staggered entrance for text column children
        gsap.from(Array.from(textColRef.current.children), {
          opacity: 0,
          y: 20,
          duration: 0.45,
          stagger: 0.12,
          delay: 0.1,
          ease: "power2.out",
        });

        // Image column entrance
        gsap.from(imageColRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.45,
          delay: 0.1,
          ease: "power2.out",
        });

        // Floating animations — yoyo loops matching original durations
        gsap.to(heroImageRef.current, {
          y: -8,
          duration: 3.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-background-primary py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-surface-secondary to-surface-primary" aria-hidden="true" />
      <div className="absolute left-10 top-16 h-28 w-28 rounded-full bg-accent-soft/70 blur-2xl" aria-hidden="true" />
      <div className="absolute bottom-14 right-10 h-36 w-36 rounded-full bg-accent/20 blur-2xl" aria-hidden="true" />

      <Container className="relative z-10 w-full">
        <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div ref={textColRef} className="space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-text-secondary">
              {HERO_CONTENT.greeting} full-stack systems + product design
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-text-primary md:text-6xl">
              {HERO_CONTENT.introduction}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {HERO_CONTENT.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button as="a" href="#work">
                Explore Products
              </Button>
              <Button as="a" href={HERO_CONTENT.resumeLink} variant="ghost">
                {HERO_CONTENT.resumeLinkText}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full bg-surface-primary/80 px-3 py-1 text-xs font-medium text-text-secondary">Mini digital world</span>
              <span className="rounded-full bg-surface-primary/80 px-3 py-1 text-xs font-medium text-text-secondary">Isometric systems</span>
              <span className="rounded-full bg-surface-primary/80 px-3 py-1 text-xs font-medium text-text-secondary">SaaS-grade UX</span>
            </div>
          </div>

          <div ref={imageColRef} className="relative mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-8">
            <div className="relative mx-auto flex h-[24rem] w-full max-w-[34rem] items-center justify-center sm:h-[27rem]">
              <img
                ref={heroImageRef}
                src={lattCenterImg}
                alt="3D portrait of Lin Latt"
                className="absolute left-1/2 top-1/2 w-full max-w-[21rem] -translate-x-1/2 -translate-y-1/2 object-contain object-[48%_50%] drop-shadow-2xl sm:max-w-[23rem] md:max-w-[26rem]"
              />
            </div>
            <ul className="mt-4 grid w-full gap-2 sm:grid-cols-2">
              {CONTACT_CONTENT.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-border-subtle bg-background-primary/80 px-4 py-2 text-sm text-text-secondary transition hover:border-accent hover:text-text-primary"
                  >
                    <span>{link.platform}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
