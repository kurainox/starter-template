// hooks/useProtectedRoute.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export const useProtectedRoute = () => {
  const [isValidating, setIsValidating] = useState(true);
  const { currentUser, authLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  if (authLoading) {
    return { isLoading: true, user: null };
  }

  useEffect(() => {
    if (!authLoading) {
      // Only run checks after auth state is determined
      if (pathname.startsWith("/auth")) {
        // Redirect to dashboard if user tries to access auth pages while logged in
        if (currentUser) {
          router.push("/dashboard");
          return
        }
      } else {
        // Redirect to login if user tries to access protected pages while logged out
        if (!currentUser) {
          router.push("/auth/login");
            return
        }
      }

        setIsValidating(false);
    }
  }, [currentUser, authLoading, pathname]);

  const isLoading = isValidating || authLoading;

  return { isLoading, user: currentUser };
};
