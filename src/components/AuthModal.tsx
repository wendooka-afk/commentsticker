import { useState } from 'react';
import { X, Mail, Lock, User, Loader2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Mode = 'login' | 'signup' | 'magic' | 'check-email';

interface AuthModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  darkMode: boolean;
  /** If set, after login the user is sent to checkout for this plan */
  checkoutPlan?: 'pro_monthly' | 'pro_annual';
}

export function AuthModal({ onClose, onSuccess, darkMode, checkoutPlan }: AuthModalProps) {
  const [mode,    setMode]    = useState<Mode>('login');
  const [email,   setEmail]   = useState('');
  const [name,    setName]    = useState('');
  const [pass,    setPass]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const card = darkMode
    ? 'bg-neutral-900 border-neutral-800 text-white'
    : 'bg-white border-neutral-200 text-neutral-900';
  const input = `w-full px-4 py-3 rounded-xl text-sm font-medium border outline-none focus:border-pink-500 transition-colors ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'}`;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) { setError(error.message); setLoading(false); return; }
    onSuccess?.();
    onClose();
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signUp({
      email, password: pass,
      options: { data: { full_name: name } },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setMode('check-email');
    setLoading(false);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: checkoutPlan ? `https://commentsticker.com/pricing/` : `https://commentsticker.com/account/` },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setMode('check-email');
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl border shadow-2xl p-8 ${card}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'}`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Check email state */}
        {mode === 'check-email' ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-black">Check your email</h2>
            <p className="text-neutral-500 text-sm font-medium">
              We sent a link to <strong>{email}</strong>. Click it to continue.
            </p>
            <button onClick={onClose} className="text-sm text-pink-500 font-bold hover:underline">
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-8 space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">
                {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create account' : 'Magic link'}
              </h2>
              {checkoutPlan && (
                <p className="text-sm font-medium text-pink-500">
                  Sign in to unlock Pro access
                </p>
              )}
            </div>

            {/* Tab switcher */}
            <div className={`flex rounded-2xl p-1 mb-6 ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
              {(['login', 'signup', 'magic'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(''); }}
                  className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${mode === m ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md' : (darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900')}`}
                >
                  {m === 'magic' ? 'Magic' : m === 'login' ? 'Login' : 'Sign up'}
                </button>
              ))}
            </div>

            {/* Forms */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} required />
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-black text-sm shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log in'}
                </button>
              </form>
            )}

            {mode === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="password" placeholder="Password (min 8 chars)" value={pass} onChange={e => setPass(e.target.value)} minLength={8} required />
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-black text-sm shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create account'}
                </button>
              </form>
            )}

            {mode === 'magic' && (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <p className={`text-xs font-medium text-center ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Enter your email and we'll send a one-click login link. No password needed.
                </p>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input className={`${input} pl-10`} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-black text-sm shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send magic link'}
                </button>
              </form>
            )}

            <p className={`text-center text-xs font-medium mt-4 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              By continuing, you agree to our{' '}
              <a href="/terms/" className="text-pink-500 hover:underline">Terms</a> &{' '}
              <a href="/privacy/" className="text-pink-500 hover:underline">Privacy Policy</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
