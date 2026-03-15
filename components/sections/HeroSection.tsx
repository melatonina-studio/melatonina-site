"use client";

import { useMemo, useRef, useState } from "react";
import { siteContent } from "@/content/site";
import Container from "@/components/Container";
import ExperienceShell from "@/components/three/ExperienceShell";
import ScenePlaceholder from "@/components/three/ScenePlaceholder";

const SCENES = [
  { id: "spatial", label: "Spatial Web", point: 0 },
  { id: "event", label: "Event Experiences", point: 0.5 },
  { id: "commerce", label: "Interactive Commerce", point: 1 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function nearestPoint(value: number, points: number[]) {
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

function getActiveScene(progress: number) {
  if (progress < 0.25) return "spatial";
  if (progress < 0.75) return "event";
  return "commerce";
}

export default function HeroSection() {
  const { hero } = siteContent;
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const startXRef = useRef(0);
  const startProgressRef = useRef(0);
  const draggingRef = useRef(false);

  const activeScene = useMemo(() => getActiveScene(progress), [progress]);

  const currentLabel =
    SCENES.find((scene) => scene.id === activeScene)?.label ?? "Spatial Web";

  const variant =
    activeScene === "event"
      ? "event"
      : activeScene === "commerce"
      ? "commerce"
      : "spatial";

  function handlePointerDown(clientX: number) {
    draggingRef.current = true;
    startXRef.current = clientX;
    startProgressRef.current = progress;
  }

  function handlePointerMove(clientX: number) {
    if (!draggingRef.current) return;

    const delta = clientX - startXRef.current;
    const sensitivity = 500;
    const next = clamp(startProgressRef.current + delta / sensitivity, 0, 1);
    setProgress(next);
  }

  function handlePointerUp() {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const snapped = nearestPoint(progress, SCENES.map((s) => s.point));
    setProgress(snapped);
  }

  return (
    <section className={`hero-stage-section ${isRevealed ? "is-revealed" : ""}`}>
      <Container>
        <ExperienceShell className="hero-stage-shell hero-stage-shell--fullscreen">
          <div
            className="hero-stage"
            onMouseDown={(e) => handlePointerDown(e.clientX)}
            onMouseMove={(e) => handlePointerMove(e.clientX)}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
            onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
            onTouchEnd={handlePointerUp}
          >
            <div className={`hero-stage__visual hero-stage__visual--${variant}`}>
              <ScenePlaceholder
                label={`${currentLabel} — Main Stage`}
                variant={variant}
              />

              <div
                className="hero-stage__fx hero-stage__fx--spatial"
                style={{
                  opacity: Math.max(0, 1 - progress * 2),
                  transform: `translateX(${progress * -40}px) translateY(${progress * 12}px)`,
                }}
              />

              <div
                className="hero-stage__fx hero-stage__fx--event"
                style={{
                  opacity:
                    progress <= 0.5 ? progress * 2 : Math.max(0, 1 - (progress - 0.5) * 2),
                  transform: `translateY(${(0.5 - progress) * 80}px)`,
                }}
              />

              <div
                className="hero-stage__fx hero-stage__fx--commerce"
                style={{
                  opacity: Math.max(0, (progress - 0.5) * 2),
                  transform: `translateX(${(1 - progress) * 80}px) scale(${0.92 + progress * 0.08})`,
                }}
              />
            </div>

            <div className={`hero-overlay ${isRevealed ? "is-hidden" : ""}`}>
              <div className="hero-overlay__panel">
                <span className="eyebrow">{hero.eyebrow}</span>
                <p className="hero-intro">{hero.subtitle}</p>

                <div className="hero-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => setIsRevealed(true)}
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

            <div className="hero-scene-indicator">
              <span className="hero-scene-indicator__index">
                {activeScene === "spatial" ? "01" : activeScene === "event" ? "02" : "03"}
              </span>
              <span className="hero-scene-indicator__label">{currentLabel}</span>
            </div>
          </div>
        </ExperienceShell>
      </Container>
    </section>
  );
}