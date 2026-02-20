import { useState, useEffect } from 'react';
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

type Page = 'home' | 'generator' | 'finder' | 'templates' | 'scripts' | 'privacy' | 'terms' | 'about' | 'contact' | 'guide' | 'guide-instagram' | 'guide-youtube' | 'guide-comparison' | 'blog';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [sharedComment, setSharedComment] = useState<string>('');
  const [scriptQuestion, setScriptQuestion] = useState<string>('');

  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Free TikTok Comment Generator & Sticker Maker',
      generator: 'CommentSticker App - Generate Fake Comments',
      finder: 'Find Viral TikTok Comments - CommentSticker',
      templates: 'UGC Templates Library - CommentSticker',
      scripts: 'AI Script Generator - CommentSticker',
      privacy: 'Privacy Policy - CommentSticker',
      terms: 'Terms of Service - CommentSticker',
      about: 'About Us - CommentSticker',
      contact: 'Contact - CommentSticker',
      guide: 'How to Add Comment Sticker on TikTok Video (Guide)',
      'guide-instagram': 'Free Instagram Comment Sticker Generator',
      'guide-youtube': 'Free YouTube Comment Sticker Generator',
      'guide-comparison': 'Best TikTok Comment Generator Alternatives',
      blog: 'Blog & Articles - CommentSticker'
    };
    document.title = titles[currentPage] || 'CommentSticker';
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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

  // --- LANDING PAGE ---
  if (currentPage === 'home') {
    return <LandingPage onNavigate={handleNavigate as any} darkMode={darkMode} />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'terms') {
    return <TermsOfService darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'about') {
    return <AboutUs darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'contact') {
    return <Contact darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'blog') {
    return <Blog darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'guide') {
    return <GuideHowToAddComment darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'guide-instagram') {
    return <GuideInstagramCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'guide-youtube') {
    return <GuideYoutubeCommentSticker darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'guide-comparison') {
    return <BlogComparison darkMode={darkMode} onNavigate={handleNavigate} />;
  }

  // --- DASHBOARD (Main App) ---
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
          onGoToScript={handleGoToScript}
        />
      )}

      {currentPage === 'finder' && (
        <QuestionFinder
          darkMode={darkMode}
          onSelectQuestion={handleSelectQuestion}
        />
      )}

      {currentPage === 'templates' && (
        <TemplatesLibrary
          darkMode={darkMode}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {currentPage === 'scripts' && (
        <ScriptGenerator
          darkMode={darkMode}
          initialQuestion={scriptQuestion}
        />
      )}
    </DashboardShell>
  );
}
