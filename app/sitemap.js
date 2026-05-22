const BASE_URL = 'https://www.atelierkairos.ch';

export default function sitemap() {
  const lastModified = new Date();
  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/accompagnement', priority: 0.95 },
    { path: '/entreprise', priority: 0.9 },
    { path: '/ateliers', priority: 0.9 },
    { path: '/creations', priority: 0.85 },
    { path: '/articles', priority: 0.85 },
    { path: '/contact', priority: 0.95 },
  ];
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r.priority,
  }));
}
