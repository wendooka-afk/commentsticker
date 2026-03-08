// Central route registry — single source of truth for all page IDs, slugs, titles, descriptions.
// Imported by App.tsx, SEOLayout.tsx. Mirrored in scripts/prerender.mjs (Node.js can't import TS).

export type Page =
  | 'home' | 'generator' | 'finder' | 'templates' | 'scripts' | 'batch'
  | 'privacy' | 'terms' | 'about' | 'contact' | 'blog'
  | 'guide' | 'guide-instagram' | 'guide-youtube' | 'guide-comparison'
  | 'guide-tiktok-comment-generator' | 'guide-tiktok-comment-picker' | 'guide-tiktok-giveaway-picker';

export const SLUG_TO_PAGE: Record<string, Page> = {
  '/': 'home',
  '/app': 'generator',
  '/question-finder': 'finder',
  '/templates': 'templates',
  '/script-generator': 'scripts',
  '/batch-generator': 'batch',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/about': 'about',
  '/contact': 'contact',
  '/blog': 'blog',
  '/how-to-add-comment-sticker-tiktok': 'guide',
  '/instagram-comment-sticker-generator': 'guide-instagram',
  '/youtube-comment-sticker-generator': 'guide-youtube',
  '/tiktok-comment-generator-alternatives': 'guide-comparison',
  '/tiktok-comment-generator': 'guide-tiktok-comment-generator',
  '/tiktok-comment-picker': 'guide-tiktok-comment-picker',
  '/tiktok-giveaway-picker': 'guide-tiktok-giveaway-picker',
};

export const PAGE_TO_SLUG: Record<Page, string> = Object.fromEntries(
  Object.entries(SLUG_TO_PAGE).map(([slug, page]) => [page, slug])
) as Record<Page, string>;

export const PAGE_TITLES: Record<Page, string> = {
  home: 'Free TikTok Comment Generator & Sticker Maker | CommentSticker',
  generator: 'Comment Sticker Generator — Create Fake Comments Free',
  finder: 'Find Viral TikTok Questions | CommentSticker',
  templates: 'UGC Comment Templates Library | CommentSticker',
  scripts: 'AI UGC Script Generator | CommentSticker',
  batch: 'Batch Comment Sticker Generator — Export Multiple at Once | CommentSticker',
  privacy: 'Privacy Policy | CommentSticker',
  terms: 'Terms of Service | CommentSticker',
  about: 'About CommentSticker — Free UGC Tools for Creators',
  contact: 'Contact Us | CommentSticker',
  blog: 'Blog & Guides for TikTok Creators | CommentSticker',
  guide: 'How to Add Comment Sticker on TikTok (Ultimate Guide 2026)',
  'guide-instagram': 'Free Instagram Comment Sticker Generator for Reels',
  'guide-youtube': 'Free YouTube Comment Sticker Generator for Shorts',
  'guide-comparison': 'Best TikTok Comment Generator in 2026: Top Alternatives',
  'guide-tiktok-comment-generator': 'Free TikTok Comment Generator — Create Fake TikTok Comments',
  'guide-tiktok-comment-picker': 'TikTok Comment Picker — Free Random Winner Tool',
  'guide-tiktok-giveaway-picker': 'TikTok Giveaway Picker — Free Random Winner Selector',
};

export const PAGE_DESCRIPTIONS: Record<Page, string> = {
  home: 'CommentSticker is the #1 free TikTok comment generator. Create fake TikTok, Instagram, YouTube & Discord comment stickers — transparent PNG, no watermark.',
  generator: 'Create pixel-perfect fake comment stickers for TikTok, Instagram, YouTube and more. Download as transparent PNG. Free, no login, no watermark.',
  finder: 'Discover the most viral questions and comments for your niche. Use them as hooks in your TikTok UGC ads.',
  templates: 'Browse 100+ proven UGC comment templates for TikTok, Instagram and YouTube ads. Free to use.',
  scripts: 'Generate high-converting UGC video scripts based on your comment hooks. Free AI script generator.',
  batch: 'Generate and download multiple comment stickers at once. Batch export PNG for TikTok, Instagram, YouTube. Free, no watermark.',
  privacy: 'Privacy Policy for CommentSticker — how we collect, use, and protect your data.',
  terms: 'Terms of Service for CommentSticker.',
  about: 'Learn about CommentSticker — the free UGC creative tool built for creators, marketers, and brands.',
  contact: 'Get in touch with the CommentSticker team.',
  blog: 'Guides, tutorials and strategies for TikTok UGC creators. Learn how to create comment stickers, run giveaways, and grow your audience.',
  guide: 'Learn how to add a comment sticker on a TikTok video natively and using a free generator. Ultimate 2026 guide.',
  'guide-instagram': 'Create a perfect Instagram comment sticker for Reels. Free generator, transparent PNG, no watermark.',
  'guide-youtube': 'Create a YouTube comment sticker for Shorts. Free generator, 3x resolution, transparent PNG.',
  'guide-comparison': 'Comparison of the best free TikTok comment generator tools in 2026. Find the best TokComment alternative.',
  'guide-tiktok-comment-generator': 'Use a free TikTok comment generator to create realistic fake TikTok comments as transparent PNGs for UGC ads.',
  'guide-tiktok-comment-picker': 'Pick a random winner from TikTok comments for free. Best TikTok comment picker tools compared for 2026.',
  'guide-tiktok-giveaway-picker': 'Run a fair TikTok giveaway and pick a random winner from comments or followers. Free tools compared.',
};

// Schema.org structured data — injected as <script type="application/ld+json"> per page
export const PAGE_SCHEMAS: Partial<Record<Page, object>> = {
  home: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CommentSticker',
    url: 'https://commentsticker.com',
    description: 'Free TikTok comment sticker generator — create transparent PNG comment overlays for UGC ads.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://commentsticker.com/app',
      'query-input': 'required name=search_term_string',
    },
  },
  generator: {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: 'CommentSticker Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free tool to generate pixel-perfect comment stickers for TikTok, Instagram, YouTube, LinkedIn, and more. Transparent PNG, no watermark.',
    url: 'https://commentsticker.com/app',
    featureList: 'TikTok comments, Instagram comments, YouTube comments, LinkedIn comments, PNG export, JPEG export, Batch generator',
  },
  batch: {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: 'CommentSticker Batch Generator',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Generate and download up to 10 comment stickers at once for TikTok, Instagram, YouTube and more. Free batch PNG/JPEG export, no watermark.',
    url: 'https://commentsticker.com/batch-generator',
  },
  finder: {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: 'CommentSticker Question Finder',
    applicationCategory: 'MarketingApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Discover viral TikTok questions and comment hooks for your niche. Free tool for UGC creators and ad marketers.',
    url: 'https://commentsticker.com/question-finder',
  },
  templates: {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: 'CommentSticker Templates Library',
    applicationCategory: 'MarketingApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Browse 100+ proven UGC comment templates for TikTok, Instagram and YouTube ads. Copy and use for free.',
    url: 'https://commentsticker.com/templates',
  },
  scripts: {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    name: 'CommentSticker AI Script Generator',
    applicationCategory: 'MarketingApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Generate high-converting UGC video scripts from comment hooks. Free AI script generator for TikTok and Instagram.',
    url: 'https://commentsticker.com/script-generator',
  },
  guide: {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Add a Comment Sticker on TikTok',
    description: 'Step-by-step guide to adding comment stickers on TikTok natively or using a free generator.',
    step: [
      { '@type': 'HowToStep', name: 'Open TikTok and create a video', text: 'Tap the + button in TikTok to record or upload your video.' },
      { '@type': 'HowToStep', name: 'Tap the Stickers icon', text: 'After recording, tap the Stickers icon (smiley face) in the editor toolbar.' },
      { '@type': 'HowToStep', name: 'Select a comment to react to', text: 'Scroll and select the comment from your video that you want to feature as a sticker.' },
      { '@type': 'HowToStep', name: 'Position and post', text: 'Drag the comment sticker to your desired position and post your video.' },
    ],
  },
  'guide-instagram': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create an Instagram Comment Sticker for Reels',
    description: 'Generate a pixel-perfect Instagram comment sticker as a transparent PNG for your Reels.',
    step: [
      { '@type': 'HowToStep', name: 'Open CommentSticker Generator', text: 'Go to commentsticker.com/app and select Instagram.' },
      { '@type': 'HowToStep', name: 'Customize the comment', text: 'Enter username, comment text, and set the likes count.' },
      { '@type': 'HowToStep', name: 'Download the PNG', text: 'Click Export PNG to download a transparent PNG at 3x resolution.' },
      { '@type': 'HowToStep', name: 'Add to your Reel', text: 'Import the PNG in CapCut or Premiere and overlay on your video.' },
    ],
  },
  'guide-youtube': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create a YouTube Comment Sticker for Shorts',
    description: 'Generate a YouTube comment sticker as a transparent PNG for YouTube Shorts.',
    step: [
      { '@type': 'HowToStep', name: 'Open CommentSticker Generator', text: 'Go to commentsticker.com/app and select YouTube.' },
      { '@type': 'HowToStep', name: 'Customize the comment', text: 'Enter channel name, comment text, and likes count.' },
      { '@type': 'HowToStep', name: 'Export as PNG', text: 'Download the transparent PNG at 3x resolution for crisp display in Shorts.' },
      { '@type': 'HowToStep', name: 'Add to your Short', text: 'Overlay the PNG in your video editor at the top of the frame.' },
    ],
  },
  'guide-tiktok-comment-generator': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Create a Fake TikTok Comment Sticker',
    description: 'Create a realistic TikTok comment as a transparent PNG for UGC ads.',
    step: [
      { '@type': 'HowToStep', name: 'Go to the generator', text: 'Open commentsticker.com/app and select TikTok.' },
      { '@type': 'HowToStep', name: 'Configure the comment', text: 'Set username, avatar, comment text, likes, and timestamp.' },
      { '@type': 'HowToStep', name: 'Export as transparent PNG', text: 'Click Export PNG. The file downloads at 3x pixel ratio with transparent background.' },
    ],
  },
  'guide-tiktok-comment-picker': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pick a Random TikTok Comment Winner',
    description: 'Use a free TikTok comment picker to select a random winner for your giveaway.',
    step: [
      { '@type': 'HowToStep', name: 'Copy your TikTok video comments', text: 'Export or copy all comments from your giveaway video.' },
      { '@type': 'HowToStep', name: 'Paste into the picker tool', text: 'Paste comments into the free CommentSticker picker (one per line).' },
      { '@type': 'HowToStep', name: 'Click Pick a Winner', text: 'Hit the button. The tool randomly selects one commenter as the winner.' },
    ],
  },
  'guide-tiktok-giveaway-picker': {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Pick a Random TikTok Giveaway Winner',
    description: 'Run a fair TikTok giveaway and pick a random winner from comments or followers. Free tools compared.',
    step: [
      { '@type': 'HowToStep', name: 'Collect giveaway entries', text: 'Copy all comments from your TikTok giveaway post or gather follower entries.' },
      { '@type': 'HowToStep', name: 'Paste into a picker tool', text: 'Use a free TikTok giveaway picker — paste entries one per line into the tool.' },
      { '@type': 'HowToStep', name: 'Pick a random winner', text: 'Click the pick button. The tool randomly selects one eligible commenter as the winner.' },
    ],
  },
  'guide-comparison': {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best TikTok Comment Generator in 2026: Top Alternatives Compared',
    description: 'Comparison of the best free TikTok comment generator tools in 2026. Find the best TokComment alternative.',
    url: 'https://commentsticker.com/tiktok-comment-generator-alternatives',
    publisher: { '@type': 'Organization', name: 'CommentSticker', url: 'https://commentsticker.com' },
  },
  blog: {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CommentSticker Blog & Guides',
    url: 'https://commentsticker.com/blog',
    description: 'Guides, tutorials and strategies for TikTok UGC creators. Learn how to create comment stickers, run giveaways, and grow your audience.',
    publisher: {
      '@type': 'Organization',
      name: 'CommentSticker',
      url: 'https://commentsticker.com',
    },
  },
};
