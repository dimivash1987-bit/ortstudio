import Image from "next/image";
import { site } from "@/data/site";

type HeroProps = {
  imageSrc: string;
};

export function Hero({ imageSrc }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={imageSrc}
        alt="Интерьер, спроектированный ORTSTUDIO"
        fill
        priority
        sizes="100vw"
        className="object-cover animate-fade"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/35 to-ink/20" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24">
        <p className="animate-rise text-4xl font-medium uppercase tracking-[0.04em] text-white md:text-6xl lg:text-7xl">
          {site.name}
        </p>
        <h1 className="animate-rise animate-delay-1 mt-4 max-w-2xl text-xl font-medium leading-snug text-white/95 md:text-3xl">
          Авторский дизайн интерьера в Минске
        </h1>
        <p className="animate-rise animate-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          Дизайн интерьера от проекта до воплощения
        </p>
        <div className="animate-rise animate-delay-3 mt-8 flex flex-wrap gap-3">
          <a
            href="#contacts"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-ink"
          >
            Обсудить проект
          </a>
          <a
            href="#portfolio"
            className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Смотреть портфолио
          </a>
        </div>
      </div>
    </section>
  );
}
