/**
 * Post-build pre-rendering script.
 *
 * Creates a dedicated index.html for every route listed in the sitemap so that
 * static hosts (Cloudflare Pages, Netlify, GitHub Pages, S3 …) serve the
 * correct HTML — with title, description and canonical — without needing a
 * catch-all redirect rule.
 *
 * Run after `vite build`:
 *   node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '../dist');

// ── Route metadata — keep in sync with App.tsx ───────────────────────────────
const ROUTES = {
  '/app': {
    title: 'Comment Sticker Generator — Create Fake Comments Free',
    description:
      'Create pixel-perfect fake comment stickers for TikTok, Instagram, YouTube and more. Download as transparent PNG. Free, no login, no watermark.',
  },
  '/question-finder': {
    title: 'Find Viral TikTok Questions | CommentSticker',
    description:
      'Discover the most viral questions and comments for your niche. Use them as hooks in your TikTok UGC ads.',
  },
  '/templates': {
    title: 'UGC Comment Templates Library | CommentSticker',
    description:
      'Browse 100+ proven UGC comment templates for TikTok, Instagram and YouTube ads. Free to use.',
  },
  '/script-generator': {
    title: 'AI UGC Script Generator | CommentSticker',
    description:
      'Generate high-converting UGC video scripts based on your comment hooks. Free AI script generator.',
  },
  '/batch-generator': {
    title: 'Batch Comment Sticker Generator — Export Multiple at Once | CommentSticker',
    description:
      'Generate and download multiple comment stickers at once. Batch export PNG for TikTok, Instagram, YouTube. Free, no watermark.',
  },
  '/privacy': {
    title: 'Privacy Policy | CommentSticker',
    description:
      'Privacy Policy for CommentSticker — how we collect, use, and protect your data.',
  },
  '/terms': {
    title: 'Terms of Service | CommentSticker',
    description: 'Terms of Service for CommentSticker.',
  },
  '/about': {
    title: 'About CommentSticker — Free UGC Tools for Creators',
    description:
      'Learn about CommentSticker — the free UGC creative tool built for creators, marketers, and brands.',
  },
  '/contact': {
    title: 'Contact Us | CommentSticker',
    description: 'Get in touch with the CommentSticker team.',
  },
  '/blog': {
    title: 'Blog & Guides for TikTok Creators | CommentSticker',
    description:
      'Guides, tutorials and strategies for TikTok UGC creators. Learn how to create comment stickers, run giveaways, and grow your audience.',
  },
  '/how-to-add-comment-sticker-tiktok': {
    title: 'How to Add Comment Sticker on TikTok (Ultimate Guide 2026)',
    description:
      'Learn how to add a comment sticker on a TikTok video natively and using a free generator. Ultimate 2026 guide.',
  },
  '/instagram-comment-sticker-generator': {
    title: 'Free Instagram Comment Sticker Generator for Reels',
    description:
      'Create a perfect Instagram comment sticker for Reels. Free generator, transparent PNG, no watermark.',
  },
  '/youtube-comment-sticker-generator': {
    title: 'Free YouTube Comment Sticker Generator for Shorts',
    description:
      'Create a YouTube comment sticker for Shorts. Free generator, 3x resolution, transparent PNG.',
  },
  '/tiktok-comment-generator-alternatives': {
    title: 'Best TikTok Comment Generator in 2026: Top Alternatives',
    description:
      'Comparison of the best free TikTok comment generator tools in 2026. Find the best TokComment alternative.',
  },
  '/tiktok-comment-generator': {
    title: 'Free TikTok Comment Generator — Create Fake TikTok Comments',
    description:
      'Use a free TikTok comment generator to create realistic fake TikTok comments as transparent PNGs for UGC ads.',
  },
  '/tiktok-comment-picker': {
    title: 'TikTok Comment Picker — Free Random Winner Tool',
    description:
      'Pick a random winner from TikTok comments for free. Best TikTok comment picker tools compared for 2026.',
  },
  '/tiktok-giveaway-picker': {
    title: 'TikTok Giveaway Picker — Free Random Winner Selector',
    description:
      'Run a fair TikTok giveaway and pick a random winner from comments or followers. Free tools compared.',
  },
  '/hashtag-generator': {
    title: 'Free TikTok Hashtag Generator — Best Hashtags for Your Niche (2026)',
    description:
      'Generate the best TikTok, Instagram and YouTube hashtags for your niche. Free hashtag generator — copy and paste instantly, no sign-up.',
  },
  '/tiktok-font-generator': {
    title: 'TikTok Font Generator — Copy & Paste Fonts for Bio & Captions',
    description:
      'Generate stylish fonts for TikTok bio and captions. Bold, italic, script, Fraktur and 13 more Unicode font styles. Copy and paste free.',
  },
  '/caption-generator': {
    title: 'Free Social Media Caption Generator — TikTok, Instagram, LinkedIn',
    description:
      'Generate engaging social media captions for TikTok, Instagram, LinkedIn and YouTube. Free caption generator with hashtag suggestions.',
  },
  '/engagement-rate-calculator': {
    title: 'Engagement Rate Calculator — Free Tool for All Platforms (2026)',
    description:
      'Calculate your social media engagement rate for TikTok, Instagram, YouTube, Twitter, LinkedIn and Facebook. Free tool with industry benchmarks.',
  },
  '/free-tools': {
    title: 'Free Social Media Tools — Hashtag Generator, Font Generator & More | CommentSticker',
    description:
      'All free social media tools in one place — hashtag generator, TikTok font generator, caption generator, engagement rate calculator, comment picker and giveaway picker.',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Escape special characters for use in HTML attribute values. */
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * Replace the value of a specific meta tag in the HTML string.
 * Handles both single-line and multi-line attribute patterns.
 */
function setMeta(html, selector, value) {
  // Matches e.g.  <meta name="description"\n    content="OLD" />
  const re = new RegExp(
    `(${selector}[\\s\\S]*?content=")[^"]*(")`
  );
  return html.replace(re, `$1${esc(value)}$2`);
}

// ── Main ─────────────────────────────────────────────────────────────────────

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const [slug, { title, description }] of Object.entries(ROUTES)) {
  const canonicalUrl = `https://commentsticker.com${slug}`;

  let html = template
    // <title>
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    // meta description
    .replace(
      /(<meta\s+name="description"[\s\S]*?content=")[^"]*(")/,
      `$1${esc(description)}$2`
    )
    // og:url
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${esc(canonicalUrl)}$2`
    )
    // og:title
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`
    )
    // og:description (may span 2 lines)
    .replace(
      /(<meta\s+property="og:description"[\s\S]*?content=")[^"]*(")/,
      `$1${esc(description)}$2`
    )
    // twitter:url
    .replace(
      /(<meta\s+property="twitter:url"\s+content=")[^"]*(")/,
      `$1${esc(canonicalUrl)}$2`
    )
    // twitter:title
    .replace(
      /(<meta\s+property="twitter:title"\s+content=")[^"]*(")/,
      `$1${esc(title)}$2`
    )
    // twitter:description (may span 2 lines)
    .replace(
      /(<meta\s+property="twitter:description"[\s\S]*?content=")[^"]*(")/,
      `$1${esc(description)}$2`
    );

  // Insert / update canonical <link>
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${canonicalUrl}$2`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
    );
  }

  // Write dist/<slug>/index.html
  const dir = join(DIST, slug.slice(1)); // strip leading /
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  console.log(`  ✓  ${slug}`);
}

// Generate 404.html for Cloudflare Pages / Netlify catch-all
const notFoundHtml = template
  .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found | CommentSticker</title>')
  .replace(
    /(<meta\s+name="description"[\s\S]*?content=")[^"]*(")/,
    `$1Page not found — go back to CommentSticker, the free comment sticker generator.$2`
  );
writeFileSync(join(DIST, '404.html'), notFoundHtml, 'utf-8');
console.log('  ✓  /404.html');

console.log('\n✅  Pre-rendering complete — all routes have a dedicated index.html\n');
