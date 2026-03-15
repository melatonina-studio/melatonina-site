"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Logo from "@/components/Logo";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <Container>
        <div className="site-header__inner">
          <Link
            href="/"
            className="site-logo"
            aria-label="Vai alla home"
            onClick={closeMenu}
          >
            <Logo priority />
          </Link>

          <button
            type="button"
            className="site-header__toggle"
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`site-nav ${isOpen ? "is-open" : ""}`}
            aria-label="Navigazione principale"
          >
            <Link href="/services" onClick={closeMenu}>
              Services
            </Link>
            <Link href="/#projects" onClick={closeMenu}>
              Projects
            </Link>
            <Link href="/#contact" onClick={closeMenu}>
              Contact
            </Link>
            <Link
              href="/#contact"
              className="button button-secondary site-nav__cta"
              onClick={closeMenu}
            >
              Start a project
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}