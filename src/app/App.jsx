import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Observer from "gsap/observer";
import Header from "../components/layout/Header";
import HeroSection from "../features/hero/HeroSection";
import AboutSection from "../features/about/AboutSection";
import ProjectsSection from "../features/projects/ProjectsSection";
import ProjectShowcase from "../features/projects/ProjectShowcase";
import SkillsSection from "../features/skills/SkillsSection";
import ExperienceSection from "../features/experience/ExperienceSection";
import ContactSection from "../features/contact/ContactSection";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import { PROJECTS } from "../constants";
import useReducedMotion from "../hooks/useReducedMotion";

gsap.registerPlugin(Observer);

const UI_THEME_SWAP_DELAY_MS = 20;
const UI_THEME_SWAP_LEAVING_CONTACT_MS = 760;

export default function App() {
  const reducedMotion = useReducedMotion();
  const panelRefs = useRef([]);
  const gotoRef = useRef(() => {});
  const contactCurveOverlayRef = useRef(null);
  const contactCurvePathRef = useRef(null);
  const activeIndexTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorIndex, setIndicatorIndex] = useState(0);

  const carouselPanels = useMemo(
    () => [
      { key: "hero", id: "home", label: "Hero", node: <HeroSection /> },
      { key: "about", id: "about", label: "About", node: <AboutSection /> },
      { key: "skills", id: "skills", label: "Skills", node: <SkillsSection /> },
      {
        key: "products-intro",
        id: "work",
        label: "Products",
        node: (
          <section className="flex min-h-dvh items-center border-y border-stone-200/70 bg-stone-100/40">
            <Container className="py-16 md:py-20">
              <SectionHeading
                eyebrow="Products"
                title="A Unified Product Ecosystem"
                subtitle="Three focused products designed for clarity, speed, and dependable user outcomes."
              />
            </Container>
          </section>
        ),
      },
      ...PROJECTS.map((project, idx) => ({
        key: `project-${project.name}`,
        id: idx === 0 ? "work-project-1" : undefined,
        label: project.name,
        node: (
          <section className="border-y border-stone-200/70 bg-stone-100/40">
            <ProjectShowcase
              project={project}
              mainAlign={idx % 2 === 0 ? "right" : "left"}
              className="border-b-0"
            />
          </section>
        ),
      })),
      { key: "experience", id: "experience", label: "Experience", node: <ExperienceSection /> },
      { key: "contact", id: "contact", label: "Contact", node: <ContactSection /> },
    ],
    []
  );

  useEffect(() => {
    if (reducedMotion) return;

    const panels = panelRefs.current.filter(Boolean);
    if (!panels.length) return;

    let currentIndex = -1;
    let animating = false;
    const wrap = gsap.utils.wrap(0, panels.length);

    gsap.set(panels, { autoAlpha: 0, zIndex: 0 });
    gsap.set(
      panels.map((panel) => panel.querySelector(".carousel-outer")),
      { yPercent: 100 }
    );
    gsap.set(
      panels.map((panel) => panel.querySelector(".carousel-inner")),
      { yPercent: -100 }
    );

    const splitHeadingChars = (heading) => {
      if (heading.dataset.carouselSplit === "true") {
        return Array.from(heading.querySelectorAll(".carousel-char"));
      }

      const text = heading.textContent || "";
      heading.dataset.carouselSplit = "true";
      heading.setAttribute("aria-label", text.trim());
      heading.textContent = "";

      const frag = document.createDocumentFragment();
      const chars = [];

      for (const char of text) {
        const span = document.createElement("span");
        span.className = "carousel-char";
        span.style.display = "inline-block";
        span.style.willChange = "transform, opacity";
        span.textContent = char === " " ? "\u00A0" : char;
        frag.appendChild(span);
        chars.push(span);
      }

      heading.appendChild(frag);
      return chars;
    };

    const panelHeadingChars = panels.map((panel) => {
      const headings = Array.from(panel.querySelectorAll("h1, h2, h3, .section-heading"));
      return headings.flatMap((heading) => splitHeadingChars(heading));
    });

    const curveStart = "M 0 100 V 100 Q 50 100 100 100 V 100 z";
    const curveMid = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const curveEnd = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    gsap.set(contactCurveOverlayRef.current, { autoAlpha: 0 });
    gsap.set(contactCurvePathRef.current, { attr: { d: curveStart } });

    const gotoSection = (index, direction = 1, force = false) => {
      if (animating && !force) return;
      const safe = wrap(index);
      if (!force && safe === currentIndex) return;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const currentPanel = currentIndex >= 0 ? panels[currentIndex] : null;
      const nextPanel = panels[safe];
      const currentBg = currentPanel?.querySelector(".carousel-bg");
      const nextBg = nextPanel.querySelector(".carousel-bg");
      const nextOuter = nextPanel.querySelector(".carousel-outer");
      const nextInner = nextPanel.querySelector(".carousel-inner");
      const nextContent = nextPanel.querySelector(".carousel-content");
      const nextChars = panelHeadingChars[safe] || [];
      const currentPanelKey = currentIndex >= 0 ? carouselPanels[currentIndex]?.key : null;
      const isContactPanel = carouselPanels[safe]?.key === "contact";
      const isLeavingContact = currentPanelKey === "contact" && !isContactPanel;
      const hasCurveSwipe = Boolean(
        isContactPanel && contactCurveOverlayRef.current && contactCurvePathRef.current
      );
      const contentRevealStart = hasCurveSwipe ? 0.9 : 0.24;
      const charRevealStart = hasCurveSwipe ? 0.98 : 0.22;

      setIndicatorIndex(safe);

      if (activeIndexTimeoutRef.current) {
        window.clearTimeout(activeIndexTimeoutRef.current);
      }

      if (isLeavingContact) {
        // When leaving the dark contact panel, swap header/indicator theme before timeline end.
        activeIndexTimeoutRef.current = window.setTimeout(() => {
          setActiveIndex(safe);
          activeIndexTimeoutRef.current = null;
        }, UI_THEME_SWAP_LEAVING_CONTACT_MS);
      }

      animating = true;

      const tl = gsap.timeline({
        defaults: { duration: 1.0, ease: "power1.inOut" },
        onComplete: () => {
          if (!isLeavingContact) {
            if (activeIndexTimeoutRef.current) {
              window.clearTimeout(activeIndexTimeoutRef.current);
            }
            // Delay UI theme/index sync slightly so it updates after the swipe fully settles.
            activeIndexTimeoutRef.current = window.setTimeout(() => {
              setActiveIndex(safe);
              activeIndexTimeoutRef.current = null;
            }, UI_THEME_SWAP_DELAY_MS);
          }
          animating = false;
        },
      });

      if (currentPanel) {
        gsap.set(currentPanel, { zIndex: 0 });
        tl.to(currentBg, { yPercent: -15 * dFactor }, 0).set(
          currentPanel,
          { autoAlpha: 0 },
          ">"
        );
      }

      gsap.set(nextPanel, { autoAlpha: 1, zIndex: 1 });

      tl.fromTo(
        [nextOuter, nextInner],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(nextBg, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          nextContent,
          { autoAlpha: 0, y: 36 },
          { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" },
          contentRevealStart
        );

      if (!hasCurveSwipe) {
        tl.fromTo(
          nextChars,
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
            stagger: {
              each: 0.012,
              from: "random",
            },
          },
          charRevealStart
        );
      }

      if (hasCurveSwipe) {
        tl.set(contactCurveOverlayRef.current, { autoAlpha: 1 }, 0)
          .set(contactCurvePathRef.current, { attr: { d: curveStart } }, 0)
          .to(
            contactCurvePathRef.current,
            {
              attr: { d: curveMid },
              duration: 0.62,
              ease: "power2.in",
            },
            0.02
          )
          .to(
            contactCurvePathRef.current,
            {
              attr: { d: curveEnd },
              duration: 0.72,
              ease: "power2.out",
            },
            0.58
          )
          .to(contactCurveOverlayRef.current, { autoAlpha: 0, duration: 0.18, ease: "none" }, 1.28);
      }

      const panelId = nextPanel.dataset.panelId;
      if (panelId) {
        history.replaceState(null, "", `#${panelId}`);
      }

      currentIndex = safe;
    };

    gotoRef.current = gotoSection;

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "").trim();
      if (!hash) return;

      const targetIndex = panels.findIndex((panel) => panel.dataset.panelId === hash);
      if (targetIndex >= 0) {
        const dir = targetIndex < currentIndex ? -1 : 1;
        gotoSection(targetIndex, dir, true);
      }
    };

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 12,
      preventDefault: true,
      onUp: () => {
        if (!animating) gotoSection(currentIndex + 1, 1);
      },
      onDown: () => {
        if (!animating) gotoSection(currentIndex - 1, -1);
      },
      onPress: (self) => {
        self.event.preventDefault();
      },
    });

    window.addEventListener("hashchange", onHashChange);

    const initialHash = window.location.hash.replace("#", "").trim();
    const initialIndex = initialHash
      ? panels.findIndex((panel) => panel.dataset.panelId === initialHash)
      : -1;
    gotoSection(initialIndex >= 0 ? initialIndex : 0, 1, true);

    return () => {
      if (activeIndexTimeoutRef.current) {
        window.clearTimeout(activeIndexTimeoutRef.current);
      }
      window.removeEventListener("hashchange", onHashChange);
      observer.kill();
    };
  }, [carouselPanels, reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900">
        <Header />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    );
  }

  const isContactActive = carouselPanels[activeIndex]?.key === "contact";
  const isContactIndicator = carouselPanels[indicatorIndex]?.key === "contact";

  return (
    <div className="min-h-screen overflow-hidden bg-stone-50 text-stone-900">
      <Header
        isInverted={isContactActive}
        indicatorInverted={isContactIndicator}
        indicatorCount={carouselPanels.length}
        indicatorIndex={indicatorIndex}
        onIndicatorSelect={(idx) => {
          const direction = idx < indicatorIndex ? -1 : 1;
          gotoRef.current(idx, direction, true);
        }}
      />
      {carouselPanels.map((panel, idx) => (
        <section
          key={panel.key}
          ref={(el) => {
            panelRefs.current[idx] = el;
          }}
          data-panel-id={panel.id || ""}
          className="fixed inset-0 h-dvh w-full invisible"
        >
          <div className="carousel-outer h-full w-full overflow-hidden">
            <div className="carousel-inner h-full w-full overflow-hidden">
              <div className="carousel-bg relative h-full w-full bg-[linear-gradient(180deg,#f8f5ef_0%,#f3efe7_100%)]">
                <div className="carousel-content h-full w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{panel.node}</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div
        ref={contactCurveOverlayRef}
        className="pointer-events-none fixed inset-0 z-[80] opacity-0"
        aria-hidden="true"
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            ref={contactCurvePathRef}
            fill="rgb(0, 0, 0)"
            d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
          />
        </svg>
      </div>

      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-[50]" aria-hidden="true">
        <div
          className={`relative h-1 w-full ${
            isContactIndicator ? "bg-white/40" : "bg-text-secondary/30"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-1 transition-[width] duration-300 ease-out ${
              isContactIndicator ? "bg-white" : "bg-black"
            }`}
            style={{ width: `${(indicatorIndex / (carouselPanels.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
