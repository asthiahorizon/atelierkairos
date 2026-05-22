import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL = 'https://www.atelierkairos.ch';
const SITE_NAME = 'Asthia Horizon';
const SITE_DESCRIPTION =
  "Asthia Horizon est un espace d'accompagnement, de création et de transmission autour du corps, de la conscience, de la créativité et de la neurodivergence. Réguler le système nerveux, libérer l'expression de l'être, créer depuis une conscience plus vaste.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Asthia Horizon — Régulation, créativité incarnée & neurodivergence",
    template: '%s | Asthia Horizon',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Guillaume David', url: SITE_URL }],
  creator: 'Guillaume David',
  publisher: 'Asthia Horizon',
  keywords: [
    'Asthia Horizon',
    'Guillaume David',
    'régulation système nerveux',
    'créativité incarnée',
    'neurodivergence',
    'coaching somatique',
    'somatic experiencing',
    'expression de soi',
    'corps et conscience',
    'ateliers',
    'cercles',
    'accompagnement individuel',
    'neurodivergence entreprise',
    'HPI',
    'TDAH',
    'autisme',
    'Sierre',
    'Valais',
    'Suisse',
  ],
  category: 'wellness',
  alternates: { canonical: '/', languages: { 'fr-CH': '/' } },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Asthia Horizon — Réguler, exprimer, créer",
    description: SITE_DESCRIPTION,
    images: [{ url: '/images/guillaume.jpeg', width: 1200, height: 1200, alt: 'Asthia Horizon' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asthia Horizon',
    description: SITE_DESCRIPTION,
    images: ['/images/guillaume.jpeg'],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport = {
  themeColor: '#1d2a3f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: 'info@atelierkairos.ch',
      telephone: '+41794371196',
      founder: { '@id': `${SITE_URL}/#guillaume` },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Espace Chèndâ — Av. du Général Guisan 19',
        addressLocality: 'Sierre',
        postalCode: '3960',
        addressRegion: 'Valais',
        addressCountry: 'CH',
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#guillaume`,
      name: 'Guillaume David',
      jobTitle: 'Praticien somatique, créateur, accompagnant',
      image: `${SITE_URL}/images/guillaume.jpeg`,
      email: 'info@atelierkairos.ch',
      worksFor: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'fr-CH',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-CH" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="CH-VS" />
        <meta name="geo.placename" content="Sierre" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased font-sans bg-[#f5efe4] text-[#28201a]">
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18155367954" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18155367954');
          `}
        </Script>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
