import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import {
  type Page,
  SLUG_TO_PAGE,
  PAGE_TO_SLUG,
  PAGE_TITLES,
  PAGE_DESCRIPTIONS,
  PAGE_SCHEMAS,
} from './config/routes';

// ── Eager imports — core app pages (always needed) ───────────────────────────
import { LandingPage } from './components/LandingPage';
import { DashboardShell } from './components/DashboardShell';
import { StickerGeneratorUI } from './components/StickerGeneratorUI';
import { QuestionFinder } from './components/QuestionFinder';
import { TemplatesLibrary } from './components/TemplatesLibrary';
import { ScriptGenerator } from './components/ScriptGenerator';
import { BatchGenerator } from './components/BatchGenerator';

// ── Lazy imports — guide/blog pages (code-split, loaded on demand) ───────────
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/Terms').then(m => ({ default: m.TermsOfService })));
const AboutUs = lazy(() => import('./components/About').then(m => ({ default: m.AboutUs })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const GuideHowToAddComment = lazy(() => import('./components/GuideHowToAddComment').then(m => ({ default: m.GuideHowToAddComment })));
const GuideInstagramCommentSticker = lazy(() => import('./components/GuideInstagramCommentSticker').then(m => ({ default: m.GuideInstagramCommentSticker })));
const GuideYoutubeCommentSticker = lazy(() => import('./components/GuideYoutubeCommentSticker').then(m => ({ default: m.GuideYoutubeCommentSticker })));
const BlogComparison = lazy(() => import('./components/BlogComparison').then(m => ({ default: m.BlogComparison })));
const GuideTikTokCommentGenerator = lazy(() => import('./components/GuideTikTokCommentGenerator').then(m => ({ default: m.GuideTikTokCommentGenerator })));
const GuideTikTokCommentPicker = lazy(() => import('./components/GuideTikTokCommentPicker').then(m => ({ default: m.GuideTikTokCommentPicker })));
const GuideTikTokGiveawayPicker = lazy(() => import('./components/GuideTikTokGiveawayPicker').then(m => ({ default: m.GuideTikTokGiveawayPicker })));

function getPageFromPath(pathname: string): Page {
  return SLUG_TO_PAGE[pathname] ?? 'home';
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
    </div>
  );
}

// ── Component ────────────────────────────────────────────────────────────────
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromPath(window.location.pathname));
  const [darkMode, setDarkMode] = useState(true);
  const [sharedComment, setSharedComment] = useState<string>('');
  const [scriptQuestion, setScriptQuestion] = useState<string>('');

  // Sync document head (title, meta, OG, canonical, schema.org) on every navigation
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
    setTwitter('twitter:image', 'https://commentsticker.com/og-image.png');

    // Canonical link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Schema.org structured data (JSON-LD)
    const schema = PAGE_SCHEMAS[currentPage];
    let schemaEl = document.getElementById('schema-ld') as HTMLScriptElement | null;
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement('script');
        schemaEl.type = 'application/ld+json';
        schemaEl.id = 'schema-ld';
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }
  }, [currentPage]);

  // Handle browser back/forward
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

  const handleCommentConsumed = useCallback(() => {
    setSharedComment('');
  }, []);

  // ── Landing page (eager) ─────────────────────────────────────────────────
  if (currentPage === 'home') {
    return <LandingPage onNavigate={handleNavigate as any} darkMode={darkMode} />;
  }

  // ── Lazy-loaded content pages ────────────────────────────────────────────
  const renderLazyPage = () => {
    switch (currentPage) {
      case 'privacy': return <PrivacyPolicy darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'terms': return <TermsOfService darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'about': return <AboutUs darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'contact': return <Contact darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog': return <Blog darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide': return <GuideHowToAddComment darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-instagram': return <GuideInstagramCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-youtube': return <GuideYoutubeCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-comparison': return <BlogComparison darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-tiktok-comment-generator': return <GuideTikTokCommentGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-tiktok-comment-picker': return <GuideTikTokCommentPicker darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'guide-tiktok-giveaway-picker': return <GuideTikTokGiveawayPicker darkMode={darkMode} onNavigate={handleNavigate} />;
      default: return null;
    }
  };

  const lazyPage = renderLazyPage();
  if (lazyPage) {
    return <Suspense fallback={<PageLoader />}>{lazyPage}</Suspense>;
  }

  // ── Dashboard (tool pages) ───────────────────────────────────────────────
  return (
    <DashboardShell
      currentPage={currentPage}
      onNavigate={handleNavigate as any}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      {currentPage === 'generator' && (
        <StickerGeneratorUI
          darkMode={darkMode}
          onNavigate={handleNavigate as any}
          initialComment={sharedComment}
          onCommentConsumed={handleCommentConsumed}
          onGoToScript={handleGoToScript}
        />
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
      {currentPage === 'batch' && (
        <BatchGenerator darkMode={darkMode} />
      )}
    </DashboardShell>
  );
}
