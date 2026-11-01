import Image from "next/image";

const facts = [
  {
    value: "50+",
    label: "проектов",
    text: "Жилые и общественные объекты: от квартиры до пространства, которое нужно реализовать.",
  },
  {
    value: "15 лет",
    label: "в этой сфере",
    text: "Проектирование и реализация интерьеров, а не только визуализация.",
  },
  {
    value: "МГАСК и БНТУ",
    label: "архитектурное образование",
    text: "Высшее архитектурное образование руководителя студии.",
  },
];

const about = [
  "Дизайнер интерьера с высшим архитектурным образованием (МГАСК и БНТУ, архитектура).",
  "Имею более 15 лет опыта в проектировании и реализации как жилых, так и общественных объектов. В своей работе особое внимание уделяю эргономике и функциональному планированию пространства. Качественный и комфортный для жизни интерьер начинается с продуманного планировочного решения.",
  "У меня архитектурный, а не декораторский подход к интерьеру. Это значит, что я создаю интерьеры, опираясь на визуальные и функциональные свойства отделочных материалов, активно использую цвет и зональные световые решения. Мои интерьеры не строятся вокруг красиво расставленного декора, картины или ярких подушек на диване, которые убрал и всё развалилось. В моих интерьерах есть опциональность.",
  "Мои знания и опыт позволяют мне создавать комфортные, технически продуманные и эстетически актуальные проекты, вписываясь в бюджет и оговорённые сроки.",
];

export function Trust() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-line bg-bg px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-line pt-5">
              <p className="text-3xl font-medium text-accent">{fact.value}</p>
              <p className="mt-1 text-lg font-medium text-ink">{fact.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                {fact.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-line">
            <Image
              src="/about/director.jpg"
              alt="Руководитель студии ORTSTUDIO"
              fill
              sizes="(max-width: 1024px) 100vw, 280px"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div>
            <p className="text-sm text-ink-muted">Руководитель студии</p>
            <h2 className="mt-2 text-3xl font-medium text-ink md:text-4xl">
              Дизайнер интерьера
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
              {about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
