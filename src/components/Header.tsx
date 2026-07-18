"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#advantages", label: "Подход" },
  { href: "#pricing", label: "Стоимость" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const barSolid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          barSolid
            ? "border-b border-line/80 bg-bg/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a
            href="#top"
            className={`relative z-50 text-lg font-medium uppercase tracking-[0.06em] md:text-xl ${
              barSolid ? "text-ink" : "text-white"
            }`}
            onClick={() => setOpen(false)}
          >
            {site.name}
          </a>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Основная навигация"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  barSolid
                    ? "text-ink-muted hover:text-ink"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacts"
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                barSolid
                  ? "bg-ink text-bg hover:bg-accent"
                  : "bg-white text-ink hover:bg-accent hover:text-white"
              }`}
            >
              Заявка
            </a>
          </nav>

          <button
            type="button"
            className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span
              className={`absolute h-0.5 w-5 rounded-full transition-transform duration-200 ${
                barSolid ? "bg-ink" : "bg-white"
              } ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full transition-opacity duration-200 ${
                barSolid ? "bg-ink" : "bg-white"
              } ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full transition-transform duration-200 ${
                barSolid ? "bg-ink" : "bg-white"
              } ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </div>
      </header>

      {/* Overlay вне header — иначе backdrop-filter ломает fixed на мобильных */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-bg md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        } transition-opacity duration-300`}
        aria-hidden={!open}
      >
        <nav
          className="flex h-dvh flex-col justify-center gap-6 px-8 pt-16"
          aria-label="Мобильная навигация"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-medium text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="mt-2 w-fit rounded-full bg-accent px-5 py-3 text-sm text-white"
            onClick={() => setOpen(false)}
          >
            Оставить заявку
          </a>
        </nav>
      </div>
    </>
  );
}
