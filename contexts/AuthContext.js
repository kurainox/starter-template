"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const auth = useAuth();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let timer;
    if (!auth.currentUser) {
      timer = setTimeout(() => {
        setAuthLoading(false);
      }, 200);
    } else {
      timer = setTimeout(() => {
        setAuthLoading(false);
      }, 200);
    }

    return () => clearTimeout(timer);
  }, [auth.currentUser]);

  const providerValue = useMemo(() => {
    return { ...auth };
  }, [auth.currentUser, authLoading]);

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext value={providerValue}>{children}</AuthContext>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
