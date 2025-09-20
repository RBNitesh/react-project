import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  // ✅ Sign Up → also insert into "profiles" table
  const signUp = async (email, password, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata }, // still store in user_metadata
    });

    if (error) return { data, error };

    // If signup succeeded, insert into profiles table
    if (data?.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        age: metadata.age,
        gender: metadata.gender,
      });
    }

    return { data, error };
  };

  // ✅ Sign In
  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  // ✅ Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // ✅ Social login (Google, Facebook, etc.)
  const signInWithProvider = (provider) =>
    supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });

  return (
    <AuthContext.Provider
      value={{ user, signUp, signIn, signOut, signInWithProvider }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
