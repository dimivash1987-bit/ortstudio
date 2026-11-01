import Image from "next/image";
import { LeadForm } from "@/components/LeadForm";
import { pricingPackages } from "@/data/pricing";

type HeroProps = {
  imageSrc: string;
};

const offerPoints =
  pricingPackages[0]?.includes?.slice(0, 4) ?? [];

export function Hero({ imageSrc }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <Image
        src={imageSrc}
        alt="Интерьер, спроектированный ORTSTUDIO"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-end gap-8 px-5 pb-28 pt-24 md:px-8 md:pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <h1 className="max-w-xl text-4xl font-medium leading-tight text-white md:text-6xl">
            Дизайн-проект квартиры в Минске
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-snug text-white/90 md:text-2xl">
            Чертежи, которые можно отдать строителям. От 30 руб/м².
          </p>
          <ul className="mt-6 max-w-xl space-y-2 text-sm leading-relaxed text-white/85 md:text-base">
            {offerPoints.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="#portfolio"
            className="mt-6 inline-flex text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            Смотреть портфолио
          </a>
        </div>

        <div className="bg-bg p-6 md:p-8">
          <h2 className="text-2xl font-medium text-ink">Узнать стоимость</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Имя и телефон. Остальное уточним в разговоре.
          </p>
          <div className="mt-5">
            <LeadForm
              id="hero-form"
              message="Заявка с первого экрана"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
