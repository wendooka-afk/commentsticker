import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

interface CookieConsentProps {
    onNavigate: (page: any) => void;
    darkMode: boolean;
}

const CONSENT_KEY = 'cs_cookie_consent';

export function CookieConsent({ onNavigate, darkMode }: CookieConsentProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show banner only if the user hasn't already made a choice
        try {
            const saved = localStorage.getItem(CONSENT_KEY);
            if (!saved) {
                // Small delay so it doesn't flash immediately on page load
                const timer = setTimeout(() => setVisible(true), 1200);
                return () => clearTimeout(timer);
            }
        } catch {
            // localStorage not available (e.g., in some privacy browsers) — don't show banner
        }
    }, []);

    const accept = () => {
        try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch {}
        setVisible(false);
    };

    const decline = () => {
        try { localStorage.setItem(CONSENT_KEY, 'declined'); } catch {}
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            className={`fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 pt-0 md:bottom-4 md:left-4 md:right-auto md:max-w-sm transition-all duration-500 animate-in slide-in-from-bottom-4`}
        >
            <div className={`rounded-2xl border shadow-2xl p-5 ${darkMode
                ? 'bg-neutral-900 border-neutral-700 text-white shadow-black/50'
                : 'bg-white border-neutral-200 text-neutral-900 shadow-black/10'
                }`}>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                        <Cookie className="w-4 h-4 text-pink-500 flex-shrink-0" />
                        <span className="font-black text-sm">Cookies &amp; Ads</span>
                    </div>
                    <button
                        onClick={decline}
                        aria-label="Close cookie banner"
                        className={`p-1 rounded-lg transition-colors flex-shrink-0 ${darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'}`}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <p className={`text-xs leading-relaxed mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    We use cookies to improve your experience and display personalised ads via{' '}
                    <strong>Google AdSense</strong>. By clicking "Accept", you consent to our use
                    of cookies as described in our{' '}
                    <button
                        onClick={() => { decline(); onNavigate('cookies'); }}
                        className="text-pink-500 underline font-semibold hover:text-pink-400"
                    >
                        Cookie Policy
                    </button>.
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={accept}
                        className="flex-1 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-xs font-black shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={decline}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-black border transition-all hover:scale-[1.02] active:scale-95 ${darkMode
                            ? 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                            : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                            }`}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
