const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://yaroshev.com'; // Your domain
const PUBLIC_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/work', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/resources', priority: '0.7', changefreq: 'monthly' }
];

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

// Generate sitemap content
const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(page => `  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Ensure directories exist
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  // Write to public directory
  const publicPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(publicPath, sitemap);
  fs.chmodSync(publicPath, 0o644); // Set read permissions
  console.log(`Sitemap generated in public directory: ${publicPath}`);

  // Copy to dist directory if it exists
  const distPath = path.join(DIST_DIR, 'sitemap.xml');
  if (fs.existsSync(DIST_DIR)) {
    fs.copyFileSync(publicPath, distPath);
    fs.chmodSync(distPath, 0o644); // Set read permissions
    console.log(`Sitemap copied to dist directory: ${distPath}`);
  }

  // Verify file access
  try {
    fs.accessSync(publicPath, fs.constants.R_OK);
    console.log(`Verified read access for: ${publicPath}`);
    if (fs.existsSync(distPath)) {
      fs.accessSync(distPath, fs.constants.R_OK);
      console.log(`Verified read access for: ${distPath}`);
    }
  } catch (err) {
    console.error('Error verifying file access:', err);
  }
};

// Generate the sitemap
generateSitemap(); 