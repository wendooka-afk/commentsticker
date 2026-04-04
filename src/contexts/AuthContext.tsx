import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isPro, type CsSubscription } from '../lib/supabase';

interface AuthContextValue {
  user:         User | null;
  session:      Session | null;
  subscription: CsSubscription | null;
  isProUser:    boolean;
  loading:      boolean;
  signOut:      () => Promise<void>;
  refreshSub:   () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null, session: null, subscription: null, isProUser: false, loading: true,
  signOut: async () => {}, refreshSub: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,         setUser]         = useState<User | null>(null);
  const [session,      setSession]      = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<CsSubscription | null>(null);
  const [loading,      setLoading]      = useState(true);

  async function fetchSubscription(uid: string) {
    const { data } = await supabase
      .from('cs_subscriptions')
      .select('*')
      .eq('user_id', uid)
      .maybeSingle();
    setSubscription(data ?? null);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchSubscription(session.user.id).finally(() => setLoading(false));
      else setLoading(false);
    });

    const { data: { subscription: listener } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchSubscription(session.user.id);
      else setSubscription(null);
    });

    return () => listener.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSubscription(null);
  };

  const refreshSub = async () => {
    if (user) await fetchSubscription(user.id);
  };

  return (
    <AuthContext.Provider value={{
      user, session, subscription,
      isProUser: isPro(subscription),
      loading, signOut, refreshSub,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
