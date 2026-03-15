import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { getServiceBySlug, services } from "@/content/services";
import ExperienceShell from "@/components/three/ExperienceShell";
import ScenePlaceholder from "@/components/three/ScenePlaceholder";

type ServicePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = getServiceBySlug(params.slug);

  if (!service) notFound();

  const variant =
    service.slug === "event-experiences"
      ? "event"
      : service.slug === "spatial-web"
      ? "spatial"
      : "commerce";

  return (
    <main className={`service-detail-page accent-${service.accent}`}>
      <section className="service-detail-hero">
        <Container>
          <div className="service-detail-hero__layout">
            <div className="service-detail-hero__copy">
              <span className="eyebrow">Service / {service.index}</span>
              <h1>{service.title}</h1>
              <p className="service-detail-hero__subtitle">
                {service.subtitle}
              </p>
              <p className="service-detail-hero__intro">{service.intro}</p>

              <div className="service-detail-hero__tags">
                {service.tags.map((tag) => (
                  <span key={tag} className="service-detail-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="service-detail-hero__visual">
              <div className="service-detail-hero__image-wrap">
                <div
                  className="service-detail-hero__image"
                  style={{ backgroundImage: `url(${service.coverImage})` }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="service-detail-demo">
        <Container>
          <div className="service-detail-section-head">
            <span className="eyebrow">Demo Area</span>
            <h2>Interactive layer</h2>
            <p>
              Qui entrerà la demo Three.js. Per ora prepariamo il palco come si
              deve.
            </p>
          </div>

          <ExperienceShell>
            <ScenePlaceholder
              label={`${service.title} — Demo Placeholder`}
              variant={variant}
            />
          </ExperienceShell>
        </Container>
      </section>

      <section className="service-detail-content">
        <Container>
          <div className="service-detail-grid">
            <div className="service-detail-panel">
              <span className="eyebrow">Overview</span>
              <p>{service.description}</p>
            </div>

            <div className="service-detail-panel">
              <span className="eyebrow">Capabilities</span>
              <ul className="service-detail-list">
                {service.capabilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="service-detail-gallery">
        <Container>
          <div className="service-detail-section-head">
            <span className="eyebrow">Visual Development</span>
            <h2>Renders, stills, interface fragments</h2>
          </div>

          <div className="service-detail-gallery__grid">
            <div className="service-detail-gallery__item large">
              <div
                className="service-detail-gallery__thumb"
                style={{ backgroundImage: `url(${service.coverImage})` }}
              />
            </div>

            <div className="service-detail-gallery__item">
              <div className="service-detail-gallery__placeholder">
                Render / UI Still
              </div>
            </div>

            <div className="service-detail-gallery__item">
              <div className="service-detail-gallery__placeholder">
                Motion Frame
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}