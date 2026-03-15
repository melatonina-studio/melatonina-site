import Container from "@/components/Container";
import { siteContent } from "@/content/site";
import ExperienceShell from "@/components/three/ExperienceShell";
import ScenePlaceholder from "@/components/three/ScenePlaceholder";

export default function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <Container>
        <div className="section-heading">
          <span className="eyebrow">Services</span>
          <h2>Tre direzioni, una regia</h2>
          <p>
            Ogni servizio è pensato come una scena diversa dello stesso sistema:
            evento, spazio, commercio.
          </p>
        </div>

        <div className="services-grid">
          {siteContent.services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-copy">
                <span className="service-index">{service.eyebrow}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <ExperienceShell className="service-shell">
                <ScenePlaceholder
                  label={service.sceneLabel}
                  variant={service.id}
                />
              </ExperienceShell>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}