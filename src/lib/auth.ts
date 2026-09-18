import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface DakghorProfile {
  id: string;
  name: string;
  address: string;
  created_at: string;
}

export function formatIssuedDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  } catch {
    return "—";
  }
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DakghorProfile | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const userId = session?.user?.id ?? null;

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      return;
    }
    let active = true;
    supabase
      .from("profiles")
      .select("id, name, address, created_at")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data) setProfile(data as DakghorProfile);
      });
    return () => {
      active = false;
    };
  }, [userId]);

  const user: User | null = session?.user ?? null;

  return {
    session,
    user,
    profile,
    loading,
    isAuthenticated: Boolean(session),
    refreshProfile: async () => {
      if (!userId) return;
      const { data } = await supabase
        .from("profiles")
        .select("id, name, address, created_at")
        .eq("id", userId)
        .maybeSingle();
      if (data) setProfile(data as DakghorProfile);
    },
  };
}

export async function signOutOfDakghor() {
  await supabase.auth.signOut();
}
