"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TimelineItem = {
  id: string;
  label: string;
  point: number;
};

type SceneTimelineControllerProps = {
  items: TimelineItem[];
  progress: number;
  onProgressChange: (value: number) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function nearestPoint(value: number, points: number[]) {
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

export default function SceneTimelineController({
  items,
  progress,
  onProgressChange,
}: SceneTimelineControllerProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const axisLockedRef = useRef<"x" | "y" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const snapPoints = useMemo(() => items.map((item) => item.point), [items]);

  function updateFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const nextProgress = rect.width === 0 ? 0 : x / rect.width;

    onProgressChange(clamp(nextProgress, 0, 1));
  }

  function startDrag(clientX: number) {
    draggingRef.current = true;
    setIsDragging(true);
    updateFromClientX(clientX);
  }

  function moveDrag(clientX: number) {
    if (!draggingRef.current) return;
    updateFromClientX(clientX);
  }

  function endDrag() {
  if (!draggingRef.current) return;

  draggingRef.current = false;
  axisLockedRef.current = null;
  setIsDragging(false);

  const snapped = nearestPoint(progress, snapPoints);
  onProgressChange(snapped);
}

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    startDrag(event.clientX);
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
  const touch = event.touches[0];
  if (!touch) return;

  startXRef.current = touch.clientX;
  startYRef.current = touch.clientY;
  axisLockedRef.current = null;

  draggingRef.current = true;
  setIsDragging(true);
}

  function handleItemClick(point: number) {
    if (isDragging) return;
    onProgressChange(point);
  }

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      moveDrag(event.clientX);
    }

    function handleMouseUp() {
      endDrag();
    }

    function handleTouchMove(event: TouchEvent) {
    if (!draggingRef.current) return;

    const touch = event.touches[0];
    if (!touch) return;

    const dx = Math.abs(touch.clientX - startXRef.current);
    const dy = Math.abs(touch.clientY - startYRef.current);

    // lock asse solo dopo un minimo movimento
    if (!axisLockedRef.current) {
        if (dx > 8 || dy > 8) {
        axisLockedRef.current = dx > dy ? "x" : "y";
        }
    }

    // se gesto verticale → lascia scroll pagina
    if (axisLockedRef.current === "y") {
        endDrag();
        return;
    }

    // se gesto orizzontale → blocca scroll e aggiorna timeline
    if (axisLockedRef.current === "x") {
        event.preventDefault();
        moveDrag(touch.clientX);
    }
    }

    function handleTouchEnd() {
      endDrag();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [progress, snapPoints, onProgressChange]);

  const activeIndex =
    progress < 0.25 ? 0 : progress < 0.75 ? 1 : 2;

  return (
    <div className={`scene-timeline ${isDragging ? "is-dragging" : ""}`}>
      <div className="scene-timeline__top">
        <span className="scene-timeline__label">Scene Controller</span>
        <span className="scene-timeline__value">
          {items[activeIndex]?.label}
        </span>
      </div>

      <div
        ref={trackRef}
        className="scene-timeline__track"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="scene-timeline__rail" />
        <div
          className="scene-timeline__fill"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div
          className="scene-timeline__thumb"
          style={{ left: `${progress * 100}%` }}
        />

        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`scene-timeline__stop ${
              activeIndex >= items.findIndex((x) => x.id === item.id)
                ? "is-passed"
                : ""
            }`}
            style={{ left: `${item.point * 100}%` }}
            onClick={() => handleItemClick(item.point)}
            aria-label={`Vai a ${item.label}`}
          />
        ))}
      </div>

      <div className="scene-timeline__items">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`scene-timeline__item ${
              index === activeIndex ? "is-active" : ""
            }`}
            onClick={() => handleItemClick(item.point)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}