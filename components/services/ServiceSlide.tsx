import Link from "next/link";
import type { Service } from "@/content/services";

type ServiceSlideProps = {
  service: Service;
};

export default function ServiceSlide({ service }: ServiceSlideProps) {
  return (
    <article className={`service-slide accent-${service.accent}`}>
      <div className="service-slide__inner">
        <div className="service-slide__copy">
          <div className="service-slide__topline">
            <span className="service-slide__index">{service.index}</span>
            <span className="service-slide__label">Service</span>
          </div>

          <h2>{service.title}</h2>
          <p className="service-slide__subtitle">{service.subtitle}</p>
          <p className="service-slide__description">{service.description}</p>

          <div className="service-slide__tags">
            {service.tags.map((tag) => (
              <span key={tag} className="service-slide__tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="service-slide__actions">
            <Link
              href={`/services/${service.slug}`}
              className="button button-primary"
            >
              Open service
            </Link>
          </div>
        </div>

        <div className="service-slide__visual">
          <div className="service-slide__frame">
            <div
              className="service-slide__image"
              style={{ backgroundImage: `url(${service.coverImage})` }}
            />
            <div className="service-slide__overlay" />
            <div className="service-slide__meta">
              <span>{service.shortTitle}</span>
              <span>{service.tags[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}