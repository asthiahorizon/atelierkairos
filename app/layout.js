import { Fraunces, Inter } from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['300','400','500','600','700'], style: ['normal','italic'], variable: '--font-serif', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-sans', display: 'swap' });

const SITE_URL = 'https://www.atelierkairos.ch';
const SITE_NAME = 'Atelier Kairos';
const SITE_DESCRIPTION = "Atelier Kairos — Accompagnement psycho-corporel. Somatic Experiencing, Thérapie Cranio-Sacrée Biodynamique et théorie polyvagale pour la régulation du système nerveux, le travail autour du trauma, la neurodiversité et la créativité incarnée.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Atelier Kairos', template: '%s — Atelier Kairos' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: 'Guillaume David', url: SITE_URL }],
  creator: 'Guillaume David',
  publisher: SITE_NAME,
  keywords: ['Atelier Kairos','Guillaume David','psycho-corporel','Somatic Experiencing','SE','Thérapie Cranio-Sacrée Biodynamique','TCSB','théorie polyvagale','TPV','régulation système nerveux','trauma','neurodiversité','HPI','TDAH','autisme','créativité incarnée'],
  category: 'health',
  alternates: { canonical: '/', languages: { 'fr-CH': '/' } },
  openGraph: {
    type: 'website', locale: 'fr_CH', url: SITE_URL, siteName: SITE_NAME,
    title: 'Atelier Kairos',
    description: SITE_DESCRIPTION,
    images: [{ url: '/logo.png', width: 1200, height: 1200, alt: SITE_NAME }],
  },
  twitter: { card: 'summary_large_image', title: SITE_NAME, description: SITE_DESCRIPTION, images: ['/logo.png'] },
  icons: { icon: '/logo.png', shortcut: '/logo.png', apple: '/logo.png' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = { themeColor: '#312e81', width: 'device-width', initialScale: 1, maximumScale: 5 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness', '@id': `${SITE_URL}/#business`,
      name: SITE_NAME, description: SITE_DESCRIPTION, url: SITE_URL,
      telephone: '+41794371196', email: 'info@atelierkairos.ch',
      image: `${SITE_URL}/logo.png`, priceRange: 'CHF 80–130',
      areaServed: [{ '@type': 'Country', name: 'Switzerland' }],
      knowsAbout: ['Somatic Experiencing','Thérapie Cranio-Sacrée Biodynamique','Théorie polyvagale','Neurodiversité','Régulation du système nerveux'],
    },
    {
      '@type': 'Person', '@id': `${SITE_URL}/#guillaume`, name: 'Guillaume David',
      jobTitle: 'Praticien en accompagnement psycho-corporel',
      worksFor: { '@id': `${SITE_URL}/#business` }, image: `${SITE_URL}/logo.png`,
      email: 'info@atelierkairos.ch', telephone: '+41794371196',
    },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, description: SITE_DESCRIPTION, inLanguage: 'fr-CH' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr-CH" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="antialiased font-sans bg-white text-[#312e81]">
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-18155367954" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18155367954');`}
        </Script>
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
