"use client";

import { useMemo, useState } from "react";
import { siteContent } from "@/content/site";
import Container from "@/components/Container";
import ExperienceShell from "@/components/three/ExperienceShell";
import ScenePlaceholder from "@/components/three/ScenePlaceholder";
import SceneTimelineController from "@/components/three/SceneTimelineController";

const SCENES = [
  { id: "spatial", label: "Spatial Web", point: 0 },
  { id: "event", label: "Event Experiences", point: 0.5 },
  { id: "commerce", label: "Interactive Commerce", point: 1 },
] as const;

function getActiveScene(progress: number) {
  if (progress < 0.25) return "spatial";
  if (progress < 0.75) return "event";
  return "commerce";
}

export default function HeroSection() {
  const { hero } = siteContent;
  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeScene = useMemo(() => getActiveScene(progress), [progress]);

  const currentLabel =
    SCENES.find((scene) => scene.id === activeScene)?.label ?? "Spatial Web";

  const variant =
    activeScene === "event"
      ? "event"
      : activeScene === "commerce"
      ? "commerce"
      : "spatial";

  return (
    <section className={`hero-stage-section ${isRevealed ? "is-revealed" : ""}`}>
      <Container>
        <ExperienceShell className="hero-stage-shell hero-stage-shell--fullscreen">
          <div className="hero-stage">
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

            <div className="hero-stage__menu">
              <SceneTimelineController
                progress={progress}
                onProgressChange={setProgress}
                items={SCENES.map((scene) => ({
                  id: scene.id,
                  label: scene.label,
                  point: scene.point,
                }))}
              />
            </div>
          </div>
        </ExperienceShell>
      </Container>
    </section>
  );
}