import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index, reducedMotion }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.35,
        delay: index * 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [reducedMotion, index]);

  return (
    <article
      ref={cardRef}
      className="rounded-2xl border border-stone-200 bg-white p-4"
    >
      <img
        src={project.image}
        alt={project.name}
        className="h-44 w-full rounded-xl object-cover"
        loading="lazy"
      />
      <h3 className="mt-4 text-xl font-medium text-stone-900">{project.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-stone-700">{project.description}</p>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex text-sm font-medium text-amber-700 hover:text-amber-800"
      >
        View repository
      </a>
    </article>
  );
}
