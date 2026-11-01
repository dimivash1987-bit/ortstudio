"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  featuredProjectSlugs,
  projectFacts,
} from "@/data/project-facts";

export type PortfolioProject = {
  slug: string;
  title: string;
  location?: string;
  cover: string;
  images: string[];
  order?: number;
};

type PortfolioProps = {
  projects: PortfolioProject[];
};

const SWIPE_THRESHOLD = 48;
const MIN_SCALE = 1;
const MAX_SCALE = 4;

function touchDistance(
  a: { clientX: number; clientY: number },
  b: { clientX: number; clientY: number },
) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

type ZoomableImageProps = {
  src: string;
  alt: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onRequestClose: () => void;
};

function ZoomableImage({
  src,
  alt,
  onSwipeLeft,
  onSwipeRight,
  onRequestClose,
}: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [gesturing, setGesturing] = useState(false);

  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });
  const pinchStartDist = useRef(0);
  const pinchStartScale = useRef(1);
  const panStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(
    null,
  );
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const lastTap = useRef(0);
  const moved = useRef(false);
  const suppressClick = useRef(false);
  const mouseDrag = useRef<{
    type: "swipe" | "pan";
    startX: number;
    startY: number;
    ox: number;
    oy: number;
  } | null>(null);

  const apply = useCallback((nextScale: number, nextOffset: { x: number; y: number }) => {
    const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
    const o = s === 1 ? { x: 0, y: 0 } : nextOffset;
    scaleRef.current = s;
    offsetRef.current = o;
    setScale(s);
    setOffset(o);
  }, []);

  useEffect(() => {
    apply(1, { x: 0, y: 0 });
  }, [src, apply]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = mouseDrag.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        moved.current = true;
        suppressClick.current = true;
      }
      if (drag.type === "pan") {
        apply(scaleRef.current, {
          x: drag.ox + dx,
          y: drag.oy + dy,
        });
      }
    };

    const onUp = (e: MouseEvent) => {
      const drag = mouseDrag.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (
        drag.type === "swipe" &&
        scaleRef.current <= 1 &&
        Math.abs(dx) >= SWIPE_THRESHOLD &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        suppressClick.current = true;
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }

      mouseDrag.current = null;
      setGesturing(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [apply, onSwipeLeft, onSwipeRight]);

  const onTouchStart = (e: ReactTouchEvent) => {
    e.stopPropagation();
    moved.current = false;
    setGesturing(true);

    if (e.touches.length === 2) {
      pinchStartDist.current = touchDistance(e.touches[0], e.touches[1]);
      pinchStartScale.current = scaleRef.current;
      panStart.current = null;
      swipeStart.current = null;
      return;
    }

    if (e.touches.length === 1) {
      const t = e.touches[0];
      if (scaleRef.current > 1) {
        panStart.current = {
          x: t.clientX,
          y: t.clientY,
          ox: offsetRef.current.x,
          oy: offsetRef.current.y,
        };
        swipeStart.current = null;
      } else {
        swipeStart.current = { x: t.clientX, y: t.clientY };
        panStart.current = null;
      }
    }
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    e.stopPropagation();

    if (e.touches.length === 2 && pinchStartDist.current > 0) {
      moved.current = true;
      const dist = touchDistance(e.touches[0], e.touches[1]);
      const next = pinchStartScale.current * (dist / pinchStartDist.current);
      apply(next, offsetRef.current);
      return;
    }

    if (e.touches.length === 1 && panStart.current && scaleRef.current > 1) {
      moved.current = true;
      const t = e.touches[0];
      apply(scaleRef.current, {
        x: panStart.current.ox + (t.clientX - panStart.current.x),
        y: panStart.current.oy + (t.clientY - panStart.current.y),
      });
    }

    if (e.touches.length === 1 && swipeStart.current) {
      const t = e.touches[0];
      if (
        Math.abs(t.clientX - swipeStart.current.x) > 10 ||
        Math.abs(t.clientY - swipeStart.current.y) > 10
      ) {
        moved.current = true;
      }
    }
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    e.stopPropagation();

    if (e.touches.length > 0) {
      if (e.touches.length === 1 && scaleRef.current > 1) {
        const t = e.touches[0];
        panStart.current = {
          x: t.clientX,
          y: t.clientY,
          ox: offsetRef.current.x,
          oy: offsetRef.current.y,
        };
      }
      return;
    }

    if (swipeStart.current && scaleRef.current <= 1) {
      const t = e.changedTouches[0];
      const dx = t.clientX - swipeStart.current.x;
      const dy = t.clientY - swipeStart.current.y;
      if (Math.abs(dx) >= SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onSwipeLeft();
        else onSwipeRight();
      }
    }

    if (!moved.current && e.changedTouches.length === 1) {
      const now = Date.now();
      if (now - lastTap.current < 280) {
        if (scaleRef.current > 1) {
          apply(1, { x: 0, y: 0 });
        } else {
          apply(2.5, { x: 0, y: 0 });
        }
        lastTap.current = 0;
      } else {
        lastTap.current = now;
      }
    }

    pinchStartDist.current = 0;
    panStart.current = null;
    swipeStart.current = null;
    setGesturing(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    moved.current = false;
    suppressClick.current = false;
    setGesturing(true);

    if (scaleRef.current > 1) {
      mouseDrag.current = {
        type: "pan",
        startX: e.clientX,
        startY: e.clientY,
        ox: offsetRef.current.x,
        oy: offsetRef.current.y,
      };
    } else {
      mouseDrag.current = {
        type: "swipe",
        startX: e.clientX,
        startY: e.clientY,
        ox: 0,
        oy: 0,
      };
    }
  };

  return (
    <div
      className={`absolute inset-0 z-[1] touch-none overflow-hidden ${
        scale > 1 ? "cursor-move" : "cursor-grab active:cursor-grabbing"
      }`}
      onClick={() => {
        if (suppressClick.current || moved.current) {
          suppressClick.current = false;
          return;
        }
        if (scaleRef.current > 1) {
          apply(1, { x: 0, y: 0 });
        } else {
          onRequestClose();
        }
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div className="flex h-full w-full items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1200}
          sizes="100vw"
          priority
          draggable={false}
          className="max-h-[100dvh] max-w-[100vw] object-contain select-none"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
            transition: gesturing ? "none" : "transform 0.2s ease",
            transformOrigin: "center center",
          }}
          onClick={(e) => {
            // клик по картинке не закрывает; после драга — не сбрасываем suppress
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            // начинаем жест с картинки (всплывёт в родителя через тот же handler — дублируем старт здесь не нужно)
            e.stopPropagation();
            onMouseDown(e);
          }}
        />
      </div>
    </div>
  );
}

export function Portfolio({ projects }: PortfolioProps) {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => {
    setActive(null);
    // Убираем фокус с кнопки проекта — иначе после Esc остаётся чёрная рамка
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);
  const prev = useCallback(() => {
    if (!active) return;
    setIndex((i) => (i - 1 + active.images.length) % active.images.length);
  }, [active]);
  const next = useCallback(() => {
    if (!active) return;
    setIndex((i) => (i + 1) % active.images.length);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  const featured = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is PortfolioProject => Boolean(project));
  const rest = projects.filter(
    (project) => !featuredProjectSlugs.includes(project.slug),
  );
  const visible = showAll ? [...featured, ...rest] : featured;

  return (
    <section id="portfolio" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading>Портфолио</SectionHeading>

        <div className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => {
            const fact = projectFacts[project.slug];
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => {
                  setActive(project);
                  setIndex(0);
                }}
                className="group text-left outline-none focus:outline-none focus-visible:outline-none"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-line">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-2 text-lg text-ink">{project.title}</h3>
                {fact ? (
                  <p className="mt-1 text-sm text-ink-muted">
                    {fact.place} · {fact.delivered}
                  </p>
                ) : null}
              </button>
            );
          })}
        </div>

        {rest.length > 0 ? (
          <button
            type="button"
            className="mt-10 rounded-full border border-line px-5 py-3 text-sm text-ink transition-colors hover:border-accent hover:text-accent-ink"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? "Свернуть" : `Ещё проекты · ${rest.length}`}
          </button>
        ) : null}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] bg-ink/90"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <ZoomableImage
            src={active.images[index]}
            alt={`${active.title} — фото ${index + 1}`}
            onSwipeLeft={next}
            onSwipeRight={prev}
            onRequestClose={close}
          />

          <button
            type="button"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 md:right-8 md:top-8"
            onClick={close}
          >
            Закрыть
          </button>

          <button
            type="button"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-3 py-5 text-2xl leading-none text-white hover:bg-white/20 md:left-6 md:py-6"
            onClick={prev}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>

          <button
            type="button"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 px-3 py-5 text-2xl leading-none text-white hover:bg-white/20 md:right-6 md:py-6"
            onClick={next}
            aria-label="Следующее фото"
          >
            ›
          </button>

          <p className="pointer-events-none absolute inset-x-0 bottom-6 z-20 text-center text-sm text-white/80">
            {active.title} · {index + 1} / {active.images.length}
          </p>
        </div>
      ) : null}
    </section>
  );
}
