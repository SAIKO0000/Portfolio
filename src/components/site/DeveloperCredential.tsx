'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const HORIZONTAL_SENSITIVITY = 0.9;
const VERTICAL_SENSITIVITY = 0.24;
const VERTICAL_TILT_LIMIT = 15;
const INERTIA_DURATION = 360;
const SETTLE_DELAY = 900;

type Rotation = {
  x: number;
  y: number;
};

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

export function DeveloperCredential() {
  const [flipped, setFlipped] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const rotationRef = useRef<Rotation>({ x: 0, y: 0 });
  const pendingRotationRef = useRef<Rotation>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const inertiaFrameRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startRotation: Rotation;
    lastX: number;
    lastY: number;
    lastTime: number;
    velocityX: number;
    velocityY: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    if (inertiaFrameRef.current !== null) cancelAnimationFrame(inertiaFrameRef.current);
    if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    if (cleanupTimerRef.current !== null) clearTimeout(cleanupTimerRef.current);
  }, []);

  const setRotation = (rotation: Rotation) => {
    rotationRef.current = rotation;
    cardRef.current?.style.setProperty('--credential-rotation-x', `${rotation.x}deg`);
    cardRef.current?.style.setProperty('--credential-rotation-y', `${rotation.y}deg`);
  };

  const scheduleRotation = (rotation: Rotation) => {
    pendingRotationRef.current = rotation;
    if (animationFrameRef.current !== null) return;

    animationFrameRef.current = requestAnimationFrame(() => {
      setRotation(pendingRotationRef.current);
      animationFrameRef.current = null;
    });
  };

  const cancelPassiveMotion = () => {
    if (inertiaFrameRef.current !== null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
    if (settleTimerRef.current !== null) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  };

  const clearWillChange = () => {
    if (cleanupTimerRef.current !== null) clearTimeout(cleanupTimerRef.current);
    cleanupTimerRef.current = setTimeout(() => {
      if (cardRef.current) cardRef.current.style.willChange = '';
      cleanupTimerRef.current = null;
    }, 560);
  };

  const settleAt = (rotation: Rotation) => {
    cancelPassiveMotion();
    const halfTurns = Math.round(rotation.y / 180);
    const settledRotation = halfTurns * 180;

    if (cardRef.current) {
      cardRef.current.dataset.dragging = 'false';
      cardRef.current.style.willChange = 'transform';
    }
    if (buttonRef.current) buttonRef.current.dataset.dragging = 'false';

    setRotation({ x: 0, y: settledRotation });
    setFlipped(Math.abs(halfTurns % 2) === 1);
    clearWillChange();
  };

  const scheduleReadableSettle = () => {
    if (settleTimerRef.current !== null) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      settleTimerRef.current = null;
      settleAt(rotationRef.current);
    }, SETTLE_DELAY);
  };

  const startInertia = (velocityX: number, velocityY: number) => {
    const card = cardRef.current;
    if (!card || (Math.abs(velocityX) < 0.004 && Math.abs(velocityY) < 0.01)) {
      if (card) card.dataset.dragging = 'false';
      clearWillChange();
      scheduleReadableSettle();
      return;
    }

    card.dataset.dragging = 'true';
    card.style.willChange = 'transform';
    let previousTime = performance.now();
    const startTime = previousTime;
    let currentVelocityX = clamp(velocityX, -0.16, 0.16);
    let currentVelocityY = clamp(velocityY, -1.2, 1.2);

    const step = (time: number) => {
      const deltaTime = Math.min(time - previousTime, 32);
      const elapsed = time - startTime;
      previousTime = time;

      setRotation({
        x: clamp(
          rotationRef.current.x + currentVelocityX * deltaTime,
          -VERTICAL_TILT_LIMIT,
          VERTICAL_TILT_LIMIT,
        ),
        y: rotationRef.current.y + currentVelocityY * deltaTime,
      });

      const damping = Math.exp(-deltaTime / 105);
      currentVelocityX *= damping;
      currentVelocityY *= damping;

      if (
        elapsed < INERTIA_DURATION
        && (Math.abs(currentVelocityX) >= 0.004 || Math.abs(currentVelocityY) >= 0.01)
      ) {
        inertiaFrameRef.current = requestAnimationFrame(step);
        return;
      }

      inertiaFrameRef.current = null;
      card.dataset.dragging = 'false';
      clearWillChange();
      scheduleReadableSettle();
    };

    inertiaFrameRef.current = requestAnimationFrame(step);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cancelPassiveMotion();
    if (cleanupTimerRef.current !== null) {
      clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRotation: { ...rotationRef.current },
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: event.timeStamp,
      velocityX: 0,
      velocityY: 0,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.dataset.dragging = 'true';
    if (cardRef.current) {
      cardRef.current.dataset.dragging = 'true';
      cardRef.current.style.willChange = 'transform';
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (Math.hypot(deltaX, deltaY) > 4) drag.moved = true;

    const elapsed = Math.max(event.timeStamp - drag.lastTime, 1);
    drag.velocityX = clamp(
      ((drag.lastY - event.clientY) * VERTICAL_SENSITIVITY) / elapsed,
      -0.16,
      0.16,
    );
    drag.velocityY = clamp(
      ((event.clientX - drag.lastX) * HORIZONTAL_SENSITIVITY) / elapsed,
      -1.2,
      1.2,
    );
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = event.timeStamp;

    scheduleRotation({
      x: clamp(
        drag.startRotation.x - deltaY * VERTICAL_SENSITIVITY,
        -VERTICAL_TILT_LIMIT,
        VERTICAL_TILT_LIMIT,
      ),
      y: drag.startRotation.y + deltaX * HORIZONTAL_SENSITIVITY,
    });
  };

  const finishDrag = (event: ReactPointerEvent<HTMLButtonElement>, cancelled = false) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      setRotation(pendingRotationRef.current);
    }

    suppressClickRef.current = drag.moved && !cancelled;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.dataset.dragging = 'false';

    if (cancelled) {
      if (cardRef.current) cardRef.current.dataset.dragging = 'false';
      settleAt(rotationRef.current);
      return;
    }

    if (drag.moved) {
      const releaseDelay = event.timeStamp - drag.lastTime;
      startInertia(
        releaseDelay > 80 ? 0 : drag.velocityX,
        releaseDelay > 80 ? 0 : drag.velocityY,
      );
    } else if (cardRef.current) {
      cardRef.current.dataset.dragging = 'false';
    }
  };

  const handleClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    settleAt({
      x: 0,
      y: Math.round(rotationRef.current.y / 180) * 180 + 180,
    });
  };

  return (
    <figure className="credential-stage">
      <span className="credential-stage__index" aria-hidden="true">MI / 01</span>
      <button
        ref={buttonRef}
        className="developer-credential"
        type="button"
        aria-pressed={flipped}
        data-dragging="false"
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={(event) => finishDrag(event, true)}
      >
        <span className="sr-only">{flipped ? 'Show front of developer credential' : 'Show reverse of developer credential'}</span>
        <span ref={cardRef} className="developer-credential__card" data-dragging="false">
          <span className="developer-credential__face developer-credential__face--front" aria-hidden={flipped}>
            <span className="developer-credential__rail">
              <strong>Frame / Shift</strong>
              <span>Builder credential</span>
            </span>
            <span className="developer-credential__front-grid">
              <span className="developer-credential__portrait">
                <Image
                  src="/portrait2.jpg"
                  alt="Portrait of Mark Daniel Iguban"
                  fill
                  sizes="(min-width: 1024px) 128px, 30vw"
                />
              </span>
              <span className="developer-credential__identity">
                <small>01 / Identity</small>
                <strong>Mark Daniel<br />Iguban</strong>
                <span>Software engineer</span>
              </span>
            </span>
            <span className="developer-credential__facts">
              <span><small>Base</small><strong>Philippines / Remote</strong></span>
              <span><small>Focus</small><strong>Full-stack · Computer vision</strong></span>
              <span><small>Status</small><strong>Open to full-time roles</strong></span>
            </span>
          </span>

          <span className="developer-credential__face developer-credential__face--back" aria-hidden={!flipped}>
            <span className="developer-credential__rail">
              <strong>Off hours / 02</strong>
              <span>Reverse side</span>
            </span>
            <span className="developer-credential__back-copy">
              <small>Usually found</small>
              <strong>Reading manga and manhwa, playing games, watching animation, or training calisthenics.</strong>
            </span>
            <span className="developer-credential__back-footer">
              <span>Unofficial credential.</span>
              <strong>Verified builder.</strong>
            </span>
          </span>

          <span className="developer-credential__edge developer-credential__edge--top" aria-hidden="true" />
          <span className="developer-credential__edge developer-credential__edge--right" aria-hidden="true" />
          <span className="developer-credential__edge developer-credential__edge--bottom" aria-hidden="true" />
          <span className="developer-credential__edge developer-credential__edge--left" aria-hidden="true" />
        </span>
      </button>
      <figcaption>Drag to orbit · click or tap for the {flipped ? 'front' : 'reverse'}.</figcaption>
    </figure>
  );
}
