import React from "react";
import {
  getSession,
  onAuthStateChange,
  signIn,
  signOut,
  signUp,
  signInWithGoogle,
} from "@/services/authService";

interface AuthState {
  user: any | null;
  session: any | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signUp: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<any | null>(null);
  const [session, setSession] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getSession();
      if (mounted && res.ok) {
        setSession(res.data.session);
        setUser(res.data.session?.user ?? null);
      }
      setLoading(false);
    })();
    const unsubscribe = onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  async function handleSignIn(email: string, password: string) {
    const res = await signIn({ email, password });
    if (!res.ok) return { ok: false, error: res.error.message };
    return { ok: true };
  }

  async function handleSignUp(email: string, password: string, name?: string) {
    const res = await signUp({ email, password, name });
    if (!res.ok) return { ok: false, error: res.error.message };
    return { ok: true };
  }

  async function handleSignInWithGoogle() {
    const res = await signInWithGoogle();
    if (!res.ok) return { ok: false, error: res.error.message };
    return { ok: true };
  }

  async function handleSignOut() {
    await signOut();
  }

  const value: AuthState = {
    user,
    session,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
