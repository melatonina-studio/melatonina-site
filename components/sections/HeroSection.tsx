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
  const startProgressRef = useRef(0);

  const scene = useMemo(() => getScene(progress), [progress]);

  const sceneLabel =
    scene === "spatial"
      ? "Spatial Web"
      : scene === "event"
      ? "Event Experiences"
      : "Interactive Commerce";

  function beginDrag(clientX: number) {
    if (!revealed) return;
    setDragging(true);
    startXRef.current = clientX;
    startProgressRef.current = progress;
  }

  function updateDrag(clientX: number, width: number) {
    if (!revealed) return;
    const delta = clientX - startXRef.current;
    const next = clamp(startProgressRef.current + delta / width, 0, 1);
    setProgress(next);
  }

  function endDrag() {
    if (!revealed) return;
    setDragging(false);
    setProgress((prev) => nearestPoint(prev, [0, 0.5, 1]));
  }

  return (
    <section className="hero-stage-section">
      <Container>
        <div
          className={`hero-stage hero-stage--${scene} ${
            revealed ? "is-revealed" : "is-locked"
          }`}
          onPointerDown={(e) => {
            if (!revealed) return;
            const el = e.currentTarget;
            el.setPointerCapture(e.pointerId);
            beginDrag(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!dragging || !revealed) return;
            const rect = e.currentTarget.getBoundingClientRect();
            updateDrag(e.clientX, rect.width);
          }}
          onPointerUp={(e) => {
            if (!revealed) return;
            e.currentTarget.releasePointerCapture(e.pointerId);
            endDrag();
          }}
          onPointerCancel={(e) => {
            if (!revealed) return;
            e.currentTarget.releasePointerCapture(e.pointerId);
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
              <div className="hero-overlay__panel">
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
          )}

          <div className="hero-scene-indicator">
            <span className="hero-scene-indicator__index">
              {scene === "spatial" ? "01" : scene === "event" ? "02" : "03"}
            </span>
            <span className="hero-scene-indicator__label">{sceneLabel}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}