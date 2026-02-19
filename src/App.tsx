import { useState } from 'react';
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

type Page = 'home' | 'generator' | 'finder' | 'templates' | 'scripts' | 'privacy' | 'terms' | 'about' | 'contact';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(true);
  const [sharedComment, setSharedComment] = useState<string>('');
  const [scriptQuestion, setScriptQuestion] = useState<string>('');

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
