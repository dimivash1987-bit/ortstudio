import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import "./globals.css";

const harmony = localFont({
  src: [
    {
      path: "../../public/fonts/harmonyos-sans/HarmonyOS_Sans_Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/harmonyos-sans/HarmonyOS_Sans_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/harmonyos-sans/HarmonyOS_Sans_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-harmony",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — авторский дизайн интерьера в Минске`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "дизайн интерьера Минск",
    "дизайн-проект квартиры",
    "авторский надзор",
    "ORTSTUDIO",
    "визуализация интерьера",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — авторский дизайн интерьера в Минске`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — авторский дизайн интерьера в Минске`,
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
    <html lang="ru" className={`${harmony.variable} h-full`}>
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
