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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line/80 bg-bg/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <a
          href="#top"
          className="text-lg font-medium uppercase tracking-[0.06em] text-ink md:text-xl"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Основная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="rounded-full bg-ink px-4 py-2 text-sm text-bg transition-colors hover:bg-accent"
          >
            Заявка
          </a>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <span
            className={`absolute h-px w-5 bg-ink transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`}
          />
          <span
            className={`absolute h-px w-5 bg-ink transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-px w-5 bg-ink transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-bg transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-6 px-8" aria-label="Мобильная навигация">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-medium uppercase tracking-[0.04em] text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacts"
            className="mt-4 w-fit rounded-full bg-accent px-5 py-3 text-sm text-white"
            onClick={() => setOpen(false)}
          >
            Оставить заявку
          </a>
        </nav>
      </div>
    </header>
  );
}
