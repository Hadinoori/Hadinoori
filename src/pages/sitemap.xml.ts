import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const siteUrl = 'https://hadinoori.ca';

export const GET: APIRoute = async () => {
  const insights = await getCollection('insights', ({ data }) =>
    data.status === 'published'
  );

  const staticRoutes = [
    { url: '/',         changefreq: 'weekly',  priority: '1.0' },
    { url: '/insights', changefreq: 'weekly',  priority: '0.9' },
    { url: '/dossier',  changefreq: 'monthly', priority: '0.8' },
    { url: '/contact',  changefreq: 'monthly', priority: '0.7' },
  ];

  const insightRoutes = insights.map(post => ({
    url:        `/insights/${post.slug}`,
    changefreq: 'monthly',
    priority:   '0.8',
    lastmod:    post.data.date.toISOString().split('T')[0],
  }));

  const allRoutes = [...staticRoutes, ...insightRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url>
    <loc>${siteUrl}${r.url}</loc>
    ${'lastmod' in r ? `<lastmod>${r.lastmod}</lastmod>\n    ` : ''}<changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
