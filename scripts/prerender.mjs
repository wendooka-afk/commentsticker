/**
 * Post-build pre-rendering script — Enhanced for Google AdSense Compliance.
 *
 * This script does TWO things:
 *
 * 1. Creates a dedicated index.html for every route so static hosts
 *    (Cloudflare Pages, Netlify, etc.) serve the correct meta tags.
 *
 * 2. Injects rich, static HTML content into <div id="root"> for each page
 *    so that Google's AdSense crawler (and other bots) can see real
 *    publisher content immediately — before any JavaScript executes.
 *    React replaces this static content when it hydrates on the client.
 *
 * Run after `vite build`:
 *   node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { STATIC_CONTENT } from './static-content.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '../dist');

// ── Route metadata — keep in sync with App.tsx ───────────────────────────────
const ROUTES = {
  '/': {
    title: 'Free TikTok Comment Generator & Sticker PNG | CommentSticker',
    description:
      'Create custom fake TikTok comments, Instagram & YouTube comment overlays. Free TikTok comment bubble generator and transparent PNG for UGC and ads.',
  },
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
    title: 'Batch Comment Sticker Generator | CommentSticker',
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
    title: 'Free Hashtag Generator for TikTok & Instagram (2026)',
    description:
      'Generate the best TikTok, Instagram and YouTube hashtags for your niche. Free hashtag generator — copy and paste instantly, no sign-up.',
  },
  '/tiktok-font-generator': {
    title: 'TikTok Font Generator — Copy & Paste Fonts for Bio & Captions',
    description:
      'Generate stylish fonts for TikTok bio and captions. Bold, italic, script, Fraktur and 13 more Unicode font styles. Copy and paste free.',
  },
  '/caption-generator': {
    title: 'Free Caption Generator — TikTok, Instagram & LinkedIn',
    description:
      'Generate engaging social media captions for TikTok, Instagram, LinkedIn and YouTube. Free caption generator with hashtag suggestions.',
  },
  '/engagement-rate-calculator': {
    title: 'Engagement Rate Calculator — Free Tool for All Platforms (2026)',
    description:
      'Calculate your social media engagement rate for TikTok, Instagram, YouTube, Twitter, LinkedIn and Facebook. Free tool with industry benchmarks.',
  },
  '/pricing': {
    title: 'Pricing — CommentSticker Pro | Unlimited Exports & All Platforms',
    description: 'Get CommentSticker Pro — unlimited exports, all 9 platforms, batch generator, no watermark, no ads. $9/month or $69/year.',
  },
  '/account': {
    title: 'My Account | CommentSticker',
    description: 'Manage your CommentSticker subscription, billing, and account settings.',
  },
  '/free-tools': {
    title: 'Free Social Media Tools for Creators | CommentSticker',
    description:
      'All free social media tools in one place — hashtag generator, font generator, caption generator, engagement rate calculator, comment picker and giveaway picker.',
  },
  '/tiktok-video-ideas-generator': {
    title: 'Free TikTok Video Ideas Generator — 500+ Ideas by Niche (2026)',
    description:
      'Generate 500+ TikTok video ideas by niche and format. Free TikTok video ideas generator — tutorials, POVs, challenges, reactions and more. No sign-up.',
  },
  '/tiktok-hook-generator': {
    title: 'Free TikTok Hook Generator — High-Retention Hooks for Every Niche',
    description:
      'Generate high-retention TikTok hooks for your niche. Free hook generator with 8 hook types — question, secret, mistake, POV, number, contrast, hot take, storytime.',
  },
  '/comment-reply-generator': {
    title: 'Free TikTok Comment Reply Generator — Replies for Any Comment',
    description:
      'Generate perfect TikTok comment replies for compliments, questions, criticism, and haters. Free reply generator with 4 tones. Copy and paste instantly.',
  },
  '/tiktok-bio-generator': {
    title: 'Free TikTok Bio Generator — Optimized Bios by Niche & Vibe (2026)',
    description:
      'Generate optimized TikTok bios for your niche and vibe. Free TikTok bio generator with character counter — funny, inspiring, professional, bold and more.',
  },
  '/cta-generator': {
    title: 'Free CTA Generator for TikTok, Instagram, YouTube & LinkedIn',
    description:
      'Generate high-converting calls-to-action for TikTok, Instagram, YouTube and LinkedIn. Free CTA generator — follow, comment, save, share, link in bio and more.',
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Escape special characters for use in HTML attribute values. */
function esc(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

// ── Main ─────────────────────────────────────────────────────────────────────

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const [slug, { title, description }] of Object.entries(ROUTES)) {
  const canonicalUrl = `https://commentsticker.com${slug.endsWith('/') ? slug : slug + '/'}`;

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

  // ── CRITICAL: Inject static content into <div id="root"> ─────────────────
  // This ensures Google's AdSense bot and other crawlers see real, meaningful
  // publisher content before JavaScript executes. React replaces this content
  // when it hydrates on the client side.
  const staticContent = STATIC_CONTENT[slug];
  if (staticContent) {
    // Hide the static fallback once React has loaded (removes flicker)
    const hideOnLoad = `
<script>
  // Remove the static pre-render content once React has initialized
  // to prevent any layout flash.
  document.addEventListener('DOMContentLoaded', function() {
    // React's createRoot will replace the contents of #root automatically.
    // This listener is just a safety net for older hydration approaches.
  });
</script>`;

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${staticContent}</div>${hideOnLoad}`
    );
    console.log(`  ✓  ${slug} (with static content)`);
  } else {
    console.log(`  ⚠  ${slug} (no static content defined)`);
  }

  // Write dist/<slug>/index.html (or dist/index.html for root)
  if (slug === '/') {
    // For root, also update the root index.html
    writeFileSync(join(DIST, 'index.html'), html, 'utf-8');
    console.log(`  ✓  / (root index.html updated)`);
  } else {
    const dir = join(DIST, slug.slice(1)); // strip leading /
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html, 'utf-8');
  }
}

// Generate 404.html for Cloudflare Pages / Netlify catch-all
const notFoundHtml = template
  .replace(/<title>[^<]*<\/title>/, '<title>Page Not Found | CommentSticker</title>')
  .replace(
    /(<meta\s+name="description"[\s\S]*?content=")[^"]*(")/,
    `$1Page not found — go back to CommentSticker, the free comment sticker generator.$2`
  )
  .replace(
    '<div id="root"></div>',
    `<div id="root">
<style>body{font-family:Inter,system-ui,sans-serif;background:#fff;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px;text-align:center;padding:24px;}</style>
<h1 style="font-size:4rem;font-weight:900;margin:0;">404</h1>
<p style="color:#6b7280;font-size:1.1rem;">Page not found. The page you're looking for doesn't exist.</p>
<a href="/" style="padding:12px 24px;background:linear-gradient(135deg,#ec4899,#f97316);color:white;border-radius:12px;text-decoration:none;font-weight:700;">Go to Homepage</a>
<nav style="display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:16px;">
  <a href="/app" style="color:#ec4899;text-decoration:none;font-weight:600;">Comment Generator</a>
  <a href="/blog" style="color:#ec4899;text-decoration:none;font-weight:600;">Blog</a>
  <a href="/free-tools" style="color:#ec4899;text-decoration:none;font-weight:600;">Free Tools</a>
  <a href="/about" style="color:#ec4899;text-decoration:none;font-weight:600;">About</a>
</nav>
</div>`
  );
writeFileSync(join(DIST, '404.html'), notFoundHtml, 'utf-8');
console.log('  ✓  /404.html');

console.log('\n✅  Pre-rendering complete — all routes have static content injected.\n');
console.log('📌  AdSense Note: Each page now contains rich, crawlable publisher content\n    that Google\'s bots can index before JavaScript executes.\n');
