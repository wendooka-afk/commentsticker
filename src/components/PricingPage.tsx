import { useState } from 'react';
import { Check, Zap, Crown, Loader2 } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { startCheckout } from '../lib/supabase';

interface PricingPageProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

const FREE_FEATURES = [
  '3 exports per day',
  'TikTok, Instagram & YouTube only',
  'Standard 1× resolution',
  'CommentSticker watermark',
  'Basic sticker generator',
];

const PRO_FEATURES = [
  'Unlimited exports',
  'All 9 platforms (+ Discord, LinkedIn, Threads…)',
  '3× high-resolution PNG',
  'No watermark',
  'Batch Generator (up to 10 at once)',
  'AI Question Finder',
  'UGC Script Generator',
  'Templates Library (100+ templates)',
  'Export history saved',
  'No ads',
  'Priority support',
];

export function PricingPage({ darkMode, onNavigate }: PricingPageProps) {
  const { user, isProUser } = useAuth();
  const [billing, setBilling]   = useState<'monthly' | 'annual'>('annual');
  const [authPlan, setAuthPlan]  = useState<'pro_monthly' | 'pro_annual' | null>(null);
  const [loading,  setLoading]   = useState(false);
  const [error,    setError]     = useState('');

  const plan = billing === 'annual' ? 'pro_annual' : 'pro_monthly';

  async function handleUpgrade() {
    setError('');
    if (!user) { setAuthPlan(plan); return; }
    try {
      setLoading(true);
      await startCheckout(plan);
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  const card  = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';
  const muted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      <main className="max-w-5xl mx-auto px-6 py-32">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-black uppercase tracking-wider">
            <Crown className="w-3 h-3" /> Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className={`text-xl font-medium max-w-2xl mx-auto ${muted}`}>
            One Pro plan. All features. Cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-12">
          <div className={`flex items-center rounded-2xl p-1 gap-1 ${darkMode ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200 shadow-sm'}`}>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all ${billing === 'monthly' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md' : muted}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-5 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${billing === 'annual' ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md' : muted}`}
            >
              Annual
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${billing === 'annual' ? 'bg-white/20 text-white' : 'bg-green-500/10 text-green-500'}`}>
                –35%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* Free */}
          <div className={`rounded-3xl border p-8 space-y-6 ${card}`}>
            <div>
              <p className={`text-xs font-black uppercase tracking-widest mb-2 ${muted}`}>Free</p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black">$0</span>
                <span className={`text-sm font-medium mb-2 ${muted}`}>/month</span>
              </div>
              <p className={`text-sm font-medium mt-2 ${muted}`}>Try the basics, no credit card needed.</p>
            </div>

            <ul className="space-y-3">
              {FREE_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                    <Check className="w-3 h-3 text-neutral-400" />
                  </div>
                  <span className={muted}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onNavigate('generator')}
              className={`w-full py-3.5 rounded-2xl font-black text-sm border transition-all hover:scale-[1.02] ${darkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-50'}`}
            >
              Start for free
            </button>
          </div>

          {/* Pro */}
          <div className={`rounded-3xl border-2 border-pink-500 p-8 space-y-6 relative overflow-hidden ${darkMode ? 'bg-neutral-900' : 'bg-white shadow-xl shadow-pink-500/10'}`}>
            {/* Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-black uppercase tracking-widest text-pink-500">Pro</p>
                <span className="px-2 py-1 rounded-full bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Most popular
                </span>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-black">
                  {billing === 'annual' ? '$5.75' : '$9'}
                </span>
                <span className={`text-sm font-medium mb-2 ${muted}`}>/month</span>
              </div>
              {billing === 'annual' && (
                <p className="text-xs font-bold text-green-500 mt-1">Billed $69/year · 2 months free</p>
              )}
              {billing === 'monthly' && (
                <p className={`text-sm font-medium mt-2 ${muted}`}>Billed monthly, cancel anytime.</p>
              )}
            </div>

            <ul className="space-y-3 relative">
              {PRO_FEATURES.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

            {isProUser ? (
              <button
                onClick={() => onNavigate('account')}
                className="relative w-full py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:scale-[1.02] transition-all"
              >
                ✓ You're on Pro
              </button>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="relative w-full py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/25 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : `Upgrade to Pro ${billing === 'annual' ? '· $69/yr' : '· $9/mo'}`}
              </button>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20 space-y-6">
          <h2 className="text-2xl font-black text-center">Common questions</h2>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel in one click from your Account page. Your Pro access remains until the end of the billing period.' },
            { q: 'What payment methods are accepted?', a: 'All major credit cards, debit cards, and regional payment methods via Dodo Payments.' },
            { q: 'Is there a free trial?', a: 'The Free tier lets you try the core generator before upgrading. No credit card required.' },
            { q: 'Do you offer refunds?', a: 'If you are not satisfied within the first 7 days, contact us at support@commentsticker.com for a full refund.' },
          ].map(({ q, a }) => (
            <div key={q} className={`p-6 rounded-2xl border ${card}`}>
              <h3 className="font-black mb-2">{q}</h3>
              <p className={`text-sm font-medium ${muted}`}>{a}</p>
            </div>
          ))}
        </div>
      </main>

      <SEOFooter onNavigate={onNavigate} />

      {/* Auth modal triggered when user clicks Upgrade without being logged in */}
      {authPlan && (
        <AuthModal
          darkMode={darkMode}
          onClose={() => setAuthPlan(null)}
          onSuccess={() => { setAuthPlan(null); handleUpgrade(); }}
          checkoutPlan={authPlan}
        />
      )}
    </div>
  );
}
