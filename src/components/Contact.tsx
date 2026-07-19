import { site } from "@/data/site";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

export function Contact() {
  return (
    <section
      id="contacts"
      className="scroll-mt-24 border-t border-line bg-bg-elevated px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading>Контакты</SectionHeading>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
            Напишите или позвоните — расскажем о формате работы и подготовим
            ориентир по срокам и стоимости.
          </p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-ink-muted">Телефон</dt>
              <dd className="mt-1">
                <a
                  href={site.phoneHref}
                  className="text-xl text-ink transition-colors hover:text-accent md:text-2xl"
                >
                  {site.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Email</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${site.email}`}
                  className="text-xl text-ink transition-colors hover:text-accent md:text-2xl"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Город</dt>
              <dd className="mt-1 text-xl text-ink md:text-2xl">{site.city}</dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={site.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-ink transition-colors hover:text-accent md:text-2xl"
                >
                  {site.instagram.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">Telegram</dt>
              <dd className="mt-1">
                <a
                  href={site.telegram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-ink transition-colors hover:text-accent md:text-2xl"
                >
                  {site.telegram.label}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="border border-line bg-bg p-6 md:p-8">
          <h3 className="text-2xl font-medium text-ink">Форма заявки</h3>
          <p className="mt-2 text-sm text-ink-muted">
            Заявка придёт на {site.email}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
