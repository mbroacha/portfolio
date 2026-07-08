import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "../../lib/cn";

interface BeforeAfterPanel {
  label: string;
  src: string;
  alt: string;
  caption?: string;
}

interface BeforeAfterComparisonProps {
  before: BeforeAfterPanel;
  after: BeforeAfterPanel;
  /** Initial divider position, 0–100. */
  defaultPosition?: number;
}

export const BeforeAfterComparison = ({
  before,
  after,
  defaultPosition = 50,
}: BeforeAfterComparisonProps) => {
  const sliderId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(defaultPosition);
  const [containerWidth, setContainerWidth] = useState(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => setContainerWidth(el.offsetWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const setPositionFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setPosition(next);
  }, []);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      isDraggingRef.current = true;
      containerRef.current?.setPointerCapture(event.pointerId);
      setPositionFromClientX(event.clientX);
    },
    [setPositionFromClientX],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!isDraggingRef.current) return;
      setPositionFromClientX(event.clientX);
    },
    [setPositionFromClientX],
  );

  const onPointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    isDraggingRef.current = false;
    containerRef.current?.releasePointerCapture(event.pointerId);
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - step));
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + step));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  }, []);

  const hasCaptions = before.caption || after.caption;

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={containerRef}
        className="relative cursor-ew-resize overflow-hidden rounded-lg border border-hedge bg-moss touch-none select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={after.src}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none block h-auto w-full"
          loading="lazy"
        />

        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%` }}
          aria-hidden
        >
          <img
            src={before.src}
            alt=""
            draggable={false}
            className="pointer-events-none block max-w-none"
            style={{ width: containerWidth > 0 ? containerWidth : "100%" }}
            loading="lazy"
          />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-moss/90 px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-mono text-glow">
          {before.label}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-moss/90 px-2 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-mono text-glow">
          {after.label}
        </span>

        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
          style={{ left: `${position}%` }}
          aria-hidden
        />

        <button
          type="button"
          id={sliderId}
          role="slider"
          aria-label={`Compare ${before.label} and ${after.label}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% ${before.label}, ${Math.round(100 - position)}% ${after.label}`}
          className={cn(
            "absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
            "border border-line/80 bg-bg shadow-[0_4px_16px_-4px_rgba(0,0,0,0.35)]",
            "cursor-ew-resize transition-shadow hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.4)]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          )}
          style={{ left: `${position}%` }}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        >
          <span className="flex items-center gap-0.5 text-ink/70" aria-hidden>
            <span className="h-3 w-0.5 rounded-full bg-current" />
            <span className="h-3 w-0.5 rounded-full bg-current" />
          </span>
        </button>

        <p className="sr-only">
          {before.alt} Compared with {after.alt}. Drag the slider or use arrow keys to reveal more of each image.
        </p>
      </div>

      {hasCaptions ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {before.caption ? (
            <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
              <span className="font-medium text-ink">{before.label}:</span> {before.caption}
            </figcaption>
          ) : null}
          {after.caption ? (
            <figcaption className="max-w-prose text-sm leading-relaxed text-subtext">
              <span className="font-medium text-ink">{after.label}:</span> {after.caption}
            </figcaption>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
};
