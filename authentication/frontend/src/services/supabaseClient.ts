// Supabase client singleton
// This file is the only place the anonymous public key and project URL are read.
// Do not import env vars elsewhere for auth calls; centralizing helps future rotation.

import { createClient } from '@supabase/supabase-js';

// We purposely use Vite-exposed env names (must start with VITE_). These must be defined in your .env.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable.');
}
if (!SUPABASE_ANON_KEY) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable.');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Future: wrap auth helpers here (signIn, signUp, signOut) instead of calling supabase.auth directly in components.
