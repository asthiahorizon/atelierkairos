'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  Wand2,
  ImageIcon,
  Loader2,
  Bold,
  Italic,
  Heading2,
  Quote,
  List,
  Link as LinkIcon,
  Images,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

const TYPES = [
  { key: 'programmes', label: 'Programmes Entreprise' },
  { key: 'ateliers', label: 'Ateliers & cercles' },
  { key: 'creations', label: 'Créations' },
  { key: 'articles', label: 'Articles' },
];

const EMPTY = {
  title: '',
  subtitle: '',
  description: '',
  content: '',
  imageUrl: '',
  gallery: [],
  tags: '',
  published: true,
  order: 0,
};

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeType, setActiveType] = useState('programmes');
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [galleryBusy, setGalleryBusy] = useState(false);
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    const t = localStorage.getItem('kairos_admin_token');
    if (t) setToken(t);
  }, []);
  useEffect(() => {
    if (token) loadEntries(); /* eslint-disable-next-line */
  }, [token, activeType]);

  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const d = await res.json();
      if (res.ok && d.token) {
        localStorage.setItem('kairos_admin_token', d.token);
        setToken(d.token);
        toast.success('Connecté');
      } else {
        toast.error(d.error || 'Erreur');
      }
    } catch (err) {
      toast.error('Erreur réseau');
    }
  }

  function logout() {
    localStorage.removeItem('kairos_admin_token');
    setToken(null);
    setEntries([]);
    setEditing(null);
  }

  async function loadEntries() {
    setLoading(true);
    const res = await fetch(`/api/admin/entries/${activeType}`, {
      headers: { 'X-Admin-Token': token },
    });
    const d = await res.json();
    if (res.ok) setEntries(d.entries || []);
    else if (res.status === 401) {
      logout();
      toast.error('Session expirée');
    }
    setLoading(false);
  }

  function startNew() {
    setForm(EMPTY);
    setEditing('new');
  }
  function startEdit(entry) {
    setForm({
      ...entry,
      tags: (entry.tags || []).join(', '),
      gallery: Array.isArray(entry.gallery) ? entry.gallery : [],
    });
    setEditing(entry.id);
  }
  function cancel() {
    setEditing(null);
    setForm(EMPTY);
  }

  async function save(e) {
    e.preventDefault();
    const url =
      editing === 'new'
        ? `/api/admin/entries/${activeType}`
        : `/api/admin/entries/${activeType}/${editing}`;
    const method = editing === 'new' ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify(form),
    });
    const d = await res.json();
    if (res.ok) {
      toast.success(editing === 'new' ? 'Créé' : 'Mis à jour');
      cancel();
      loadEntries();
    } else toast.error(d.error || 'Erreur');
  }

  async function remove(id) {
    if (!confirm('Supprimer cette entrée ?')) return;
    const res = await fetch(`/api/admin/entries/${activeType}/${id}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Token': token },
    });
    if (res.ok) {
      toast.success('Supprimé');
      loadEntries();
    } else toast.error('Erreur');
  }

  async function togglePublish(entry) {
    const res = await fetch(`/api/admin/entries/${activeType}/${entry.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
      body: JSON.stringify({ published: !entry.published }),
    });
    if (res.ok) loadEntries();
  }

  // --- IMAGES ---
  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 6 * 1024 * 1024) {
      toast.error('Image trop volumineuse (max 6Mo)');
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
          body: JSON.stringify({ dataUrl: reader.result }),
        });
        const d = await res.json();
        if (res.ok && d.url) {
          setForm((f) => ({ ...f, imageUrl: d.url }));
          toast.success('Image téléchargée');
        } else toast.error(d.error || 'Erreur upload');
      } catch (err) {
        toast.error('Erreur upload');
      }
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
      toast.error('Erreur lecture fichier');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  async function handleGalleryFile(e) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setGalleryBusy(true);
    const t = toast.loading(`Téléversement de ${files.length} image(s)…`);
    const newUrls = [];
    for (const file of files) {
      if (file.size > 6 * 1024 * 1024) {
        toast.error(`"${file.name}" trop volumineuse (max 6Mo)`);
        continue;
      }
      // eslint-disable-next-line no-await-in-loop
      const dataUrl = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = () => rej(new Error('read'));
        r.readAsDataURL(file);
      }).catch(() => null);
      if (!dataUrl) continue;
      try {
        // eslint-disable-next-line no-await-in-loop
        const r = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
          body: JSON.stringify({ dataUrl }),
        });
        // eslint-disable-next-line no-await-in-loop
        const d = await r.json().catch(() => ({}));
        if (r.ok && d.url) newUrls.push(d.url);
      } catch { /* skip */ }
    }
    setForm((f) => ({ ...f, gallery: [...(f.gallery || []), ...newUrls] }));
    toast.success(`${newUrls.length} image(s) ajoutée(s)`, { id: t });
    setGalleryBusy(false);
    e.target.value = '';
  }

  async function generateGalleryAI() {
    const seed = form.description?.trim() || form.title?.trim();
    if (!seed) { toast.error("Renseignez d'abord un titre ou une description"); return; }
    const aiPrompt = `Image éditoriale complémentaire pour une galerie, en cohérence avec : « ${seed} ». Variation artistique, abstraite ou symbolique, palette violet/indigo foncé sur blanc cassé, sans texte, format carré.`;
    setGalleryBusy(true);
    const t = toast.loading('Génération en cours (5–15 s)…');
    try {
      const r = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.url) {
        setForm((f) => ({ ...f, gallery: [...(f.gallery || []), d.url] }));
        toast.success('Image ajoutée à la galerie', { id: t });
      } else {
        toast.error(d.error || `Erreur (${r.status})`, { id: t });
      }
    } catch (err) {
      toast.error('Erreur génération', { id: t });
    }
    setGalleryBusy(false);
  }

  function removeFromGallery(idx) {
    setForm((f) => ({ ...f, gallery: (f.gallery || []).filter((_, i) => i !== idx) }));
  }
  function moveInGallery(idx, dir) {
    setForm((f) => {
      const g = [...(f.gallery || [])];
      const ni = idx + dir;
      if (ni < 0 || ni >= g.length) return f;
      [g[idx], g[ni]] = [g[ni], g[idx]];
      return { ...f, gallery: g };
    });
  }

  async function generateAI() {
    const seed = form.description?.trim() || form.title?.trim();
    if (!seed) {
      toast.error('Renseignez d\u2019abord un titre ou une description');
      return;
    }
    const aiPrompt = `Image de couverture éditoriale, élégante et moderne, sur le thème : « ${seed} ». Esthétique douce, palette violet/indigo foncé sur blanc cassé, ambiance apaisante, abstraite ou symbolique, sans texte, format carré.`;
    setGenerating(true);
    const t = toast.loading('Génération de l\u2019image en cours (5–15 s)…');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90_000);
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
        body: JSON.stringify({ prompt: aiPrompt }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.url) {
        setForm((f) => ({ ...f, imageUrl: d.url }));
        toast.success('Image générée', { id: t });
      } else {
        toast.error(d.error || `Erreur génération (${res.status})`, { id: t });
      }
    } catch (err) {
      toast.error(err?.name === 'AbortError' ? 'Délai dépassé — réessayez' : 'Erreur génération', { id: t });
    }
    setGenerating(false);
  }

  // ---- LOGIN VIEW ----
  if (!token) {
    return (
      <main className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
        <div className="surface-strong rounded-3xl p-10 w-full max-w-md">
          <Link href="/" className="inline-flex items-baseline gap-1.5 mb-8">
            <span className="font-serif text-2xl text-[#312e81]">Atelier</span>
            <span className="font-serif text-2xl italic text-[#4338ca]">Kairos</span>
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#eef0fb] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#4338ca]" />
            </div>
            <h1 className="font-serif text-2xl text-[#312e81]">Espace de gestion</h1>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <Label className="text-xs uppercase tracking-widest text-[#312e81]/60">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
                placeholder="vous@exemple.ch"
                autoFocus
                required
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-widest text-[#312e81]/60">Mot de passe</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#312e81] hover:bg-[#4338ca] text-white rounded-full py-5"
            >
              Se connecter
            </Button>
          </form>
        </div>
        <Toaster position="bottom-right" richColors />
      </main>
    );
  }

  // ---- ADMIN VIEW ----
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <header className="sticky top-0 z-40 header-bar">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="inline-flex items-baseline gap-1.5">
              <span className="font-serif text-xl text-[#312e81]">Atelier</span>
              <span className="font-serif text-xl italic text-[#4338ca]">Kairos</span>
            </Link>
            <span className="text-xs uppercase tracking-[0.2em] text-[#312e81]/60 hidden sm:block">Admin</span>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-sm text-[#312e81]/70 hover:text-[#312e81] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {TYPES.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setActiveType(t.key);
                setEditing(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm transition-all ${
                activeType === t.key
                  ? 'bg-[#312e81] text-white shadow-sm'
                  : 'bg-white border border-[#312e81]/10 text-[#312e81] hover:bg-[#eef0fb]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {editing ? (
          <div className="surface-strong rounded-3xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-[#312e81]">
                {editing === 'new' ? 'Nouvelle entrée' : 'Modifier'}
              </h2>
              <button onClick={cancel} className="text-[#312e81]/60 hover:text-[#312e81]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={save} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Titre *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>Sous-titre / date</Label>
                  <Input
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="mt-1"
                    placeholder="ex: 15 mars 2026 ou Stress"
                  />
                </div>
              </div>

              <div>
                <Label>Description courte</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="mt-1"
                  placeholder="Quelques lignes pour présenter le contenu — sert aussi de prompt pour la génération IA."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label>Contenu détaillé (optionnel)</Label>
                  <FormatToolbar
                    onInsert={(before, after = '') => {
                      const ta = document.getElementById('content-textarea');
                      if (!ta) return;
                      const start = ta.selectionStart;
                      const end = ta.selectionEnd;
                      const sel = (form.content || '').slice(start, end) || (after ? '' : 'texte');
                      const newVal =
                        (form.content || '').slice(0, start) +
                        before + sel + after +
                        (form.content || '').slice(end);
                      setForm({ ...form, content: newVal });
                      setTimeout(() => {
                        ta.focus();
                        const pos = start + before.length + sel.length;
                        ta.setSelectionRange(pos, pos);
                      }, 0);
                    }}
                  />
                </div>
                <Textarea
                  id="content-textarea"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={10}
                  className="mt-1 font-mono text-[14px]"
                  placeholder={"Tapez votre article ici…\n\nVous pouvez utiliser :\n**gras**, *italique*, > citation,\n## Titre de section,\n- liste à puces"}
                />
                <p className="text-[11px] text-[#312e81]/55 mt-1.5">
                  Mise en forme&nbsp;: <strong className="text-[#312e81]">**gras**</strong>, <em className="text-[#4338ca]">*italique*</em>, <code className="px-1 rounded bg-[#eef0fb]">## Titre</code>, <code className="px-1 rounded bg-[#eef0fb]">&gt; citation</code>, <code className="px-1 rounded bg-[#eef0fb]">- liste</code>
                </p>
              </div>

              {/* IMAGE BLOCK */}
              <div className="rounded-2xl border border-[#312e81]/10 bg-[#fafafa] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="w-4 h-4 text-[#4338ca]" />
                  <Label className="m-0">Image de couverture</Label>
                </div>

                <div className="grid md:grid-cols-3 gap-4 items-start">
                  <div className="md:col-span-2 space-y-3">
                    <Input
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://… ou /api/images/…"
                    />
                    <div className="flex flex-wrap gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="rounded-full"
                      >
                        {uploading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Upload className="w-4 h-4 mr-2" />
                        )}
                        Téléverser une image
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={generateAI}
                        disabled={generating}
                        className="rounded-full"
                      >
                        {generating ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4 mr-2" />
                        )}
                        Générer par IA depuis le texte
                      </Button>
                      {form.imageUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setForm({ ...form, imageUrl: '' })}
                          className="rounded-full text-red-600/80 hover:text-red-700"
                        >
                          Retirer
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-[#312e81]/60">
                      L&apos;IA utilise votre <em>titre</em> ou <em>description</em> ci-dessus pour générer une image cohérente avec votre univers (Gemini Nano Banana).
                    </p>
                  </div>

                  <div className="md:col-span-1">
                    <div className="aspect-square rounded-xl overflow-hidden border border-[#312e81]/10 bg-white flex items-center justify-center relative">
                      {generating && (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#eef0fb] to-[#dde1f5] flex flex-col items-center justify-center gap-3 z-10">
                          <Loader2 className="w-8 h-8 text-[#4338ca] animate-spin" />
                          <p className="text-[11px] text-[#312e81]/70 uppercase tracking-widest">Création en cours…</p>
                          <p className="text-[10px] text-[#312e81]/50 px-3 text-center">~5 à 15 secondes</p>
                        </div>
                      )}
                      {form.imageUrl && !generating ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.imageUrl} alt="aperçu" className="w-full h-full object-cover" />
                      ) : !generating ? (
                        <div className="text-[#312e81]/40 text-xs text-center px-3">
                          Aucune image
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* GALLERY BLOCK */}
              <div className="rounded-2xl border border-[#312e81]/10 bg-[#fafafa] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Images className="w-4 h-4 text-[#4338ca]" />
                  <Label className="m-0">Galerie d&apos;images (optionnel)</Label>
                  <span className="text-[11px] text-[#312e81]/50">
                    {(form.gallery || []).length} image{(form.gallery || []).length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFile}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => galleryInputRef.current?.click()}
                    disabled={galleryBusy}
                    className="rounded-full"
                  >
                    {galleryBusy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                    Ajouter des images
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateGalleryAI}
                    disabled={galleryBusy}
                    className="rounded-full"
                  >
                    {galleryBusy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                    Générer par IA
                  </Button>
                </div>

                {(form.gallery || []).length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {(form.gallery || []).map((url, i) => (
                      <div key={`${url}-${i}`} className="relative group aspect-square rounded-xl overflow-hidden border border-[#312e81]/10 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`gal-${i}`} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => moveInGallery(i, -1)}
                            className="w-7 h-7 rounded-full bg-white/95 text-[#312e81] flex items-center justify-center hover:bg-white"
                            title="Avancer"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveInGallery(i, 1)}
                            className="w-7 h-7 rounded-full bg-white/95 text-[#312e81] flex items-center justify-center hover:bg-white"
                            title="Reculer"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromGallery(i)}
                            className="w-7 h-7 rounded-full bg-white/95 text-red-600 flex items-center justify-center hover:bg-white"
                            title="Retirer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/55 text-white">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] text-[#312e81]/50 italic">
                    Aucune image supplémentaire. L&apos;image de couverture ci-dessus reste l&apos;image principale.
                  </p>
                )}
              </div>


              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Tags (séparés par virgule)</Label>
                  <Input
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="mt-1"
                    placeholder="stress, corps, créativité"
                  />
                </div>
                <div>
                  <Label>Ordre d&apos;affichage</Label>
                  <Input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="pub"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="pub">Publié (visible sur le site)</Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-[#312e81] hover:bg-[#4338ca] text-white rounded-full px-6"
                >
                  <Save className="w-4 h-4 mr-2" /> Enregistrer
                </Button>
                <Button type="button" variant="outline" onClick={cancel} className="rounded-full">
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <button
            onClick={startNew}
            className="mb-6 inline-flex items-center gap-2 px-5 py-3 bg-[#312e81] text-white rounded-full text-sm hover:bg-[#4338ca] transition-colors"
          >
            <Plus className="w-4 h-4" /> Nouvelle entrée
          </button>
        )}

        <div className="surface rounded-3xl overflow-hidden">
          <div className="divide-y divide-[#312e81]/10">
            {loading && <div className="p-8 text-center text-[#312e81]/60">Chargement…</div>}
            {!loading && entries.length === 0 && (
              <div className="p-8 text-center text-[#312e81]/60">Aucune entrée pour le moment.</div>
            )}
            {entries.map((e) => (
              <div
                key={e.id}
                className="p-5 flex items-start gap-4 hover:bg-[#fafafa] transition-colors"
              >
                {e.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-[#312e81]">{e.title}</h3>
                    {!e.published && (
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                        Brouillon
                      </span>
                    )}
                  </div>
                  {e.subtitle && <p className="text-xs text-[#4338ca] mt-0.5">{e.subtitle}</p>}
                  {e.description && (
                    <p className="text-sm text-[#312e81]/65 mt-1 line-clamp-2">{e.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePublish(e)}
                    className="p-2 rounded-lg hover:bg-[#eef0fb] text-[#312e81]/70"
                    title={e.published ? 'Dépublier' : 'Publier'}
                  >
                    {e.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => startEdit(e)}
                    className="p-2 rounded-lg hover:bg-[#eef0fb] text-[#312e81]/70"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(e.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600/80"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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


function FormatToolbar({ onInsert }) {
  const Btn = ({ title, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="w-8 h-8 rounded-md hover:bg-[#eef0fb] text-[#312e81]/70 hover:text-[#312e81] inline-flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  );
  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border border-[#312e81]/10 bg-white px-1 py-1">
      <Btn title="Gras (Ctrl+B)" onClick={() => onInsert('**', '**')}>
        <Bold className="w-3.5 h-3.5" />
      </Btn>
      <Btn title="Italique" onClick={() => onInsert('*', '*')}>
        <Italic className="w-3.5 h-3.5" />
      </Btn>
      <Btn title="Titre de section" onClick={() => onInsert('\n## ', '\n')}>
        <Heading2 className="w-3.5 h-3.5" />
      </Btn>
      <Btn title="Citation" onClick={() => onInsert('\n> ', '\n')}>
        <Quote className="w-3.5 h-3.5" />
      </Btn>
      <Btn title="Liste à puces" onClick={() => onInsert('\n- ', '\n')}>
        <List className="w-3.5 h-3.5" />
      </Btn>
      <Btn title="Lien" onClick={() => onInsert('[', '](https://)')}>
        <LinkIcon className="w-3.5 h-3.5" />
      </Btn>
    </div>
  );
}
