import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type Plan = 'free' | 'pro_monthly' | 'pro_annual';
export type SubscriptionStatus = 'active' | 'inactive' | 'cancelled' | 'on_hold' | 'expired';

export interface CsSubscription {
  id: string;
  user_id: string;
  dodo_subscription_id: string | null;
  plan: Plan;
  status: SubscriptionStatus;
  current_period_end: string | null;
  trial_end: string | null;
  created_at: string;
  updated_at: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns true if the user has an active Pro subscription. */
export function isPro(sub: CsSubscription | null): boolean {
  if (!sub) return false;
  if (sub.status !== 'active') return false;
  if (sub.current_period_end && new Date(sub.current_period_end) < new Date()) return false;
  return true;
}

/** Call the create-checkout Edge Function and redirect to Dodo checkout. */
export async function startCheckout(plan: 'pro_monthly' | 'pro_annual'): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const resp = await fetch(
    `${SUPABASE_URL}/functions/v1/cs-create-checkout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ plan }),
    }
  );

  const json = await resp.json() as { checkout_url?: string; error?: string };
  if (!resp.ok || !json.checkout_url) throw new Error(json.error ?? 'Checkout failed');
  window.location.href = json.checkout_url;
}
