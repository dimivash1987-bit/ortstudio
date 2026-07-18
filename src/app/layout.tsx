import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import "./globals.css";

const YANDEX_METRIKA_ID = 110848554;

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
        <Script id="yandex-metrika" strategy="afterInteractive">{`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');

          ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
        `}</Script>
        <noscript>
          <div>
            <img
              src={`https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}`}
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
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
