import { supabase } from './supabaseClient';

/** Standardized shape for auth operations */
export interface AuthSuccess<T = unknown> {
  ok: true;
  data: T;
}

export interface AuthFailure {
  ok: false;
  error: {
    code: string;
    message: string;
    raw?: unknown;
  };
}

export type AuthResult<T = unknown> = AuthSuccess<T> | AuthFailure;

function fail(message: string, raw?: unknown, code = 'UNKNOWN'): AuthFailure {
  return { ok: false, error: { code, message, raw } };
}

// Basic mapping for a few common Supabase auth error messages
function mapSupabaseError(message: string): { code: string; message: string } {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) {
    return { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password.' };
  }
  if (m.includes('email not confirmed')) {
    return { code: 'EMAIL_NOT_CONFIRMED', message: 'Please confirm your email before logging in.' };
  }
  if (m.includes('user already registered')) {
    return { code: 'USER_EXISTS', message: 'An account with that email already exists.' };
  }
  return { code: 'AUTH_ERROR', message };
}

export async function signUp(params: { email: string; password: string; name?: string }): Promise<AuthResult<{ user: any }>> {
  const { email, password, name } = params;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: name ? { data: { name } } : undefined,
    });
    if (error) {
      const mapped = mapSupabaseError(error.message);
      return fail(mapped.message, error, mapped.code);
    }
    return { ok: true, data: { user: data.user } };
  } catch (err: any) {
    return fail('Sign up failed. Please try again.', err);
  }
}

export async function signIn(params: { email: string; password: string }): Promise<AuthResult<{ user: any; session: any }>> {
  const { email, password } = params;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const mapped = mapSupabaseError(error.message);
      return fail(mapped.message, error, mapped.code);
    }
    return { ok: true, data: { user: data.user, session: data.session } };
  } catch (err: any) {
    return fail('Login failed. Please try again.', err);
  }
}

export async function signOut(): Promise<AuthResult<{}>> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      const mapped = mapSupabaseError(error.message);
      return fail(mapped.message, error, mapped.code);
    }
    return { ok: true, data: {} };
  } catch (err: any) {
    return fail('Logout failed. Please try again.', err);
  }
}

export async function getSession(): Promise<AuthResult<{ session: any }>> {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return fail(error.message, error, 'SESSION_ERROR');
    }
    return { ok: true, data: { session: data.session } };
  } catch (err: any) {
    return fail('Could not get session.', err);
  }
}

export async function signInWithGoogle(): Promise<AuthResult<{}>> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) {
      const mapped = mapSupabaseError(error.message);
      return fail(mapped.message, error, mapped.code);
    }
    return { ok: true, data: {} };
  } catch (err: any) {
    return fail('Google sign-in failed. Please try again.', err);
  }
}

export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  return () => subscription.subscription.unsubscribe();
}

// FUTURE: Consider normalizing the user object shape for the UI layer if we add providers / roles.