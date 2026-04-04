import { MessageSquare, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (page: string) => void;
  darkMode: boolean;
}

export function NotFound({ onNavigate, darkMode }: NotFoundProps) {
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${darkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      <div className="text-center max-w-md w-full">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-8">
          <img src="/logo-icon.png" alt="CommentSticker" className="w-full h-full object-contain" />
        </div>

        {/* 404 */}
        <h1 className={`text-8xl font-black mb-3 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>404</h1>
        <p className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Page not found
        </p>
        <p className={`text-sm mb-10 leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          This page doesn't exist or has been moved.
          <br />
          Try one of the links below.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('generator')}
            className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all hover:scale-105 active:scale-95 ${
              darkMode
                ? 'border-neutral-700 text-neutral-300 hover:border-neutral-600 hover:text-white'
                : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Open Generator
          </button>
        </div>

        {/* Quick links */}
        <div className={`text-xs font-medium space-y-2 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
          <p className="font-black uppercase tracking-widest">Popular pages</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
            {[
              { label: 'Generator', page: 'generator' },
              { label: 'Batch', page: 'batch' },
              { label: 'Templates', page: 'templates' },
              { label: 'Blog', page: 'blog' },
            ].map(({ label, page }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`hover:text-pink-500 transition-colors ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
