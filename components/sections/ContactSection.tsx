import Container from "@/components/Container";
import { siteContent } from "@/content/site";

export default function ContactSection() {
  const { contact } = siteContent;

  return (
    <section className="contact-section" id="contact">
      <Container>
        <div className="contact-box">
          <span className="eyebrow">Contact</span>
          <h2>{contact.title}</h2>
          <p>{contact.text}</p>
          <a href={contact.ctaHref} className="button button-primary">
            {contact.ctaLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}