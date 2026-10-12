import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'reliefcarefoundation@reliefcarefoundation.org';

export function useAdminAuth() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setIsAdmin(!!data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password });
    return error ? error.message : null;
  };

  const signOut = () => supabase.auth.signOut();

  return { isAdmin, signIn, signOut };
}
