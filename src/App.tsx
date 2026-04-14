import { useState, useEffect, useCallback, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from 'react';
import { AuthProvider } from './contexts/AuthContext';
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
import { CookieConsent } from './components/CookieConsent';
import { DashboardShell } from './components/DashboardShell';
import { StickerGeneratorUI } from './components/StickerGeneratorUI';
import { QuestionFinder } from './components/QuestionFinder';
import { TemplatesLibrary } from './components/TemplatesLibrary';
import { ScriptGenerator } from './components/ScriptGenerator';
import { BatchGenerator } from './components/BatchGenerator';

// ── Lazy imports — guide/blog/legal pages (code-split, loaded on demand) ─────
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
const HashtagGenerator = lazy(() => import('./components/HashtagGenerator').then(m => ({ default: m.HashtagGenerator })));
const FontGenerator = lazy(() => import('./components/FontGenerator').then(m => ({ default: m.FontGenerator })));
const CaptionGenerator = lazy(() => import('./components/CaptionGenerator').then(m => ({ default: m.CaptionGenerator })));
const EngagementCalculator = lazy(() => import('./components/EngagementCalculator').then(m => ({ default: m.EngagementCalculator })));
const FreeTools = lazy(() => import('./components/FreeTools').then(m => ({ default: m.FreeTools })));
const VideoIdeasGenerator = lazy(() => import('./components/VideoIdeasGenerator').then(m => ({ default: m.VideoIdeasGenerator })));
const HookGenerator = lazy(() => import('./components/HookGenerator').then(m => ({ default: m.HookGenerator })));
const CommentReplyGenerator = lazy(() => import('./components/CommentReplyGenerator').then(m => ({ default: m.CommentReplyGenerator })));
const BioGenerator = lazy(() => import('./components/BioGenerator').then(m => ({ default: m.BioGenerator })));
const CTAGenerator = lazy(() => import('./components/CTAGenerator').then(m => ({ default: m.CTAGenerator })));
const PricingPage = lazy(() => import('./components/PricingPage').then(m => ({ default: m.PricingPage })));
const AccountPage = lazy(() => import('./components/AccountPage').then(m => ({ default: m.AccountPage })));
const Features = lazy(() => import('./components/Features').then(m => ({ default: m.Features })));
const UseCases = lazy(() => import('./components/UseCases').then(m => ({ default: m.UseCases })));
const BlogTikTokUsernameIdeas = lazy(() => import('./components/BlogTikTokUsernameIdeas').then(m => ({ default: m.BlogTikTokUsernameIdeas })));
const BlogTikTokGiveaway = lazy(() => import('./components/BlogTikTokGiveaway').then(m => ({ default: m.BlogTikTokGiveaway })));
const BlogUGCContent = lazy(() => import('./components/BlogUGCContent').then(m => ({ default: m.BlogUGCContent })));
const BlogTikTokAlgorithm = lazy(() => import('./components/BlogTikTokAlgorithm').then(m => ({ default: m.BlogTikTokAlgorithm })));
const BlogTikTokViews = lazy(() => import('./components/BlogTikTokViews').then(m => ({ default: m.BlogTikTokViews })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));

// ── Subdomain detection ───────────────────────────────────────────────────────
// If running on app.commentsticker.com, treat the app as dashboard-only:
// default page = generator (not landing), same routes still work via direct URL.
const IS_APP_SUBDOMAIN =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'app.commentsticker.com' ||
    window.location.hostname === 'app.localhost');

function normalizePath(pathname: string): string {
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function getPageFromPath(pathname: string): Page {
  // On app subdomain, treat root as generator
  if (IS_APP_SUBDOMAIN && pathname === '/') return 'generator';
  return SLUG_TO_PAGE[normalizePath(pathname)] ?? 'home';
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950">
      <div className="w-8 h-8 border-2 border-pink-500/30 border-t-pink-500 rounded-full animate-spin" />
    </div>
  );
}

// ── ErrorBoundary — catches chunk-load failures for lazy pages ────────────────
class LazyErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: Error, info: ErrorInfo) { console.error('Lazy load error:', err, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white gap-4 px-6">
          <p className="text-lg font-semibold text-center">Failed to load this page.</p>
          <button
            onClick={() => { this.setState({ hasError: false }); window.location.reload(); }}
            className="px-5 py-2.5 bg-pink-500 hover:bg-pink-600 rounded-xl text-sm font-bold transition-colors"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Component ────────────────────────────────────────────────────────────────
export function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => getPageFromPath(window.location.pathname));
  const [isNotFound, setIsNotFound] = useState(() => !SLUG_TO_PAGE[normalizePath(window.location.pathname)]);
  const [darkMode, setDarkMode] = useState(() => {
    try { const s = localStorage.getItem('cs_dark'); return s === null ? true : s === 'true'; } catch { return true; }
  });
  const [sharedComment, setSharedComment] = useState<string>('');
  const [scriptQuestion, setScriptQuestion] = useState<string>('');

  // Persist dark mode preference
  useEffect(() => {
    try { localStorage.setItem('cs_dark', String(darkMode)); } catch {}
  }, [darkMode]);

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
    const canonicalUrl = `https://commentsticker.com${slug.endsWith('/') ? slug : slug + '/'}`;
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
      setIsNotFound(!SLUG_TO_PAGE[normalizePath(window.location.pathname)]);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleNavigate = useCallback((page: Page) => {
    const slug = PAGE_TO_SLUG[page] ?? '/';
    window.history.pushState({ page }, '', slug);
    setCurrentPage(page);
    setIsNotFound(false);
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

  const handleQuestionConsumed = useCallback(() => {
    setScriptQuestion('');
  }, []);

  // ── Cookie consent banner — always mounted, self-manages visibility ────────
  const cookieBanner = <CookieConsent onNavigate={handleNavigate as any} darkMode={darkMode} />;

  // ── 404 ──────────────────────────────────────────────────────────────────
  if (isNotFound) {
    return (
      <>
        <LazyErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <NotFound onNavigate={handleNavigate as any} darkMode={darkMode} />
          </Suspense>
        </LazyErrorBoundary>
        {cookieBanner}
      </>
    );
  }

  // ── Landing page (eager) — not shown on app subdomain ───────────────────
  if (currentPage === 'home' && !IS_APP_SUBDOMAIN) {
    return (
      <>
        <LandingPage onNavigate={handleNavigate as any} darkMode={darkMode} />
        {cookieBanner}
      </>
    );
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
      case 'hashtag-generator': return <HashtagGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'font-generator': return <FontGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'caption-generator': return <CaptionGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'engagement-calculator': return <EngagementCalculator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'free-tools': return <FreeTools darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'pricing':    return <PricingPage darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'account':    return <AccountPage darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'features':   return <Features darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'use-cases':  return <UseCases darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog-tiktok-username-ideas': return <BlogTikTokUsernameIdeas darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'video-ideas-generator': return <VideoIdeasGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'hook-generator': return <HookGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'comment-reply-generator': return <CommentReplyGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'bio-generator': return <BioGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'cta-generator': return <CTAGenerator darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog-tiktok-giveaway': return <BlogTikTokGiveaway darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog-ugc-content': return <BlogUGCContent darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog-tiktok-algorithm': return <BlogTikTokAlgorithm darkMode={darkMode} onNavigate={handleNavigate} />;
      case 'blog-tiktok-views': return <BlogTikTokViews darkMode={darkMode} onNavigate={handleNavigate} />;
      default: return null;
    }
  };

  const lazyPage = renderLazyPage();
  if (lazyPage) {
    return (
      <>
        <LazyErrorBoundary>
          <Suspense fallback={<PageLoader />}>{lazyPage}</Suspense>
        </LazyErrorBoundary>
        {cookieBanner}
      </>
    );
  }

  // ── Dashboard (tool pages) ───────────────────────────────────────────────
  return (
    <>
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
          <ScriptGenerator
            darkMode={darkMode}
            initialQuestion={scriptQuestion}
            onQuestionConsumed={handleQuestionConsumed}
          />
        )}
        {currentPage === 'batch' && (
          <BatchGenerator darkMode={darkMode} />
        )}
      </DashboardShell>
      {cookieBanner}
    </>
  );
}
