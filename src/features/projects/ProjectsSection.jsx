import { PROJECTS } from "../../constants";
import Container from "../../components/ui/Container";
import SectionHeading from "../../components/ui/SectionHeading";
import ProjectShowcase from "./ProjectShowcase";

export default function ProjectsSection() {
  return (
    <section className="scroll-mt-24 border-y border-stone-200/70 bg-stone-100/40">
      <div id="work" className="snap-panel flex items-center">
        <Container className="py-16 md:py-20">
          <SectionHeading
            eyebrow="Products"
            title="A Unified Product Ecosystem"
            subtitle="Three focused products designed for clarity, speed, and dependable user outcomes."
          />
        </Container>
      </div>
      <div>
        {PROJECTS.map((project, idx) => (
          <ProjectShowcase
            key={project.name}
            project={project}
            mainAlign={idx % 2 === 0 ? "right" : "left"}
            className={idx < PROJECTS.length - 1 ? "border-b border-stone-200/70" : ""}
          />
        ))}
      </div>
    </section>
  );
}
