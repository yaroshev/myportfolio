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

// Generate sitemap XML content
const generateSitemap = () => {
  const today = getCurrentDate();
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  PAGES.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${BASE_URL}${page.path}</loc>\n`;
    sitemap += `    <lastmod>${today}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
};

// Ensure directories exist
[PUBLIC_DIR, DIST_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Write sitemap to files
const sitemap = generateSitemap();

// Write to public directory
const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemap, { mode: 0o644 });
console.log(`Sitemap generated in public directory: ${publicSitemapPath}`);

// Write to dist directory if it exists
const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(distSitemapPath, sitemap, { mode: 0o644 });
  console.log(`Sitemap copied to dist directory: ${distSitemapPath}`);
}

// Verify files are readable
[publicSitemapPath, distSitemapPath].forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.accessSync(file, fs.constants.R_OK);
      console.log(`Verified read access for: ${file}`);
    } catch (err) {
      console.error(`Warning: Cannot read ${file}:`, err);
    }
  }
}); 