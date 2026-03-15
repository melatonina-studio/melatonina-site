import Container from "@/components/Container";
import ExperienceShell from "@/components/three/ExperienceShell";
import ScenePlaceholder from "@/components/three/ScenePlaceholder";
import type { Section } from "@/content/projects";

type SectionRendererProps = {
  sections: Section[];
};

export default function SectionRenderer({
  sections,
}: SectionRendererProps) {
  return (
    <div className="project-sections">
      {sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return (
              <section className="project-section" key={`${section.type}-${index}`}>
                <Container>
                  <div className="project-hero-block">
                    <span className="eyebrow">Overview</span>
                    <h2>{section.title}</h2>
                    <p>{section.subtitle}</p>
                  </div>
                </Container>
              </section>
            );

          case "text":
            return (
              <section className="project-section" key={`${section.type}-${index}`}>
                <Container>
                  <div className="project-text-block">
                    <p>{section.content}</p>
                  </div>
                </Container>
              </section>
            );

          case "gallery":
            return (
              <section className="project-section" key={`${section.type}-${index}`}>
                <Container>
                  <div className="project-gallery">
                    {section.images.map((image, imageIndex) => (
                      <div className="project-gallery__item" key={`${image}-${imageIndex}`}>
                        <div
                          className="project-gallery__thumb"
                          style={{ backgroundImage: `url(${image})` }}
                        />
                      </div>
                    ))}
                  </div>
                </Container>
              </section>
            );

          case "viewer3d":
            return (
              <section className="project-section" key={`${section.type}-${index}`}>
                <Container>
                  <ExperienceShell>
                    <ScenePlaceholder
                      label={`3D Viewer Placeholder — ${section.modelUrl}`}
                      variant="spatial"
                    />
                  </ExperienceShell>
                </Container>
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}