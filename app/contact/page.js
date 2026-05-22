'use client';

import { useState } from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';
import { PageHero } from '@/components/site/Shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { name: `${form.firstName} ${form.name}`.trim(), email: form.email, subject: form.subject, message: form.message };
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { send_to: 'AW-18155367954/vPzECOSQiKscEJLck9FD', value: 1.0, currency: 'CHF' });
      }
      toast.success(data.message || 'Message envoyé.');
      setForm({ firstName: '', name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || "Une erreur s'est produite.");
    } finally { setLoading(false); }
  };

  const inputClass = "mt-2 bg-transparent border-0 border-b border-[#3730a3]/15 rounded-none focus-visible:ring-0 focus-visible:border-[#4f46e5] px-0 text-[#3730a3]";

  return (
    <main className="min-h-screen bg-[#f5f4f8]">
      <SiteHeader />
      <PageHero kicker="Prendre contact" title="Écrivons" italic="un premier mot." subtitle="Pour un accompagnement, un atelier, une collaboration ou une simple prise de contact. Je réponds personnellement à chaque message." />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="space-y-5 text-[#3730a3]/75 leading-relaxed text-lg">
              <p>Vous souhaitez explorer un accompagnement individuel, organiser un atelier, imaginer une intervention en entreprise ou simplement entrer en lien avec l&apos;Atelier Kairos&nbsp;?</p>
              <p className="font-serif italic text-xl text-[#4f46e5]">L&apos;échange peut commencer simplement, à partir de là où vous en êtes.</p>
            </div>

            <div className="mt-12 space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'info@atelierkairos.ch', href: 'mailto:info@atelierkairos.ch' },
                { icon: Phone, label: 'Téléphone', value: '+41 79 437 11 96', href: 'tel:+41794371196' },
                { icon: MapPin, label: 'Espace', value: 'Espace Chèndâ — Av. du Général Guisan 19, 3960 Sierre', href: 'https://maps.google.com/?q=Av.+du+G%C3%A9n%C3%A9ral+Guisan+19,+3960+Sierre' },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-2xl glass-indigo flex items-center justify-center shrink-0">
                    <c.icon className="w-4 h-4 text-[#4f46e5]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/50 mb-1">{c.label}</p>
                    <p className="text-[#3730a3] group-hover:text-[#4f46e5] transition-colors">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass rounded-3xl p-8 md:p-10">
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/60">Prénom *</Label>
                    <Input id="firstName" name="firstName" value={form.firstName} onChange={onChange} required className={inputClass} />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/60">Nom *</Label>
                    <Input id="name" name="name" value={form.name} onChange={onChange} required className={inputClass} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/60">Email *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/60">Sujet</Label>
                  <Input id="subject" name="subject" value={form.subject} onChange={onChange} className={inputClass} />
                </div>
                <div>
                  <Label htmlFor="message" className="text-[10px] uppercase tracking-[0.25em] text-[#3730a3]/60">Message *</Label>
                  <Textarea id="message" name="message" value={form.message} onChange={onChange} required rows={6} className={`${inputClass} resize-none`} />
                </div>
                <Button type="submit" disabled={loading} className="w-full mt-6 bg-[#3730a3] hover:bg-[#4f46e5] text-white rounded-full py-6 text-sm transition-colors">
                  {loading ? 'Envoi…' : 'Envoyer le message'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-xs text-[#3730a3]/50 text-center">Vos données restent strictement confidentielles.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
