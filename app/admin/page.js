'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Lock, LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';

const TYPES = [
  { key: 'formations', label: 'Formations entreprise' },
  { key: 'ateliers', label: 'Ateliers & cercles' },
  { key: 'creations', label: 'Créations' },
  { key: 'articles', label: 'Articles' },
];

const EMPTY = { title: '', subtitle: '', description: '', content: '', imageUrl: '', tags: '', published: true, order: 0 };

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState('');
  const [activeType, setActiveType] = useState('formations');
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null); // entry being edited, or 'new' or null
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => { const t = localStorage.getItem('kairos_admin_token'); if (t) setToken(t); }, []);
  useEffect(() => { if (token) loadEntries(); /* eslint-disable-next-line */ }, [token, activeType]);

  async function login(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    const d = await res.json();
    if (res.ok && d.token) { localStorage.setItem('kairos_admin_token', d.token); setToken(d.token); toast.success('Connecté'); }
    else toast.error(d.error || 'Erreur');
  }

  function logout() { localStorage.removeItem('kairos_admin_token'); setToken(null); setEntries([]); setEditing(null); }

  async function loadEntries() {
    setLoading(true);
    const res = await fetch(`/api/admin/entries/${activeType}`, { headers: { 'X-Admin-Password': token } });
    const d = await res.json();
    if (res.ok) setEntries(d.entries || []);
    else if (res.status === 401) { logout(); toast.error('Session expirée'); }
    setLoading(false);
  }

  function startNew() { setForm(EMPTY); setEditing('new'); }
  function startEdit(entry) { setForm({ ...entry, tags: (entry.tags || []).join(', ') }); setEditing(entry.id); }
  function cancel() { setEditing(null); setForm(EMPTY); }

  async function save(e) {
    e.preventDefault();
    const url = editing === 'new' ? `/api/admin/entries/${activeType}` : `/api/admin/entries/${activeType}/${editing}`;
    const method = editing === 'new' ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'X-Admin-Password': token }, body: JSON.stringify(form) });
    const d = await res.json();
    if (res.ok) { toast.success(editing === 'new' ? 'Créé' : 'Mis à jour'); cancel(); loadEntries(); }
    else toast.error(d.error || 'Erreur');
  }

  async function remove(id) {
    if (!confirm('Supprimer cette entrée ?')) return;
    const res = await fetch(`/api/admin/entries/${activeType}/${id}`, { method: 'DELETE', headers: { 'X-Admin-Password': token } });
    if (res.ok) { toast.success('Supprimé'); loadEntries(); } else toast.error('Erreur');
  }

  async function togglePublish(entry) {
    const res = await fetch(`/api/admin/entries/${activeType}/${entry.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Admin-Password': token }, body: JSON.stringify({ published: !entry.published }) });
    if (res.ok) loadEntries();
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-[#f5f4f8] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#818cf8]/30 rounded-full blur-3xl -z-10 animate-shimmer" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#a78bfa]/25 rounded-full blur-3xl -z-10" />
        <div className="glass-strong rounded-3xl p-10 w-full max-w-md">
          <Link href="/" className="inline-flex items-baseline gap-1.5 mb-8">
            <span className="font-serif text-2xl text-[#3730a3]">Atelier</span>
            <span className="font-serif text-2xl italic text-[#4f46e5]">Kairos</span>
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl glass-indigo flex items-center justify-center"><Lock className="w-4 h-4 text-[#4f46e5]" /></div>
            <h1 className="font-serif text-2xl text-[#3730a3]">Espace de gestion</h1>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-widest text-[#3730a3]/60">Mot de passe</Label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" autoFocus />
            </div>
            <Button type="submit" className="w-full bg-[#3730a3] hover:bg-[#4f46e5] text-white rounded-full py-5">Se connecter</Button>
          </form>
        </div>
        <Toaster position="bottom-right" richColors />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4f8] relative">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#818cf8]/20 rounded-full blur-3xl -z-10" />

      <header className="sticky top-0 z-40 glass-strong">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-serif text-xl text-[#3730a3]">Atelier</span>
              <span className="font-serif text-xl italic text-[#4f46e5]">Kairos</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-[#3730a3]/60 hidden sm:block">Admin</span>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 text-sm text-[#3730a3]/70 hover:text-[#3730a3] transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map((t) => (
            <button key={t.key} onClick={() => { setActiveType(t.key); setEditing(null); }} className={`px-5 py-2.5 rounded-full text-sm transition-all ${activeType === t.key ? 'bg-[#3730a3] text-white' : 'glass text-[#3730a3] hover:glass-strong'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {editing ? (
          <div className="glass-strong rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-[#3730a3]">{editing === 'new' ? 'Nouvelle entrée' : 'Modifier'}</h2>
              <button onClick={cancel} className="text-[#3730a3]/60 hover:text-[#3730a3]"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Titre *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="mt-1" /></div>
                <div><Label>Sous-titre / date</Label><Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="mt-1" placeholder="ex: 15 mars 2026 ou Stress" /></div>
              </div>
              <div><Label>Description courte</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="mt-1" /></div>
              <div><Label>Contenu détaillé (optionnel)</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="mt-1" /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>URL image</Label><Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} className="mt-1" placeholder="https://..." /></div>
                <div><Label>Tags (séparés par virgule)</Label><Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1" placeholder="stress, corps, créativité" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Ordre d&apos;affichage</Label><Input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} className="mt-1" /></div>
                <div className="flex items-center gap-3 pt-6"><input type="checkbox" id="pub" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4" /><Label htmlFor="pub">Publié (visible sur le site)</Label></div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-[#3730a3] hover:bg-[#4f46e5] text-white rounded-full px-6"><Save className="w-4 h-4 mr-2" /> Enregistrer</Button>
                <Button type="button" variant="outline" onClick={cancel} className="rounded-full">Annuler</Button>
              </div>
            </form>
          </div>
        ) : (
          <button onClick={startNew} className="mb-6 inline-flex items-center gap-2 px-5 py-3 bg-[#3730a3] text-white rounded-full text-sm hover:bg-[#4f46e5] transition-colors"><Plus className="w-4 h-4" /> Nouvelle entrée</button>
        )}

        <div className="glass rounded-3xl overflow-hidden">
          <div className="divide-y divide-[#3730a3]/10">
            {loading && <div className="p-8 text-center text-[#3730a3]/60">Chargement…</div>}
            {!loading && entries.length === 0 && <div className="p-8 text-center text-[#3730a3]/60">Aucune entrée pour le moment.</div>}
            {entries.map((e) => (
              <div key={e.id} className="p-5 flex items-start gap-4 hover:bg-white/30 transition-colors">
                {e.imageUrl && <img src={e.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-[#3730a3]">{e.title}</h3>
                    {!e.published && <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-200/60 text-orange-800">Brouillon</span>}
                  </div>
                  {e.subtitle && <p className="text-xs text-[#4f46e5] mt-0.5">{e.subtitle}</p>}
                  {e.description && <p className="text-sm text-[#3730a3]/65 mt-1 line-clamp-2">{e.description}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => togglePublish(e)} className="p-2 rounded-lg hover:bg-white/50 text-[#3730a3]/70" title={e.published ? 'Dépublier' : 'Publier'}>{e.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                  <button onClick={() => startEdit(e)} className="p-2 rounded-lg hover:bg-white/50 text-[#3730a3]/70"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(e.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-600/80"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </main>
  );
}
