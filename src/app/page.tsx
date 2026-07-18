import { Advantages } from "@/components/Advantages";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Portfolio, type PortfolioProject } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import portfolioData from "@/data/portfolio.json";

const titleOverrides: Record<string, string> = {
  "apartments-1": "Апартаменты I",
  "apartments-2": "Апартаменты II",
  "zg-1": "Квартира ЗГ I",
  "zg-2": "Квартира ЗГ II",
  "zg-3": "Квартира ЗГ III",
  "dom-ny": "Загородный дом",
};

const projects: PortfolioProject[] = (portfolioData as PortfolioProject[]).map(
  (p) => ({
    ...p,
    title: titleOverrides[p.slug] ?? p.title,
  }),
);

const heroImage = "/portfolio/kolodishchi/kgc16.webp";

export default function Home() {
  return (
    <main>
      <Hero imageSrc={heroImage} />
      <Portfolio projects={projects} />
      <Advantages />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
