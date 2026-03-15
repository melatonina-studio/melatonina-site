"use client";

import { useMemo, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import Container from "@/components/Container";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function nearestPoint(value: number, points: number[]) {
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

function getScene(progress: number) {
  if (progress < 0.25) return "spatial";
  if (progress < 0.75) return "event";
  return "commerce";
}

export default function HeroSection() {
  const { hero } = siteContent;

  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const axisRef = useRef<"x" | "y" | null>(null);

  const scene = useMemo(() => getScene(progress), [progress]);

  const sceneLabel =
    scene === "spatial"
      ? "Spatial Web"
      : scene === "event"
      ? "Event Experiences"
      : "Interactive Commerce";

  function beginDrag(clientX: number, clientY: number) {
    if (!revealed) return;

    setDragging(true);
    startXRef.current = clientX;
    startYRef.current = clientY;
    startProgressRef.current = progress;
    axisRef.current = null;
  }

  function updateDrag(clientX: number, clientY: number, width: number) {
    if (!revealed) return;

    const dx = clientX - startXRef.current;
    const dy = clientY - startYRef.current;

    if (!axisRef.current) {
      const threshold = 8;
      if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
        axisRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }

    if (axisRef.current === "y") return;

    if (axisRef.current === "x") {
      const sensitivity = 1.6;
      const next = clamp(
        startProgressRef.current + (dx / width) * sensitivity,
        0,
        1
      );
      setProgress(next);
    }
  }

  function endDrag() {
    if (!revealed) return;

    if (axisRef.current === "x") {
      setProgress((prev) => nearestPoint(prev, [0, 0.5, 1]));
    }

    setDragging(false);
    axisRef.current = null;
  }

  return (
    <section className="hero-stage-section">
      <div
        className={`hero-stage hero-stage--${scene} ${
          revealed ? "is-revealed" : "is-locked"
        } ${dragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => {
          if (!revealed) return;
          beginDrag(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (!dragging || !revealed) return;
          const rect = e.currentTarget.getBoundingClientRect();
          updateDrag(e.clientX, e.clientY, rect.width);
        }}
        onPointerUp={() => {
          if (!revealed) return;
          endDrag();
        }}
        onPointerCancel={() => {
          if (!revealed) return;
          endDrag();
        }}
      >
        <div className="hero-stage__grid" />

        <div
          className="hero-stage__glow"
          style={{
            transform: `translateX(${progress * 180 - 90}px)`,
          }}
        />

        <div
          className="hero-stage__fx hero-stage__fx--spatial"
          style={{
            opacity: Math.max(0, 1 - progress * 2),
            transform: `translateX(${progress * -50}px) translateY(${progress * 10}px)`,
          }}
        />

        <div
          className="hero-stage__fx hero-stage__fx--event"
          style={{
            opacity:
              progress <= 0.5
                ? progress * 2
                : Math.max(0, 1 - (progress - 0.5) * 2),
            transform: `translateY(${(0.5 - progress) * 80}px)`,
          }}
        />

        <div
          className="hero-stage__fx hero-stage__fx--commerce"
          style={{
            opacity: Math.max(0, (progress - 0.5) * 2),
            transform: `translateX(${(1 - progress) * 70}px) scale(${
              0.92 + progress * 0.08
            })`,
          }}
        />

        {!revealed && (
          <div className="hero-overlay">
            <Container>
              <div className="hero-overlay__panel">
                <div className="hero-overlay__grid">
                  <div className="hero-overlay__content">
                    <span className="eyebrow">{hero.eyebrow}</span>
                    <p className="hero-intro">{hero.subtitle}</p>

                    <div className="hero-actions">
                      <button
                        type="button"
                        className="button button-primary"
                        onClick={() => setRevealed(true)}
                      >
                        Enter stage
                      </button>

                      <a
                        href={hero.secondaryCta.href}
                        className="button button-secondary"
                      >
                        {hero.secondaryCta.label}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}

        {revealed && (
          <div className="hero-scene-indicator">
            <span className="hero-scene-indicator__index">
              {scene === "spatial" ? "01" : scene === "event" ? "02" : "03"}
            </span>
            <span className="hero-scene-indicator__label">{sceneLabel}</span>
          </div>
        )}
      </div>
    </section>
  );
}