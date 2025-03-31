const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://yaroshev.com';
const DIST_DIR = path.resolve(__dirname, '../dist');
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Create sitemap XML content
const generateSitemap = () => {
  const urls = [
    '',
    '/work',
    '/about',
    '/resources'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

// Ensure the public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Write sitemap to public directory
const sitemap = generateSitemap();
const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemap);
console.log(`Sitemap generated in public directory: ${publicSitemapPath}`);

// If dist directory exists, copy sitemap there too for immediate deployment
if (fs.existsSync(DIST_DIR)) {
  const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.copyFileSync(publicSitemapPath, distSitemapPath);
  console.log(`Sitemap copied to dist directory: ${distSitemapPath}`);
}

// Verify read access to ensure files are accessible
try {
  fs.accessSync(publicSitemapPath, fs.constants.R_OK);
  console.log(`Verified read access for: ${publicSitemapPath}`);
  
  if (fs.existsSync(DIST_DIR)) {
    const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    fs.accessSync(distSitemapPath, fs.constants.R_OK);
    console.log(`Verified read access for: ${distSitemapPath}`);
  }
} catch (err) {
  console.error('Error verifying read access:', err);
} 