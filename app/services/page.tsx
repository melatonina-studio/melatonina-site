import Container from "@/components/Container";
import ServiceSlide from "@/components/services/ServiceSlide";
import { services } from "@/content/services";

export default function ServicesPage() {
  return (
    <main className="services-page">
      <section className="services-hero">
        <Container>
          <div className="services-hero__inner">
            <span className="eyebrow">Services</span>
            <h1>Three directions, one stage.</h1>
            <p>
              Una hall orizzontale di servizi pensata come experience layer:
              evento, spazio, commercio.
            </p>
          </div>
        </Container>
      </section>

      <section className="services-slider-section">
        <div className="services-slider">
          {services.map((service) => (
            <ServiceSlide key={service.slug} service={service} />
          ))}
        </div>
      </section>
    </main>
  );
}