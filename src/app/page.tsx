import { Advantages } from "@/components/Advantages";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Portfolio, type PortfolioProject } from "@/components/Portfolio";
import { Pricing } from "@/components/Pricing";
import portfolioData from "@/data/portfolio.json";

const titleOverrides: Record<string, string> = {
  "03-dvuhurovnevaya-kvartira-v-zhk-zelenaya-gavan":
    "квартира в ЖК Зеленая Гавань",
};

const projects = (portfolioData as PortfolioProject[]).map((p) => ({
  ...p,
  title: titleOverrides[p.slug] ?? p.title,
}));

const heroImage = projects[0]?.cover ?? "/portfolio/placeholder.webp";

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
