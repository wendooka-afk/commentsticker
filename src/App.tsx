import { useState, useEffect, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { DashboardShell } from './components/DashboardShell';
import { StickerGeneratorUI } from './components/StickerGeneratorUI';
import { QuestionFinder } from './components/QuestionFinder';
import { TemplatesLibrary } from './components/TemplatesLibrary';
import { ScriptGenerator } from './components/ScriptGenerator';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/Terms';
import { AboutUs } from './components/About';
import { Contact } from './components/Contact';
import { GuideHowToAddComment } from './components/GuideHowToAddComment';
import { GuideInstagramCommentSticker } from './components/GuideInstagramCommentSticker';
import { GuideYoutubeCommentSticker } from './components/GuideYoutubeCommentSticker';
import { BlogComparison } from './components/BlogComparison';
import { Blog } from './components/Blog';
import { GuideTikTokCommentGenerator } from './components/GuideTikTokCommentGenerator';
import { GuideTikTokCommentPicker } from './components/GuideTikTokCommentPicker';
import { GuideTikTokGiveawayPicker } from './components/GuideTikTokGiveawayPicker';

// ── URL slug ↔ internal page ID mapping ──────────────────────────────────────
type Page =
  | 'home' | 'generator' | 'finder' | 'templates' | 'scripts'
  | 'privacy' | 'terms' | 'about' | 'contact' | 'blog'
  | 'guide' | 'guide-instagram' | 'guide-youtube' | 'guide-comparison'
  | 'guide-tiktok-comment-generator' | 'guide-tiktok-comment-picker' | 'guide-tiktok-giveaway-picker';

const SLUG_TO_PAGE: Record<string, Page> = {
  '/': 'home',
  '/app': 'generator',
  '/question-finder': 'finder',
  '/templates': 'templates',
  '/script-generator': 'scripts',
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

const PAGE_TO_SLUG: Record<Page, string> = Object.fromEntries(
  Object.entries(SLUG_TO_PAGE).map(([slug, page]) => [page, slug])
) as Record<Page, string>;

const PAGE_TITLES: Record<Page, string> = {
  home: 'Free TikTok Comment Generator & Sticker Maker | CommentSticker',
  generator: 'Comment Sticker Generator — Create Fake Comments Free',
  finder: 'Find Viral TikTok Questions | CommentSticker',
  templates: 'UGC Comment Templates Library | CommentSticker',
  scripts: 'AI UGC Script Generator | CommentSticker',
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

const PAGE_DESCRIPTIONS: Record<Page, string> = {
  home: 'CommentSticker is the #1 free TikTok comment generator. Create fake TikTok, Instagram, YouTube & Discord comment stickers — transparent PNG, no watermark.',
  generator: 'Create pixel-perfect fake comment stickers for TikTok, Instagram, YouTube and more. Download as transparent PNG. Free, no login, no watermark.',
  finder: 'Discover the most viral questions and comments for your niche. Use them as hooks in your TikTok UGC ads.',
  templates: 'Browse 100+ proven UGC comment templates for TikTok, Instagram and YouTube ads. Free to use.',
  scripts: 'Generate high-converting UGC video scripts based on your comment hooks. Free AI script generator.',
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

function getPageFromPath(pathname: string): Page {
  const page = SLUG_TO_PAGE[pathname];
  return page ?? 'home';
}

// ── Component ────────────────────────────────────────────────────────────────
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromPath(window.location.pathname));
  const [darkMode, setDarkMode] = useState(true);
  const [sharedComment, setSharedComment] = useState<string>('');
  const [scriptQuestion, setScriptQuestion] = useState<string>('');

  // Sync document title + meta description + canonical on every page change
  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = PAGE_DESCRIPTIONS[currentPage];

    // Open Graph
    const setOG = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.content = content;
    };
    const slug = PAGE_TO_SLUG[currentPage];
    const canonicalUrl = `https://commentsticker.com${slug}`;
    setOG('og:title', PAGE_TITLES[currentPage]);
    setOG('og:description', PAGE_DESCRIPTIONS[currentPage]);
    setOG('og:url', canonicalUrl);
    setOG('og:type', 'website');
    setOG('og:image', 'https://commentsticker.com/og-image.png');

    // Twitter Card
    const setTwitter = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setTwitter('twitter:card', 'summary_large_image');
    setTwitter('twitter:title', PAGE_TITLES[currentPage]);
    setTwitter('twitter:description', PAGE_DESCRIPTIONS[currentPage]);

    // Canonical link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    const slug = PAGE_TO_SLUG[page] ?? '/';
    window.history.pushState({ page }, '', slug);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleSelectQuestion = (question: string) => {
    setSharedComment(question);
    handleNavigate('generator');
  };

  const handleSelectTemplate = (text: string) => {
    setSharedComment(text);
    handleNavigate('generator');
  };

  const handleGoToScript = (question: string) => {
    setScriptQuestion(question);
    handleNavigate('scripts');
  };

  // ── Routes ──────────────────────────────────────────────────────────────
  if (currentPage === 'home') return <LandingPage onNavigate={handleNavigate as any} darkMode={darkMode} />;
  if (currentPage === 'privacy') return <PrivacyPolicy darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'terms') return <TermsOfService darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'about') return <AboutUs darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'contact') return <Contact darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'blog') return <Blog darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide') return <GuideHowToAddComment darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-instagram') return <GuideInstagramCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-youtube') return <GuideYoutubeCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-comparison') return <BlogComparison darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-tiktok-comment-generator') return <GuideTikTokCommentGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-tiktok-comment-picker') return <GuideTikTokCommentPicker darkMode={darkMode} onNavigate={handleNavigate} />;
  if (currentPage === 'guide-tiktok-giveaway-picker') return <GuideTikTokGiveawayPicker darkMode={darkMode} onNavigate={handleNavigate} />;

  // Dashboard (tool pages)
  return (
    <DashboardShell currentPage={currentPage} onNavigate={handleNavigate as any} darkMode={darkMode} setDarkMode={setDarkMode}>
      {currentPage === 'generator' && (
        <StickerGeneratorUI darkMode={darkMode} onNavigate={handleNavigate as any} initialComment={sharedComment} onGoToScript={handleGoToScript} />
      )}
      {currentPage === 'finder' && (
        <QuestionFinder darkMode={darkMode} onSelectQuestion={handleSelectQuestion} />
      )}
      {currentPage === 'templates' && (
        <TemplatesLibrary darkMode={darkMode} onSelectTemplate={handleSelectTemplate} />
      )}
      {currentPage === 'scripts' && (
        <ScriptGenerator darkMode={darkMode} initialQuestion={scriptQuestion} />
      )}
    </DashboardShell>
  );
}
