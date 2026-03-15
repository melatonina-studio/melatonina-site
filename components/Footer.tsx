import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-logo site-logo--footer">
              <Logo />
            </Link>

            <p>
              Spatial web experiences, event systems e interactive commerce con
              una sensibilità più scenografica che corporate.
            </p>
          </div>

          <div className="site-footer__nav">
            <span className="site-footer__title">Navigate</span>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="site-footer__nav">
            <span className="site-footer__title">Contact</span>
            <a href="mailto:hello@melatonina.design">hello@melatonina.design</a>
            <span>Catania / Calabria / Remote</span>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© 2025 melatonina.design</span>
          <span>Built with Next.js</span>
        </div>
      </Container>
    </footer>
  );
}