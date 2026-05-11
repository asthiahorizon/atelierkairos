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

export const metadata = {
  title: "Atelier Kairos — Accompagnement psycho-corporel | Somatic Experiencing & TCSB",
  description: "L'Atelier Kairos est un espace dédié à la régulation du système nerveux, à la guérison du traumatisme et à la réalisation de Soi.",
  openGraph: {
    title: 'Atelier Kairos — Le temps de l\'Être',
    description: 'Un espace en dehors du tumulte, dédié à la transformation profonde.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
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
