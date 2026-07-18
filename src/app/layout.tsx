import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import "./globals.css";

const display = Cormorant_Garamond({
  weight: ["500", "600"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-display-family",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body-family",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — дизайн интерьера в Минске`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "дизайн интерьера Минск",
    "дизайн-проект квартиры",
    "авторский надзор",
    "ORT Studio",
    "визуализация интерьера",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — дизайн интерьера в Минске`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — дизайн интерьера в Минске`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: "BY",
  },
  areaServed: {
    "@type": "City",
    name: "Минск",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full bg-bg font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
