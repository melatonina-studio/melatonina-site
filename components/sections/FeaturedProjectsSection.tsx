import Container from "@/components/Container";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export default function FeaturedProjectsSection() {
  return (
    <section className="projects-section" id="projects">
      <Container>
        <div className="section-heading">
          <span className="eyebrow">Selected Work</span>
          <h2>Progetti e prototipi</h2>
          <p>
            Una selezione di lavori, sistemi e concept che mostrano il metodo in
            azione.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}