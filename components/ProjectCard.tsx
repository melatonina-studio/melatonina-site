import Link from "next/link";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-thumb" />
      <div className="project-body">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.excerpt}</p>
        <Link href={`/projects/${project.slug}`} className="project-link">
          Apri progetto
        </Link>
      </div>
    </article>
  );
}