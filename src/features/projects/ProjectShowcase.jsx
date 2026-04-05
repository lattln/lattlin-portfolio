import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useReducedMotion from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase({
  project,
  mainAlign = "right",
  className = "",
}) {
  const imageOnRight = mainAlign === "right";
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const imageWrapRef = useRef(null);
  const textWrapRef = useRef(null);
  const glowARef = useRef(null);
  const glowBRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const ctx = gsap.context(() => {
      const textTargets = textWrapRef.current
        ? Array.from(
            textWrapRef.current.querySelectorAll(
              ".project-panel__badge, .project-panel__heading, .project-panel__tagline, .project-panel__description, .project-panel__points li, .project-panel__cta"
            )
          )
        : [];

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      revealTl
        .from(imageWrapRef.current, {
          autoAlpha: 0,
          y: 34,
          duration: 0.55,
          ease: "power2.out",
        })
        .from(
          textTargets,
          {
            autoAlpha: 0,
            y: 16,
            duration: 0.42,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.1
        );

      gsap.fromTo(
        imageWrapRef.current,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        glowARef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        glowBRef.current,
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`project-panel snap-panel relative h-dvh w-full overflow-hidden ${className}`}
    >
      <div className="project-panel__outer h-full w-full overflow-hidden">
        <div className="project-panel__inner h-full w-full overflow-hidden">
          <div className={`project-panel__bg absolute inset-0 z-0 bg-gradient-to-br ${project.accent.section}`} aria-hidden="true" />
          <div ref={glowARef} className={`project-panel__glow-a absolute -top-10 left-8 h-56 w-56 rounded-full blur-3xl ${project.accent.glowA}`} aria-hidden="true" />
          <div ref={glowBRef} className={`project-panel__glow-b absolute bottom-8 right-8 h-56 w-56 rounded-full blur-3xl ${project.accent.glowB}`} aria-hidden="true" />

          <div className="relative z-10 mx-auto grid h-full w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12">
            <div className={imageOnRight ? "md:order-2" : "md:order-1"}>
              <div className={imageOnRight ? "md:pl-6" : "md:pr-6"}>
                <div ref={imageWrapRef} className={`project-panel__image-wrap mx-auto ${project.renderScale || "max-w-xl"}`}>
                  <img
                    src={project.image}
                    alt={`${project.name} isometric 3D visualization`}
                    className="project-panel__image mx-auto w-full object-contain p-4 drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className={imageOnRight ? "md:order-1" : "md:order-2"}>
              <div className={imageOnRight ? "md:pr-6" : "md:pl-6"}>
                <div ref={textWrapRef} className="max-w-lg space-y-5">
                  <span className={`project-panel__badge inline-flex rounded-full px-3 py-1 text-xs font-medium ${project.accent.badge}`}>
                    Product Suite
                  </span>
                  <h2 className="project-panel__heading text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                    {project.name}
                  </h2>
                  <p className="project-panel__tagline text-lg font-medium text-stone-800">{project.tagline}</p>
                  <p className="project-panel__description text-base leading-relaxed text-stone-700">{project.description}</p>
                  <ul className="project-panel__points space-y-2 text-sm leading-relaxed text-stone-700">
                    {project.points.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className={`mt-1 text-xs ${project.accent.bullet}`} aria-hidden="true">
                          ●
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-panel__cta inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${project.accent.button}`}
                  >
                    Explore Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
