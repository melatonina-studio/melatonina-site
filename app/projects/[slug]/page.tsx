import { notFound } from "next/navigation";
import Container from "@/components/Container";
import SectionRenderer from "@/components/SectionRenderer";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-page">
      <Container>
        <div className="project-page__intro">
          <span className="eyebrow">{project.category}</span>
          <h1>{project.title}</h1>
          <p>{project.excerpt}</p>
        </div>
      </Container>

      <SectionRenderer sections={project.sections} />
    </main>
  );
}