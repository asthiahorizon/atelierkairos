import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
  description: "L'Atelier Kairos est un espace dédié à la régulation du système nerveux, à la guérison du traumatisme et à la réalisation de Soi. Approche psycho-corporelle intégrative en Suisse.",
  keywords: ['Somatic Experiencing', 'Thérapie Cranio-Sacrée Biodynamique', 'Théorie polyvagale', 'Trauma', 'Régulation système nerveux', 'Suisse', 'Atelier Kairos'],
  openGraph: {
    title: 'Atelier Kairos — Le temps de l\'Être',
    description: 'Un espace en dehors du tumulte, dédié à la transformation profonde.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-stone-50 text-stone-800">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
