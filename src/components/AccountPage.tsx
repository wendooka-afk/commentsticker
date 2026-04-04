import { useEffect, useState } from 'react';
import { Crown, LogOut, RefreshCw, AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import type { SubscriptionStatus } from '../lib/supabase';

interface AccountPageProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

const STATUS_CONFIG: Record<SubscriptionStatus, { label: string; color: string; icon: React.ReactNode }> = {
  active:    { label: 'Active',     color: 'text-green-500',  icon: <CheckCircle2 className="w-4 h-4" /> },
  inactive:  { label: 'Inactive',   color: 'text-neutral-400',icon: <Clock className="w-4 h-4" /> },
  cancelled: { label: 'Cancelled',  color: 'text-orange-500', icon: <XCircle className="w-4 h-4" /> },
  on_hold:   { label: 'On hold',    color: 'text-yellow-500', icon: <AlertCircle className="w-4 h-4" /> },
  expired:   { label: 'Expired',    color: 'text-red-500',    icon: <XCircle className="w-4 h-4" /> },
};

export function AccountPage({ darkMode, onNavigate }: AccountPageProps) {
  const { user, subscription, isProUser, loading, signOut, refreshSub } = useAuth();
  const [showAuth,    setShowAuth]    = useState(false);
  const [refreshing,  setRefreshing]  = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  // Check if returning from a successful checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'success') {
      setCheckoutMsg('Payment successful! Your Pro access is being activated — it may take a minute.');
      // Refresh subscription status after a short delay (webhook may not have fired yet)
      const t = setTimeout(async () => { await refreshSub(); }, 3000);
      // Clean up URL
      window.history.replaceState({}, '', '/account/');
      return () => clearTimeout(t);
    }
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await refreshSub();
    setRefreshing(false);
  }

  const card  = darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';
  const muted = darkMode ? 'text-neutral-400' : 'text-neutral-500';

  if (!loading && !user) {
    return (
      <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
        <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />
        <main className="max-w-lg mx-auto px-6 py-32 text-center space-y-6">
          <Crown className="w-12 h-12 mx-auto text-pink-500" />
          <h1 className="text-3xl font-black">Sign in to view your account</h1>
          <p className={`font-medium ${muted}`}>Access your subscription, billing history, and settings.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
          >
            Log in / Sign up
          </button>
        </main>
        <SEOFooter onNavigate={onNavigate} />
        {showAuth && <AuthModal darkMode={darkMode} onClose={() => setShowAuth(false)} />}
      </div>
    );
  }

  const status      = subscription?.status ?? 'inactive';
  const statusConf  = STATUS_CONFIG[status];
  const periodEnd   = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      <main className="max-w-2xl mx-auto px-6 py-32 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black">My Account</h1>
          <button
            onClick={async () => { await signOut(); onNavigate('home'); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${darkMode ? 'border-neutral-700 hover:bg-neutral-800' : 'border-neutral-200 hover:bg-neutral-100'}`}
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>

        {/* Checkout success message */}
        {checkoutMsg && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-green-600 dark:text-green-400">{checkoutMsg}</p>
          </div>
        )}

        {/* Profile */}
        <div className={`rounded-3xl border p-6 space-y-4 ${card}`}>
          <h2 className={`text-xs font-black uppercase tracking-widest ${muted}`}>Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-black text-lg">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div>
              {user?.user_metadata?.full_name && (
                <p className="font-black">{user.user_metadata.full_name}</p>
              )}
              <p className={`text-sm font-medium ${muted}`}>{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className={`rounded-3xl border p-6 space-y-5 ${card}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xs font-black uppercase tracking-widest ${muted}`}>Subscription</h2>
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''} ${muted}`} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold ${statusConf.color} ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              {statusConf.icon} {statusConf.label}
            </div>
            <span className="font-black text-lg">
              {isProUser ? (subscription?.plan === 'pro_annual' ? 'Pro Annual' : 'Pro Monthly') : 'Free'}
            </span>
          </div>

          {isProUser && periodEnd && (
            <p className={`text-sm font-medium ${muted}`}>
              {status === 'cancelled' ? 'Access until' : 'Renews on'}: <strong className="text-inherit">{periodEnd}</strong>
            </p>
          )}

          {!isProUser && (
            <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-neutral-800/50 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
              <p className={`text-sm font-medium mb-3 ${muted}`}>
                Upgrade to Pro to unlock unlimited exports, all 9 platforms, batch generator, and more.
              </p>
              <button
                onClick={() => onNavigate('pricing')}
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-black text-sm shadow-md shadow-pink-500/20 hover:scale-[1.02] transition-all"
              >
                View Pro plans →
              </button>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className={`rounded-3xl border p-6 space-y-3 ${card}`}>
          <h2 className={`text-xs font-black uppercase tracking-widest mb-4 ${muted}`}>Quick access</h2>
          {[
            { label: 'Sticker Generator', page: 'generator' },
            { label: 'Batch Generator', page: 'batch' },
            { label: 'All Free Tools', page: 'free-tools' },
            { label: 'Pricing', page: 'pricing' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-50'}`}
            >
              {label} →
            </button>
          ))}
        </div>

        {/* Support */}
        <p className={`text-center text-xs font-medium ${muted}`}>
          Need help? Email us at{' '}
          <a href="mailto:support@commentsticker.com" className="text-pink-500 hover:underline">
            support@commentsticker.com
          </a>
        </p>
      </main>

      <SEOFooter onNavigate={onNavigate} />
    </div>
  );
}
