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
const SITE_NAME = 'Atelier Kairos';
const SITE_DESCRIPTION =
  "Accompagnement psycho-corporel à Sierre (Valais). Somatic Experiencing, Thérapie Cranio-Sacrée Biodynamique et théorie polyvagale pour la régulation du système nerveux, la guérison du traumatisme et la réalisation de Soi.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Atelier Kairos — Accompagnement psycho-corporel | Sierre, Valais',
    template: '%s | Atelier Kairos',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Guillaume David', url: SITE_URL }],
  creator: 'Guillaume David',
  publisher: 'Atelier Kairos',
  generator: 'Next.js',
  keywords: [
    'Atelier Kairos',
    'Guillaume David',
    'psycho-corporel',
    'Somatic Experiencing',
    'SE',
    'Thérapie Cranio-Sacrée Biodynamique',
    'TCSB',
    'théorie polyvagale',
    'régulation du système nerveux',
    'guérison du traumatisme',
    'libération des tensions',
    'douleurs chroniques',
    'gestion du stress',
    'thérapie holistique',
    'Sierre',
    'Valais',
    'Suisse',
    'Suisse romande',
    'Espace Chèndâ',
  ],
  category: 'health',
  alternates: {
    canonical: '/',
    languages: {
      'fr-CH': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Atelier Kairos — Le temps de l\'Être',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/images/guillaume.jpeg',
        width: 1200,
        height: 1200,
        alt: 'Guillaume David — Atelier Kairos, accompagnement psycho-corporel à Sierre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atelier Kairos — Accompagnement psycho-corporel',
    description: SITE_DESCRIPTION,
    images: ['/images/guillaume.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    // Ajoutez ici les codes de vérification Google Search Console / Bing Webmaster
    // google: 'xxxxxxxxxxxx',
  },
};

export const viewport = {
  themeColor: '#162032',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD : LocalBusiness + Person (Guillaume) + WebSite
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Atelier Kairos',
      alternateName: 'Atelier Kairos — Guillaume David',
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      telephone: '+41794371196',
      email: 'info@atelierkairos.ch',
      image: `${SITE_URL}/images/guillaume.jpeg`,
      logo: `${SITE_URL}/images/guillaume.jpeg`,
      priceRange: 'CHF 80–130',
      currenciesAccepted: 'CHF',
      paymentAccepted: 'Cash, Bank transfer, TWINT',
      areaServed: [
        { '@type': 'AdministrativeArea', name: 'Valais' },
        { '@type': 'AdministrativeArea', name: 'Suisse romande' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Espace Chèndâ — Av. du Général Guisan 19',
        addressLocality: 'Sierre',
        postalCode: '3960',
        addressRegion: 'Valais',
        addressCountry: 'CH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 46.2917,
        longitude: 7.5354,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      sameAs: [SITE_URL],
      knowsAbout: [
        'Somatic Experiencing',
        'Thérapie Cranio-Sacrée Biodynamique',
        'Théorie polyvagale',
        'Régulation du système nerveux',
        'Trauma',
        'Approche psycho-corporelle',
      ],
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Séance individuelle - Tarif standard',
          price: '130',
          priceCurrency: 'CHF',
          description: 'Séance individuelle de 60 minutes en approche psycho-corporelle.',
        },
        {
          '@type': 'Offer',
          name: 'Séance individuelle - Tarif solidaire',
          price: '80',
          priceCurrency: 'CHF',
          description: 'Tarif accessible pour les personnes en difficulté financière.',
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#guillaume`,
      name: 'Guillaume David',
      givenName: 'Guillaume',
      familyName: 'David',
      jobTitle: 'Praticien en accompagnement psycho-corporel',
      worksFor: { '@id': `${SITE_URL}/#business` },
      image: `${SITE_URL}/images/guillaume.jpeg`,
      url: `${SITE_URL}/#apropos`,
      email: 'info@atelierkairos.ch',
      telephone: '+41794371196',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sierre',
        postalCode: '3960',
        addressRegion: 'Valais',
        addressCountry: 'CH',
      },
      knowsAbout: [
        'Somatic Experiencing',
        'Thérapie Cranio-Sacrée Biodynamique',
        'Théorie polyvagale',
        'Business Analyse',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'HES — Bachelor en Business Analyse',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'fr-CH',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce que la Somatic Experiencing (SE) ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La Somatic Experiencing est une méthode qui se concentre sur la régulation du système nerveux en aidant à libérer en douceur les tensions, blocages et réactions physiologiques associées aux traumatismes passés. Elle rétablit un sentiment profond de sécurité intérieure.",
          },
        },
        {
          '@type': 'Question',
          name: "Qu'est-ce que la Thérapie Cranio-Sacrée Biodynamique (TCSB) ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La TCSB est une approche subtile et respectueuse qui s'appuie sur l'écoute des rythmes naturels du corps — notamment les mouvements fluides du système crânio-sacré — pour favoriser l'équilibre, la vitalité et le fonctionnement optimal des mécanismes d'auto-régulation.",
          },
        },
        {
          '@type': 'Question',
          name: 'Combien coûte une séance à l\'Atelier Kairos ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le tarif standard est de 130 CHF pour une séance d'une heure. Une tarification solidaire à 80 CHF est proposée pour les personnes en difficulté financière, sans justification nécessaire.",
          },
        },
        {
          '@type': 'Question',
          name: "À qui s'adresse l'accompagnement psycho-corporel ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "L'accompagnement s'adresse aux personnes souhaitant gérer leur stress, guérir d'un traumatisme, libérer des tensions, explorer leur identité profonde, traverser une transition de vie (deuil, séparation, changement) ou prévenir et gérer des douleurs chroniques.",
          },
        },
        {
          '@type': 'Question',
          name: 'Où se trouve le cabinet ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "L'Atelier Kairos est situé à l'Espace Chèndâ — Centre holistique de santé, Avenue du Général Guisan 19, 3960 Sierre, en Valais (Suisse).",
          },
        },
      ],
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
        <meta name="geo.position" content="46.2917;7.5354" />
        <meta name="ICBM" content="46.2917, 7.5354" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-[#f4f7fb] text-[#162032]">
        {/* Google Ads — gtag.js */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18155367954"
          strategy="afterInteractive"
        />
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
