import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Observer from "gsap/observer";
import Header from "./components/layout/Header";
import HeroSection from "./features/hero/HeroSection";
import AboutSection from "./features/about/AboutSection";
import ProjectsSection from "./features/projects/ProjectsSection";
import ProjectShowcase from "./features/projects/ProjectShowcase";
import SkillsSection from "./features/skills/SkillsSection";
import ExperienceSection from "./features/experience/ExperienceSection";
import ContactSection from "./features/contact/ContactSection";
import Container from "./components/ui/Container";
import SectionHeading from "./components/ui/SectionHeading";
import { PROJECTS } from "./constants";
import useReducedMotion from "./hooks/useReducedMotion";

gsap.registerPlugin(Observer);

const UI_THEME_SWAP_DELAY_MS = 20;
const UI_THEME_SWAP_LEAVING_CONTACT_MS = 760;

export default function App() {
  const reducedMotion = useReducedMotion();
  const panelRefs = useRef([]);
  const gotoRef = useRef(() => {});
  const heroCurveOverlayRef = useRef(null);
  const heroMorphPathRefs = useRef([]);
  const contactCurveOverlayRef = useRef(null);
  const contactMorphPathRefs = useRef([]);
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
          <section className="flex min-h-dvh items-center border-y border-stone-200/70">
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
          <section className="border-y border-stone-200/70">
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

    const morphNumPoints = 10;
    const morphDelayPointsMax = 0.28;
    const morphDelayPerPath = 0.2;
    const morphDuration = 0.9;

    const buildMorphPath = (points) => {
      let d = `M 0 0 V ${points[0]} C`;

      for (let j = 0; j < morphNumPoints - 1; j += 1) {
        const p = ((j + 1) / (morphNumPoints - 1)) * 100;
        const cp = p - (100 / (morphNumPoints - 1)) / 2;
        d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
      }

      d += " V 100 H 0";
      return d;
    };

    const renderMorph = (paths, allPoints) => {
      for (let i = 0; i < paths.length; i += 1) {
        paths[i].setAttribute("d", buildMorphPath(allPoints[i]));
      }
    };

    const initMorphOverlay = (overlayRef, pathRefs) => {
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      pathRefs.current
        .filter(Boolean)
        .forEach((pathEl) => pathEl.setAttribute("d", buildMorphPath(Array(morphNumPoints).fill(100))));
    };

    initMorphOverlay(heroCurveOverlayRef, heroMorphPathRefs);
    initMorphOverlay(contactCurveOverlayRef, contactMorphPathRefs);

    const addMorphSweep = (tl, overlayRef, pathRefs, startAt = 0) => {
      const paths = pathRefs.current.filter(Boolean);
      if (!overlayRef.current || !paths.length) return startAt;

      const allPoints = Array.from({ length: paths.length }, () => Array(morphNumPoints).fill(100));
      const pointsDelay = Array.from({ length: morphNumPoints }, () => Math.random() * morphDelayPointsMax);
      const morphEndAt = startAt + morphDuration + morphDelayPointsMax + morphDelayPerPath * (paths.length - 1);

      tl.set(overlayRef.current, { autoAlpha: 1 }, startAt).call(
        () => {
          renderMorph(paths, allPoints);
        },
        null,
        startAt
      );

      for (let i = 0; i < paths.length; i += 1) {
        const pathDelay = morphDelayPerPath * i;
        for (let j = 0; j < morphNumPoints; j += 1) {
          tl.to(
            allPoints[i],
            {
              [j]: 0,
              duration: morphDuration,
              ease: "power2.inOut",
              onUpdate: () => {
                renderMorph(paths, allPoints);
              },
            },
            startAt + pointsDelay[j] + pathDelay
          );
        }
      }

      tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.18, ease: "none" }, morphEndAt + 0.08);
      return morphEndAt + 0.08;
    };

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
      const isHeroPanel = carouselPanels[safe]?.key === "hero";
      const isAboutPanel = carouselPanels[safe]?.key === "about";
      const isEnteringAboutDown = isAboutPanel && direction === 1;
      const isEnteringHeroUp = isHeroPanel && direction === -1;
      const isContactPanel = carouselPanels[safe]?.key === "contact";
      const isLeavingContact = currentPanelKey === "contact" && !isContactPanel;
      const hasContactMorph = Boolean(
        isContactPanel && contactCurveOverlayRef.current && contactMorphPathRefs.current.filter(Boolean).length > 0
      );
      const hasHeroMorph = Boolean(
        (isEnteringAboutDown || isEnteringHeroUp) && heroCurveOverlayRef.current && heroMorphPathRefs.current.filter(Boolean).length > 0
      );
      const heroMorphFlipped = isEnteringHeroUp;
      const hasMorphSwipe = hasContactMorph || hasHeroMorph;
      const contentRevealStart = hasMorphSwipe ? (hasContactMorph ? 0.9 : 0.84) : 0.24;
      const charRevealStart = hasMorphSwipe ? (hasContactMorph ? 0.98 : 0.9) : 0.22;

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

      // For morph transitions, keep current panel on top until morph fully finishes.
      tl.set(nextPanel, { autoAlpha: 1, zIndex: hasMorphSwipe ? 0 : 1 }, 0);

      if (currentPanel) {
        gsap.set(currentPanel, { zIndex: hasMorphSwipe ? 1 : 0 });
        if (hasMorphSwipe) {
          // Morph handles the visual transition; panel swap is delayed until morph end.
          tl.set(currentPanel, { autoAlpha: 1 }, 0);
        } else {
          tl.to(currentBg, { yPercent: -15 * dFactor }, 0).set(
            currentPanel,
            { autoAlpha: 0 },
            ">"
          );
        }
      }

      if (hasMorphSwipe) {
        // Snap panels into place — morph overlay is the visual boundary, not the panel edge
        gsap.set([nextOuter, nextInner, nextBg], { yPercent: 0 });
      } else {
        tl.fromTo(
          [nextOuter, nextInner],
          { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
          { yPercent: 0 },
          0
        ).fromTo(nextBg, { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);
      }

      let morphEndTime = 0;

      if (hasContactMorph) {
        morphEndTime = Math.max(morphEndTime, addMorphSweep(tl, contactCurveOverlayRef, contactMorphPathRefs, 0));
      }

      if (hasHeroMorph) {
        const heroPaths = heroMorphPathRefs.current.filter(Boolean);
        if (heroPaths.length === 2) {
          const backFill = heroMorphFlipped ? "url(#heroMorphGradientLightB)" : "url(#heroMorphGradientTanB)";
          const frontFill = heroMorphFlipped ? "url(#heroMorphGradientLightA)" : "url(#heroMorphGradientTanA)";
          heroPaths[0].setAttribute("fill", backFill);
          heroPaths[1].setAttribute("fill", frontFill);
        }

        if (heroMorphFlipped) {
          gsap.set(heroCurveOverlayRef.current, { scaleY: -1 });
        } else {
          gsap.set(heroCurveOverlayRef.current, { scaleY: 1 });
        }
        const heroMorphEndTime = addMorphSweep(tl, heroCurveOverlayRef, heroMorphPathRefs, 0);
        morphEndTime = Math.max(morphEndTime, heroMorphEndTime);
        tl.set(heroCurveOverlayRef.current, { scaleY: 1 }, heroMorphEndTime);
      }

      if (hasMorphSwipe && currentPanel) {
        tl.set(currentPanel, { autoAlpha: 0, zIndex: 0 }, morphEndTime);
        tl.set(nextPanel, { zIndex: 1 }, morphEndTime);
      }

      const finalContentRevealStart = hasMorphSwipe ? morphEndTime + 0.02 : contentRevealStart;

      tl.fromTo(
        nextContent,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" },
        finalContentRevealStart
      );

      if (!hasMorphSwipe) {
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

  const progressPercent =
    carouselPanels.length > 1
      ? (indicatorIndex / (carouselPanels.length - 1)) * 100
      : 0;
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

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] w-[min(88vw,72rem)] -translate-x-1/2">
        <div
          className={`relative h-[2px] w-full rounded-full ${
            isContactIndicator ? "bg-white/35" : "bg-text-secondary/28"
          }`}
          aria-hidden="true"
        >
          <span
            className={`absolute left-0 top-0 h-[2px] rounded-full transition-[width] duration-300 ease-out ${
              isContactIndicator ? "bg-white" : "bg-black"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

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
              <div 
                className="carousel-bg relative h-full w-full"
                style={{
                  background: panel.key === "hero"
                    ? "linear-gradient(180deg, rgb(248, 245, 239) 0%, rgb(243, 239, 230) 100%)"
                    : panel.key === "contact"
                    ? "rgb(0, 0, 0)"
                    : "linear-gradient(180deg, rgb(205, 175, 135) 0%, rgb(178, 148, 108) 100%)"
                }}
              >
                <div className="carousel-content h-full w-full overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{panel.node}</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div
        ref={heroCurveOverlayRef}
        className="pointer-events-none fixed inset-0 z-[79] opacity-0"
        aria-hidden="true"
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroMorphGradientTanA" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(188, 158, 118)" />
              <stop offset="100%" stopColor="rgb(160, 128, 88)" />
            </linearGradient>
            <linearGradient id="heroMorphGradientTanB" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(205, 175, 135)" />
              <stop offset="100%" stopColor="rgb(178, 148, 108)" />
            </linearGradient>
            <linearGradient id="heroMorphGradientLightA" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(248, 245, 239)" />
              <stop offset="100%" stopColor="rgb(243, 239, 230)" />
            </linearGradient>
            <linearGradient id="heroMorphGradientLightB" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(238, 225, 203)" />
              <stop offset="100%" stopColor="rgb(216, 198, 170)" />
            </linearGradient>
          </defs>
          <path
            ref={(el) => {
              heroMorphPathRefs.current[0] = el;
            }}
            fill="url(#heroMorphGradientTanB)"
            d="M 0 0 V 100 C 5 100 5 100 10 100 C 15 100 15 100 20 100 C 25 100 25 100 30 100 C 35 100 35 100 40 100 C 45 100 45 100 50 100 C 55 100 55 100 60 100 C 65 100 65 100 70 100 C 75 100 75 100 80 100 C 85 100 85 100 90 100 C 95 100 95 100 100 100 V 100 H 0"
          />
          <path
            ref={(el) => {
              heroMorphPathRefs.current[1] = el;
            }}
            fill="url(#heroMorphGradientTanA)"
            d="M 0 0 V 100 C 5 100 5 100 10 100 C 15 100 15 100 20 100 C 25 100 25 100 30 100 C 35 100 35 100 40 100 C 45 100 45 100 50 100 C 55 100 55 100 60 100 C 65 100 65 100 70 100 C 75 100 75 100 80 100 C 85 100 85 100 90 100 C 95 100 95 100 100 100 V 100 H 0"
          />
        </svg>
      </div>

      <div
        ref={contactCurveOverlayRef}
        className="pointer-events-none fixed inset-0 z-[80] opacity-0"
        aria-hidden="true"
      >
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="contactMorphGradientA" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(24, 24, 24)" />
              <stop offset="100%" stopColor="rgb(0, 0, 0)" />
            </linearGradient>
            <linearGradient id="contactMorphGradientB" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgb(36, 36, 36)" />
              <stop offset="100%" stopColor="rgb(8, 8, 8)" />
            </linearGradient>
          </defs>
          <path
            ref={(el) => {
              contactMorphPathRefs.current[0] = el;
            }}
            fill="url(#contactMorphGradientB)"
            d="M 0 0 V 100 C 5 100 5 100 10 100 C 15 100 15 100 20 100 C 25 100 25 100 30 100 C 35 100 35 100 40 100 C 45 100 45 100 50 100 C 55 100 55 100 60 100 C 65 100 65 100 70 100 C 75 100 75 100 80 100 C 85 100 85 100 90 100 C 95 100 95 100 100 100 V 100 H 0"
          />
          <path
            ref={(el) => {
              contactMorphPathRefs.current[1] = el;
            }}
            fill="url(#contactMorphGradientA)"
            d="M 0 0 V 100 C 5 100 5 100 10 100 C 15 100 15 100 20 100 C 25 100 25 100 30 100 C 35 100 35 100 40 100 C 45 100 45 100 50 100 C 55 100 55 100 60 100 C 65 100 65 100 70 100 C 75 100 75 100 80 100 C 85 100 85 100 90 100 C 95 100 95 100 100 100 V 100 H 0"
          />
        </svg>
      </div>
    </div>
  );
}
