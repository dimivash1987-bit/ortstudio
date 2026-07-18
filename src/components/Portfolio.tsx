"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export type PortfolioProject = {
  slug: string;
  title: string;
  location: string;
  cover: string;
  images: string[];
};

type PortfolioProps = {
  projects: PortfolioProject[];
};

export function Portfolio({ projects }: PortfolioProps) {
  const [active, setActive] = useState<PortfolioProject | null>(null);
  const [index, setIndex] = useState(0);

  const close = useCallback(() => setActive(null), []);
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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <section id="portfolio" className="scroll-mt-24 px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.18em] text-accent">Портфолио</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Реализованные пространства
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            Квартиры, дома и специальные объекты — от планировки до финального
            образа интерьера.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => {
                setActive(project);
                setIndex(0);
              }}
              className="group text-left"
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
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="text-lg text-ink">{project.title}</h3>
                <span className="shrink-0 text-sm text-ink-muted">{project.location}</span>
              </div>
              <p className="mt-1 text-sm text-ink-muted">
                {project.images.length} фото
              </p>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 md:right-8 md:top-8"
            onClick={close}
          >
            Закрыть
          </button>

          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-6 text-white hover:bg-white/20 md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>

          <div
            className="relative h-[70vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.images[index]}
              alt={`${active.title} — фото ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
            <p className="absolute inset-x-0 -bottom-10 text-center text-sm text-white/80">
              {active.title} · {index + 1} / {active.images.length}
            </p>
          </div>

          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-6 text-white hover:bg-white/20 md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее фото"
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
